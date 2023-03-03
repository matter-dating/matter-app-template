import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import {useSafeArea} from 'react-native-safe-area-context';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import BackIcon from '../../Assets/Svg/BackIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import EditIcon from '../../Assets/Svg/EditIcon';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';

const PreviewPromptScreen = ({navigation, route}) => {
  const {question, media, mediaDuration, callBack} = route.params;
  const [isPlay, setIsPlay] = useState(false);
  const [loader, setLoader] = useState(false);
  const insets = useSafeArea();
  const fillValue = useRef(new Animated.Value(0)).current;

  const clickDone = async () => {
    audioRecorderPlayer.stopPlayer();
    setIsPlay(false);
    audioRecorderPlayer.removePlayBackListener();
    setLoader(false);
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

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={styles.flex}>
        <View style={[styles.header, {paddingTop: insets.top + 8}]}>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={24} height={24} color={Colors.MainColor} />
            </TouchableOpacity>
            <Text style={styles.title}>My prompt</Text>
            <View style={styles.empty} />
          </View>
          <Text style={styles.description}>{''}</Text>
        </View>

        <View style={styles.container}>
          <View style={styles.player}>
            <Text style={styles.question}>{question}</Text>
            <View style={styles.control}>
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
              <TouchableOpacity style={styles.button} onPress={togglePlay}>
                {isPlay ? (
                  <PauseIcon
                    width={17}
                    height={17}
                    color={AppColors.MainColor}
                  />
                ) : (
                  <PlayIcon
                    width={17}
                    height={17}
                    color={AppColors.MainColor}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <EditIcon width={17} height={17} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
          <TouchableOpacity style={styles.save} onPress={clickDone}>
            <Text style={styles.buttonText}>Save & close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  flex: {
    justifyContent: 'space-around',
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    marginLeft: 'auto',
    width: 45,
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    color: AppColors.black,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  empty: {
    width: 24,
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.MainColor,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 32,
  },
  footer: {
    marginHorizontal: 26,
  },
  save: {
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    borderRadius: 26,
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
    paddingLeft: 18,
    paddingTop: 24,
    paddingBottom: 32,
    paddingRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    justifyContent: 'space-between',
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
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  question: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
  },
});

export default PreviewPromptScreen;
