import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';

const data = [{}, {}, {}];
const {width: screenWidth} = Dimensions.get('window');
const BlindDateInstructionModal = ({hide}) => {
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

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

  const clickNext = () => {
    if (carouselRef.currentIndex === 2) {
      carouselRef.snapToItem(0, true);
    } else {
      carouselRef.snapToNext();
    }
  };

  const renderItem = ({index}) => {
    if (index === 0) {
      return (
        <View style={styles.contain}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img1}
              source={require('../../Assets/Image/instruction1.png')}
            />
          </View>
          <Text style={styles.blueText}>Go on a blind audio date</Text>
          <Text style={styles.blackText}>For 3 minutes</Text>
          <Text style={styles.text} numberOfLines={3}>
            Send a like to your date after the{'\n'}3 minutes in order to match
          </Text>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.contain}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img2}
              source={require('../../Assets/Image/instruction2.png')}
            />
          </View>
          <Text style={styles.blueText}>Answer questions</Text>
          <Text style={styles.blackText}>Spice up your date</Text>
          <Text style={styles.text}>
            Each 3-minute date will have a 5{'\n'}questions which you and your
            date can{'\n'}earn points together!
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.contain}>
        <View style={styles.imgBox}>
          <Image
            style={styles.img3}
            source={require('../../Assets/Image/instruction3.png')}
          />
        </View>
        <Text style={styles.blueText}>Send a like</Text>
        <Text style={styles.blackText}>Match with your date</Text>
        <Text style={styles.text}>
          After 3 minutes, the profile of your date{'\n'}will be revealed and
          you can decide to{'\n'}send a like or not.
        </Text>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ModalBackground />
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.header}>
          <Text style={styles.title}>How Happy Hour works</Text>
          <TouchableOpacity style={styles.delete} onPress={hide}>
            <DeleteIcon color={AppColors.AppBlack} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <Carousel
          ref={(c) => setCarouselRef(c)}
          data={data}
          firstItem={activeSlide}
          renderItem={(index) => renderItem(index)}
          // scrollEnabled={false}
          sliderWidth={screenWidth - 26}
          itemWidth={screenWidth - 26}
          removeClippedSubviews={false}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <View style={styles.footer}>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.containerStyle}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.48}
            inactiveDotScale={1}
          />
          {activeSlide !== 2 ? (
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={hide}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    margin: 13,
    paddingBottom: 23,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 38,
    paddingHorizontal: 33,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 26,
  },
  delete: {
    position: 'absolute',
    top: 13,
    right: 11,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + '7A',
    lineHeight: 23,
    marginTop: 40,
  },
  blueText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.MainColor,
    lineHeight: 21,
    marginTop: 14,
    marginBottom: 4,
  },
  contain: {
    paddingHorizontal: 33,
  },
  blackText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 28,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 7,
  },
  button: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#52B8D6',
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 45,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.MainColor,
    fontFamily: 'Poppins-Medium',
  },
  dotStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: -100,
    backgroundColor: '#89C9DE',
  },
  containerStyle: {
    position: 'absolute',
    bottom: -26,
    left: 0,
  },
  imgBox: {
    height: 196,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    width: 225,
    height: 116,
  },
  img2: {
    width: 128,
    height: 142,
  },
  img3: {
    width: 232,
    height: 196,
  },
});

export default BlindDateInstructionModal;
