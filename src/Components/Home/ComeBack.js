import React from 'react';
import {View, StyleSheet, Text, Dimensions, Image} from 'react-native';
import CountDown from 'react-native-countdown-component';

import AppColors from '../../Utils/AppColors';
const {width: screenWidth} = Dimensions.get('window');
const ComeBack = ({card, forceReload}) => {
  const time = parseInt(card.time_left, 10);
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <Text style={styles.title}>
          Come back later to see{'\n'}new suggested profiles!
        </Text>
        <Image
          style={styles.img}
          source={require('../../Assets/Image/morning.png')}
        />
        <Text style={styles.time}>Time until new profiles</Text>
        {time >= 0 && (
          <CountDown
            until={time}
            digitStyle={styles.digitStyle}
            digitTxtStyle={styles.digitTxtStyle}
            timeLabelStyle={styles.timeLabelStyle}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: 'Hrs', m: 'Min', s: 'Sec'}}
            size={30}
            onFinish={forceReload}
          />
        )}
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
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 70,
  },
  time: {
    color: AppColors.MainColor + 'C2',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    marginBottom: 14,
  },
  digitStyle: {
    backgroundColor: '#CEF4FF',
    width: 51,
    marginHorizontal: 6,
    height: 38,
  },
  digitTxtStyle: {
    width: 51,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.MainColor,
    lineHeight: 43,
  },
  timeLabelStyle: {
    marginTop: 3,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: AppColors.MainColor,
  },
});

export default ComeBack;
