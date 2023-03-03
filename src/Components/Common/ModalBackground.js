import React from 'react';
import {View, Dimensions, Platform, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ModalBackground = () => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={styles.background}
        blurType={'light'}
        reducedTransparencyFallbackColor={'#43AECE'}
        blurAmount={40}
      />
    );
  }
  return <View style={styles.background} />;
};

const styles = StyleSheet.create({
  background: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    opacity: 0.64,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(67,174,206,0.46)',
  },
});

export default ModalBackground;
