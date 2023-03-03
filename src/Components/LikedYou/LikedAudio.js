import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';

import AppColors from '../../Utils/AppColors';

import CustomImage from '../Common/CustomImage';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import {S3_MAIN_URL} from '../../Utils/Constants';

const screenWidth = Math.round(Dimensions.get('window').width);

const LikedAudio = ({
  card,
  type,
  target,
  likeContent,
  audioRecorderPlayer,
  currentVoice,
  setCurrentVoice,
  fillValue,
  isPlay,
  setIsPlay,
  togglePlay,
  playerLoader,
}) => {
  const imgWidth = screenWidth - 76;

  // const togglePlay = async () => {
  //   setCurrentVoice(JSON.parse(card[0].content).media);
  //   audioRecorderPlayer.removePlayBackListener();
  //   audioRecorderPlayer.stopPlayer();
  //   if (JSON.parse(card[0].content).media !== currentVoice) {
  //     audioRecorderPlayer.stopPlayer();
  //     audioRecorderPlayer.startPlayer(JSON.parse(card[0].content).media);
  //   } else {
  //     setIsPlay(false);
  //     setCurrentVoice(null);
  //     audioRecorderPlayer.stopPlayer();
  //   }
  // };
  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrap}>
      {type === 'likeBack' && (
        <>
          <CustomImage
            style={[
              styles.img,
              {
                width: imgWidth,
                height: imgWidth,
              },
            ]}
            source={{uri: S3_MAIN_URL + target.user_id + '.jpg'}}
          />
          <View style={styles.linear}>
            <View>
              <Text numberOfLines={1} style={styles.linearName}>
                {target.first_name}
              </Text>
              <Text numberOfLines={1} style={styles.linearLocation}>
                {likeContent.message !== '' ? 'Commented' : 'Liked'} your voice{' '}
                intro
              </Text>
            </View>
          </View>
        </>
      )}
      <View style={[styles.footerAudio, {width: imgWidth}]}>
        <TouchableOpacity
          style={styles.like}
          activeOpacity={0.2}
          onPress={() => {
            togglePlay(
              JSON.parse(card[0].content).media,
              parseInt(JSON.parse(card[0].content).duration, 10) * 1000,
            );
          }}>
          {playerLoader &&
          currentVoice === JSON.parse(card[0].content).media ? (
            <LottieView
              source={require('../../Assets/Animation/player.json')}
              autoPlay
              loop
              style={styles.loader}
            />
          ) : isPlay && currentVoice === JSON.parse(card[0].content).media ? (
            <PauseIcon width={10} height={10} color={AppColors.MainColor} />
          ) : (
            <PlayIcon width={10} height={10} color={AppColors.MainColor} />
          )}
        </TouchableOpacity>
        <View style={styles.flex}>
          <View style={styles.bar}>
            {currentVoice === JSON.parse(card[0].content).media && (
              <Animated.View
                style={[
                  styles.progress,
                  {
                    width: widthAnimation,
                  },
                ]}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 8,
  },
  linear: {
    backgroundColor: AppColors.white,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    paddingHorizontal: 22,
    paddingBottom: 15,
    paddingTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  linearName: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    marginBottom: 1,
    fontSize: 16,
    lineHeight: 23,
  },
  linearLocation: {
    color: AppColors.AppBlack + 'CC',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  like: {
    backgroundColor: AppColors.white,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
    marginRight: 13,
  },
  bar: {
    backgroundColor: '#E9F3F5',
    borderRadius: 12,
    height: 10,
    width: '100%',
  },
  progress: {
    position: 'absolute',
    backgroundColor: AppColors.MainColor,
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  flex: {
    flex: 1,
  },
  footerAudio: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default LikedAudio;
