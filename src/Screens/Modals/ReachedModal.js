import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../../Utils/AppColors';
import PurchaseLoader from '../../Components/Common/PurchaseLoader';

import {usePremium} from '../../Providers/PremiumProvider';
import {
  logClickMonthly,
  logClickQuarterly,
  logClickWeekly,
  logDeniedPurchase,
} from '../../Utils/Analytics';
function ReachedModal({navigation}) {
  const insets = useSafeArea();
  const {purchasePremium, premiumError, isPremium, offerings} = usePremium();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isPremium) {
      navigation.navigate('TabNavigator');
    }
  }, [isPremium]);

  useEffect(() => {
    if (typeof premiumError !== 'undefined') {
      setShowLoader(false);
      logDeniedPurchase();
    }
  }, [premiumError]);
  return (
    <View style={styles.wrap}>
      <View style={styles.box}>
        <View style={styles.body}>
          <View style={styles.contain}>
            <Text style={styles.description}>
              You reached your 5 options limit
            </Text>
            <Text style={styles.title}>
              See <Text style={styles.titleBold}>+5</Text> more options
            </Text>
            <Image
              style={styles.img}
              source={require('../../Assets/Image/benefits4.png')}
            />
            <Text style={styles.text}>Become premium member</Text>
            <TouchableOpacity
              style={styles.premiumButton}
              onPress={() => navigation.navigate('BenefitsModal', {start: 2})}>
              <Text style={styles.premium}>See all premium benefits</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              setShowLoader(true);
              purchasePremium(offerings?.current?.weekly);
              logClickWeekly();
            }}>
            <Text style={styles.priceText}>1 week $9.99</Text>
            <View style={styles.tryNow}>
              <Text style={styles.try}>Try now</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              setShowLoader(true);
              purchasePremium(offerings?.current?.monthly);
              logClickMonthly();
            }}>
            <Text style={styles.priceText}>
              1 Month $29.99{' '}
              <Text style={styles.smallText}>($7.99 per week)</Text>
            </Text>
            <View style={[styles.tryNow, styles.bestDeal]}>
              <Text style={styles.try}>Best deal</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={() => {
              setShowLoader(true);
              purchasePremium(offerings?.current?.threeMonth);
              logClickQuarterly();
            }}>
            <Text style={styles.priceText}>
              3 Months $59.99{' '}
              <Text style={styles.smallText}>($4.99 per week)</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.exit, {marginBottom: insets.bottom + 20}]}
        onPress={() => navigation.navigate('TabNavigator')}>
        <Text style={styles.exitText}>Exit Happy Hour</Text>
      </TouchableOpacity>
      {showLoader && <PurchaseLoader />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#52B8D6',
  },
  buyButton: {
    borderColor: AppColors.white,
    borderWidth: 1,
    borderRadius: 27,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 52,
  },
  smallText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  box: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 44,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
    color: AppColors.white,
    textAlign: 'center',
    height: 44,
    marginTop: 27,
  },
  body: {
    justifyContent: 'center',
    paddingTop: 22,
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  try: {
    color: AppColors.white,
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 45,
    marginBottom: 31,
  },
  titleBold: {
    fontSize: 32,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 23,
    marginBottom: 2,
  },
  tryNow: {
    backgroundColor: '#628BE8',
    borderRadius: 12,
    borderColor: '#52B8D6',
    borderWidth: 2,
    position: 'absolute',
    right: 6,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: -6,
    paddingHorizontal: 9,
  },
  bestDeal: {
    backgroundColor: '#D462E8',
  },
  img: {
    width: 258,
    height: 94,
  },
  exit: {
    alignItems: 'center',
    paddingTop: 30,
  },
  exitText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-medium',
  },
  premiumButton: {
    alignItems: 'center',
    marginBottom: 12,
  },
  premium: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default ReachedModal;
