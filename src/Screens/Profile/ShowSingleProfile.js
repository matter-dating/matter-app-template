import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import HttpQuery from '../../Api/HttpQuery';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import SingleProfile from '../../Components/Home/SingleProfile';
import CustomText from '../../Components/Common/Text';

import BackIcon from '../../Assets/Svg/BackIcon';
import LikeIcon from '../../Assets/Svg/LikeIcon';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayerEdit = new AudioRecorderPlayer();

function ShowSingleProfile({route, navigation}) {
  const {profile_id, likeContent} = route.params;
  const api = new HttpQuery();
  const insets = useSafeArea();
  const [profile, setProfile] = useState(null);

  const [currentVoice, setCurrentVoice] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);

  useEffect(() => {
    api.getSingle(profile_id, setProfile);
  }, []);

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayerEdit.stopPlayer();
      audioRecorderPlayerEdit.removePlayBackListener();
      setCurrentVoice(null);
      setPlayerLoader(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={20} height={20} color={Colors.black + 'D6'} />
          </TouchableOpacity>
          <View style={styles.icon}>
            <CustomText.TitleText style={styles.title}>
              Matched with you
            </CustomText.TitleText>
            <LikeIcon width={15} height={15} color={AppColors.red} />
          </View>
          <View style={styles.empty} />
        </View>
      </View>
      {profile ? (
        <View style={styles.flex}>
          <SingleProfile
            profile={profile}
            nextItem={() => {}}
            likeContent={likeContent}
            audioRecorderPlayer={audioRecorderPlayerEdit}
            currentVoice={currentVoice}
            setCurrentVoice={setCurrentVoice}
            stopIntroPlayer={stopIntroPlayer}
            isPlay={isPlay}
            setIsPlay={setIsPlay}
            playerLoader={playerLoader}
            setPlayerLoader={setPlayerLoader}
            noBlur={true}
            isModal={false}
            hideLike={true}
          />
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
    flex: 1,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginHorizontal: 12,
    fontSize: 14,
    lineHeight: 25,
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
  },
  empty: {
    width: 24,
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
});

export default ShowSingleProfile;
