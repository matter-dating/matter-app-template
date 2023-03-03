/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Easing,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Toast from '../../Assets/Package/react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {useAuth} from '../../Providers/AuthProvider';
// import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';
import ItemLikeIcon from '../../Assets/Svg/ItemLikeIcon';
import LikeIcon from '../../Assets/Svg/LikeIcon';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';

import LikedItem from '../../Components/LikedYou/LikedItem';
import LikedAudio from '../../Components/LikedYou/LikedAudio';

import {makeid} from '../../Utils/Functions';
import RNFS from 'react-native-fs';
import {S3_VOICE_LIKE_URL} from '../../Utils/Constants';
import {logAppMatch, logSendLike} from '../../Utils/Analytics';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

const screenWidth = Math.round(Dimensions.get('window').width);
const imgWidth = screenWidth - 80;

const NewLikeModal = ({pass, hide, hideShowModal, setLikedId}) => {
  const navigation = useNavigation();
  const maxLength = 150;
  const {user} = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  const fillValue = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState('');
  const [messageLength, setMessageLength] = useState(150);
  const [isFocus, setIsFocus] = useState(false);
  const insets = useSafeArea();

  const [loader, setLoader] = useState(false);
  const [audio] = useState('');
  const [audioDuration] = useState(0);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const [duration, setDuration] = useState(0);

  const [target] = useState(pass.target);
  const [type] = useState(pass.type);
  const [card] = useState(pass.card);

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
    return () => {
      audioRecorderPlayer.stopRecorder();
      setIsPlay(false);
      setCurrentVoice(null);
    };
  }, []);

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
    } else {
      setIsPlay(false);
    }
  }, [currentVoice]);

  const onChangeText = (text) => {
    setMessage(text);
    setMessageLength(maxLength - text.length);
  };
  const likeSend = async () => {
    setLoader(true);
    let voice_like_url = '';
    if (audio !== '') {
      const voiceId = user.customData.user_id + '/' + makeid(20);
      const base64 = await RNFS.readFile(audio, 'base64');
      await user.callFunction('uploadVoiceToS3', [
        base64,
        voiceId,
        'matter-voice-like',
      ]);
      voice_like_url = S3_VOICE_LIKE_URL + voiceId + '.m4a';
    }
    const result = await user.callFunction('sendLike', [
      target.user_id,
      JSON.stringify({
        card,
        message,
        audio: voice_like_url,
        audioDuration,
        type,
        user_id: user.id,
      }),
    ]);
    logSendLike(target.user_id, voice_like_url);
    pass.callBack && pass.callBack();
    setLoader(false);
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'Like sent!',
      topOffset: 0,
      visibilityTime: 2000,
    });
    hide(true);
    if (hideShowModal) {
      hideShowModal();
    }
    setLikedId && setLikedId(target.user_id);
    if (result.matched) {
      logAppMatch(target.user_id);
      navigation.navigate('MatchModal', {
        target,
      });
    }
  };

  const renderVerificationBadge = () => {
    if (target.is_photo_verified) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };

  const stopIntroPlayer = () => {
    fillValue.setValue(0);
    if (currentVoice) {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setCurrentVoice(null);
      setIsPlay(false);
      setPlayerLoader(false);
    }
  };

  useEffect(() => {
    fillValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const togglePlay = async (item, sec) => {
    setIsPlay(false);
    setPlayerLoader(false);
    await audioRecorderPlayer.stopPlayer();
    if (item !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(item);
      setDuration(sec);
      audioRecorderPlayer.startPlayer(item);
    } else if (item === currentVoice) {
      stopIntroPlayer();
      setDuration(0);
    }
  };

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, bottom: slideBottom}]}>
      <View style={styles.absolute} />
      <View style={[styles.wrapper, {marginBottom: insets.bottom}]}>
        <View style={[styles.top, {marginTop: insets.top}]}>
          <LikeIcon color={AppColors.MainColor} width={20} height={20} />
          <Text style={styles.title}>
            {type !== 'likeBack' ? 'Send like' : 'Like back'}
          </Text>
        </View>
        <KeyboardAvoidingView
          style={styles.box}
          behavior={Platform.OS === 'ios' ? 'position' : null}
          enabled>
          <LikedItem
            card={card}
            type={type}
            target={target}
            noGroup={pass.noGroup}
            likeContent={pass.likeContent}
            fillValue={fillValue}
            currentVoice={currentVoice}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            audioRecorderPlayer={audioRecorderPlayer}
            togglePlay={togglePlay}
            playerLoader={playerLoader}
            noBlur={pass.noBlur}
          />
          <View style={styles.footer}>
            <View style={styles.who}>
              <Text style={styles.toWho} numberOfLines={1}>
                {target.first_name}
              </Text>
              {renderVerificationBadge()}
            </View>
          </View>
          {type === 'voice-intro' && (
            <LikedAudio
              card={card}
              type={type}
              target={target}
              likeContent={pass.likeContent}
              audioRecorderPlayer={audioRecorderPlayer}
              currentVoice={currentVoice}
              setCurrentVoice={setCurrentVoice}
              fillValue={fillValue}
              isPlay={isPlay}
              setIsPlay={setIsPlay}
              togglePlay={togglePlay}
              playerLoader={playerLoader}
            />
          )}
          {type !== 'likeBack' && (
            <View style={styles.textInput}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={(text) => onChangeText(text)}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={Colors.MainColor + 'A3'}
                placeholder="Enter message here…"
                returnKeyType="done"
                blurOnSubmit={true}
                maxLength={maxLength}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
              {isFocus && (
                <Text
                  style={[styles.character, messageLength === 0 && styles.red]}>
                  {messageLength} characters
                </Text>
              )}
            </View>
          )}
          <View style={styles.bottom}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                stopIntroPlayer();
                if (!loader) {
                  likeSend();
                }
              }}
              activeOpacity={0.2}>
              <ItemLikeIcon width={16} height={14} color={AppColors.white} />
              {loader ? (
                <LottieView
                  source={require('../../Assets/Animation/loader_white.json')}
                  autoPlay
                  loop
                  style={styles.disableTouch}
                />
              ) : (
                <CustomText.TitleText style={styles.buttonText}>
                  {type !== 'likeBack' ? 'Send like' : 'Like back'}
                </CustomText.TitleText>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                stopIntroPlayer();
                hide(false);
              }}>
              <CustomText.TitleText style={styles.cancelText}>
                Cancel
              </CustomText.TitleText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  box: {
    borderRadius: 8,
    marginHorizontal: 40,
  },
  top: {
    paddingHorizontal: 40,
    paddingTop: 12,
    marginBottom: 'auto',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    marginHorizontal: 10,
  },
  bottom: {
    // paddingHorizontal: 40,
    paddingTop: 12,
    // width: '100%',
  },
  footer: {
    width: imgWidth,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 28,
    marginBottom: 8,
    height: 48,
  },
  opacity: {
    backgroundColor: AppColors.MainColor + 'B0',
  },
  buttonText: {
    color: Colors.white,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginHorizontal: 9,
  },
  opacityText: {
    color: AppColors.white + 'B0',
  },
  cancelButton: {
    paddingVertical: 16,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  cancelText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 25,
  },
  who: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  toWho: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: Colors.white,
    marginRight: 8,
    lineHeight: 25,
  },
  white: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.colorF56,
  },
  disableTouch: {
    zIndex: 20,
    width: 68,
    marginHorizontal: 10,
  },
  textInput: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
  },
  input: {
    fontFamily: 'Poppins-LightItalic',
    fontSize: 14,
    height: 45,
    maxWidth: '100%',
    width: '100%',
    paddingLeft: 22,
    paddingRight: 42,
    textAlignVertical: 'top',
    paddingTop: 13,
    paddingBottom: 0,
  },
  character: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    marginBottom: 10,
    marginHorizontal: 22,
  },
  red: {
    color: Colors.red,
  },
});

export default NewLikeModal;
