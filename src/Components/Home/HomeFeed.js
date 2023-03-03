import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  Easing,
  Modal,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/core';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-snap-carousel';
import Toast from '../../Assets/Package/react-native-toast-message';
import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';

import HappyHour from '../Audio/HappyHour';
import AddVoice from '../Audio/AddVoice';
import GoPremium from './GoPremium';
import AddVoiceMore from './AddVoiceMore';
import VoiceUploaded from './VoiceUploaded';
import ComeBack from './ComeBack';
import NextCards from './NextCards';
import PremiumStack from './PremiumStack';
import TrulyEmpty from './TrulyEmpty';
import WidenPreference from './WidenPreference';
import WidenRadius from './WidenRadius';
import TurnOnGlobal from './TurnOnGlobal';
// import DisconnectModal from '../Empty/DisconnectModal';
import ProfileFeed from '../Profile/ProfileFeed';
import AppColors from '../../Utils/AppColors';
import FilterIcon from '../../Assets/Svg/FilterIcon';
import HatIcon from '../../Assets/Svg/HatIcon';

import HttpQuery from '../../Api/HttpQuery';
import {useAuth} from '../../Providers/AuthProvider';
import PurchaseLoader from '../../Components/Common/PurchaseLoader';

import HomeTutorialModal from '../../Screens/Modals/HomeTutorialModal';
import TurnOnNotificationModal from '../../Screens/Modals/TurnOnNotificationModal';
import NewProfiles from '../../Screens/Modals/NewProfiles';
import NewLikeModal from '../../Screens/Modals/NewLikeModal';
import ShowFullProfile from '../../Screens/Modals/ShowFullProfile';

import RNFS, {DocumentDirectoryPath} from 'react-native-fs';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useAppFlag} from '../../Providers/AppFlagProvider';
import {
  logClickNext,
  logPlayVoiceIntro,
  logProfilePresent,
} from '../../Utils/Analytics';
import {usePremium} from '../../Providers/PremiumProvider';
import {useAppContent} from '../../Providers/AppContentProvider';
const audioRecorderPlayer = new AudioRecorderPlayer();

const dirPath =
  DocumentDirectoryPath + '/matter-profile-photos.s3-us-west-1.amazonaws.com';

