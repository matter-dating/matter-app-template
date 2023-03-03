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
import {useFocusEffect} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-snap-carousel';
import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';
import {useSafeArea} from 'react-native-safe-area-context';

import TrulyEmpty from '../Home/TrulyEmpty';
import ProfileFeed from '../Profile/ProfileFeed';
import AppColors from '../../Utils/AppColors';
import BackIcon from '../../Assets/Svg/BackIcon';
import BottomIcon from '../../Assets/Svg/BottomIcon';
import FilterIcon from '../../Assets/Svg/FilterIcon';
import MoonIcon from '../../Assets/Svg/MoonIcon';

import HttpQuery from '../../Api/HttpQuery';
import {useAuth} from '../../Providers/AuthProvider';

import TurnOnNotificationModal from '../../Screens/Modals/TurnOnNotificationModal';
import NewLikeModal from '../../Screens/Modals/NewLikeModal';
import CommunityModal from '../../Screens/Modals/CommunityModal';
import SpeakEasyFilterModal from '../../Screens/Modals/SpeakEasyFilterModal';
import ShowFullProfile from '../../Screens/Modals/ShowFullProfile';

import RNFS, {DocumentDirectoryPath} from 'react-native-fs';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useAppFlag} from '../../Providers/AppFlagProvider';
import {logPlayVoiceIntro, logProfilePresent} from '../../Utils/Analytics';
import {usePremium} from '../../Providers/PremiumProvider';
import {useAppContent} from '../../Providers/AppContentProvider';
const audioRecorderPlayer = new AudioRecorderPlayer();

const dirPath =
  DocumentDirectoryPath + '/matter-profile-photos.s3-us-west-1.amazonaws.com';

const SpeakEasyFeed = ({
  latestHappyHour,
  userData,
  scrollToTop,
  codeList,
  activeCode,
}) => {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const [carouselRef, setCarouselRef] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {user, userInvitation} = useAuth();
  const {checkFlag, updateFlag} = useAppFlag();
  const {getSpeakeasy} = useAppContent();
  const api = new HttpQuery();
  const [profiles, setProfiles] = useState([]);
  const [pro, setPro] = useState(null);

  const [duration, setDuration] = useState(null);

  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [extraData, setExtraData] = useState(null);
  const [currentVoice, setCurrentVoice] = useState(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [communityVisible, setCommunityVisible] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const {expirationDate, processPurchases} = usePremium();

  const [showFull, setShowFull] = useState(false);
  const [multi, setMulti] = useState(codeList.length > 1);
  const [showProfile, setShowProfile] = useState(null);

  const [likeVisible, setLikeVisible] = useState(false);
  const [pass, setPass] = useState([]);

  const [filterVisible, setFilterVisible] = useState(false);

  const [eventName, setEventName] = useState(activeCode);
  const [fadeValue] = useState(new Animated.Value(0));
  // Filter
  const [gender, setGender] = useState('everyone');

  useEffect(() => {
    setProfiles([]);
    setIsReady(false);
    setPro(null);
    setExtraData(null);
    if (userInvitation.length > 0) {
      processPurchases();
      api.getSpeakeasyUsers(
        eventName,
        (result) => {
          setProfiles(result.data);
          if (result.extra_data.is_empty) {
            setExtraData(result.extra_data);
          }
        },
        expirationDate.current,
      );
    }
  }, [userInvitation.length, eventName]);

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
            if (result.extra_data.is_empty) {
              setExtraData(result.extra_data);
            }
          },
          expirationDate.current,
        );
      }
    }, []),
  );

  useEffect(() => {
    if (!userData.fcm_token) {
      setNotificationVisible(true);
    }
  }, [userData]);

  useEffect(() => {
    if (profiles.length > 0) {
      setPro(
        profiles.filter((x) => x.type === undefined).filter((c) => !!c._id),
      );
    }
  }, [profiles]);

  useEffect(() => {
    if (!!pro && pro.length === 0) {
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
                    // console.log(err.message);
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

  useEffect(() => {
    // console.log('gender', gender);
  }, [gender]);

  const hideModal = (reported) => {
    setNotificationVisible(false);
    setFilterVisible(false);
    setPass([]);
    setLikeVisible(false);
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

  const blockAndRemove = (user_id) => {
    setProfiles(
      profiles.filter((x) =>
        x.user_info ? x.user_info.user_id !== user_id : true,
      ),
    );
  };

  const mainContentOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const mainContentTop = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, -(insets.top + 24)],
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
          <TouchableOpacity
            onPress={() => {
              if (multi) {
                setCommunityVisible(true);
              }
            }}
            activeOpacity={multi ? 0.6 : 1}
            style={[styles.change, !multi && styles.hide]}>
            <Text style={styles.title}>
              {getSpeakeasy(eventName).speakeasy_name}
            </Text>
            {multi && (
              <BottomIcon width={13} height={8} color={AppColors.MainColor} />
            )}
          </TouchableOpacity>
          <View style={styles.helpWrap} />
          {/* <TouchableOpacity
            style={styles.helpWrap}
            onPress={() => {
              stopIntroPlayer();
              setFilterVisible(true);
            }}>
            <View style={styles.filter}>
              <FilterIcon color={AppColors.AppBlack} width={13} height={13} />
            </View>
          </TouchableOpacity> */}
        </View>
        <Text style={styles.description}>Meet the members</Text>
      </View>
      {!!extraData && (
        <View style={styles.emptyScreen}>
          <MoonIcon color={AppColors.MainColor} width={84} height={78} />
          <Text style={styles.emptyTitle}>Please come back later</Text>
          <Text style={styles.emptyText}>There’s nobody at the moment</Text>
        </View>
      )}
      <Animated.View style={[styles.flex, {opacity: mainContentOpacity}]}>
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
                      noBlur={true}
                    />
                  );
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
      </Animated.View>
      <View style={styles.indicator}>
        <LottieView
          source={require('../../Assets/Animation/image_loader.json')}
          autoPlay
          loop
          style={styles.disableTouch}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={notificationVisible}>
        <TurnOnNotificationModal hide={hideModal} />
      </Modal>
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
          noBlur={true}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={likeVisible}>
        <NewLikeModal hide={hideModal} pass={pass} setLikedId={setLikedId} />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={filterVisible}>
        <SpeakEasyFilterModal
          hide={hideModal}
          gender={gender}
          setGender={setGender}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={communityVisible}>
        <CommunityModal
          setCommunityVisible={setCommunityVisible}
          eventName={eventName}
          setEventName={setEventName}
          events={codeList}
        />
      </Modal>
    </View>
  );
  // return <DisconnectModal />;
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flex: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  main: {
    backgroundColor: AppColors.white,
    zIndex: -1,
  },
  emptyScreen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginTop: 20,
    lineHeight: 23,
  },
  emptyText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + '99',
    lineHeight: 20,
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
  header: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 12,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    marginHorizontal: 14,
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + '99',
    marginTop: 9,
  },
  change: {
    borderRadius: 18,
    borderColor: AppColors.MainColor,
    borderWidth: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 14,
    paddingRight: 16,
    flexDirection: 'row',
  },
  hide: {
    borderWidth: 0,
  },
  empty: {
    width: 44,
    paddingVertical: 5,
  },
  helpWrap: {
    paddingVertical: 14,
    width: 44,
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
});

export default SpeakEasyFeed;
