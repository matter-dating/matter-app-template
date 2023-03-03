import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';

import AppColors from '../../Utils/AppColors';
import ReminderIcon from '../../Assets/Svg/ReminderIcon';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ReminderTutorial = (props) => {
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

  const renderButton = () => {
    if (Platform.OS === 'ios') {
      return (
        <BlurView
          style={styles.blur}
          blurType="xlight"
          blurAmount={10}
          reducedTransparencyFallbackColor="white">
          <View style={styles.box}>
            <View style={styles.icon}>
              <ReminderIcon width={12} height={15} color={AppColors.AppBlack} />
            </View>
            <Text style={styles.boxText}>Send reminder</Text>
          </View>
        </BlurView>
      );
    } else {
      return (
        <View style={[styles.box, styles.boxAndroid]}>
          <View style={styles.icon}>
            <ReminderIcon width={12} height={15} color={AppColors.AppBlack} />
          </View>
          <Text style={styles.boxText}>Send reminder</Text>
        </View>
      );
    }
  };
  return (
    <Animated.View style={[styles.tutorial, {opacity: fadeAnim}]}>
      <View style={styles.wrap}>
        <View style={styles.background} />
        <Animated.View
          style={[
            styles.container,
            {
              opacity: contentOpacity,
            },
            Platform.OS === 'ios' && {marginTop: insets.top},
          ]}>
          <View style={styles.footer}>
            <View style={styles.bg}>
              {renderButton()}
              {/* <BlurView
                style={styles.blur}
                blurType="xlight"
                blurAmount={10}
                reducedTransparencyFallbackColor="white">
                <View style={styles.box}>
                  <View style={styles.icon}>
                    <ReminderIcon
                      width={12}
                      height={15}
                      color={AppColors.AppBlack}
                    />
                  </View>
                  <Text style={styles.boxText}>Send reminder</Text>
                </View>
              </BlurView> */}
            </View>
            <View style={styles.bg} />
          </View>
          <View style={styles.relative}>
            <View style={styles.item}>
              <Text style={styles.title}>
                Don't want to miss out on Happy Hour?
              </Text>
              <Text style={styles.text}>
                Click here to get SMS reminder when it starts
              </Text>
              <Text style={[styles.text1, {color: props.color}]}>
                We will only send Happy Hour start reminder
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 182,
    marginTop: 0,
  },
  relative: {
    alignItems: 'center',
    marginTop: 22,
    marginRight: 'auto',
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
    maxWidth: 270,
  },
  text: {
    color: AppColors.AppBlack,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    maxWidth: 270,
    marginVertical: 4,
  },
  text1: {
    color: AppColors.AppBlack,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Medium',
    maxWidth: 270,
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
    left: 70,
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  bg: {
    overflow: 'hidden',
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 6,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
  },
  boxAndroid: {
    backgroundColor: AppColors.white + '99',
  },
  icon: {
    marginRight: 7,
    marginLeft: 12,
  },
  boxText: {
    color: AppColors.AppBlack + 'D1',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ReminderTutorial;
