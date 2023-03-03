import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Linking,
  Alert,
  Image,
  Animated,
  Easing,
  Modal,
  Dimensions,
} from 'react-native';
import {useAuth} from '../Providers/AuthProvider';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {useScrollToTop, useFocusEffect} from '@react-navigation/native';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import {S3_PHOTO_URL} from '../Utils/Constants';
import SettingIcon from '../Assets/Svg/SettingIcon';
import NextIcon from '../Assets/Svg/NextIcon';
import VerificationIcon from '../Assets/Svg/VerificationIcon';
import VoiceIcon from '../Assets/Svg/VoiceIcon';
import PlayIcon from '../Assets/Svg/PlayBigIcon';
import PauseIcon from '../Assets/Svg/PauseIcon';
import ExclamationIcon from '../Assets/Svg/ExclamationIcon';
import DrawIcon from '../Assets/Svg/DrawIcon';
import ShowIcon from '../Assets/Svg/ShowIcon';
import EditIcon from '../Assets/Svg/DrawIcon';
import CustomImage from '../Components/Common/CustomImage';
import ProfileVerification from '../Components/Profile/ProfileVerification';
import PremiumBanner from '../Components/Profile/PremiumBanner';
// import GameStatus from '../Components/Profile/GameStatus';
import {usePremium} from '../Providers/PremiumProvider';
import {useAppFlag} from '../Providers/AppFlagProvider';
import AudioMoreModal from './Modals/AudioMoreModal';

import AddVoiceTutorial from '../Components/Tutorial/AddVoiceTutorial';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

