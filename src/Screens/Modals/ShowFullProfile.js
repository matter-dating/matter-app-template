import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import AppColors from '../../Utils/AppColors';
import Colors from '../../Utils/Colors';
import SingleProfile from '../../Components/Home/SingleProfile';

function ShowFullProfile({
  hide,
  profile,
  audioRecorderPlayer,
  currentVoice,
  setCurrentVoice,
  stopIntroPlayer,
  isPlay,
  setIsPlay,
  playerLoader,
  setPlayerLoader,
  widthAnimation,
  setLikedId,
  noBlur,
}) {
  const insets = useSafeArea();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[styles.header, {paddingTop: insets.top + 8}]}>
          <Text style={styles.title}>
            {profile.user_info.first_name}’s full profile
          </Text>
        </View>
        {profile ? (
          <View style={styles.flex}>
            <SingleProfile
              profile={profile}
              audioRecorderPlayer={audioRecorderPlayer}
              currentVoice={currentVoice}
              setCurrentVoice={setCurrentVoice}
              stopIntroPlayer={stopIntroPlayer}
              isPlay={isPlay}
              setIsPlay={setIsPlay}
              playerLoader={playerLoader}
              setPlayerLoader={setPlayerLoader}
              isModal={true}
              widthAnimation={widthAnimation}
              hideShowModal={hide}
              setLikedId={setLikedId}
              noBlur={noBlur}
            />
            <View style={[styles.absolute, {bottom: insets.bottom + 20}]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopIntroPlayer();
                  hide();
                }}>
                <Text style={styles.close}>Close full profile</Text>
              </TouchableOpacity>
            </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.colorF56,
    justifyContent: 'space-between',
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
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
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
  flex: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    lineHeight: 25,
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
  },
});

export default ShowFullProfile;
