import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Easing,
} from 'react-native';
import {useTranslation} from 'react-i18next';

import {useSafeArea} from 'react-native-safe-area-context';
import Toast from '../../Assets/Package/react-native-toast-message';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import ClapIcon from '../../Assets/Svg/ClapIcon';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import {useAuth} from '../../Providers/AuthProvider';
import {S3_VOICE_INTRO_URL} from '../../Utils/Constants';
import RNFS from 'react-native-fs';
import {makeid} from '../../Utils/Functions';
import {logVoiceIntroAdded, logVoiceIntroUpdated} from '../../Utils/Analytics';
import VoiceFeedback from '../../Api/VoiceFeedback';
import {useAppFlag} from '../../Providers/AppFlagProvider';

const PreviewVoiceIntro = ({navigation, route}) => {
  const {t} = useTranslation();
  const {media, mediaDuration, callBack} = route.params;
  const [isPlay, setIsPlay] = useState(false);
  const [loader, setLoader] = useState(false);
  const {updateFlag} = useAppFlag();
  const insets = useSafeArea();
  const {
    createCard,
    user,
    userCards,
    updateCard,
    userVerification,
    setVoiceProblem,
  } = useAuth();
  const [audioCard, setAudioCard] = useState({});
  const fillValue = useRef(new Animated.Value(0)).current;
  const voiceAPI = new VoiceFeedback();

  useEffect(() => {
    setAudioCard(userCards.filter((c) => c.type === 'voice-intro'));
  }, [userCards]);

  const clickReRecord = () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setIsPlay(false);
    navigation.goBack();
  };

  const clickDone = async () => {
    audioRecorderPlayer.stopPlayer();
    setIsPlay(false);
    audioRecorderPlayer.removePlayBackListener();
    setLoader(true);
    const voiceId = user.customData.user_id + '/' + makeid(5);
    const base64 = await RNFS.readFile(media, 'base64');
    await user.callFunction('uploadVoiceToS3', [
      base64,
      voiceId,
      'matter-voice-intro',
    ]);
    if (audioCard.length > 0) {
      logVoiceIntroUpdated();
      updateCard(audioCard[0], {
        media: S3_VOICE_INTRO_URL + voiceId + '.m4a',
        duration: mediaDuration,
      });
    } else {
      logVoiceIntroAdded();
      createCard(
        'voice-intro',
        'text',
        {media: S3_VOICE_INTRO_URL + voiceId + '.m4a', duration: mediaDuration},
        false,
      );
    }
    const result = await voiceAPI.reviewVoice();
    updateFlag(
      'should_reload_home',
      (Date.now() + 3 * 60 * 60 * 1000).toString(),
    );
    setVoiceProblem(null);
    setLoader(false);
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: `${t('PreviewIntro.Review1')}`,
      text2: `${t('PreviewIntro.Review2')}`,
      topOffset: 0,
      visibilityTime: 2000,
    });
    callBack();
  };

  useEffect(() => {
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition > 0) {
        setIsPlay(true);
      }
      if (e.currentPosition === e.duration) {
        setIsPlay(false);
        audioRecorderPlayer.stopPlayer();
      }
    });
    return () => {
      audioRecorderPlayer.stopPlayer();
      setIsPlay(false);
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  useEffect(() => {
    fillValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration: mediaDuration * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const togglePlay = () => {
    audioRecorderPlayer.stopPlayer();
    if (!isPlay) {
      audioRecorderPlayer.stopPlayer();
      setIsPlay(true);
      audioRecorderPlayer.startPlayer(media);
    } else {
      audioRecorderPlayer.stopPlayer();
      setIsPlay(false);
    }
  };
  const renderVerificationBadge = () => {
    if (userVerification.length === 0) {
      return <></>;
    }
    if (userVerification[0].status === 1) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <ImageBackground
        defaultSource={require('../../Assets/Image/voiceIntro.png')}
        source={require('../../Assets/Image/voiceIntro.png')}
        style={styles.flex}
        resizeMode="cover">
        <View style={[styles.header, {paddingTop: insets.top + 16}]}>
          <TouchableOpacity style={styles.back} onPress={() => callBack()}>
            <DeleteIcon
              color={AppColors.AppBlack + 'B8'}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <View style={styles.clap}>
            <ClapIcon color={AppColors.AppBlack} width={39} height={34} />
          </View>
          <Text style={styles.title}>{t('PreviewIntro.Title')}</Text>
          <Text style={styles.description}>
            {t('PreviewIntro.Text')}
          </Text>
        </View>

        <View style={styles.container}>
          <View style={styles.player}>
            <View style={styles.left}>
              <Text style={styles.example}>{t('PreviewIntro.Your')}</Text>
              <View style={styles.nameWrap}>
                <Text style={styles.name} numberOfLines={1}>
                  {user.customData.first_name}
                </Text>
                {renderVerificationBadge()}
              </View>
              <Text style={styles.voiceText}>{t('IntroAudio.Title')}</Text>
              <View style={styles.bar}>
                <Animated.View
                  style={[
                    styles.progress,
                    {
                      width: widthAnimation,
                    },
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={togglePlay}>
              {isPlay ? (
                <PauseIcon width={14} height={14} color={AppColors.white} />
              ) : (
                <PlayIcon width={14} height={14} color={AppColors.white} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
          <TouchableOpacity style={styles.reRecord} onPress={clickReRecord}>
            <Text style={styles.buttonText}>{t('PreviewIntro.ReRecord')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={clickDone}>
            <Text style={styles.buttonText}>{t('PreviewIntro.Save')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flex: {
    justifyContent: 'space-around',
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  back: {
    marginLeft: 'auto',
    width: 45,
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  clap: {
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 26,
    color: AppColors.AppBlack,
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    color: AppColors.AppBlack,
  },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginHorizontal: 26,
  },
  save: {
    alignItems: 'center',
    width: '100%',
    marginTop: 28,
    borderRadius: 26,
    height: 51,
    backgroundColor: '#5CE3B9',
  },
  reRecord: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 26,
    height: 51,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 50,
    color: AppColors.white,
  },
  player: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    paddingLeft: 13,
    paddingTop: 10,
    paddingBottom: 23,
    paddingRight: 22,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  left: {
    flex: 1,
  },
  example: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 19,
    color: AppColors.AppBlack + '7A',
    marginBottom: 7,
  },
  bar: {
    backgroundColor: '#A2E3F5B3',
    borderRadius: 12,
    height: 4,
    width: '100%',
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
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 21,
    marginRight: 6,
    color: AppColors.AppBlack,
  },
  voiceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    lineHeight: 19,
    color: AppColors.AppBlack,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#72D0EA',
    borderRadius: 22,
    width: 37,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 29,
  },
});

export default PreviewVoiceIntro;
