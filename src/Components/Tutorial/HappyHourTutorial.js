import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import AppColors from '../../Utils/AppColors';
const {height: screenHeight} = Dimensions.get('window');

const HappyHourTutorial = ({userData, hide, renderJoinButton}) => {
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
      <Animated.View
        style={[
          styles.container,
          {
            opacity: contentOpacity,
          },
        ]}>
        <View style={styles.box}>
          {renderJoinButton()}
          <View style={styles.cancel} />
          <View style={styles.relative}>
            <View style={styles.triangle} />
            <View style={styles.item}>
              <Text style={styles.title}>
                Ready for audio date?{'\n'}Tap on click start.
              </Text>
              <TouchableOpacity onPress={hide} style={styles.buttonWrap}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Got it</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tutorial: {
    zIndex: 10,
    elevation: 0,
    position: 'absolute',
    justifyContent: 'center',
    top: -100,
    left: 0,
    bottom: -100,
    right: 0,
  },
  container: {
    zIndex: 100,
    elevation: 100,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: screenHeight > 700 ? 17 : 14,
    lineHeight: screenHeight > 700 ? 27 : 20,
    fontFamily: 'Poppins-Bold',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 13.5,
    borderRightWidth: 13.5,
    borderBottomWidth: 23,
    borderTopWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: AppColors.white,
    position: 'absolute',
    top: -23,
    zIndex: 111,
  },
  box: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 200,
  },
  buttonWrap: {
    paddingTop: 16,
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 38,
    borderRadius: 18,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    lineHeight: screenHeight > 700 ? 20 : 16,
    color: AppColors.white,
    fontSize: screenHeight > 700 ? 14 : 12,
    fontFamily: 'Poppins-Medium',
  },
  relative: {
    position: 'absolute',
    zIndex: 120,
    elevation: 120,
    width: '100%',
    left: 0,
    top: screenHeight > 700 ? 360 : 320,
    alignItems: 'center',
  },
  item: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 30,
    paddingTop: 24,
    width: screenHeight > 700 ? 280 : 230,
    paddingBottom: 21,
  },
  cancel: {
    marginTop: 24,
    paddingVertical: 9,
    alignItems: 'center',
    height: 62,
  },
});

export default HappyHourTutorial;
