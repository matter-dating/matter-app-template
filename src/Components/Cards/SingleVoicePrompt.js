import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import LottieView from 'lottie-react-native';

import ItemLike from '../Home/ItemLike';
import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';

import {S3_PROMPT_VOICE_URL} from '../../Utils/Constants';

const SingleVoicePrompt = ({
  item,
  userInfo,
  userData,
  hideLike,
  stopIntroPlayer,
  likeContent,
  setPass,
  isModal,
  clickEditIcon,
  currentVoice,
  fillValue,
  togglePlay,
  playerLoader,
  isPlay,
}) => {
  const prompt = JSON.parse(item.content);

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{prompt.question}</Text>
      <View style={styles.row}>
        <View style={styles.bar}>
          {currentVoice === S3_PROMPT_VOICE_URL + prompt.voice + '.m4a' && (
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            togglePlay(
              S3_PROMPT_VOICE_URL + prompt.voice + '.m4a',
              parseInt(prompt.duration, 10) * 1000,
            );
          }}>
          {playerLoader &&
          currentVoice === S3_PROMPT_VOICE_URL + prompt.voice + '.m4a' ? (
            <LottieView
              source={require('../../Assets/Animation/player.json')}
              autoPlay
              loop
              style={styles.loader}
            />
          ) : isPlay &&
            currentVoice === S3_PROMPT_VOICE_URL + prompt.voice + '.m4a' ? (
            <PauseIcon width={17} height={17} color={AppColors.MainColor} />
          ) : (
            <PlayIcon width={17} height={17} color={AppColors.MainColor} />
          )}
        </TouchableOpacity>
        {userInfo.user_id !== userData.user_id &&
          !userInfo.is_liked &&
          !hideLike && (
            <View style={styles.button}>
              <ItemLike
                width={23}
                height={23}
                color={AppColors.AppBlack + 'C2'}
                onPress={() => {
                  stopIntroPlayer && stopIntroPlayer();
                  if (!likeContent) {
                    setPass({
                      type: 'prompt',
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
                }}
              />
            </View>
          )}
        {userInfo.user_id === userData.user_id && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              stopIntroPlayer && stopIntroPlayer();
              clickEditIcon(prompt);
            }}>
            <EditIcon width={20} height={20} color={AppColors.MainColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 33,
    paddingHorizontal: 22,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 8,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
  },
  bar: {
    backgroundColor: '#A2E3F5B3',
    borderRadius: 12,
    height: 5,
    width: '100%',
    flex: 1,
  },
  progress: {
    position: 'absolute',
    backgroundColor: '#72D0EA',
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  loader: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  like: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: 12,
    bottom: 12,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
  },
});

export default SingleVoicePrompt;
