/* eslint-disable radix */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  Easing,
  Modal,
  ImageBackground,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import SingleIntroTip from '../../Components/Audio/SingleIntroTip';
import Carousel from 'react-native-snap-carousel';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
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
const audioRecorderPlayer = new AudioRecorderPlayer();

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import CheckIcon from '../../Assets/Svg/CheckAIcon';
import AppColors from '../../Utils/AppColors';
import {useAppContent} from '../../Providers/AppContentProvider';
import {logSelectedTip} from '../../Utils/Analytics';
// import {logClickTips} from '../../Utils/Analytics';
import BrowseTipsModal from '../Modals/BrowseTipsModal';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const AddVoiceIntro = ({route}) => {
  const {t} = useTranslation();
  const {callBack} = route.params;
  const navigation = useNavigation();
  const [recordTime, setRecordTime] = useState('00:00');
  const [recordSecs, setRecordSecs] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(0);
  const media = useRef();
  const insets = useSafeArea();
  const {contents} = useAppContent();
  const [TIPS, setTIPS] = useState(null);
  const [textTIPS, setTextTIPS] = useState([{}]);
  // const [allTip, setAllTips] = useState([{}]);
  const [browseVisible, setBrowseVisible] = useState(false);

  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [carouselRef, setCarouselRef] = useState(null);
  const shuffle = (tips) => {
    return tips.sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    if (contents && contents.length > 0) {
      let audioIntroTips = contents.filter((c) => c.type === 'tips');
      setTIPS(shuffle(audioIntroTips));
    }
  }, [contents]);

  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
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

  const formatSeconds = (mss, type) => {
    let third = parseInt(mss.split(':')[2]);
    let second = parseInt(mss.split(':')[1]);
    let all_time = second * 100 + third;
    if (all_time > 30) {
      if (type === 'Modal') {
        navigation.goBack();
      }
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

  useEffect(() => {
    return () => {
      setRecordTime('00:00');
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removeRecordBackListener();
      setExpanded(false);
    };
  }, []);

  const startPress = async (type) => {
    stopIntroPlayer();
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await request(PERMISSIONS.IOS.MICROPHONE);
        if (permissionStatus === RESULTS.GRANTED) {
          setExpanded(true);
          startRecording(type);
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
          startRecording(type);
        } else {
          navigation.navigate('MicPermissionModal');
        }
      } catch (e) {
        setExpanded(false);
      }
    }
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
      logSelectedTip(TIPS[page]);
      navigation.navigate('PreviewIntro', {
        media: media.current,
        mediaDuration: tmp_duration,
        callBack,
      });
    } catch (e) {}
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

  const clickClose = () => {
    stopIntroPlayer();
    audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordSecs(0);
    setRecordTime('00:00');
    setLoader(false);
    navigation.goBack();
  };

  const startRecording = async (type) => {
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
          type,
        ),
      );
      return;
    });
  };

  const togglePlay = async (item, length) => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (item !== currentVoice) {
      setCurrentVoice(item);
      setPlayerLoader(true);
      // console.log('length of tip voice:', length);
      setDuration(length);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(item);
    } else if (item === currentVoice) {
      stopIntroPlayer();
      setDuration(0);
    }
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

  const hideModal = () => {
    setBrowseVisible(false);
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

  const addItem = (item) => {
    // setTIPS([...TIPS, item]);
    setTIPS([item, ...TIPS]);
    carouselRef.snapToItem(0, true);
    hideModal();
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <ImageBackground
        defaultSource={require('../../Assets/Image/voiceIntro.png')}
        source={require('../../Assets/Image/voiceIntro.png')}
        style={styles.flex}
        resizeMode="cover">
        <View style={[styles.header, {marginTop: insets.top + 6}]}>
          <TouchableOpacity style={styles.back} onPress={clickClose}>
            <DeleteIcon
              color={AppColors.AppBlack + 'B8'}
              width={24}
              height={24}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{t('AddVoice.Title')}</Text>
          <Text style={styles.description}>
            {t('AddVoice.Text1')}{'\n'}
            {t('AddVoice.Text2')}
          </Text>
        </View>

        <View style={styles.container}>
          {!!TIPS && TIPS.length > 1 && (
            <Carousel
              ref={(c) => setCarouselRef(c)}
              data={TIPS}
              loop={false}
              firstItem={0}
              // scrollEnabled={!expanded}
              // enableSnap={!expanded}
              renderItem={({item, index}) => (
                <SingleIntroTip
                  item={item}
                  index={index}
                  isPlay={isPlay}
                  playerLoader={playerLoader}
                  togglePlay={togglePlay}
                  page={page}
                  expanded={expanded}
                  stopIntroPlayer={stopIntroPlayer}
                  setBrowseVisible={setBrowseVisible}
                />
              )}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 52}
              removeClippedSubviews={false}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
              onBeforeSnapToItem={(index) => {
                stopIntroPlayer();
                setPage(index);
              }}
            />
          )}
        </View>

        <View style={[styles.footer, {marginBottom: insets.bottom + 6}]}>
          {expanded ? (
            <>
              {recordSecs < 5000 && (
                <Text style={styles.please}>
                  {t('AddVoice.Please')}
                  <Text style={styles.bold}> {t('AddVoice.Seconds')}</Text>
                </Text>
              )}
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
            </>
          ) : (
            <>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.startButton}
                onPress={() => startPress('Normal')}>
                <View style={styles.border}>
                  <VoiceIcon
                    color={AppColors.white}
                    width={screenHeight > 700 ? 30 : 20}
                    height={screenHeight > 700 ? 30 : 20}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.record}>{t('AddVoice.Click')}</Text>
            </>
          )}
        </View>
      </ImageBackground>

      <Modal animationType="fade" transparent={true} visible={browseVisible}>
        <BrowseTipsModal showedTips={TIPS} hide={hideModal} addItem={addItem} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  flex: {
    justifyContent: 'space-between',
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
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 25,
    color: AppColors.IconColor,
    marginBottom: 21,
    marginTop: 12,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: AppColors.AppBlack,
  },
  record: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: AppColors.AppBlack + 'EB',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderRadius: 34,
    width: screenHeight > 700 ? 67 : 50,
    height: screenHeight > 700 ? 67 : 50,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  border: {
    width: screenHeight > 700 ? 62 : 45,
    height: screenHeight > 700 ? 62 : 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    borderColor: AppColors.white,
    borderWidth: 2,
  },
  footer: {
    alignItems: 'center',
    height: 97,
    justifyContent: 'flex-end',
  },
  please: {
    color: AppColors.AppColors,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 19,
    marginBottom: 15,
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  tip: {
    paddingHorizontal: 20,
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

export default AddVoiceIntro;