const HomeFeed = ({latestHappyHour, userData, scrollToTop}) => {
  const [carouselRef, setCarouselRef] = useState(null);
  const {activeSpeakeasy} = useAppContent();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const {user, userInvitation, userCards, updateUserData} = useAuth();
  const {checkFlag, updateFlag} = useAppFlag();
  const api = new HttpQuery();
  const [profiles, setProfiles] = useState([]);
  const [pro, setPro] = useState(null);

  const [duration, setDuration] = useState(null);
  const widen_preference = useRef(false);

  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [extraData, setExtraData] = useState([]);
  const [currentVoice, setCurrentVoice] = useState(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [tipVisible, setTipVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [newProfiles, setNewProfiles] = useState(false);
  const [isShowModal, setIsShowModal] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const {expirationDate, processPurchases} = usePremium();

  const [showWiden, setShowWiden] = useState(true);

  const [showFull, setShowFull] = useState(false);
  const [showProfile, setShowProfile] = useState(null);

  const [likeVisible, setLikeVisible] = useState(false);
  const [pass, setPass] = useState([]);
  const degree = useRef(new Animated.Value(0)).current;
  const [fadeValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (userInvitation.length > 0) {
      processPurchases();
      api.get(
        [],
        (result) => {
          setProfiles(result.data);
          setExtraData(result.extra_data);
        },
        expirationDate.current,
      );
    }
  }, [userInvitation.length]);

  const animated = () => {
    Animated.timing(degree, {
      toValue: 1,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      degree.setValue(0);
      animated();
    });
  };

  useEffect(() => {
    if (!!latestHappyHour && latestHappyHour.status === 'happening') {
      animated();
    } else {
      degree.setValue(0);
    }
  }, [latestHappyHour]);

  useEffect(() => {
    if (activeSlide === 0) {
      fadeValue.setValue(0);
    } else {
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [activeSlide]);

  useEffect(() => {
    if (scrollToTop && carouselRef) {
      carouselRef.snapToItem(0, true);
      navigation.setParams({scrollToTop: false});
    }
  }, [scrollToTop, carouselRef]);

  useFocusEffect(
    useCallback(() => {
      var should_reload_home = null;
      if (checkFlag('should_reload_home') !== null) {
        should_reload_home = checkFlag('should_reload_home').value;
      }
      if (
        should_reload_home &&
        parseInt(should_reload_home, 10) > Date.now() + 2 * 60 * 60 * 1000
      ) {
        setProfiles([]);
        setIsReady(false);
        setPro(null);
        updateFlag('should_reload_home', Date.now().toString());
        setActiveSlide(0);
        processPurchases();
        api.get(
          [],
          (result) => {
            setProfiles(result.data);
            setExtraData(result.extra_data);
          },
          expirationDate.current,
        );
      }
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      if (extraData.is_empty) {
        setProfiles(profiles.concat({type: extraData.reason}));
      }
      if (extraData.is_first_new) {
        setNewProfiles(true);
      } else if (extraData.is_preference_expanded && showWiden) {
        setShowWiden(false);
        Toast.show({
          position: 'top',
          type: 'widen',
          text1: 'We widened your preferences',
          text2: 'In order to show you people',
          topOffset: 0,
          visibilityTime: 2000,
        });
      }
    }, [extraData]),
  );

  useEffect(() => {
    if (!userData.fcm_token && !newProfiles) {
      setNotificationVisible(true);
    }
  }, [userData]);

  // useEffect(() => {
  // }, [extraData]);

  useEffect(() => {
    if (profiles.length > 0) {
      setPro(
        profiles.filter((x) => x.type === undefined).filter((c) => !!c._id),
      );
    }
  }, [profiles]);

  useEffect(() => {
    if (!!pro && pro.length === 0) {
      // Active Profile baihgui uyd
      setIsReady(true);
    }
    if (!!pro && pro.length > 0) {
      RNFS.readDir(dirPath)
        .then((result) => {
          if (result.length > 0) {
            const filePath =
              dirPath + '/' + pro[0].user_info.profile_hd_images[0] + '.jpg';
            RNFS.exists(filePath).then((res) => {
              if (res) {
                // Hamgiin ehnii zurag bgaa buyu cache hiigdsen uyd
                setIsReady(true);
              } else {
                // Hamgiin ehnii zurag bhgui buyu cache hiigdeegui uyd
                RNFS.unlink(
                  DocumentDirectoryPath +
                    '/matter-profile-photos.s3-us-west-1.amazonaws.com',
                )
                  .then(() => {
                    // Folder ustgaad create
                    RNFS.mkdir(dirPath).then(() => {
                      setIsReady(true);
                    });
                  })
                  .catch((err) => {
                    console.log(err.message);
                    setIsReady(true);
                  });
              }
            });
          } else {
            // Cache file baihgui uyd
            setIsReady(true);
          }
        })
        .catch((e) => {
          // Cache folder baihgui uyd buyu first access
          RNFS.mkdir(dirPath);
          setIsReady(true);
        });
    }
  }, [pro]);

  useEffect(() => {
    if (isReady) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [isReady]);

  const seeMoreProfile = (profile) => {
    setShowFull(true);
    setShowProfile(profile);
  };
  const hideShowModal = () => {
    setShowFull(false);
    setShowProfile(null);
  };
  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
    if (currentVoice) {
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition > 0) {
          setPlayerLoader(false);
          setIsPlay(true);
        }
        if (parseInt(e.currentPosition / 100) === 35) {
          if (profiles[activeSlide] && profiles[activeSlide].user_info) {
            user.callFunction('playedVoiceIntro', [
              profiles[activeSlide].user_info.user_id,
            ]);
            profiles[activeSlide].user_info.is_played = true;
          }
        }
        if (e.currentPosition === e.duration) {
          user.callFunction('playedVoiceIntro', [
            profiles[activeSlide].user_info.user_id,
          ]);
          profiles[activeSlide].user_info.is_played = true;
          fillValue.setValue(0);
          setIsPlay(false);
          setCurrentVoice(null);
          audioRecorderPlayer.stopPlayer();
        }
      });
    }
  }, [currentVoice]);

  useEffect(() => {
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const reloadHome = async () => {
    await processPurchases();
    api.get(
      [],
      (result) => {
        if (result.data.length !== 0) {
          result.data.splice(0, profiles.length - 3);
          profiles.splice(profiles.length - 1, 1);
          setProfiles(result.data);
        }
      },
      expirationDate.current,
    );
  };

  const reloadApi = async (set_widen) => {
    if (set_widen) {
      widen_preference.current = set_widen;
    }
    setActiveSlide(0);
    await processPurchases();
    api.get(
      [],
      (result) => {
        setProfiles(result.data);
        setExtraData(result.extra_data);
      },
      expirationDate.current,
      widen_preference.current,
    );
  };

  const forceReload = async () => {
    setProfiles([]);
    setIsReady(false);
    setPro(null);
    updateFlag('should_reload_home', Date.now().toString());
    setActiveSlide(0);
    processPurchases();
    api.get(
      [],
      (result) => {
        setProfiles(result.data);
        setExtraData(result.extra_data);
      },
      expirationDate.current,
    );
  };

  const hideModal = (reported) => {
    setTipVisible(false);
    setNotificationVisible(false);
    setNewProfiles(false);
    setPass([]);
    setLikeVisible(false);
  };

  const hideModal1 = (reported) => {
    setIsShowModal(false);
    setNewProfiles(false);
    if (extraData.is_preference_expanded) {
      Toast.show({
        position: 'top',
        type: 'widen',
        text1: 'We widened your preferences',
        text2: 'In order to show you people',
        topOffset: 0,
        visibilityTime: 2000,
      });
    }
  };

  const togglePlay = async (item, length) => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (!!item && item !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(item);
      setDuration(length);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(item);
      if (profiles[activeSlide].user_info) {
        logPlayVoiceIntro(profiles[activeSlide].user_info.user_id);
      }
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

  const reloadWithWiden = async () => {
    await user.callFunction('updateUserField', [
      user.id,
      'preference.Primary.Global mode.value',
      true,
    ]);
    reloadApi(true);
  };

  const updateAndReload = async () => {
    if (extraData.reason === 'widen_radius') {
      await user.callFunction('updateUserField', [
        user.id,
        'preference.Primary.Max distance.value',
        101,
      ]);
      updateUserData();
      reloadApi(false);
    } else if (extraData.reason === 'turn_on_global') {
      await user.callFunction('updateUserField', [
        user.id,
        'preference.Primary.Global mode.value',
        true,
      ]);
      updateUserData();
      reloadApi(false);
    }
  };

  const blockAndRemove = (user_id) => {
    setProfiles(
      profiles.filter((x) =>
        x.user_info ? x.user_info.user_id !== user_id : true,
      ),
    );
  };

  const getNextBatch = () => {
    processPurchases();
    logClickNext();
    const shown_user_ids = pro.map((p) => p.user_info.user_id);
    user.callFunction('addToShownUsers', [shown_user_ids]);
    setActiveSlide(0);
    api.getNextBatch(
      [],
      (result) => {
        setProfiles(result.data);
        setExtraData(result.extra_data);
      },
      expirationDate.current,
    );
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsReady(false);
      carouselRef.snapToItem(1, false);
      setActiveSlide(1);
    });
  };

  const mainContentOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const mainContentTop = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0],
  });

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    if (!!pass && Object.keys(pass).length > 0) {
      setLikeVisible(true);
    }
  }, [pass]);

  const setLikedId = (id) => {
    const index = profiles.findIndex(
      (u) => u && u.user_info && u.user_info.user_id === id,
    );
    setProfiles((pre) => {
      return [...pre, (pre[index].user_info.is_liked = true)];
    });
  };

  const _degree = degree.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.flex}>
      <Animated.View style={[styles.flex, {opacity: mainContentOpacity}]}>
        <View style={styles.top}>
          {!!latestHappyHour && latestHappyHour.status === 'happening' && (
            <Animated.View style={{opacity: fadeValue}}>
              <TouchableOpacity
                style={styles.joinWrap}
                onPress={() => {
                  fadeValue.setValue(0);
                  stopIntroPlayer();
                  carouselRef.snapToItem(0, true);
                }}>
                <View style={styles.bg}>
                  <Animated.Image
                    style={[styles.bgImg, {transform: [{rotate: _degree}]}]}
                    source={require('../../Assets/Image/startbutton.png')}
                  />
                </View>
                <View style={styles.join}>
                  <Text style={styles.modeText}>Join Happy Hour 🎉</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
          <TouchableOpacity
            style={[
              styles.buttonWrap,
              latestHappyHour &&
                latestHappyHour.status === 'happening' &&
                styles.ml16,
            ]}
            onPress={() => {
              stopIntroPlayer();
              navigation.navigate('SpeakEasyModal');
            }}>
            <View style={styles.button}>
              <Text style={styles.speakeasy}>SPEAKEASY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.helpWrap,
              // !!pro && pro.length === 0 && styles.helpLeft,
            ]}
            onPress={() => {
              stopIntroPlayer();
              setTipVisible(true);
            }}>
            <View style={styles.help}>
              <Text style={styles.helpText}>?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpWrap}
            onPress={() => {
              stopIntroPlayer();
              navigation.navigate('Preferences');
            }}>
            <View style={styles.filter}>
              <FilterIcon color={AppColors.AppBlack} width={13} height={13} />
            </View>
          </TouchableOpacity>
        </View>
        {isReady ? (
          <Animated.View
            style={[styles.main, {transform: [{translateY: mainContentTop}]}]}>
            <Carousel
              ref={(c) => setCarouselRef(c)}
              data={profiles}
              renderItem={({item}) => {
                if (item._id) {
                  return (
                    <ProfileFeed
                      key={item._id}
                      seeMoreProfile={seeMoreProfile}
                      profile={item}
                      isPlay={isPlay}
                      playerLoader={playerLoader}
                      togglePlay={togglePlay}
                      widthAnimation={widthAnimation}
                      stopIntroPlayer={stopIntroPlayer}
                      currentVoice={currentVoice}
                      activeUser={
                        profiles[activeSlide].user_info
                          ? profiles[activeSlide].user_info.user_id
                          : ''
                      }
                      blockAndRemove={blockAndRemove}
                      setPass={setPass}
                    />
                  );
                }
                if (!!item.type && item.type === 'happy_hour') {
                  return (
                    <HappyHour
                      latestHappyHour={latestHappyHour}
                      userData={userData}
                      user={user}
                      profilesLength={profiles.length}
                      userInvitation={userInvitation}
                    />
                  );
                }
                if (!!item.type && item.type === 'addVoice') {
                  return <AddVoice userData={userData} user={user} />;
                }
                if (!!item.type && item.type === 'addVoiceMore') {
                  return (
                    <AddVoiceMore userData={userData} userCards={userCards} />
                  );
                }
                if (!!item.type && item.type === 'get_premium') {
                  return (
                    <GoPremium
                      setShowLoader={setShowLoader}
                      userData={userData}
                      reloadHome={reloadHome}
                    />
                  );
                }
                if (!!item.type && item.type === 'voice_uploaded') {
                  return <VoiceUploaded userData={userData} />;
                }
                if (!!item.type && item.type === 'comeBack') {
                  return <ComeBack card={item} forceReload={forceReload} />;
                }
                if (!!item.type && item.type === 'next') {
                  return <NextCards card={item} getNextBatch={getNextBatch} />;
                }
                if (!!item.type && item.type === 'premium_stack') {
                  return (
                    <PremiumStack userData={userData} reloadHome={reloadHome} />
                  );
                }
                if (!!item.type && item.type === 'widen_preference') {
                  return <WidenPreference reloadWithWiden={reloadWithWiden} />;
                }
                if (!!item.type && item.type === 'widen_radius') {
                  return <WidenRadius updateAndReload={updateAndReload} />;
                }
                if (!!item.type && item.type === 'turn_on_global') {
                  return <TurnOnGlobal updateAndReload={updateAndReload} />;
                }
                return <TrulyEmpty userData={userData} />;
              }}
              firstItem={activeSlide}
              sliderWidth={screenWidth}
              itemWidth={
                screenHeight > 700 ? screenWidth - 54 : screenWidth - 72
              }
              onSnapToItem={(index) => {
                stopIntroPlayer();
                setActiveSlide(index);
                if (profiles[index].user_info) {
                  logProfilePresent(profiles[index].user_info.user_id);
                  user.callFunction('swipeProfile', [
                    profiles[index].user_info.user_id,
                  ]);
                }
              }}
              scrollEnabled={profiles.length > 0}
              scrollInterpolator={customScrollInterpolator}
              slideInterpolatedStyle={customAnimatedStyles}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          </Animated.View>
        ) : (
          <View style={styles.main} />
        )}
        {showLoader && <PurchaseLoader />}
      </Animated.View>
      <View style={styles.indicator}>
        <LottieView
          source={require('../../Assets/Animation/image_loader.json')}
          autoPlay
          loop
          style={styles.disableTouch}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <HomeTutorialModal hide={hideModal} />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={notificationVisible}>
        <TurnOnNotificationModal hide={hideModal} />
      </Modal>
      {isShowModal && (
        <Modal animationType="fade" transparent={true} visible={newProfiles}>
          <NewProfiles hide={hideModal1} count={extraData.profile_count} />
        </Modal>
      )}
      <Modal animationType="fade" transparent={true} visible={showFull}>
        <ShowFullProfile
          audioRecorderPlayer={audioRecorderPlayer}
          hide={hideShowModal}
          profile={showProfile}
          currentVoice={currentVoice}
          setCurrentVoice={setCurrentVoice}
          stopIntroPlayer={stopIntroPlayer}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          playerLoader={playerLoader}
          setPlayerLoader={setPlayerLoader}
          widthAnimation={widthAnimation}
          setLikedId={setLikedId}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={likeVisible}>
        <NewLikeModal hide={hideModal} pass={pass} setLikedId={setLikedId} />
      </Modal>
    </View>
  );
  // return <DisconnectModal />;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    marginTop: -14,
    zIndex: -1,
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
    width: 300,
  },
  top: {
    paddingHorizontal: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter: {
    marginLeft: 16,
    backgroundColor: '#DEEFF4',
    borderRadius: 17,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  help: {
    marginLeft: 16,
    backgroundColor: '#DEEFF4',
    borderRadius: 17,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpWrap: {
    paddingVertical: 14,
  },
  helpLeft: {
    marginLeft: 'auto',
  },
  helpText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'D6',
  },
  ml16: {
    marginLeft: 16,
  },
  joinWrap: {
    marginLeft: 'auto',
    borderRadius: 26,
    padding: 3,
    overflow: 'hidden',
  },
  join: {
    backgroundColor: '#5C9AE3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 15,
    height: 30,
  },
  buttonWrap: {
    paddingVertical: 14,
    marginLeft: 'auto',
  },
  button: {
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: 30,
    paddingHorizontal: 14,
  },
  speakeasy: {
    color: AppColors.white,
    fontFamily: 'BarBoothAtMatts',
    fontSize: 14,
    lineHeight: 30,
  },
  modeText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 20,
    marginLeft: 6,
  },
  bg: {
    position: 'absolute',
    top: -50,
    left: -3,
  },
  bgImg: {
    borderRadius: 26,
    width: 160,
    height: 160,
  },
});

export default HomeFeed;
