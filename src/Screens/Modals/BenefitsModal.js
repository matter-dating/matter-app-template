/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import AppColors from '../../Utils/AppColors';
import {usePremium} from '../../Providers/PremiumProvider';
import ModalBackground from '../../Components/Common/ModalBackground';
import PurchaseLoader from '../../Components/Common/PurchaseLoader';
import {
  logClickMonthly,
  logClickQuarterly,
  logClickWeekly,
  logDeniedPurchase,
} from '../../Utils/Analytics';
const data = [{}, {}, {}, {}];

const {width: screenWidth} = Dimensions.get('window');

const BenefitsModal = ({navigation, route}) => {
  const {start} = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(start);
  const {purchasePremium, premiumError, isPremium, offerings} = usePremium();

  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (isPremium) {
      navigation.goBack();
    }
  }, [isPremium]);

  useEffect(() => {
    if (typeof premiumError !== 'undefined') {
      setShowLoader(false);
      logDeniedPurchase();
    }
  }, [premiumError]);

  const renderItem = ({index}) => {
    if (index === 0) {
      return (
        <View style={styles.contain}>
          <Image
            style={styles.img}
            source={require('../../Assets/Image/benefits.png')}
          />
          <Text style={styles.text}>See extra 20+ profiles everyday</Text>
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
            source={require('../../Assets/Image/benefits3.png')}
          />
          <Text style={styles.text}>
            Extend time during Happy Hour{'\n'}
            <Text style={styles.small}>
              You can extend your 3-min audio dates
            </Text>
          </Text>
        </View>
      );
    }
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ModalBackground />
      <Animated.View style={[styles.wrapper, {bottom: slideBottom}]}>
        <View style={styles.box}>
          <View style={styles.header}>
            <Text style={styles.title}>Go Premium</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.close}>
              <DeleteIcon color={AppColors.AppBlack} width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.can}>Premium members can:</Text>
            <Carousel
              ref={carouselRef}
              data={data}
              containerCustomStyle={styles.viewPager}
              firstItem={activeSlide}
              renderItem={(index) => renderItem(index)}
              sliderWidth={screenWidth - 38}
              itemWidth={screenWidth - 38}
              removeClippedSubviews={false}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Text style={styles.swipe}>Swipe to learn more</Text>
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.containerStyle}
              dotStyle={styles.dotStyle}
              inactiveDotOpacity={0.48}
              inactiveDotScale={1}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                setShowLoader(true);
                purchasePremium(offerings?.current?.weekly);
                logClickWeekly();
              }}>
              <Text style={styles.priceText}>1 week $9.99</Text>
              <View style={styles.tryNow}>
                <Text style={styles.try}>Try now</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                setShowLoader(true);
                purchasePremium(offerings?.current?.monthly);
                logClickMonthly();
              }}>
              <Text style={styles.priceText}>
                1 Month $29.99{' '}
                <Text style={styles.smallText}>($7.99 per week)</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                setShowLoader(true);
                purchasePremium(offerings?.current?.threeMonth);
                logClickQuarterly();
              }}>
              <Text style={styles.priceText}>
                3 Months $59.99{' '}
                <Text style={styles.smallText}>($4.99 per week)</Text>
              </Text>
              <View style={[styles.tryNow, styles.bestDeal]}>
                <Text style={styles.try}>Best deal</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
      {showLoader && <PurchaseLoader />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 19,
  },
  buyButton: {
    borderColor: AppColors.MainColor,
    borderWidth: 1,
    borderRadius: 27,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 52,
  },
  smallText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  box: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    shadowColor: AppColors.MainColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  title: {
    color: AppColors.AppBlack + 'B8',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 23,
    color: AppColors.AppBlack,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 3,
    marginTop: 10,
  },
  small: {
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: AppColors.AppBlack + '8A',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
    paddingTop: 10,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
    borderBottomWidth: 0.2,
    borderColor: AppColors.AppBlack + '8A',
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 22,
  },
  can: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
  },
  swipe: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + '9E',
    marginBottom: 10,
  },
  viewPager: {
    // marginBottom: 30,
    marginHorizontal: -25,
  },
  try: {
    color: AppColors.white,
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 16,
  },
  tryNow: {
    backgroundColor: '#2BD35D',
    borderRadius: 12,
    borderColor: AppColors.white,
    borderWidth: 2,
    position: 'absolute',
    right: 6,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: -12,
    paddingHorizontal: 9,
  },
  bestDeal: {
    backgroundColor: '#D462E8',
  },
  img: {
    width: 153,
    height: 129,
  },
  img1: {
    width: 177,
    height: 116,
  },
  img2: {
    width: 185,
    height: 94,
  },
  img3: {
    width: 177,
    height: 119,
  },
  containerStyle: {
    paddingVertical: 8,
  },
  dotStyle: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: AppColors.MainColor,
  },
});

export default BenefitsModal;
