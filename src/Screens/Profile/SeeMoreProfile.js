import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {useAuth} from '../../Providers/AuthProvider';
import {useAppFlag} from '../../Providers/AppFlagProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import SingleProfile from '../../Components/Home/SingleProfile';
import CustomText from '../../Components/Common/Text';
import {logReject} from '../../Utils/Analytics';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MessageTutorial from '../../Components/Tutorial/MessageTutorial';
const audioRecorderPlayerEdit = new AudioRecorderPlayer();

function SeeMoreProfile({route, navigation}) {
  const {user} = useAuth();
  const {profile, likeContent} = route.params;
  const insets = useSafeArea();
  const [currentVoice, setCurrentVoice] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const {checkFlag, setFlag} = useAppFlag();
  const [showTutorial, setShowTutorial] = useState(false);

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayerEdit.stopPlayer();
      audioRecorderPlayerEdit.removePlayBackListener();
      setCurrentVoice(null);
      setPlayerLoader(false);
    }
  };

  const clickHideTutorial = () => {
    setFlag('first_message', 'true');
    setShowTutorial(false);
  };

  useEffect(() => {
    if (
      !!likeContent &&
      likeContent.message !== '' &&
      checkFlag('first_message') !== null
    ) {
      setShowTutorial(true);
    }
  }, [likeContent]);

  const sendReject = () => {
    user.callFunction('sendReject', [profile.user_info.user_id, 'REJECT']);
    logReject(profile.user_info.user_id);
    navigation.goBack();
  };

  return (
    <View style={styles.wrap}>
      {showTutorial && (
        <MessageTutorial likeContent={likeContent} hide={clickHideTutorial} />
      )}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.empty}>
          {!!likeContent && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon width={24} height={24} color={AppColors.AppBlack} />
            </TouchableOpacity>
          )}
        </View>
        <CustomText.TitleText style={styles.title}>
          {profile.user_info.first_name}’s full profile
        </CustomText.TitleText>
        <View style={styles.empty} />
      </View>
      {profile ? (
        <View style={styles.flex}>
          <SingleProfile
            profile={profile}
            audioRecorderPlayer={audioRecorderPlayerEdit}
            currentVoice={currentVoice}
            setCurrentVoice={setCurrentVoice}
            stopIntroPlayer={stopIntroPlayer}
            noBlur={true}
            likeContent={likeContent}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            playerLoader={playerLoader}
            setPlayerLoader={setPlayerLoader}
            hideLike={false}
            isModal={true}
          />
          {!!likeContent ? (
            <View style={[styles.reject, {bottom: insets.bottom + 15}]}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => sendReject()}>
                <DeleteIcon color={AppColors.white} width={24} height={24} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.absolute, {bottom: insets.bottom + 20}]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopIntroPlayer();
                  navigation.goBack();
                }}>
                <Text style={styles.close}>Close full profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.indicator}>
          <LottieView
            source={require('../../Assets/Animation/loader.json')}
            autoPlay
            loop
            style={styles.disableTouch}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
    justifyContent: 'space-between',
  },
  flex: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  empty: {
    width: 88,
  },
  title: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disableTouch: {
    zIndex: 20,
    width: 61,
  },
  close: {
    color: AppColors.white,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reject: {
    position: 'absolute',
    left: 20,
  },
  rejectButton: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SeeMoreProfile;
