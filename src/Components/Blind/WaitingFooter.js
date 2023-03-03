import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  ScrollView,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppColors from '../../Utils/AppColors';
import NextIcon from '../../Assets/Svg/NextIcon';
import UpIcon from '../../Assets/Svg/UpIcon';
import DownIcon from '../../Assets/Svg/DownIcon';
import {logHappyHourTips} from '../../Utils/Analytics';

const {width: screenWidth} = Dimensions.get('window');
const data = [{}, {}, {}, {}, {}];

const WaitingFooter = ({userVerification}) => {
  // const [showHint, setShowHint] = useState(false);
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [alignment] = useState(new Animated.Value(1));
  const [isShow, setIsShow] = useState(false);
  const [height, setHeight] = useState(null);

  const pressNext = () => {
    if (carouselRef.currentIndex === 4) {
      carouselRef.snapToItem(0, true);
    } else {
      carouselRef.snapToNext();
    }
  };

  useEffect(() => {
    if (isShow) {
      setActiveSlide(0);
      Animated.timing(alignment, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      setActiveSlide(0);
      Animated.timing(alignment, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isShow]);

  const bringUpActionSheet = () => {
    logHappyHourTips();
    setIsShow(true);
  };
  const hideTheActionSheet = () => {
    setIsShow(false);
  };

  const actionSheetInterpolate = alignment.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });
  const gestureHandler = (e) => {
    if (e.nativeEvent.contentOffset.y > 0) {
      bringUpActionSheet();
    } else if (e.nativeEvent.contentOffset.y < 0) {
      hideTheActionSheet();
    }
  };
  const actionSheetStyle = {
    bottom: actionSheetInterpolate,
  };
  const onLayout = (e) => {
    setHeight(e.nativeEvent.layout.height);
  };

  const renderItem = ({index}) => {
    if (index === 0) {
      return (
        <View style={styles.item}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img1}
              source={require('../../Assets/Image/carousel1.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.subDescription}>Happy Hour is on</Text>
            <Text style={styles.bold}>Wednesdays & Sundays</Text>
            <View style={styles.row}>
              <Image
                style={styles.clockMini}
                source={require('../../Assets/Image/noun_clock.png')}
              />
              <Text style={styles.subDescription}>9 pm</Text>
            </View>
            <Text style={styles.miniText}>
              You will be paired & go on 3 min audio blind dates
            </Text>
          </View>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.item}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img2}
              source={require('../../Assets/Image/carousel2.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>
              Full profiles are revealed after each blind date,
            </Text>
            <Text style={styles.miniText}>and you decide to match or not</Text>
          </View>
        </View>
      );
    } else if (index === 2) {
      return (
        <View style={styles.item}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img3}
              source={require('../../Assets/Image/carousel5.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>
              No worries!{'\n'}If your date doesn’t go well,
            </Text>
            <Text style={styles.miniText}>
              you can leave anytime and report offensive behavior
            </Text>
          </View>
        </View>
      );
    } else if (index === 3) {
      return (
        <View style={styles.item}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img4}
              source={require('../../Assets/Image/carousel3.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>You can set your preferences</Text>
            <Text style={styles.miniText}>
              for whom you want to be paired for audio blind dates.
            </Text>
          </View>
        </View>
      );
    } else if (index === 4) {
      return (
        <View style={styles.item}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img5}
              source={require('../../Assets/Image/carousel4.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.bold}>You have an option to extend</Text>
            <Text style={styles.miniText}>
              your blind date upon mutual consent
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <Animated.View style={[styles.container, actionSheetStyle]}>
      <View style={styles.bg}>
        <ScrollView
          onScroll={(e) => gestureHandler(e)}
          style={styles.grabber}
          scrollEventThrottle={16}>
          <TouchableOpacity
            style={styles.touch}
            onPress={() => setIsShow(!isShow)}
          />
        </ScrollView>
        {isShow ? (
          <View style={styles.topCenter}>
            <DownIcon
              width={40}
              height={40}
              color={AppColors.IconColor + 'CC'}
            />
          </View>
        ) : (
          <View style={styles.topCenter}>
            <UpIcon width={18} height={10} color={AppColors.IconColor + 'CC'} />
            <Text style={styles.see}>See how it works</Text>
          </View>
        )}
        <View style={styles.flex} onLayout={onLayout}>
          <View style={styles.top}>
            <Text style={styles.subTitle}>How it works</Text>
            <Pagination
              dotsLength={data.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.containerStyle}
              dotStyle={styles.dotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <Carousel
            ref={(c) => setCarouselRef(c)}
            data={data}
            loop={false}
            firstItem={activeSlide}
            renderItem={(index) => renderItem(index)}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            removeClippedSubviews={false}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <View style={styles.bottom}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.next}
              onPress={pressNext}>
              <NextIcon
                width={16}
                height={16}
                color={AppColors.IconColor + 'CC'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  flex: {
    // flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: -100,
    backgroundColor: '#89C9DE',
  },
  grabber: {
    width: '100%',
    height: 70,
  },
  touch: {
    height: 70,
  },
  container: {
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: AppColors.white + 'B3',
    right: 0,
    elevation: 5,
  },
  see: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'B8',
    marginVertical: 9,
  },
  bg: {
    alignItems: 'center',
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingBottom: 0,
    overflow: 'hidden',
    backgroundColor: AppColors.white,
  },
  topCenter: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    height: 70,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  top: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 0,
  },
  clockMini: {
    width: 16,
    height: 16,
    marginRight: 10,
    marginTop: 8,
  },
  item: {
    marginHorizontal: 30,
  },
  imgBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  containerStyle: {
    marginTop: 'auto',
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    right: 30,
    alignItems: 'flex-end',
    marginHorizontal: 12,
    elevation: 6,
    width: 38,
    height: 38,
    borderRadius: 28,
  },
  next: {
    width: 38,
    height: 38,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    shadowColor: '#001833',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  img1: {
    width: 210,
    height: 120,
    marginBottom: 17,
  },
  img2: {
    width: 157,
    height: 162,
    marginBottom: 26,
  },
  img3: {
    width: 210,
    height: 93,
    marginBottom: 43,
  },
  img4: {
    width: 123,
    height: 123,
    marginBottom: 52,
  },
  img5: {
    width: 155,
    height: 94,
    marginBottom: 49,
  },
  subDescription: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 25,
    color: AppColors.AppBlack,
    marginTop: 8,
  },
  bold: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  center: {
    marginRight: 38,
  },
  miniText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'AD',
    marginTop: 8,
  },
});

export default WaitingFooter;
