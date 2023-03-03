import React, {FunctionComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';

const CustomImage: FunctionComponent = (props) => {
  return (
    <FastImage
      {...props}
      style={props.style}
      source={props.source}
      resizeMode={
        props.resizeMode ? props.resizeMode : FastImage.resizeMode.cover
      }>
      <View style={styles.indicator}>
        <LottieView
          // source={require('../../Assets/Animation/image.json')}
          source={require('../../Assets/Animation/image_loader.json')}
          autoPlay
          loop
          style={styles.disableTouch}
        />
      </View>
    </FastImage>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  disableTouch: {
    width: 100,
  },
});

export default CustomImage;
