import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

import BackIcon from '../../Assets/Svg/BackIcon';
import {usePremium} from '../../Providers/PremiumProvider';

function Premium({navigation}) {
  const insets = useSafeArea();
  const {isPremium, originalPurchaseDate} = usePremium();

  useEffect(() => {
    if (!isPremium) {
      navigation.goBack();
    }
  }, [isPremium]);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <Text style={styles.title}>My membership</Text>
          <View style={styles.empty} />
        </View>
      </View>
      <View style={[styles.flex, {paddingBottom: insets.bottom}]}>
        <View style={styles.item}>
          <Text style={styles.itemText}>
            You are an active Premium member since{' '}
            {originalPurchaseDate.current.toLocaleDateString('en-US')}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={[styles.itemText, styles.itemTextMini]}>
            You can upgrade/change your membership{'\n'}from your profile
            section
          </Text>
        </View>
        <View style={styles.itemLast}>
          <Text style={styles.itemCurrent}>
            If you wish to cancel your membership,{'\n'}
            you can do it from your subscription list on your{'\n'}
            phone settings
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#011124',
  },
  flex: {
    flex: 1,
    paddingVertical: 24,
    height: '100%',
  },
  empty: {
    width: 24,
  },
  item: {
    paddingBottom: 16,
    paddingHorizontal: 18,
  },
  itemLast: {
    marginTop: 'auto',
    paddingBottom: 16,
    paddingHorizontal: 18,
  },
  itemName: {
    lineHeight: 23,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
  },
  itemText: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.MainColor1 + 'B8',
  },
  itemTextMini: {
    fontSize: 12,
  },
  itemCurrent: {
    fontSize: 12,
    color: AppColors.AppBlack + 'AD',
    textAlign: 'center',
  },
  switch: {
    marginLeft: 30,
  },
  underLine: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.MainColor1,
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.MainColor1 + 'AD',
  },
});

export default Premium;
