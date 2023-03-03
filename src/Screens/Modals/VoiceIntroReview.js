import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

function VoiceIntroReview({navigation}) {
  const {getFormattedProfile, user, userData, userCards, voiceProblem} =
    useAuth();
  const insets = useSafeArea();
  const [profile, setProfile] = useState(getFormattedProfile());
  const [audioCard, setAudioCard] = useState({});
  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [playerLoader, setPlayerLoader] = useState(false);

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setCurrentVoice(null);
      setPlayerLoader(false);
    }
  };

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  useEffect(() => {
    user && setProfile(getFormattedProfile());
  }, [user, userData, userCards]);

  const togglePlay = async () => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (JSON.parse(audioCard[0].content).media !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(JSON.parse(audioCard[0].content).media);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(JSON.parse(audioCard[0].content).media);
    } else if (JSON.parse(audioCard[0].content).media === currentVoice) {
      stopIntroPlayer();
    }
  };
  useEffect(() => {
    setAudioCard(profile.user_cards.filter((c) => c.type === 'voice-intro'));
  }, [profile.user_cards]);

  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
    setIsPlay(false);
    if (currentVoice) {
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition > 0) {
          setPlayerLoader(false);
          setIsPlay(true);
        }
        if (e.currentPosition === e.duration) {
          setIsPlay(false);
          setCurrentVoice(null);
          audioRecorderPlayer.stopPlayer();
        }
      });
    }
  }, [currentVoice]);

  useEffect(() => {
    fillValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration:
          parseInt(JSON.parse(audioCard[0].content).duration, 10) * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const ReturnVoiceCreateProfile = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'TabNavigator'}],
    });
  };

  const renderTopMessage = () => {
    switch (voiceProblem) {
      case 'TOO_SHORT':
        return <Text style={styles.title}>Your Voice Intro is too short</Text>;
      case 'NO_WORDS':
        return <Text style={styles.title}>Your Voice Intro is silent</Text>;
      case 'TOO_FEW_WORDS':
        return (
          <Text style={styles.title}>
            Your Voice Intro has less than 2 words
          </Text>
        );
      case 'OFFENSIVE_LANGUAGE':
        return (
          <Text style={styles.title}>Your Voice Intro has offensive words</Text>
        );
      case 'TOO_REPETITIVE':
        return (
          <Text style={styles.title}>
            Your Voice Intro has a too much repetition of a single word
          </Text>
        );
      case 'TOO_MUCH_PAUSE':
        return (
          <Text style={styles.title}>
            Your Voice Intro has a too long pause
          </Text>
        );
      case 'TOO_MUCH_BACKGROUND_NOISE':
        return (
          <Text style={styles.title}>
            Your Voice Intro has loud background noise
          </Text>
        );
      default:
        return (
          <Text style={styles.title}>Your voice intro has offensive words</Text>
        );
    }
  };

  const renderBottomMessage = () => {
    switch (voiceProblem) {
      case 'TOO_SHORT':
        return (
          <Text style={styles.description}>
            Please upload at least 5 secs Voice Intro
          </Text>
        );
      case 'NO_WORDS':
        return (
          <Text style={styles.description}>
            Please upload a new Voice Intro
          </Text>
        );
      case 'TOO_FEW_WORDS':
        return (
          <Text style={styles.description}>
            Please upload a new Voice Intro
          </Text>
        );
      case 'OFFENSIVE_LANGUAGE':
        return (
          <Text style={styles.description}>
            Please upload a respectful Voice Intro
          </Text>
        );
      case 'TOO_REPETITIVE':
        return (
          <Text style={styles.description}>
            Please upload a new Voice Intro
          </Text>
        );
      case 'TOO_MUCH_PAUSE':
        return (
          <Text style={styles.description}>
            Please upload a new Voice Intro
          </Text>
        );
      case 'TOO_MUCH_BACKGROUND_NOISE':
        return (
          <Text style={styles.description}>
            Please upload a new Voice Intro
          </Text>
        );
      default:
        return (
          <Text style={styles.description}>
            Please upload a respectful Voice Intro
          </Text>
        );
    }
  };

  return (
    <View style={[styles.wrap]}>
      <View style={[styles.header, {marginTop: insets.top + 8}]}>
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            stopIntroPlayer();
            navigation.goBack();
          }}>
          <DeleteIcon width={24} height={24} color={AppColors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.contain}>
        {renderTopMessage()}
        {renderBottomMessage()}
        <View style={styles.whiteItem}>
          <View style={styles.red}>
            <ExclamationIcon width={3} height={17} color={AppColors.white} />
          </View>
          <View style={styles.whiteButton}>
            <View style={styles.player}>
              <Text style={styles.name} numberOfLines={1}>
                {profile.user_info.first_name}
              </Text>
              <Text style={styles.text}>Voice intro</Text>
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
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => {
                  togglePlay();
                }}>
                {playerLoader &&
                currentVoice === JSON.parse(audioCard[0].content).media ? (
                  <LottieView
                    source={require('../../Assets/Animation/player.json')}
                    autoPlay
                    loop
                    style={styles.loader}
                  />
                ) : isPlay &&
                  currentVoice === JSON.parse(audioCard[0].content).media ? (
                  <PauseIcon width={17} height={17} color={AppColors.white} />
                ) : (
                  <PlayIcon width={17} height={17} color={AppColors.white} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <TouchableOpacity
          style={styles.hear}
          onPress={() => {
            stopIntroPlayer();
            navigation.pop();
            navigation.push('AddVoiceIntro', {
              callBack: ReturnVoiceCreateProfile,
            });
          }}>
          <Text style={styles.examples}>Hear examples</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            stopIntroPlayer();
            navigation.pop();
            navigation.push('AddVoiceIntro', {
              callBack: ReturnVoiceCreateProfile,
            });
          }}>
          <Text style={styles.buttonText}>Re-upload Voice Intro</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.hear}
          onPress={() => {
            stopIntroPlayer();
            navigation.goBack();
          }}>
          <Text style={styles.buttonText}>I’ll do it later</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.MainColor,
  },
  header: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    padding: 20,
  },
  contain: {
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'center',
  },
  close: {
    marginLeft: 'auto',
    width: 45,
    height: 45,
    alignItems: 'flex-end',
  },
  title: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 32,
  },
  hear: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  examples: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.white,
    textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    borderWidth: 2,
    borderColor: AppColors.white,
    borderRadius: 28,
    paddingVertical: 18,
    marginVertical: 28,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.white,
  },
  edit: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginBottom: -14,
  },
  whiteButton: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  whiteItem: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingRight: 20,
    paddingBottom: 34,
    margin: 30,
  },
  bar: {
    backgroundColor: '#A2E3F5B3',
    borderRadius: 12,
    height: 5,
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
  player: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  red: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 8,
    backgroundColor: '#E35C5C',
    position: 'absolute',
    right: 0,
    top: 7,
  },
  text: {
    fontSize: 12,
    lineHeight: 17,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginBottom: 6,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
    marginBottom: 4,
  },
});

export default VoiceIntroReview;
