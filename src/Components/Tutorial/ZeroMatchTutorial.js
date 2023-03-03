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

import Match from '../../Assets/Svg/New/Match';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../Common/ModalBackground';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const ZeroMatchTutorial = (props) => {
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
              marginTop: insets.top,
            },
          ]}>
          <Text style={styles.fakeTitle} />
          <TouchableOpacity activeOpacity={1} onPress={props.hide}>
            <View style={styles.row}>
              <View style={styles.tItem}>
                <View style={styles.img}>
                  <Match height={117} width={91} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.relative}>
            <View style={styles.item}>
              <Text style={styles.title}>
                When you match with{'\n'}people, you will see them here
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
  img: {
    height: 117,
    width: 91,
    marginBottom: 8,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    paddingLeft: 101,
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
  fakeTitle: {
    marginHorizontal: 12,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 16,
    fontSize: 14,
    color: AppColors.IconColor + 'E6',
  },
  tItem: {
    marginHorizontal: 5,
    marginTop: 6,
    width: 91,
    height: 117,
    marginBottom: 28,
  },
  relative: {
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  item: {
    marginRight: 'auto',
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
  triangle: {
    width: 0,
    height: 0,
    left: 146,
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
    top: -22,
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
});

export default ZeroMatchTutorial;
