import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import AppColors from '../../Utils/AppColors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ChatTutorial = (props) => {
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
        onPress={props.hide}
        style={styles.background}
      />
      {props.children}
      <Animated.View
        style={[
          styles.relative,
          {opacity: contentOpacity},
          props.center && styles.center,
          props.alignRight && {right: 30},
          props.bottom && {bottom: props.bottom},
          props.top && {top: props.top},
        ]}>
        <View style={[styles.item, props.maxWidth && styles.withMaxWidth]}>
          <Text style={[styles.title, props.textLeft && styles.left]}>
            {props.title}
          </Text>
          <Text
            style={[
              styles.text,
              props.textLeft && styles.left,
              props.fontSize && {fontSize: props.fontSize},
              props.maxWidth && {maxWidth: props.maxWidth},
            ]}>
            {props.text}
          </Text>
          <Text
            style={[
              styles.text,
              props.textLeft && styles.left,
              props.fontSize && {fontSize: props.fontSize},
              props.maxWidth && {maxWidth: props.maxWidth},
            ]}>
            {props.text1}
          </Text>
        </View>
        <View
          style={[
            styles.triangle,
            props.center && styles.centerTriangle,
            props.right && {right: props.right},
            props.arrowTop && styles.topTriangle,
          ]}
        />
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
  background: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 120,
    elevation: 120,
  },
  relative: {
    position: 'absolute',
    zIndex: 101,
  },
  left: {
    textAlign: 'left',
  },
  item: {
    backgroundColor: '#E9F3F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingRight: 18,
    paddingVertical: 24,
    maxWidth: screenWidth - 56,
  },
  center: {
    alignItems: 'center',
    width: '100%',
  },
  withMaxWidth: {
    paddingHorizontal: 20,
    paddingRight: 26,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 7,
  },
  text: {
    color: AppColors.AppBlack,
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
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
    borderTopColor: '#E9F3F5',
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
    borderBottomColor: '#E9F3F5',
    position: 'absolute',
    top: -23,
    zIndex: 111,
  },
  centerTriangle: {
    left: '50%',
    marginLeft: -12,
  },
});

export default ChatTutorial;
