import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

import AppColors from '../../Utils/AppColors';
import Disconnect from '../../Assets/Svg/New/Disconnect';

const DisconnectModal = () => {
  return (
    <View style={styles.flex}>
      <ImageBackground
        defaultSource={require('../../Assets/Image/Empty/permission.png')}
        source={require('../../Assets/Image/Empty/permission.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.box}>
          <View style={styles.img}>
            <Disconnect width={80} height={80} />
          </View>
          <Text style={styles.title}>You are disconnected</Text>
          <Text style={styles.text}>
            Please check your internet connectivity and try again
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  box: {
    alignItems: 'center',
    marginTop: '20%',
  },
  img: {
    marginVertical: 27,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: AppColors.MainColor1,
    marginBottom: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    color: AppColors.MainColor1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: AppColors.MainColor,
    marginTop: 36,
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DisconnectModal;
