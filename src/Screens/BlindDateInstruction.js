import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import AppColors from '../Utils/AppColors';

const data = [{}, {}, {}, {}];
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
function BlindDateInstruction({navigation, route}) {
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const {callBack} = route.params;
  const insets = useSafeArea();

  const clickNext = () => {
    if (carouselRef.currentIndex === 3) {
      carouselRef.snapToItem(0, true);
    } else {
      carouselRef.snapToNext();
    }
  };

  const renderItem = ({index}) => {
    if (index === 0) {
      return (
        <View style={styles.contain}>
          <View>
            <Text style={styles.title}>Welcome to Happy Hour</Text>
            <View style={styles.imgBox}>
              <Image
                style={styles.img1}
                source={require('../Assets/Image/instruction11.png')}
              />
            </View>
            <Text style={styles.blueText}>We will connect you with</Text>
            <Text style={styles.blackText}>5 suggested matches</Text>
            <Text style={styles.text} numberOfLines={3}>
              Click “Yes” within 30 seconds to go on live audio date
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Got it, next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.contain}>
          <View>
            <Text style={styles.title}>How Happy Hour works:</Text>
            <View style={styles.imgBox}>
              <Image
                style={styles.img2}
                source={require('../Assets/Image/instruction22.png')}
              />
            </View>
            <Text style={styles.blueText}>Go on 3 min audio dates with</Text>
            <Text style={styles.blackText}>Audio room experience </Text>
            <Text style={styles.text}>
              After 3 min you can decide to match with the person or not
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Got it, next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (index === 2) {
      return (
        <View style={styles.contain}>
          <View>
            <Text style={styles.title}>How Happy Hour works:</Text>
            <View style={styles.imgBox}>
              <Image
                style={styles.img3}
                source={require('../Assets/Image/instruction33.png')}
              />
            </View>
            <Text style={styles.blueText}>
              3 min not enough with your date?
            </Text>
            <Text style={styles.blackText}>You can extend time</Text>
            <Text style={styles.text}>
              Although this is a premium feature, we give our new users 1 free
              extend time pass
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Got it, next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.contain}>
        <View>
          <Text style={styles.title}>How Happy Hour works:</Text>
          <View style={styles.imgBox}>
            <Image
              style={styles.img4}
              source={require('../Assets/Image/instruction44.png')}
            />
          </View>
          <Text style={styles.blueText}>If you feel uncomfortable</Text>
          <Text style={styles.blackText}>You can leave or report</Text>
          <Text style={styles.text}>
            We want you to feel safe and comfortable on our app
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => callBack()}>
            <Text style={styles.buttonText}>Let’s start</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.wrap,
        {paddingBottom: insets.bottom + 12, paddingTop: insets.top + 12},
      ]}>
      <Carousel
        ref={(c) => setCarouselRef(c)}
        data={data}
        containerCustomStyle={styles.viewPager}
        firstItem={activeSlide}
        renderItem={(index) => renderItem(index)}
        sliderWidth={screenWidth}
        scrollEnabled={false}
        itemWidth={screenWidth}
        removeClippedSubviews={false}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white + 'B8',
    lineHeight: 25,
    marginTop: screenHeight > 700 ? 13 : 3,
    paddingVertical: screenHeight > 700 ? 44 : 22,
  },
  blueText: {
    fontSize: screenHeight > 700 ? 16 : 14,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: screenHeight > 700 ? 23 : 20,
    marginTop: screenHeight > 700 ? 30 : 20,
    marginBottom: 4,
    paddingHorizontal: 7,
  },
  blackText: {
    fontSize: screenHeight > 700 ? 24 : 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: screenHeight > 700 ? 33 : 26,
    paddingHorizontal: 7,
  },
  text: {
    fontSize: 14,
    color: AppColors.white,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 7,
    paddingHorizontal: 7,
  },
  button: {
    height: screenHeight > 700 ? 48 : 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.white,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 45,
  },
  buttonText: {
    fontSize: screenHeight > 700 ? 14 : 12,
    lineHeight: screenHeight > 700 ? 20 : 16,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
  },
  imgBox: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    width: 224,
    height: 250,
    marginRight: 'auto',
  },
  img2: {
    width: 242,
    height: 143,
  },
  img3: {
    width: 155,
    height: 175,
  },
  img4: {
    width: 210,
    height: 93,
  },
  contain: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    paddingVertical: screenHeight > 700 ? 44 : 22,
    paddingHorizontal: 13,
    justifyContent: 'center',
  },
});

export default BlindDateInstruction;
