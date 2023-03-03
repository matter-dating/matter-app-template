import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppColors from '../../Utils/AppColors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const data = [{}, {}, {}, {}];

const {width: screenWidth} = Dimensions.get('window');
const PremiumBanner = ({stopIntroPlayer}) => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({index}) => {
    if (index === 0) {
      return (
        <View style={styles.contain}>
          <Image
            style={styles.img}
            source={require('../../Assets/Image/benefits.png')}
          />
          <Text style={styles.text}>See extra 20+{'\n'}profiles everyday</Text>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.contain}>
          <Image
            style={styles.img1}
            source={require('../../Assets/Image/benefits1.png')}
          />
          <Text style={styles.text}>See all likes at once</Text>
        </View>
      );
    } else if (index === 2) {
      return (
        <View style={styles.contain}>
          <Image
            style={styles.img2}
            source={require('../../Assets/Image/benefits2.png')}
          />
          <Text style={styles.text}>
            Get x2 more audio dates{'\n'}
            during Happy Hour
          </Text>
        </View>
      );
    } else if (index === 3) {
      return (
        <View style={styles.contain}>
          <Image
            style={styles.img3}
            source={require('../../Assets/Image/benefits5.png')}
          />
          <Text style={styles.text}>Extend time during{'\n'}Happy Hour</Text>
        </View>
      );
    }
  };
  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.title}>Premium membership</Text>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.containerStyle}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
      <Carousel
        ref={carouselRef}
        data={data}
        containerCustomStyle={styles.viewPager}
        firstItem={activeSlide}
        renderItem={(index) => renderItem(index)}
        sliderWidth={screenWidth - 70}
        itemWidth={screenWidth - 70}
        removeClippedSubviews={false}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <TouchableOpacity
        style={styles.buy}
        onPress={() => {
          stopIntroPlayer();
          navigation.navigate('BenefitsModal', {
            start: activeSlide,
            isExtend: true,
          });
        }}>
        <Text style={styles.go}>Go Premium</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: AppColors.MainColor,
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 20,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    color: AppColors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 17,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    fontSize: 14,
    color: AppColors.white,
    marginLeft: 12,
  },
  contain: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 82,
  },
  viewPager: {
    // marginBottom: 30,
    // marginHorizontal: -25,
  },
  img: {
    width: 100,
    height: 82,
  },
  img1: {
    width: 100,
    height: 82,
  },
  img2: {
    width: 100,
    height: 50,
  },
  img3: {
    width: 100,
    height: 46,
  },
  containerStyle: {
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  dotStyle: {
    width: 5,
    height: 5,
    paddingHorizontal: 0,
    marginHorizontal: -10,
    borderRadius: 3,
    backgroundColor: '#64DCFF',
  },
  inactiveDot: {
    backgroundColor: '#D8F2FA',
  },
  buy: {
    backgroundColor: AppColors.white,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 34,
    marginLeft: 'auto',
    marginTop: 11,
  },
  go: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    color: AppColors.MainColor,
  },
});

export default PremiumBanner;
