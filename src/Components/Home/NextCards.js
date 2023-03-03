import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';

import AppColors from '../../Utils/AppColors';
import {S3_MAIN_URL} from '../../Utils/Constants';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const imgSize = screenHeight > 700 ? screenWidth - 126 : screenWidth - 146;
const bgPosition = (imgSize - 54) / 2;

const NextCards = ({card, getNextBatch}) => {
  const [loader, setLoader] = useState(false);
  const degree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // console.log('card', card);
    animated();
  }, []);

  const animated = () => {
    Animated.timing(degree, {
      toValue: 1,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      degree.setValue(0);
      animated();
    });
  };

  const _degree = degree.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <View>
          <Text style={styles.title}>You’re doing great so far!</Text>
          <Text style={styles.text}>Your next batch is ready</Text>
        </View>
        <View style={styles.imageWrap}>
          <Image
            style={styles.img}
            source={
              card.next_ids[0]
                ? {uri: S3_MAIN_URL + card.next_ids[0] + '.jpg'}
                : require('../../Assets/Image/tip1.png')
            }
          />
          <Image
            style={[styles.img, styles.img2]}
            blurRadius={20}
            source={
              card.next_ids[1]
                ? {uri: S3_MAIN_URL + card.next_ids[1] + '.jpg'}
                : require('../../Assets/Image/tip1.png')
            }
          />
          <Image
            style={[styles.img, styles.img3]}
            blurRadius={20}
            source={
              card.next_ids[2]
                ? {uri: S3_MAIN_URL + card.next_ids[2] + '.jpg'}
                : require('../../Assets/Image/tip1.png')
            }
          />
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonWrap}>
            <View style={styles.bg}>
              <Animated.Image
                style={[styles.bgImg, {transform: [{rotate: _degree}]}]}
                source={require('../../Assets/Image/startbutton.png')}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                getNextBatch();
              }}
              style={styles.button}>
              {loader ? (
                <LottieView
                  source={require('../../Assets/Animation/loader.json')}
                  autoPlay
                  loop
                  style={styles.disableTouch}
                />
              ) : (
                <Text style={styles.buttonText}>See next profile 🎉 </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    borderRadius: 8,
    paddingTop: 66,
    paddingBottom: 84,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screenWidth + 139,
    backgroundColor: AppColors.MainColor,
  },
  imageWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 63,
  },
  img: {
    width: 113,
    height: 113,
    borderRadius: 56,
    marginRight: -63,
    zIndex: 2,
  },
  img2: {
    zIndex: 1,
  },
  img3: {
    zIndex: 0,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 23,
    textAlign: 'center',
    marginBottom: 5,
  },
  footer: {
    paddingHorizontal: 37,
    alignItems: 'center',
    width: '100%',
  },
  buttonWrap: {
    padding: 5,
    width: '100%',
    borderRadius: 26,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: AppColors.white,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  buttonText: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 44,
  },
  bg: {
    position: 'absolute',
    top: -bgPosition,
    left: 0,
  },
  bgImg: {
    borderRadius: 26,
    width: screenHeight > 700 ? screenWidth - 126 : screenWidth - 146,
    height: screenHeight > 700 ? screenWidth - 126 : screenWidth - 146,
  },
  disableTouch: {
    height: 10,
  },
});

export default NextCards;
