import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  // UIManager,
  // LayoutAnimation,
  // Platform,
} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/core';
import CustomImage from '../Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import StarIcon from '../../Assets/Svg/StarIcon';
import {usePremium} from '../../Providers/PremiumProvider';
import PremiumStack from './PremiumStack';
import {
  logClickMonthly,
  logClickQuarterly,
  logClickWeekly,
  logDeniedPurchase,
  logPremiumFromHome,
} from '../../Utils/Analytics';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const imgWidth = screenHeight > 700 ? screenWidth - 128 : screenWidth - 146;
const imgWidth1 = screenHeight > 700 ? screenWidth - 204 : screenWidth - 222;
const imgHeight = (imgWidth / 31) * 25;
const imgHeight1 = (imgWidth1 / 170) * 137;

// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const GoPremium = ({userData, reloadHome, setShowLoader}) => {
  const [isShow, setIsShow] = useState(false);
  const navigation = useNavigation();
  const {purchasePremium, isPremium, premiumError, offerings} = usePremium();

  const [premiumState, setPremiumState] = useState(isPremium);

  useFocusEffect(
    useCallback(() => {
      setPremiumState(isPremium);
    }, [isPremium]),
  );

  useEffect(() => {
    setShowLoader(false);
    setPremiumState(isPremium);
  }, [isPremium]);

  useEffect(() => {
    if (typeof premiumError !== 'undefined') {
      setShowLoader(false);
      logDeniedPurchase();
    }
  }, [premiumError]);

  const renderBody = () => {
    return (
      <View style={styles.box}>
        <View style={styles.header}>
          <Text
            style={[styles.title, screenHeight < 700 && {fontSize: 15}]}
            numberOfLines={1}>
            See <Text style={styles.titleBold}>+20</Text> more profiles everyday
          </Text>
          <Text style={styles.description}>Go Premium</Text>
        </View>
        <View style={styles.body}>
          <CustomImage
            style={styles.img}
            source={require('../../Assets/Image/goPremium.png')}
          />
        </View>
        <View />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setIsShow(true);
              logPremiumFromHome();
            }}>
            <StarIcon width={17} height={17} color={AppColors.MainColor} />
            <Text style={styles.buttonText}>Yes! Show me</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderShowBody = () => {
    return (
      <View style={[styles.box, styles.showBox]}>
        <View style={styles.header}>
          <CustomImage
            style={styles.img1}
            source={require('../../Assets/Image/goPremium1.png')}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <StarIcon width={17} height={17} color={AppColors.white} />
            <Text style={[styles.title, styles.title1]}>Go Premium</Text>
            <StarIcon width={17} height={17} color={AppColors.white} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('BenefitsModal', {start: 0})}>
            <Text style={styles.all}>See all premium benefits</Text>
          </TouchableOpacity>
        </View>
        <View />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buyButton}
            onPress={async () => {
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
    );
  };

  if (premiumState) {
    return <PremiumStack userData={userData} reloadHome={reloadHome} />;
  }
  return (
    <View style={styles.flex}>{isShow ? renderShowBody() : renderBody()}</View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    borderRadius: 8,
    paddingHorizontal: screenHeight > 700 ? 14 : 6,
    paddingVertical: 48,
    overflow: 'hidden',
    justifyContent: 'space-between',
    height: screenWidth + 139,
    backgroundColor: AppColors.MainColor,
  },
  showBox: {
    paddingHorizontal: 16,
    paddingVertical: 29,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
  },
  img1: {
    width: imgWidth1,
    height: imgHeight1,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 33,
    marginBottom: 4,
  },
  title1: {
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 0,
    marginHorizontal: 5,
  },
  titleBold: {
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
    lineHeight: 23,
  },
  all: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 17,
    textDecorationLine: 'underline',
  },
  header: {
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: AppColors.white,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonText: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginHorizontal: 9,
    lineHeight: 50,
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
  try: {
    color: AppColors.white,
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 16,
  },
  tryNow: {
    backgroundColor: '#628BE8',
    borderRadius: 12,
    borderColor: AppColors.MainColor,
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
});

export default GoPremium;
