import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {useAuth} from '../../Providers/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import ProfilePreferences from '../../Components/Home/ProfilePreferences';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';
import NextIcon from '../../Assets/Svg/NextIcon';
import UpArrowIcon from '../../Assets/Svg/UpArrowIcon';

import EditHobbie from '../../Components/EditProfile/EditHobbie';
import EditInsta from '../../Components/EditProfile/EditInsta';
import EditMusic from '../../Components/EditProfile/EditMusic';
import EditPrompt from '../../Components/EditProfile/EditPrompt';
import EditMovie from '../../Components/EditProfile/EditMovie';
import EditImage from '../../Components/EditProfile/EditImage';
import EditAudioIntro from '../../Components/EditProfile/EditAudioIntro';

const EditProfile = ({
  profile,
  audioRecorderPlayer,
  currentVoice,
  setCurrentVoice,
  stopIntroPlayer,
  isPlay,
  setIsPlay,
  playerLoader,
  setPlayerLoader,
}) => {
  const navigation = useNavigation();
  const {user, userData, userCards, deleteCard, createCard} = useAuth();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [duration, setDuration] = useState(0);
  const fillValue = useRef(new Animated.Value(0)).current;

  const scrollRef = useRef(null);

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

  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
    setIsPlay(false);
    if (currentVoice) {
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition > 0) {
          setIsPlay(true);
          setPlayerLoader(false);
        }
        if (e.currentPosition === e.duration) {
          setIsPlay(false);
          setCurrentVoice(null);
          audioRecorderPlayer.stopPlayer();
        }
      });
    }
  }, [currentVoice]);

  const togglePlay = async (item, sec) => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (item !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(item);
      setDuration(sec);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(item);
    } else if (item === currentVoice) {
      stopIntroPlayer();
      setDuration(0);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.safe}>
        <ScrollView
          ref={scrollRef}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={false}>
          <View style={styles.safe}>
            <EditImage
              stopIntroPlayer={stopIntroPlayer}
              userData={userData}
              setScrollEnabled={setScrollEnabled}
            />
          </View>
          <View>
            <EditAudioIntro
              fillValue={fillValue}
              userCards={userCards}
              togglePlay={togglePlay}
              stopIntroPlayer={stopIntroPlayer}
              currentVoice={currentVoice}
              isPlay={isPlay}
              playerLoader={playerLoader}
            />
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopIntroPlayer();
                  navigation.navigate('Information');
                }}>
                <CustomText.TitleText style={styles.title}>
                  Edit my information
                </CustomText.TitleText>
                <NextIcon
                  width="15"
                  height="15"
                  color={AppColors.AppBlack + 'A3'}
                />
              </TouchableOpacity>
              <ProfilePreferences
                stopIntroPlayer={stopIntroPlayer}
                userInfo={profile.user_info}
              />
            </View>

            <EditHobbie
              stopIntroPlayer={stopIntroPlayer}
              userCards={userCards}
            />
            <EditInsta
              stopIntroPlayer={stopIntroPlayer}
              userCards={userCards}
              user={user}
              deleteCard={deleteCard}
              createCard={createCard}
            />
            <EditMusic
              stopIntroPlayer={stopIntroPlayer}
              userCards={userCards}
              currentVoice={currentVoice}
              playerLoader={playerLoader}
              isPlay={isPlay}
              togglePlay={togglePlay}
            />
            <EditPrompt
              togglePlay={togglePlay}
              stopIntroPlayer={stopIntroPlayer}
              userCards={userCards}
              fillValue={fillValue}
              isPlay={isPlay}
              currentVoice={currentVoice}
              playerLoader={playerLoader}
            />
            <EditMovie
              stopIntroPlayer={stopIntroPlayer}
              userCards={userCards}
              type="tv-show"
            />
            <EditMovie
              stopIntroPlayer={stopIntroPlayer}
              userCards={userCards}
              type="movie"
            />
          </View>
          <View style={styles.center}>
            <TouchableOpacity
              style={styles.up}
              onPress={() =>
                scrollRef.current?.scrollTo({
                  y: 0,
                  animated: true,
                })
              }>
              <UpArrowIcon
                color={AppColors.MainColor1 + 'CC'}
                width={44}
                height={44}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  safe: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: AppColors.IconColor + 'E6',
    lineHeight: 20,
  },
  pending: {
    fontSize: 12,
    color: '#359EBE',
    fontFamily: 'Poppins-LightItalic',
  },
  button: {
    borderRadius: 6,
    paddingVertical: 22,
    marginBottom: 2,
    marginHorizontal: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  box: {
    marginBottom: 12,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  up: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    transform: [{rotate: '180deg'}],
  },
  center: {
    marginVertical: 28,
    alignItems: 'center',
  },
});

export default EditProfile;
