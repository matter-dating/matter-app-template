import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import ModalBackground from './ModalBackground';

const PurchaseLoader = () => {
  return (
    <View style={styles.wrapper}>
      <ModalBackground />
      <View style={styles.background} />
      <LottieView
        source={require('../../Assets/Animation/profile_loader.json')}
        autoPlay
        loop
        style={styles.disableTouch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 101,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.1,
    backgroundColor: '#000',
  },
  disableTouch: {
    zIndex: 20,
  },
});

export default PurchaseLoader;
