import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const StartTutorial = (props) => {
  const insets = useSafeArea();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [contentOpacity] = useState(new Animated.Value(0));

  const marginValue = insets.bottom > 12 ? insets.bottom + 48 : 60;
  const topValue = insets.bottom > 12 ? 81 : 130;
  const paddingValue = insets.top;

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
              marginTop: marginValue,
              paddingTop: paddingValue,
            },
          ]}>
          <TouchableOpacity
            onPress={props.hide}
            style={[styles.startButton, {marginTop: topValue}]}>
            <Image
              style={styles.logoIcon}
              source={require('../../Assets/Image/startbutton.png')}
            />
            <Text style={styles.start}>Click start</Text>
          </TouchableOpacity>
          <View style={styles.relative}>
            <View style={styles.item}>
              <Text style={styles.title}>
                Ready for audio date?{'\n'}Tap on click start.
              </Text>
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  onPress={props.hide}
                  style={[styles.button, {backgroundColor: props.color}]}>
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
    justifyContent: 'center',
    opacity: 0.64,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#000914',
    zIndex: 100,
  },
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 110,
  },
  container: {
    zIndex: 100,
    flex: 1,
    elevation: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 9,
    borderColor: Colors.white,
    borderRadius: 100,
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    width: 132,
    height: 132,
    borderRadius: 66,
  },
  start: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: Colors.white,
  },
  relative: {
    alignItems: 'center',
    marginTop: 18,
  },
  item: {
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
    maxWidth: 241,
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
  buttonWrap: {
    marginTop: 13,
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 38,
    borderRadius: 18,
  },
  buttonText: {
    lineHeight: 20,
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default StartTutorial;
