import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import PinIcon from '../../Assets/Svg/PinBigIcon';

import AppColors from '../../Utils/AppColors';
const {width: screenWidth} = Dimensions.get('window');
const TrulyEmpty = () => {
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <Text style={styles.title}>No more people around you</Text>
        <Text style={styles.description}>
          We are new to your area,{'\n'}come back later to see more profiles
        </Text>
        <View style={styles.indicator}>
          <LottieView
            source={require('../../Assets/Animation/empty.json')}
            autoPlay
            loop
            style={styles.disableTouch}
          />
          <View style={styles.pin}>
            <PinIcon width={28} height={28} color={AppColors.MainColor} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    borderRadius: 8,
    paddingHorizontal: 29,
    paddingTop: 70,
    overflow: 'hidden',
    alignItems: 'center',
    height: screenWidth + 139,
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.MainColor,
  },
  img: {
    width: 169,
    height: 54,
    marginBottom: 32,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 21,
    textAlign: 'center',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  disableTouch: {
    width: '100%',
  },
  pin: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrulyEmpty;
