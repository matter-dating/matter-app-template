import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Toast from '../../Assets/Package/react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';

import BackIcon from '../../Assets/Svg/BackIcon';
import EditIcon from '../../Assets/Svg/EditIcon';
import UploadIcon from '../../Assets/Svg/UploadIcon';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import CheckIcon from '../../Assets/Svg/CheckAIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import {useAuth} from '../../Providers/AuthProvider';
import {S3_PROMPT_URL} from '../../Utils/Constants';
import LottieView from 'lottie-react-native';

import {makeid} from '../../Utils/Functions';
import RNFS from 'react-native-fs';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

import EditPromptImageModal from '../Modals/EditPromptImageModal';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';

import {
  request,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

const maxLength = 150;
const {width: compressImageMaxWidth} = Dimensions.get('window');
const imgWidth = compressImageMaxWidth - 70;
const imgHeight = (imgWidth / 12) * 14;

function CreatePromptScreen({navigation, route}) {
  const insets = useSafeArea();
  const {user, createCard, updateCardWithOthers, updateCardGroupable} =
    useAuth();
  const {item, edit, card} = route.params;
  const media = useRef();
  const [answer, setAnswer] = useState(
    !!item.answer && item.answer ? item.answer : '',
  );
  const [answerLength, setAnswerLength] = useState(
    answer ? maxLength - answer.length : 150,
  );
  const [content, setContent] = useState({});
  const [image, setImage] = useState(
    card && card.type === 'image_prompt'
      ? S3_PROMPT_URL + JSON.parse(card.content).image + '.jpg'
      : null,
  );

  const [moreVisible, setMoreVisible] = useState(false);

  const [loader, setLoader] = useState(false);

  const [recordTime, setRecordTime] = useState('00:00');
  const [recordSecs, setRecordSecs] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setContent({
      question: item.question,
      answer: answer,
    });
  }, [answer, image, expanded]);

  useEffect(() => {
    return () => {
      setRecordTime('00:00');
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removeRecordBackListener();
      setExpanded(false);
    };
  }, []);

  const formatSeconds = (mss) => {
    let third = parseInt(mss.split(':')[2]);
    let second = parseInt(mss.split(':')[1]);
    let all_time = second * 100 + third;
    if (all_time > 30) {
      clickDone(true);
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

  const clickEditIcon = () => {
    setMoreVisible(true);
  };

  const hideModal = () => {
    setMoreVisible(false);
  };

  const removeImage = () => {
    setImage(null);
    setMoreVisible(false);
  };

  const onChangeText = (text) => {
    setAnswer(text);
    setAnswerLength(maxLength - text.length);
  };

  const saveAnswer = async (auto) => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: edit
        ? 'Your prompt has been changed'
        : 'Your prompt has been added',
      topOffset: 0,
      visibilityTime: 2000,
    });
    if (image) {
      setLoader(true);
      let imageId = makeid(20);
      // const task = firebase.storage().ref(`matter_ai_cards/${imageId}.jpg`).putFile(image);
      const task = user.callFunction('uploadImageToS3', [
        image,
        imageId,
        'matter-prompt-photos',
      ]);

      task.then(() => {
        content.image = imageId;
        if (edit) {
          updateCardWithOthers(card, 'image_prompt', content, 'image');
          updateCardGroupable(card._id, false);
        } else {
          createCard('image_prompt', 'image', content, false);
          setLoader(false);
        }
      });
    } else if (media.current) {
      const base64 = await RNFS.readFile(media.current, 'base64');
      setLoader(true);
      let voiceId = makeid(20);
      const task = user.callFunction('uploadVoiceToS3', [
        base64,
        voiceId,
        'matter-prompt-voices',
      ]);
      let tmp_duration = Math.round(parseInt(recordSecs / 1000));
      if (recordSecs === 0) {
        if (auto) {
          tmp_duration = 30;
        } else {
          tmp_duration = 1;
        }
      }
      task.then(() => {
        content.voice = voiceId;
        content.duration = tmp_duration === 0 ? 1 : tmp_duration;
        content.answer = null;
        content.answer = null;
        if (edit) {
          updateCardWithOthers(card, 'voice_prompt', content, 'voice');
          updateCardGroupable(card._id, true);
        } else {
          createCard('voice_prompt', 'voice', content, true);
          setLoader(false);
        }
      });
    } else {
      if (edit) {
        updateCardWithOthers(card, 'prompt', content, 'text');
        updateCardGroupable(card._id, true);
      } else {
        createCard('prompt', 'text', content, true);
      }
    }
    navigation.navigate('NewProfile');
  };

  const clickCancel = () => {
    setExpanded(false);
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    setRecordTime('00:00');
    setExpanded(false);
    setLoader(false);
  };

  const startPress = async () => {
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

  const imageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(async (img) => {
        const result = [];
        result.push(
          await ImagePicker.openCropper({
            path: img.path,
            width: 600,
            height: 700,
            includeBase64: true,
          }),
        );
        setImage(result[0].data);
        setMoreVisible(false);
      })
      .catch((e) => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  const clickDone = async (auto) => {
    setExpanded(false);
    setLoader(true);
    try {
      let tmp_duration = Math.round(parseInt(recordSecs / 1000));
      if (recordSecs === 0) {
        if (auto) {
          tmp_duration = 30;
        } else {
          tmp_duration = 1;
        }
      }
      const result = await audioRecorderPlayer.stopRecorder();
      media.current = result;
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(0);
      setRecordTime('00:00');
      setLoader(false);
      navigation.navigate('PreviewPrompt', {
        question: item.question,
        media: media.current,
        mediaDuration: tmp_duration === 0 ? 1 : tmp_duration,
        callBack: () => {
          saveAnswer(false);
        },
      });
    } catch (e) {}
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            My prompt
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        <CustomText.RegularText style={styles.description}>
          {''}
        </CustomText.RegularText>
      </View>
      <ScrollView scrollEnabled={!!image} style={styles.list}>
        <View style={styles.item}>
          <View style={styles.flex}>
            <CustomText.TitleText style={styles.question}>
              {item.question}
            </CustomText.TitleText>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectPrompt')}
            style={styles.edit}>
            <EditIcon width={18} height={18} color={AppColors.MainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.answer}>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={(text) => onChangeText(text)}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={Colors.MainColor + 'A3'}
            placeholder="Enter answer..."
            returnKeyType="done"
            blurOnSubmit={true}
            maxLength={maxLength}
            editable={!expanded}
          />
          <View style={styles.bottom}>
            <Text style={[styles.character, answerLength === 0 && styles.red]}>
              {answerLength} characters
            </Text>
            {!image && (
              <>
                {!expanded && (
                  <TouchableOpacity style={styles.upload} onPress={imageUpload}>
                    <UploadIcon
                      width={24}
                      height={24}
                      color={Colors.MainColor1 + 'CC'}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.startButton, expanded && styles.started]}
                  onPress={() => {
                    expanded ? clickCancel() : startPress();
                  }}>
                  <VoiceIcon width={24} height={24} color={Colors.white} />
                </TouchableOpacity>
              </>
            )}
          </View>
          {image && (
            <View style={styles.imgBox}>
              <CustomImage
                source={{
                  uri: image.includes('amazonaws.com')
                    ? image
                    : `data:image/gif;base64,${image}`,
                }}
                style={styles.img}
              />
              <TouchableOpacity
                style={styles.imageEdit}
                onPress={clickEditIcon}>
                <EditIcon width={18} height={18} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        {expanded ? (
          <View style={styles.tip}>
            <TouchableOpacity style={styles.delete} onPress={clickCancel}>
              <DeleteIcon color={AppColors.white} width={12} height={12} />
            </TouchableOpacity>
            <View style={styles.voice}>
              <LottieView
                source={require('../../Assets/Animation/voice.json')}
                autoPlay
                loop
                style={styles.wave}
              />
              <Text style={styles.time}>{recordTime}</Text>
            </View>
            <TouchableOpacity
              style={styles.send}
              onPress={() => {
                clickDone(false);
              }}>
              <CheckIcon color={AppColors.white} width={18} height={18} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              (!!image || answer.length > 0) && styles.ready,
            ]}
            activeOpacity={!!image || answer.length > 0 ? 0.2 : 1}
            onPress={() => {
              if (!!image || answer.length > 0) {
                saveAnswer();
              }
            }}>
            <Text
              style={[
                styles.buttonText,
                (!!image || answer.length > 0) && styles.readyText,
              ]}>
              Save & close
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditPromptImageModal
          imageUpload={imageUpload}
          removeImage={removeImage}
          hide={hideModal}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  title: {
    color: AppColors.black,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  empty: {
    width: 24,
  },
  description: {
    textAlign: 'center',
  },
  imgBox: {
    marginTop: 16,
    borderRadius: 8,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
    borderRadius: 8,
  },
  imageEdit: {
    position: 'absolute',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    top: 4,
    right: 4,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    backgroundColor: AppColors.white,
    zIndex: 10,
    elevation: 3,
  },
  bold: {
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: AppColors.button + '99',
    margin: 20,
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  ready: {
    backgroundColor: AppColors.button,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack + '99',
  },
  readyText: {
    color: AppColors.AppBlack,
  },
  list: {
    flex: 1,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 18,
    paddingVertical: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },

  question: {
    lineHeight: 20,
    marginRight: 24,
    fontSize: 14,
    color: AppColors.IconColor + 'F2',
  },
  answer: {
    marginHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 6,
    padding: 23,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 14,
    paddingBottom: 14,
  },
  character: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    color: AppColors.IconColor + '8C',
  },
  red: {
    color: Colors.red,
  },
  input: {
    minHeight: 50,
    maxHeight: 100,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 21,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    color: AppColors.IconColor + 'F2',
    textAlignVertical: 'top',
  },
  edit: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
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
  upload: {
    marginRight: 24,
    marginLeft: 'auto',
  },
  startButton: {
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
    marginRight: -14,
  },
  started: {
    backgroundColor: AppColors.MainColor + '73',
  },
  tip: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  delete: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E35C5C',
    marginRight: 12,
  },
  send: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5CE3B9',
    marginLeft: 12,
  },
  voice: {
    flexDirection: 'row',
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 53,
    flex: 1,
  },
  wave: {
    width: '90%',
    flex: 1,
    overflow: 'hidden',
    marginLeft: 12,
    alignItems: 'center',
  },
  time: {
    marginHorizontal: 12,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
  },
});

export default CreatePromptScreen;