const {height: screenHeight} = Dimensions.get('window');
const safetyURL = 'https://matter.dating/community';
function NewProfileScreen({navigation}) {
  const insets = useSafeArea();
  const {
    user,
    userData,
    userCards,
    userVerification,
    // userInvitation,
    getFormattedProfile,
    voiceProblem,
  } = useAuth();
  const [profile, setProfile] = useState(getFormattedProfile());
  const [audioCard, setAudioCard] = useState(null);
  const {isPremium, processPurchases} = usePremium();
  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  // VoiceIntro Tutorial
  const {checkFlag, setFlag} = useAppFlag();
  const [showTutorial, setShowTutorial] = useState(false);
  const ref = useRef(null);

  useFocusEffect(
    useCallback(() => {
      processPurchases();
    }, []),
  );

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setCurrentVoice(null);
      setPlayerLoader(false);
    }
  };
  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);
  useEffect(() => {
    user && setProfile(getFormattedProfile());
  }, [user, userData, userCards]);

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
    }
  }, [currentVoice]);

  useEffect(() => {
    fillValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration:
          parseInt(JSON.parse(audioCard[0].content).duration, 10) * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  useEffect(() => {
    if (
      audioCard &&
      audioCard.length === 0 &&
      checkFlag('add_voice_tutorial') === null
    ) {
      ref.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setShowTutorial(true);
    }
  }, [audioCard]);

  const clickHideTutorial = () => {
    setFlag('add_voice_tutorial', 'true');
    setShowTutorial(false);
  };

  useEffect(() => {
    setAudioCard(profile.user_cards.filter((c) => c.type === 'voice-intro'));
  }, [profile.user_cards]);

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('NewProfile');
  };

  const renderVerificationBadge = () => {
    if (userVerification.length === 0) {
      return <></>;
    }
    if (
      profile.user_info.user_id === userVerification[0].user_id &&
      userVerification[0].status === 1
    ) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };

  useScrollToTop(ref);

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(safetyURL);
    if (supported) {
      await Linking.openURL(safetyURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${safetyURL}`);
    }
  };

  const clickEditIcon = (index) => {
    stopIntroPlayer();
    setEditVisible(true);
  };

  const hideModal = (reported) => {
    setEditVisible(false);
  };

  const togglePlay = async () => {
    setIsPlay(false);
    setPlayerLoader(false);
    await audioRecorderPlayer.stopPlayer();
    if (JSON.parse(audioCard[0].content).media !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(JSON.parse(audioCard[0].content).media);
      audioRecorderPlayer.startPlayer(JSON.parse(audioCard[0].content).media);
    } else if (JSON.parse(audioCard[0].content).media === currentVoice) {
      stopIntroPlayer();
    }
  };

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.wrap}>
      {showTutorial && (
        <AddVoiceTutorial
          isPremium={isPremium}
          userData={userData}
          color={'#79C9E1'}
          hide={clickHideTutorial}
        />
      )}
      <View style={[styles.setting, {marginTop: insets.top}]}>
        <TouchableOpacity
          style={styles.click}
          onPress={() => {
            stopIntroPlayer();
            navigation.navigate('Settings');
          }}>
          <View style={styles.icon}>
            <SettingIcon
              width="20"
              height="20"
              color={AppColors.AppBlack + 'F0'}
            />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        ref={ref}
        // contentContainerStyle={}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <CustomImage
            style={styles.image}
            source={{
              uri:
                S3_PHOTO_URL + profile.user_info.profile_hd_images[0] + '.jpg',
            }}
          />
          <View style={styles.nameWrap}>
            <Text style={styles.name} numberOfLines={1}>
              {userData.first_name}
            </Text>
            {renderVerificationBadge()}
          </View>
          {isPremium && (
            <Text style={styles.premium} numberOfLines={1}>
              Premium member
            </Text>
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.fixButton]}
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('MyProfile');
              }}>
              <ShowIcon width="13" height="13" color={AppColors.MainColor} />
              <Text style={styles.buttonText}>View profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.fixButton]}
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('EditProfile');
              }}>
              <DrawIcon width="13" height="13" color={AppColors.MainColor} />
              <Text style={styles.buttonText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          {userData.status === 8 && (
            <View>
              <View style={styles.alertRow}>
                <View style={styles.alert}>
                  <ExclamationIcon
                    width={3}
                    height={21}
                    color={AppColors.white}
                  />
                </View>
                <Text style={styles.error}>
                  Your account is temporarily suspended until you upload a main
                  photo that clearly shows your face
                </Text>
              </View>
            </View>
          )}
          {audioCard && audioCard.length === 0 ? (
            <View style={styles.center}>
              <View style={styles.alertRow}>
                <View style={styles.alert}>
                  <ExclamationIcon
                    width={3}
                    height={21}
                    color={AppColors.white}
                  />
                </View>
                <View>
                  <Text style={styles.addVoice} numberOfLines={1}>
                    You are hidden from other users
                  </Text>
                  <Text style={styles.chance} numberOfLines={1}>
                    Upload voice intro to get noticed
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  stopIntroPlayer();
                  navigation.navigate('AddVoiceIntro', {
                    callBack: ReturnVoiceCreateProfile,
                  });
                }}
                style={[styles.button, styles.addButton]}>
                <VoiceIcon width={16} height={16} color={AppColors.white} />
                <Text style={[styles.buttonText, styles.buttonWhiteText]}>
                  Upload Voice intro
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                if (voiceProblem && voiceProblem !== 'PASSED') {
                  stopIntroPlayer();
                  navigation.push('VoiceIntroReview');
                }
              }}
              activeOpacity={1}
              style={styles.whiteItem}>
              {voiceProblem && voiceProblem !== 'PASSED' && (
                <View style={styles.row}>
                  <View style={styles.red}>
                    <ExclamationIcon
                      width={3}
                      height={17}
                      color={AppColors.white}
                    />
                  </View>
                  <Text style={styles.problem}>
                    Problem with your voice intro
                  </Text>
                </View>
              )}
              <View style={styles.whiteButton}>
                <View style={styles.player}>
                  <Text style={styles.title}>My voice intro</Text>
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
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    style={styles.edit}
                    onPress={() => {
                      togglePlay(
                        JSON.parse(audioCard[0].content).media,
                        parseInt(
                          JSON.parse(audioCard[0].content).duration,
                          10,
                        ) * 1000,
                      );
                    }}>
                    {playerLoader &&
                    currentVoice === JSON.parse(audioCard[0].content).media ? (
                      <LottieView
                        source={require('../Assets/Animation/player.json')}
                        autoPlay
                        loop
                        style={styles.loader}
                      />
                    ) : isPlay &&
                      currentVoice ===
                        JSON.parse(audioCard[0].content).media ? (
                      <PauseIcon
                        width={screenHeight > 700 ? 17 : 12}
                        height={screenHeight > 700 ? 17 : 12}
                        color={AppColors.white}
                      />
                    ) : (
                      <PlayIcon
                        width={screenHeight > 700 ? 17 : 12}
                        height={screenHeight > 700 ? 17 : 12}
                        color={AppColors.white}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.edit} onPress={clickEditIcon}>
                    <EditIcon
                      width={screenHeight > 700 ? 17 : 12}
                      height={screenHeight > 700 ? 17 : 12}
                      color={AppColors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.footer}>
          {/* GameStatue */}
          {/* {!!userInvitation && userInvitation.length > 0 && (
            <GameStatus
              stopIntroPlayer={stopIntroPlayer}
              userInvitation={userInvitation}
            />
          )} */}
          {/* Premium Banner */}
          {!isPremium && <PremiumBanner stopIntroPlayer={stopIntroPlayer} />}
          <View style={styles.linkList}>
            {/* Settings */}
            {/* <TouchableOpacity
              style={styles.link}
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('Settings');
              }}>
              <View style={styles.icon}>
                <SettingIcon
                  width="14"
                  height="14"
                  color={AppColors.AppBlack + 'CC'}
                />
              </View>
              <Text style={styles.linkText}>Settings</Text>
              <NextIcon
                width="15"
                height="15"
                color={AppColors.AppBlack + 'A3'}
              />
            </TouchableOpacity> */}
            {/* View My Profile */}
            {/* <TouchableOpacity
              style={styles.link}
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('MyProfile');
              }}>
              <View style={styles.icon}>
                <ShowIcon
                  width="14"
                  height="14"
                  color={AppColors.AppBlack + 'CC'}
                />
              </View>
              <Text style={styles.linkText}>View my profile</Text>
              <NextIcon
                width="15"
                height="15"
                color={AppColors.AppBlack + 'A3'}
              />
            </TouchableOpacity> */}
            {/* Upgrade membership */}
            {/* {isPremium && (
              <TouchableOpacity
                style={styles.link}
                onPress={() => {
                  stopIntroPlayer();
                  navigation.navigate('UpgradeModal', {start: 0});
                }}>
                <View style={[styles.icon, {transform: [{rotate: '270deg'}]}]}>
                  <NextIcon
                    width="14"
                    height="14"
                    color={AppColors.AppBlack + 'CC'}
                  />
                </View>
                <Text style={styles.linkText}>Upgrade membership</Text>
                <NextIcon
                  width="15"
                  height="15"
                  color={AppColors.AppBlack + 'A3'}
                />
              </TouchableOpacity>
            )} */}
            {/* Photo Verify */}
            <ProfileVerification
              styles={styles}
              userVerification={userVerification}
            />
            {/* Safety Matters */}
            <TouchableOpacity
              style={[styles.link, styles.lastLink]}
              onPress={() => {
                stopIntroPlayer();
                handlePress();
              }}>
              <View style={styles.icon}>
                <Image
                  style={styles.safetyIcon}
                  source={require('../Assets/Image/safety.png')}
                />
              </View>
              <Text style={styles.linkText}>Safety matters</Text>
              <NextIcon
                width="15"
                height="15"
                color={AppColors.AppBlack + 'A3'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {audioCard && audioCard.length > 0 && (
        <Modal animationType="fade" transparent={true} visible={editVisible}>
          <AudioMoreModal
            card={audioCard[0]}
            hide={hideModal}
            callBack={ReturnVoiceCreateProfile}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  image: {
    width: 138,
    height: 138,
    borderRadius: 69,
    marginBottom: 11,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  center: {
    alignItems: 'center',
  },
  body: {
    borderBottomWidth: 0.3,
    borderColor: '#B1B1B1',
    paddingBottom: 28,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  footer: {
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginHorizontal: 20,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 23,
    marginRight: 8,
    // flex: 1,
    color: AppColors.AppBlack,
    textAlign: 'center',
  },
  premium: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: AppColors.AppBlack,
    marginBottom: 11,
  },
  alertRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  alert: {
    width: 25,
    height: 25,
    borderRadius: 13,
    marginRight: 9,
    marginTop: 4,
    backgroundColor: AppColors.MainColor,
  },
  red: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 8,
    backgroundColor: '#E35C5C',
  },
  addVoice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 21,
    color: AppColors.AppBlack,
    marginBottom: 4,
  },
  chance: {
    color: AppColors.AppBlack,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: 'Poppins-Regular',
  },
  error: {
    color: '#E55E5E',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  fixButton: {
    marginHorizontal: 7,
    minWidth: 127,
    justifyContent: 'center',
  },
  addButton: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 11,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 21,
    marginLeft: 8,
  },
  buttonWhiteText: {
    fontSize: 13,
    marginLeft: 7,
    color: AppColors.white,
  },
  linkList: {
    backgroundColor: '#E6EBF0',
    borderRadius: 12,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#B1B1B1',
    padding: 20,
  },
  lastLink: {
    borderBottomWidth: 0,
  },
  linkText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    flex: 1,
    color: AppColors.AppBlack,
    lineHeight: 20,
    marginLeft: 9,
    marginRight: 'auto',
  },
  pending: {
    fontSize: 12,
    color: '#359EBE',
    fontFamily: 'Poppins-LightItalic',
  },
  icon: {
    width: 20,
    alignItems: 'center',
  },
  safetyIcon: {
    width: 10,
    height: 13,
  },
  bar: {
    backgroundColor: '#A2E3F5B3',
    borderRadius: 12,
    height: 5,
    width: '100%',
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
  player: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  problem: {
    fontSize: 11,
    lineHeight: 16,
    fontFamily: 'Poppins-Italic',
    color: AppColors.AppBlack,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginBottom: 8,
  },
  edit: {
    width: screenHeight > 700 ? 38 : 30,
    height: screenHeight > 700 ? 38 : 30,
    borderRadius: 19,
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  whiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  whiteItem: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  setting: {
    alignItems: 'flex-end',
  },
  click: {
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewProfileScreen;
