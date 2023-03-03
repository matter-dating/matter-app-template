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

import CustomText from '../../Components/Common/Text';
import ModalBackground from '../../Components/Common/ModalBackground';
import LikedItemMessage from '../../Components/Home/LikedItemMessage';
import BackIcon from '../../Assets/Svg/BackIcon';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const MessageTutorial = ({likeContent, hide}) => {
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
        <ModalBackground />
        <Animated.View
          style={[
            styles.container,
            {
              opacity: contentOpacity,
            },
          ]}>
          <View style={[styles.header, {paddingTop: insets.top + 8}]}>
            <View style={styles.empty}>
              <View>
                <BackIcon width={24} height={24} color={AppColors.AppBlack} />
              </View>
            </View>
            <CustomText.TitleText style={styles.title1}>
              full profile
            </CustomText.TitleText>
            <View style={styles.empty} />
          </View>
          <View style={{opacity: 0}}>
            <LikedItemMessage likeContent={likeContent} />
          </View>
          <View style={styles.relative}>
            <View style={styles.item}>
              <Text style={styles.title}>
                You got your first{'\n'}message from an admirer
              </Text>
              <Text style={styles.text}>Send a like back to match</Text>
              <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={hide} style={styles.button}>
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
    alignItems: 'center',
    paddingHorizontal: 14,
    zIndex: 200,
    elevation: 200,
    marginTop: 62,
  },
  item: {
    marginRight: 'auto',
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 30,
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
    left: 32,
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
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    lineHeight: 20,
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  header: {
    paddingBottom: 19,
    flexDirection: 'row',
    opacity: 0,
  },
  title1: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: 'Poppins-Medium',
  },
});

export default MessageTutorial;
