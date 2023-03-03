import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Carousel from 'react-native-snap-carousel';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import HearthIcon from '../../Assets/Svg/HearthIcon';
import PlayBigIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import EditIcon from '../../Assets/Svg/EditIcon';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../Common/Text';
import CustomImage from '../Common/CustomImage';
import {useAuth} from '../../Providers/AuthProvider';

import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';
const {width: screenWidth} = Dimensions.get('window');

const MusicCarousel = ({
  likeContent,
  firstItem,
  data,
  itemWidth,
  imgWidth,
  setActiveSlide,
  clickEditIcon,
  userInfo,
  stopIntroPlayer,
  hideLike,
  isModal,
  togglePlay,
  currentVoice,
  isPlay,
  playerLoader,
  setPass,
}) => {
  const {userData} = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused === false) {
      stopIntroPlayer && stopIntroPlayer();
    }
  }, [isFocused]);

  const renderSingle = (item) => {
    const music = JSON.parse(item.content);
    return (
      <View style={styles.item} key={item._id}>
        <ImageBackground
          defaultSource={require('../../Assets/Image/default.png')}
          source={{uri: music.image}}
          style={[
            styles.bg,
            {
              width: itemWidth,
              height: (itemWidth / 25) * 36,
            },
          ]}
          resizeMode="cover">
          {data[0].user_id === userData._id && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() => clickEditIcon(item)}>
              <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"
              />
              <EditIcon width={24} height={24} color={AppColors.white + 'CC'} />
            </TouchableOpacity>
          )}
          {!!userInfo &&
            userInfo.user_id !== userData.user_id &&
            !hideLike &&
            !userInfo.is_liked && (
              <TouchableOpacity
                style={styles.like}
                onPress={() => {
                  stopIntroPlayer && stopIntroPlayer();
                  if (!likeContent) {
                    setPass({
                      type: 'music',
                      isModal: isModal,
                      card: item,
                      target: userInfo,
                    });
                  } else {
                    setPass({
                      type: 'likeBack',
                      isModal: isModal,
                      likeContent: likeContent,
                      target: userInfo,
                    });
                  }
                }}>
                <HearthIcon width={24} height={24} color={Colors.white} />
              </TouchableOpacity>
            )}
          <View style={styles.transparent} />
          <CustomImage
            source={{uri: music.image}}
            style={[
              styles.img,
              {
                width: imgWidth,
                height: imgWidth,
                borderRadius: imgWidth / 2,
              },
            ]}
          />
          <CustomText.TitleText
            numberOfLines={2}
            style={[
              styles.name,
              !!userInfo &&
                userInfo.user_id === userData.user_id &&
                styles.fz14,
            ]}>
            {music.name}
          </CustomText.TitleText>
          <CustomText.TitleText
            style={[
              styles.artist,
              !!userInfo &&
                userInfo.user_id === userData.user_id &&
                styles.fz13,
            ]}>
            {music.artist}
          </CustomText.TitleText>
          {music.preview_url && (
            <TouchableOpacity
              style={styles.play}
              onPress={() => {
                togglePlay(music.preview_url, 0);
              }}>
              {playerLoader && currentVoice === music.preview_url ? (
                <LottieView
                  source={require('../../Assets/Animation/player.json')}
                  autoPlay
                  loop
                  style={{width: 30}}
                />
              ) : isPlay && currentVoice === music.preview_url ? (
                <PauseIcon width={30} height={30} color={Colors.white} />
              ) : (
                <PlayBigIcon width={30} height={30} color={Colors.white} />
              )}
            </TouchableOpacity>
          )}
        </ImageBackground>
      </View>
    );
  };

  return (
    <Carousel
      data={data}
      useScrollView={true}
      renderItem={({item, index}) => renderSingle(item)}
      firstItem={firstItem}
      sliderWidth={screenWidth}
      itemWidth={itemWidth}
      onSnapToItem={(index) => {
        stopIntroPlayer();
        setActiveSlide(index);
      }}
      scrollInterpolator={customScrollInterpolator}
      slideInterpolatedStyle={customAnimatedStyles}
    />
  );
};

const styles = StyleSheet.create({
  bg: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  like: {
    borderRadius: 30,
    zIndex: 1,
    right: 10,
    bottom: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: AppColors.AppBlack + 'B8',
  },
  edit: {
    borderRadius: 20,
    zIndex: 1,
    right: 9,
    bottom: 9,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: AppColors.AppBlack + 'B8',
  },
  transparent: {
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.black + 'AD',
  },
  img: {
    borderWidth: 3,
    borderColor: AppColors.MainColor,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    color: Colors.white,
    lineHeight: 27,
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  artist: {
    fontSize: 16,
    color: Colors.white,
    lineHeight: 25,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 18,
  },
  fz13: {
    fontSize: 13,
  },
  fz14: {
    fontSize: 14,
  },
  loader: {
    width: '100%',
  },
});

export default MusicCarousel;
