import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import PagerView from 'react-native-pager-view';

import AddIcon from '../../Assets/Svg/AddIcon';
import PinIcon from '../../Assets/Svg/PinIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import FilterIcon from '../../Assets/Svg/FilterIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import {BlurView} from '@react-native-community/blur';

import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import {S3_MAIN_URL} from '../../Utils/Constants';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

const DEMO = {
  duration: 13,
  voice:
    'https://d3aync0g4e02cp.cloudfront.net/voice_intro_demo/female_intro_01.m4a',
};

const HomeTutorial = ({navigation}) => {
  const [fadePressValue] = useState(new Animated.Value(1));
  const [audioCard, setAudioCard] = useState({});
  const insets = useSafeArea();
  const [page, setPage] = useState(0);
  const {userData, userCards} = useAuth();
  const pagerRef = useRef(null);
  const fillValue = useRef(new Animated.Value(0)).current;
  const [currentVoice, setCurrentVoice] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  useEffect(() => {
    setAudioCard(userCards.filter((c) => c.type === 'voice-intro'));
  }, [userCards]);

  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition > 0) {
        setPlayerLoader(false);
        setIsPlay(true);
      }
      if (e.currentPosition === e.duration) {
        setCurrentVoice(null);
        setIsPlay(false);
        audioRecorderPlayer.stopPlayer();
      }
    });
  }, [currentVoice]);

  useEffect(() => {
    fillValue.setValue(0);
    Animated.timing(fadePressValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
    if (isPlay) {
      Animated.timing(fadePressValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
      Animated.timing(fillValue, {
        toValue: 1,
        duration: DEMO.duration * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('NewProfile');
  };
  const onPageScroll = (event) => {
    stopPlayVoice();
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };
  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
    setPage(pageNumber);
  };
  const renderVerificationBadge = () => {
    if (userData.is_photo_verified) {
      return (
        <VerificationIcon width={12} height={12} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };
  const togglePlay = async (item) => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (item.voice !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(item.voice);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(item.voice);
    } else if (item.voice === currentVoice) {
      stopPlayVoice();
    }
  };
  const stopPlayVoice = () => {
    setCurrentVoice(null);
    audioRecorderPlayer.stopPlayer();
    setIsPlay(false);
    setPlayerLoader(false);
  };
  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const fadeValue = fillValue.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 0, 0],
  });
  return (
    <Animated.View style={[styles.wrap]}>
      <View style={[styles.pagination, {top: insets.top + 8}]}>
        <View style={[styles.paginationDot, page === 0 && styles.activeDot]} />
        <View style={[styles.paginationDot, page === 1 && styles.activeDot]} />
        <View style={[styles.paginationDot, page === 2 && styles.activeDot]} />
        <View style={[styles.paginationDot, page === 3 && styles.activeDot]} />
        {audioCard.length === 0 && (
          <View
            style={[styles.paginationDot, page === 4 && styles.activeDot]}
          />
        )}
      </View>
      <PagerView
        ref={pagerRef}
        style={[
          styles.viewPager,
          {marginTop: insets.top + 48, marginBottom: insets.bottom},
        ]}
        onPageScroll={onPageScroll}
        scrollEnabled={false}
        initialPage={0}>
        <View style={styles.container}>
          <View style={styles.flex} />
          <View style={styles.flex}>
            <Text style={styles.welcome}>
              Welcome {userData && userData.first_name}
            </Text>
            <Text style={styles.welcome1}>
              Let’s start your dating journey on Matter
            </Text>
          </View>
          <View style={styles.flex}>
            <TouchableOpacity
              style={styles.ready}
              onPress={() => handlePageChange(page + 1)}>
              <Text style={styles.buttonText}>Let’s start</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.imgFlex}>
            <Image
              style={styles.img1}
              source={require('../../Assets/Image/tutorial1.png')}
            />
            <View style={styles.padding1}>
              <Text style={[styles.title, styles.bigTitle]}>
                We will show you{'\n'}
                20 profiles everyday
              </Text>
              <Text style={styles.text}>
                Endlessly swiping left and right is not the way to find a
                serious relationship. Instead, we will suggest you carefully
                curated 20 profiles based on our cutting-edge algorithm
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(page + 1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.imgFlex}>
            <View style={styles.box}>
              <View style={styles.boxImg}>
                <Image
                  style={styles.img}
                  source={require('../../Assets/Image/tip2.png')}
                />
                <Animated.View style={[styles.listen, {opacity: fadeValue}]}>
                  <BlurView
                    style={styles.listen}
                    blurType={Platform.OS === 'ios' ? 'regular' : 'light'}
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                  />
                </Animated.View>
              </View>
              {!isPlay && (
                <View style={styles.listen}>
                  <TouchableOpacity
                    style={styles.play}
                    activeOpacity={1}
                    onPress={() => {
                      togglePlay(DEMO);
                    }}>
                    <Text style={styles.see}>Listen to see</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={styles.boxFooter}>
                <View>
                  <View style={styles.nameWrap}>
                    <Text style={styles.name} numberOfLines={1}>
                      Sam
                    </Text>
                    <VerificationIcon
                      width={12}
                      height={12}
                      color={AppColors.MainColor}
                    />
                  </View>
                  <View style={styles.locationWrap}>
                    <PinIcon width={12} height={12} color="#3F4853" />
                    <Text style={styles.location} numberOfLines={1}>
                      Los Angeles
                    </Text>
                  </View>
                  <View style={styles.player}>
                    <View>
                      <Text style={styles.voiceText}>Voice intro</Text>
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
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => {
                        togglePlay(DEMO);
                      }}>
                      <Animated.View
                        style={[styles.press, {opacity: fadePressValue}]}>
                        <Text style={styles.pressText}>Press to play</Text>
                        <View style={styles.triangle} />
                      </Animated.View>
                      {playerLoader ? (
                        <LottieView
                          source={require('../../Assets/Animation/player.json')}
                          autoPlay
                          loop
                          style={styles.loader}
                        />
                      ) : isPlay ? (
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
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.padding2}>
              <Text style={styles.title}>
                Listen to Voice Intro{'\n'}
                to reveal the pictures
              </Text>
              <Text style={styles.text}>
                Voice intros are a great way to get to know others. To see how
                your suggested person looks, simply listen to their Voice Intro
                first
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePageChange(page + 1)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={[styles.flex, styles.padding2]}>
            <View style={styles.filter}>
              <FilterIcon color={AppColors.AppBlack} width={20} height={20} />
            </View>
            <Text style={[styles.title, styles.smallTitle]}>
              Help us to show you the right people
            </Text>
            <Text style={styles.text}>
              If you don’t like our suggested profiles, you can always change
              your preferences by clicking on icon on the top right corner
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.goBack();
              navigation.navigate('Preferences');
            }}>
            <AddIcon width={17} height={17} color={AppColors.AppBlack + 'B3'} />
            <Text style={styles.add}>Add my preferences now</Text>
          </TouchableOpacity>
          {audioCard.length > 0 ? (
            <TouchableOpacity
              style={[styles.button, styles.done]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (audioCard.length > 0) {
                  navigation.goBack();
                } else {
                  handlePageChange(page + 1);
                }
              }}>
              <Text style={styles.buttonText}>
                {audioCard.length > 0 ? 'Done' : 'Next'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.imgFlex}>
            <View style={styles.box}>
              <View style={styles.boxImg}>
                {userData && (
                  <Image
                    style={styles.img}
                    blurRadius={20}
                    source={{uri: S3_MAIN_URL + userData.user_id + '.jpg'}}
                  />
                )}
              </View>
              <View style={styles.boxFooter}>
                <View>
                  <View style={styles.nameWrap}>
                    <Text style={styles.name} numberOfLines={1}>
                      {userData && userData.first_name}
                    </Text>
                    {renderVerificationBadge()}
                  </View>
                  {userData && userData.location_name && (
                    <View style={styles.locationWrap}>
                      <PinIcon width={12} height={12} color="#3F4853" />
                      <Text style={styles.location} numberOfLines={1}>
                        {userData.location_name}
                      </Text>
                    </View>
                  )}
                  <Text style={styles.noVoice}>No voice intro</Text>
                </View>
                <TouchableOpacity
                  style={styles.voiceButton}
                  onPress={() => {
                    navigation.goBack();
                    navigation.navigate('AddVoiceIntro', {
                      callBack: ReturnVoiceCreateProfile,
                    });
                  }}>
                  <VoiceIcon width={20} height={20} color={AppColors.white} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.padding2}>
              <Text style={styles.title1}>Add your Voice Intro</Text>
              <Text style={styles.title1}>to be seen on the Explore tab</Text>
              <Text style={styles.text}>
                To be seen by other users on the Explore tab, please include
                your Voice Intro
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.introButton}
            onPress={() => {
              navigation.goBack();
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnVoiceCreateProfile,
              });
            }}>
            <AddIcon width={17} height={17} color={AppColors.AppBlack} />
            <Text style={styles.intro}>Add Voice Intro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.done]}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </PagerView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: AppColors.MainColor,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 110,
    position: 'absolute',
  },
  pagination: {
    position: 'absolute',
    height: 40,
    left: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    top: 0,
    zIndex: 1,
  },
  paginationDot: {
    width: 5,
    height: 5,
    marginHorizontal: 3,
    borderRadius: 3,
    backgroundColor: AppColors.white + '7A',
  },
  activeDot: {
    backgroundColor: AppColors.white,
  },
  container: {
    justifyContent: 'space-between',
    paddingBottom: 44,
  },
  viewPager: {
    width: '100%',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    paddingHorizontal: 21,
  },
  welcome1: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    paddingHorizontal: 21,
  },
  title: {
    fontSize: screenHeight > 700 ? 20 : 18,
    lineHeight: screenHeight > 700 ? 30 : 24,
    fontFamily: 'Poppins-Bold',
    color: AppColors.white,
    marginBottom: 12,
  },
  title1: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
    color: AppColors.white,
  },
  title3: {
    fontSize: 17,
  },
  text: {
    fontSize: screenHeight > 700 ? 15 : 14,
    lineHeight: screenHeight > 700 ? 23 : 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    marginBottom: 12,
  },
  bigTitle: {
    fontSize: screenHeight > 700 ? 22 : 18,
    lineHeight: screenHeight > 700 ? 34 : 24,
  },
  smallTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  flexBottom: {
    marginTop: 'auto',
  },
  imgFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding1: {
    paddingHorizontal: 21,
  },
  padding2: {
    paddingHorizontal: 46,
  },
  ready: {
    borderWidth: 2,
    borderColor: AppColors.white,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 28,
    marginHorizontal: 43,
  },
  button: {
    borderWidth: 1,
    borderColor: AppColors.white,
    paddingHorizontal: 45,
    paddingVertical: 11,
    borderRadius: 28,
    marginLeft: 'auto',
    marginRight: 27,
  },
  done: {
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 0,
    width: '100%',
    marginTop: 20,
  },
  voiceButton: {
    backgroundColor: AppColors.MainColor,
    width: screenHeight > 700 ? 42 : 30,
    height: screenHeight > 700 ? 42 : 30,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  playButton: {
    backgroundColor: AppColors.MainColor,
    width: screenHeight > 700 ? 42 : 30,
    height: screenHeight > 700 ? 42 : 30,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  press: {
    backgroundColor: '#905CE3',
    position: 'absolute',
    width: 161,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    top: -56,
    zIndex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 18.5,
    borderRightWidth: 18.5,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#905CE3',
    position: 'absolute',
    bottom: -13,
    zIndex: 111,
  },
  pressText: {
    fontSize: screenHeight > 700 ? 17 : 14,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
  },
  addButton: {
    borderWidth: 1,
    borderColor: AppColors.white,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 28,
    marginLeft: 'auto',
    marginRight: 27,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  add: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginLeft: 8,
  },
  box: {
    width: screenWidth - 124,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    marginBottom: 27,
  },
  boxImg: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    overflow: 'hidden',
  },
  boxFooter: {
    flexDirection: 'row',
    paddingLeft: 14,
    paddingVertical: 9,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  img: {
    width: screenWidth - 124,
    height: screenWidth - 154,
  },
  listen: {
    width: screenWidth - 124,
    height: screenWidth - 154,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  play: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  see: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  img1: {
    width: screenWidth - 50,
    height: ((screenWidth - 50) / 326) * 275,
  },
  filter: {
    backgroundColor: '#DEEFF4',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  introButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  intro: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginLeft: 8,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    marginRight: 6,
    color: AppColors.AppBlack,
  },
  locationWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    lineHeight: 16,
    color: AppColors.AppBlack + 'CC',
    marginLeft: 2,
  },
  noVoice: {
    fontSize: 14,
    color: AppColors.MainColor,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    marginBottom: 7,
  },
  bar: {
    backgroundColor: '#E9F3F5',
    borderRadius: 12,
    height: 4,
    width: screenWidth - 234,
    marginRight: 38,
  },
  progress: {
    position: 'absolute',
    backgroundColor: AppColors.MainColor + '8A',
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  player: {
    paddingTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  voiceText: {
    fontSize: 10,
    color: AppColors.AppBlack,
    lineHeight: 15,
    fontFamily: 'Poppins-Medium',
    marginBottom: 9,
  },
});

export default HomeTutorial;
