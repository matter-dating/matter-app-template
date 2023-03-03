import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import AppColors from '../../Utils/AppColors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const CreateTutorial = (props) => {
  const [contentOpacity] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <Animated.View style={styles.tutorial}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (!props.number) {
            props.hide;
          }
        }}
        style={styles.background}
      />
      <Animated.View
        style={[
          styles.container,
          {
            opacity: contentOpacity,
          },
        ]}>
        {props.children}
        <View
          style={[
            styles.relative,
            props.center && styles.center,
            props.alignRight && styles.rightZero,
            props.alignLeft && styles.left50,
            props.bottom && {bottom: props.bottom},
            props.top && {top: props.top},
          ]}>
          <View style={styles.item}>
            {props.number && (
              <View style={[styles.numberWrap, {backgroundColor: props.color}]}>
                <Text
                  style={[
                    styles.number,
                    Platform.OS === 'android' && styles.androidNUmber,
                  ]}>
                  {props.number}
                </Text>
              </View>
            )}
            {props.mediumTitle && (
              <Text style={styles.mediumTitle}>{props.mediumTitle}</Text>
            )}
            {props.title && <Text style={styles.title}>{props.title}</Text>}
            {props.text && <Text style={styles.text}>{props.text}</Text>}
            {props.text1 && <Text style={styles.text1}>{props.text1}</Text>}
            {props.number && (
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  onPress={props.hide}
                  style={[styles.button, {backgroundColor: props.color}]}>
                  <Text style={styles.buttonText}>Got it, next</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View
            style={[
              styles.triangle,
              props.center && styles.centerTriangle,
              props.left && {left: props.left},
              props.right && {right: props.right},
              props.arrowTop && styles.topTriangle,
            ]}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tutorial: {
    zIndex: 1000,
    elevation: 100,
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  rightZero: {
    right: 0,
  },
  left50: {
    left: 50,
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
  container: {
    zIndex: 100,
    flex: 1,
    elevation: 100,
  },
  numberWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },
  number: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  androidNUmber: {
    marginTop: 3,
  },
  relative: {
    position: 'absolute',
    zIndex: 101,
    marginHorizontal: 12,
  },
  center: {
    alignItems: 'center',
    width: '100%',
  },
  item: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 27,
  },
  mediumTitle: {
    color: AppColors.AppBlack,
    fontSize: 17,
    lineHeight: 26,
    fontFamily: 'Poppins-SemiBold',
    maxWidth: 200,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 17,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
    maxWidth: 241,
  },
  text: {
    color: AppColors.AppBlack,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    maxWidth: 241,
  },
  text1: {
    color: '#616A76',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    maxWidth: 246,
  },
  triangle: {
    width: 0,
    height: 0,
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
  topTriangle: {
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
  centerTriangle: {
    left: '50%',
    marginLeft: -12,
  },
  buttonWrap: {
    marginTop: 13,
    alignItems: 'flex-end',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  buttonText: {
    lineHeight: 20,
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default CreateTutorial;
