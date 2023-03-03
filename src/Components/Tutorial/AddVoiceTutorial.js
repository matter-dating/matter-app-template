import React, {useEffect, useRef} from 'react';
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
import VoiceIcon from '../../Assets/Svg/VoiceIcon';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const AddVoiceTutorial = (props) => {
  const insets = useSafeArea();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

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
              paddingTop: insets.top + 40,
              opacity: contentOpacity,
            },
          ]}>
          <View style={styles.header}>
            <View style={styles.image} />
            <View style={styles.nameWrap}>
              <View style={styles.name} />
            </View>
            {props.isPremium && <View style={styles.premium} />}
            <View style={styles.fakeButton}>
              <View style={styles.fakeText} />
            </View>
            {props.userData.status === 8 && (
              <View style={styles.alertRow}>
                <View style={styles.error} />
              </View>
            )}
          </View>
          <View style={styles.center}>
            <View style={styles.alertRow}>
              <View style={styles.addVoice} />
              <View style={styles.chance} />
            </View>
            <TouchableOpacity
              onPress={props.hide}
              style={[styles.fakeButton, styles.addButton]}>
              <VoiceIcon width={16} height={16} color={AppColors.white} />
              <Text style={[styles.buttonText, styles.buttonWhiteText]}>
                Upload Voice intro
              </Text>
            </TouchableOpacity>
            <View style={styles.relative}>
              <View style={styles.item}>
                <Text style={styles.title}>Click here to add Voice Intro</Text>
                <Text style={styles.text}>Let others know who you are</Text>
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
    backgroundColor: 'rgba(3,15,29,0.46)',
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
  },
  relative: {
    alignItems: 'center',
    paddingHorizontal: 37,
    marginTop: 30,
  },
  item: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 24,
    paddingBottom: 21,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 17,
    lineHeight: 27,
    fontFamily: 'Poppins-Bold',
  },
  text: {
    color: AppColors.AppBlack,
    fontSize: 15,
    lineHeight: 26,
    fontFamily: 'Poppins-Regular',
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
    marginTop: 16,
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
  premium: {
    height: 20,
    marginBottom: 11,
  },
  alertRow: {
    marginBottom: 12,
  },
  alert1: {
    height: 56,
    marginTop: 4,
  },
  alert2: {
    height: 29,
    marginTop: 4,
  },
  center: {
    alignItems: 'center',
  },
  addVoice: {
    height: 21,
    marginBottom: 4,
  },
  chance: {
    height: 17,
  },
  fakeText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 21,
    height: 21,
    marginLeft: 8,
  },
  buttonWhiteText: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
    fontSize: 13,
    marginLeft: 7,
    color: AppColors.white,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 138,
    height: 138,
    marginBottom: 11,
  },
  fakeButton: {
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  addButton: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 11,
    backgroundColor: AppColors.MainColor,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginHorizontal: 20,
  },
  name: {
    fontSize: 16,
    height: 23,
    marginRight: 8,
    color: AppColors.AppBlack,
    textAlign: 'center',
  },
  error: {
    height: 60,
  },
});

export default AddVoiceTutorial;
