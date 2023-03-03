import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Animated} from 'react-native';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';
import FastImage from 'react-native-fast-image';

import CacheableImage from '../Common/CacheableImage';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import AppColors from '../../Utils/AppColors';

const screenWidth = Math.round(Dimensions.get('window').width);

const imgWidth = screenWidth - 54;

const PlayerImage = ({profile, page, setPage, userData, isPlay}) => {
  const pagerRef = useRef(null);

  const blurAnimation = useRef(new Animated.Value(40)).current;
  const buttonValue = useRef(new Animated.Value(1)).current;
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    pagerRef.current.setPageWithoutAnimation(0);
  }, [profile]);

  useEffect(() => {
    blurAnimation.setValue(40);
    buttonValue.setValue(1);
    setShowButton(true);
    if (isPlay) {
      blurAnimation.setValue(40);
      buttonValue.setValue(1);
      Animated.timing(blurAnimation, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: false,
      }).start();
      Animated.timing(buttonValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setShowButton(false);
      });
    }
  }, [profile, isPlay]);

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };

  const renderPagination = () => {
    if (profile.user_id === userData.user_id || profile.is_played === true) {
      return (
        <View style={styles.pagination}>
          {profile.profile_hd_images.length > 1 &&
            profile.profile_hd_images.map((item, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    page === index && styles.activeDot,
                  ]}
                />
              );
            })}
        </View>
      );
    }
    return (
      <Animated.View style={[styles.pagination]}>
        {profile.profile_hd_images.length > 1 &&
          profile.profile_hd_images.map((item, index) => {
            return (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  page === index && styles.activeDot,
                ]}
              />
            );
          })}
      </Animated.View>
    );
  };

  const renderCashedImage = (img) => {
    return (
      <CacheableImage
        style={[styles.blurImg, styles.img]}
        source={{
          uri: S3_PHOTO_URL + img + '.jpg',
        }}
        blurRadius={!profile.is_played ? blurAnimation : 0}
      />
    );
  };
  const renderFastImage = (img) => {
    return (
      <FastImage
        style={[styles.blurImg, styles.img]}
        defaultSource={require('../../Assets/Image/blurred.png')}
        source={{
          uri: S3_PHOTO_URL + img + '.jpg',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  };

  return (
    <View>
      <View style={styles.bg}>
        <FastImage
          style={[styles.blurImg, styles.img]}
          source={require('../../Assets/Image/blurred.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <PagerView
        ref={pagerRef}
        onPageScroll={onPageScroll}
        orientation="horizontal"
        style={styles.viewPager}
        initialPage={page}>
        {profile.profile_hd_images.map((image, index) => (
          <View key={image} style={styles.image}>
            {index === 0 ? renderCashedImage(image) : renderFastImage(image)}
          </View>
        ))}
      </PagerView>
      {renderPagination()}
      {!profile.is_played &&
        profile.user_id !== userData.user_id &&
        showButton && (
          <Animated.View style={[styles.listen, {opacity: buttonValue}]}>
            <View style={styles.play}>
              <Text style={styles.see}>Listen to see</Text>
            </View>
          </Animated.View>
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
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    overflow: 'hidden',
    height: imgWidth,
    borderRadius: 8,
    // display: 'none',
  },
  img: {
    borderRadius: 8,
    width: imgWidth,
    height: imgWidth,
  },
  blurImg: {
    zIndex: 100,
    width: imgWidth,
    height: imgWidth,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  pagination: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 9,
    zIndex: 2,

    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  paginationDot: {
    width: 7,
    height: 7,
    marginHorizontal: 5,
    borderRadius: 4,
    backgroundColor: AppColors.white + 'B8',
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
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  see: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  listen: {
    width: imgWidth,
    height: imgWidth,
    position: 'absolute',
    borderRadius: 8,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

export default PlayerImage;
