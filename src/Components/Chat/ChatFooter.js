import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Keyboard,
  Platform,
  View,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {makeid} from '../../Utils/Functions';

import ChatDetailFooter from './ChatDetailFooter';
import ChatDetailFooterText from './ChatDetailFooterText';
// import AudioConversationTips from './AudioConversationTips';
import {useAuth} from '../../Providers/AuthProvider';
import {useMessages} from '../../Providers/MessagesProvider';

import {
  request,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {logSendVoice} from '../../Utils/Analytics';
const audioRecorderPlayer = new AudioRecorderPlayer();

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const ChatFooter = ({
  room,
  createMessage,
  isClick,
  setIsClick,
  stop,
  setStop,
  stopPlayVoice,
  showSticker,
  setShowSticker,
  enableText,
  clickSendGif,
  clickSendImage,
  setEnableText,
}) => {
  // const [translation] = useState(new Animated.Value(0));
  const [focus, setFocus] = useState(false);
  const [expanded, setExpanded] = useState(isClick);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00');
  const navigation = useNavigation();
  const media = useRef();
  const {user} = useAuth();
  const {updateMessageStatus, updateMessageStatusFail} = useMessages();
  const tempVoiceRef = useRef(null);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsClick(expanded);
  }, [expanded]);

  const formatSeconds = (mss) => {
    let third = parseInt(mss.split(':')[2], 10);
    let second = parseInt(mss.split(':')[1], 10);
    let all_time = second * 100 + third;
    if (all_time > 120) {
      setExpanded(false);
      clickSend(true);
    }

    let secs = all_time % 60;
    let min = Math.floor(all_time / 60);

    let parity_min = '';
    let parity_secs = '';
    if (secs < 10) {
      parity_secs = '0';
    }
    if (min < 10) {
      parity_min = '0';
    }
    return parity_min + min.toString() + ':' + parity_secs + secs.toString();
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', callBackOther);
      Keyboard.addListener('keyboardWillHide', callBackFalse);
    } else {
      Keyboard.addListener('keyboardDidShow', callBackOther);
      Keyboard.addListener('keyboardDidHide', callBackFalse);
    }
    return () => {
      audioRecorderPlayer.stopRecorder();
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillShow', callBackOther);
        Keyboard.removeListener('keyboardWillHide', callBackOther);
      } else {
        Keyboard.removeListener('keyboardDidShow', callBackOther);
        Keyboard.removeListener('keyboardDidHide', callBackFalse);
      }
    };
  }, []);

  useEffect(() => {
    if (stop) {
      setExpanded(false);
      clickDelete();
      setStop(false);
    }
  }, [stop]);

  const callBackOther = () => {
    setFocus(true);
  };

  const callBackFalse = () => {
    setFocus(false);
  };

  const clickSticker = () => {
    Keyboard.dismiss();
    setFocus(false);
    setShowSticker(!showSticker);
  };

  const clickStart = async () => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await request(PERMISSIONS.IOS.MICROPHONE);
        if (permissionStatus === RESULTS.GRANTED) {
          setExpanded(true);
          startRecording();
        } else {
          navigation.navigate('MicPermissionModal');
        }
      } catch (e) {
        setExpanded(false);
      }
    } else if (Platform.OS === 'android') {
      try {
        const permissionStatus = await requestMultiple([
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]);
        if (
          permissionStatus[PERMISSIONS.ANDROID.RECORD_AUDIO] ===
            RESULTS.GRANTED &&
          permissionStatus[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED &&
          permissionStatus[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
            RESULTS.GRANTED
        ) {
          setExpanded(true);
          startRecording();
        } else {
          navigation.navigate('MicPermissionModal');
        }
      } catch (e) {
        setExpanded(false);
      }
    }
  };

  const clickStartFromText = () => {
    stopPlayVoice();
    clickStart();
  };

  const startRecording = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.low,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    await audioRecorderPlayer.startRecorder(null, audioSet, null);
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.currentPosition);
      setRecordTime(
        formatSeconds(
          audioRecorderPlayer.mmssss(Math.round(e.currentPosition) / 100),
        ),
      );
      return;
    });
  };

  const clickDelete = async () => {
    setIsClick(false);
    setRecordSecs(0);
    setRecordTime('00:00');
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const clickSend = async (auto) => {
    setRecordSecs(0);
    setRecordTime('00:00');
    if (!enableText) {
      setEnableText(true);
    }
    try {
      let tmp_duration = Math.round(parseInt(recordSecs / 1000, 10));
      if (recordSecs === 0) {
        if (auto) {
          tmp_duration = 120;
        } else {
          tmp_duration = 1;
        }
      }
      const result = await audioRecorderPlayer.stopRecorder();
      media.current = result;
      audioRecorderPlayer.removeRecordBackListener();
      const voiceId = makeid(20);
      const base64 = await RNFS.readFile(media.current, 'base64');
      let voice_folder =
        room.user_id < room.other_user_id
          ? room.user_id + '_' + room.other_user_id
          : room.other_user_id + '_' + room.user_id;
      const realmMessage = createMessage(
        room.pubnub_room_id,
        'Please Update your App to see this message.',
        'VOICE_NOTE',
        media.current,
        tmp_duration,
      );
      tempVoiceRef.current = realmMessage;
      //handling function to pubnub, progress bar test
      await user.callFunction('uploadVoiceToS3', [
        base64,
        voice_folder + '/' + voiceId,
        'matter-voices',
      ]);
      updateMessageStatus(realmMessage, voice_folder + '/' + voiceId);
      logSendVoice(
        room.pubnub_room_id,
        voice_folder + '/' + voiceId + '.m4a',
        tmp_duration,
      );
    } catch (e) {
      updateMessageStatusFail(tempVoiceRef.current, '-1');
    }
    tempVoiceRef.current = null;
  };

  return (
    <View>
      <Animated.View style={styles.footer}>
        <ChatDetailFooter
          isClick={isClick}
          setIsClick={setIsClick}
          clickDelete={clickDelete}
          clickSend={clickSend}
          setExpanded={setExpanded}
          recordTime={recordTime}
        />
        <ChatDetailFooterText
          item={room}
          clickSendGif={clickSendGif}
          clickSendImage={clickSendImage}
          createMessage={createMessage}
          focus={focus}
          setFocus={setFocus}
          clickSticker={clickSticker}
          clickStartFromText={clickStartFromText}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
  },
});

export default ChatFooter;
