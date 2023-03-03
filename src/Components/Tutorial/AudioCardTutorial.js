import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import AppColors from '../../Utils/AppColors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const AudioCardTutorial = (props) => {
  const insets = useSafeArea();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [contentOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.tutorial, {opacity: fadeAnim}]}>
      <View style={styles.wrap}>
        <View style={styles.background} />
        <Animated.View
          style={[
            styles.container,
            {
              opacity: contentOpacity,
              marginTop: insets.top,
            },
          ]}>
          <View style={[styles.relative, props.top && {top: props.top}]}>
            <View style={styles.item}>
              <Text style={styles.title}>Listen to people’s voice intro</Text>
              <Text style={styles.text}>Voice speaks louder than words</Text>
              <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={props.hide} style={styles.button}>
                  <Text style={styles.buttonText}>Got it</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.triangle} />
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tutorial: {
    zIndex: 10,
    elevation: 10,
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    opacity: 0.64,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000914',
    zIndex: 100,
  },
  wrap: {
    flex: 1,
    zIndex: 110,
  },
  container: {
    zIndex: 100,
    flex: 1,
    elevation: 100,
    paddingHorizontal: 7,
  },
  relative: {
    right: 0,
    marginTop: -180,
    position: 'absolute',
    paddingHorizontal: 14,
  },
  item: {
    marginRight: 'auto',
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 23,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 17,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
  },
  text: {
    color: AppColors.AppBlack,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    maxWidth: 241,
  },
  triangle: {
    width: 0,
    height: 0,
    right: 80,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 13.5,
    borderRightWidth: 13.5,
    borderTopWidth: 23,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: AppColors.white,
    position: 'absolute',
    bottom: -23,
    zIndex: 111,
  },
  buttonWrap: {
    marginTop: 13,
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 38,
    borderRadius: 18,
    backgroundColor: '#1E2935',
  },
  buttonText: {
    lineHeight: 20,
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default AudioCardTutorial;
