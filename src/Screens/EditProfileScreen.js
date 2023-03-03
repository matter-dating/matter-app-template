import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useAuth} from '../Providers/AuthProvider';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import CustomText from '../Components/Common/Text';
import BackIcon from '../Assets/Svg/BackIcon';

import EditProfile from './Profile/EditProfile';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

function EditProfileScreen({navigation}) {
  const insets = useSafeArea();
  const {user, userData, userCards, getFormattedProfile} = useAuth();
  const [profile, setProfile] = useState(getFormattedProfile());
  const [currentVoice, setCurrentVoice] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);

  useEffect(() => {
    user && setProfile(getFormattedProfile());
  }, [user, userData, userCards]);

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setCurrentVoice(null);
      setPlayerLoader(false);
    }
  };
  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.empty}
            onPress={() => {
              stopIntroPlayer();
              navigation.goBack();
            }}>
            <BackIcon
              width={24}
              height={24}
              color={AppColors.AppBlack + 'F0'}
            />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            Edit my profile
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        {user.customData && user.customData.status === 8 && (
          <View style={styles.errorWrap}>
            <Text style={styles.error}>
              Your account is temporarily suspended until you upload a main
              photo that clearly shows your face
            </Text>
            {/* <Text style={styles.error}>(Upload a real main photo)</Text> */}
          </View>
        )}
      </View>
      <View style={styles.flex}>
        <EditProfile
          profile={profile}
          audioRecorderPlayer={audioRecorderPlayer}
          currentVoice={currentVoice}
          setCurrentVoice={setCurrentVoice}
          stopIntroPlayer={stopIntroPlayer}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          playerLoader={playerLoader}
          setPlayerLoader={setPlayerLoader}
        />
      </View>
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
    padding: 12,
    paddingBottom: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    color: AppColors.MainColor1,
  },
  errorWrap: {
    marginBottom: 15,
    paddingHorizontal: 30,
  },
  error: {
    color: '#E55E5E',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  empty: {
    width: 45,
    height: 45,
  },
});

export default EditProfileScreen;
