import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';

import FastImage from 'react-native-fast-image';

import CacheableImage from '../Common/CacheableImage';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import AppColors from '../../Utils/AppColors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const imgWidth = screenWidth - 54;
const imgWidthSmall = screenWidth - 72;
const imgWidthLike = screenWidth - 76;
const imgWidthBig = screenWidth - 24;

const ProfileImage = ({
  profile,
  page,
  setPage,
  big,
  audioCard,
  userData,
  likeModal,
  activeUser,
  noBlur,
  togglePlay,
  isPlay,
  currentVoice,
  playerLoader,
}) => {
  const pagerRef = useRef(null);

  const blurAnimation = useRef(new Animated.Value(60)).current;
  const buttonValue = useRef(new Animated.Value(1)).current;
  const fadeValuePage = useRef(new Animated.Value(0.3)).current;
  const [showButton, setShowButton] = useState(true);
  const images = profile.profile_hd_images;

  useEffect(() => {
    pagerRef.current.setPageWithoutAnimation(0);
  }, [profile]);

  useEffect(() => {
    blurAnimation.setValue(60);
    fadeValuePage.setValue(0.3);
    buttonValue.setValue(1);
    setShowButton(true);
    if (
      audioCard &&
      audioCard.length > 0 &&
      isPlay &&
      !!audioCard[0].content &&
      currentVoice === JSON.parse(audioCard[0].content).media &&
      profile.user_id === activeUser
    ) {
      blurAnimation.setValue(60);
      fadeValuePage.setValue(0.3);
      buttonValue.setValue(1);
      Animated.timing(blurAnimation, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start();
      Animated.timing(fadeValuePage, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }).start();
      Animated.timing(buttonValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setShowButton(false);
      });
    }
  }, [currentVoice, isPlay, audioCard, activeUser, profile]);

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };

  const renderFastImage = (img) => {
    return (
      <FastImage
        style={[styles.img, big && styles.imgBig, likeModal && styles.imgLike]}
        defaultSource={require('../../Assets/Image/blurred.png')}
        source={{
          uri: S3_PHOTO_URL + img + '.jpg',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  };
  const renderCashedImage = (img) => {
    return (
      <CacheableImage
        style={[styles.img, big && styles.imgBig, likeModal && styles.imgLike]}
        source={{
          uri: S3_PHOTO_URL + img + '.jpg',
        }}
        blurRadius={!profile.is_played ? blurAnimation : 0}
      />
    );
  };

  const renderPagination = () => {
    if (
      audioCard.length === 0 ||
      profile.user_id === userData.user_id ||
      profile.is_played === true ||
      noBlur
    ) {
      return (
        <Animated.View
          style={[styles.pagination, big && styles.paginationHorizontal]}>
          {images.length > 1 &&
            images.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    page === index && styles.activeDot,
                    big && styles.paginationDotHorizontal,
                  ]}
                />
              );
            })}
        </Animated.View>
      );
    }
    return (
      <Animated.View
        style={[
          styles.pagination,
          big && styles.paginationHorizontal,
          {opacity: fadeValuePage},
        ]}>
        {images.length > 1 &&
          images.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  page === index && styles.activeDot,
                  big && styles.paginationDotHorizontal,
                ]}
              />
            );
          })}
      </Animated.View>
    );
  };

  return (
    <View>
      <PagerView
        ref={pagerRef}
        onPageScroll={onPageScroll}
        orientation={big ? 'horizontal' : 'vertical'}
        style={[
          styles.viewPager,
          big && styles.viewPagerBig,
          likeModal && styles.viewPagerLike,
        ]}
        initialPage={page}>
        {images.map((image, index) => (
          <View key={image}>
            {audioCard.length !== 0 &&
            profile.user_id !== userData.user_id &&
            !noBlur &&
            index === 0
              ? renderCashedImage(image)
              : renderFastImage(image)}
          </View>
        ))}
      </PagerView>
      {renderPagination()}
      {audioCard.length !== 0 &&
        profile.user_id !== userData.user_id &&
        !profile.is_played &&
        !noBlur &&
        showButton && (
          <Animated.View
            style={[
              styles.listen,
              big && styles.listenBig,
              likeModal && styles.listenLike,
              {opacity: buttonValue},
            ]}>
            <TouchableOpacity
              style={styles.play}
              activeOpacity={1}
              onPress={() => {
                if (audioCard.length > 0 && !!audioCard[0].content) {
                  if (!isPlay && !!togglePlay) {
                    togglePlay(
                      JSON.parse(audioCard[0].content).media,
                      JSON.parse(audioCard[0].content).duration * 1000,
                    );
                  }
                }
              }}>
              <Text style={styles.see}>Listen to see</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      {audioCard.length !== 0 &&
        playerLoader &&
        !!audioCard[0] &&
        !!audioCard[0].content &&
        currentVoice === JSON.parse(audioCard[0].content).media && (
          <LottieView
            source={require('../../Assets/Animation/image_loader.json')}
            autoPlay
            loop
            style={styles.loader}
          />
        )}
      <View style={styles.indicator}>
        <LottieView
          source={require('../../Assets/Animation/image_loader.json')}
          autoPlay
          loop
          style={styles.disableTouch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    height: screenHeight > 700 ? imgWidth : imgWidthSmall,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    overflow: 'hidden',
  },
  viewPagerBig: {
    height: imgWidthBig,
  },
  viewPagerLike: {
    height: imgWidthLike,
  },
  img: {
    width: screenHeight > 700 ? imgWidth : imgWidthSmall,
    height: screenHeight > 700 ? imgWidth : imgWidthSmall,
  },
  blurImg: {
    // zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  listen: {
    width: screenHeight > 700 ? imgWidth : imgWidthSmall,
    height: screenHeight > 700 ? imgWidth : imgWidthSmall,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listenBig: {
    height: imgWidthBig,
    width: imgWidthBig,
  },
  listenLike: {
    width: imgWidthLike,
    height: imgWidthLike,
  },
  see: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  imgBig: {
    width: imgWidthBig,
    height: imgWidthBig,
  },
  imgLike: {
    borderRadius: 8,
    width: imgWidthLike,
    height: imgWidthLike,
  },
  pagination: {
    position: 'absolute',
    width: 7,
    right: 12,
    alignItems: 'center',
    bottom: 9,
    zIndex: 2,
  },
  paginationHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 7,
    height: 7,
    marginVertical: 3,
    borderRadius: 4,
    backgroundColor: AppColors.white + 'B8',
  },
  paginationDotHorizontal: {
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: AppColors.MainColor + 'B8',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  image: {
    position: 'relative',
  },
});

export default ProfileImage;
