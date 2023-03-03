import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const FullScreenLoader = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.background} />
      <LottieView
        source={require('../../Assets/Animation/loader.json')}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    zIndex: 101,
    elevation: 101,
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
    width: 61,
  },
});

export default FullScreenLoader;
