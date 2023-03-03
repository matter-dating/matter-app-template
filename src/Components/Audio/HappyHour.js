import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  Dimensions,
  Image,
  PermissionsAndroid,
} from 'react-native';
import dayjs from 'dayjs';
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

import AppColors from '../../Utils/AppColors';

import ReminderModal from '../../Screens/Modals/ReminderModal';
import BlindDateInstructionModal from '../../Screens/Modals/BlindDateInstructionModal';

// import GamePointSlider from './GamePointSlider';

import HappyHourTutorial from '../Tutorial/HappyHourTutorial';
import {useAppFlag} from '../../Providers/AppFlagProvider';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {logJoinHappyHour} from '../../Utils/Analytics';
import {useBlindDate} from '../../Providers/BlindDateProvider';
import BlindDateQuery from '../../Api/BlindDateQuery';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../Providers/AuthProvider';
import {usePremium} from '../../Providers/PremiumProvider';

const HappyHour = ({
  latestHappyHour,
  userData,
  user,
  profilesLength,
  userInvitation,
}) => {
  // const [eventConfig, setEventConfig] = useState({});
  const [isEnabled, setIsEnabled] = useState(
    userData && userData.is_happy_hour_sms_enabled ? true : false,
  );
  const [reminderModalVisible, setReminderModalVisible] = useState(false);

  const {currentState, updateState} = useBlindDate();
  const {isPremium, expirationDate, processPurchases} = usePremium();
  const blindApi = new BlindDateQuery();
  const navigation = useNavigation();
  const {checkFlag, setFlag} = useAppFlag();
  const [isFirst, setIsFirst] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const {getBlindDateMatches} = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkFlag('first_happy_hour') === null) {
      setIsFirst(true);
    }
  }, []);

  const hideModal = (reported) => {
    setTipVisible(false);
  };

  useEffect(() => {
    if (latestHappyHour && latestHappyHour.status === 'happening') {
      if (checkFlag('happy_hour_tutorial') === null) {
        setShowTutorial(true);
      }
    }
  }, [latestHappyHour]);

  // useEffect(() => {
  //   if (blindDateStatus && blindDateStatus.status === 'scheduled') {
  //     setEventConfig({
  //       title: 'Matter Happy Hour',
  //       allDay: false,
  //       startDate: dayjs(blindDateStatus.start_time).format(
  //         'YYYY-MM-DDTHH:mm:ss.SSSZ',
  //       ),
  //       endDate: dayjs(blindDateStatus.end_time).format(
  //         'YYYY-MM-DDTHH:mm:ss.SSSZ',
  //       ),
  //     });
  //   }
  // }, [blindDateStatus]);

  // const addCalendar = () => {
  //   AddCalendarEvent.presentEventCreatingDialog(eventConfig)
  //     .then((eventInfo) => {
  //       if (eventInfo.action === 'CANCELED') {
  //         Toast.show({
  //           position: 'top',
  //           type: 'error',
  //           text1: 'Canceled!',
  //           text2: 'Calendar event cancelled',
  //           topOffset: 0,
  //           visibilityTime: 2000,
  //         });
  //       }
  //       if (eventInfo.action === 'SAVED') {
  //         Toast.show({
  //           position: 'top',
  //           type: 'notif',
  //           text1: 'Saved!',
  //           text2: 'Happy hour is added your calendar',
  //           topOffset: 0,
  //           visibilityTime: 2000,
  //         });
  //       }
  //     })
  //     .catch((e) => console.error(e));
  // };
  const hideReminderModal = () => {
    setReminderModalVisible(false);
  };

  const requestCameraAndAudioPermission = async () => {
    try {
      await processPurchases();
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        blindApi.join(
          userData,
          currentState.blind_date_group_id,
          null,
          expirationDate.current,
          (res) => {
            if (res.extra_data && res.extra_data.reason) {
              if (res.extra_data.reason === 'MATCH_LIMIT_REACHED') {
                if (isPremium) {
                  navigation.navigate('EndHappyHour', {
                    blindMatches: getBlindDateMatches(
                      currentState.blind_date_group_id,
                    ),
                  });
                  setLoading(false);
                } else {
                  navigation.navigate('ReachedModal');
                  setLoading(false);
                }
              } else if (res.extra_data.reason === 'ENDED') {
                navigation.navigate('EndHappyHour', {
                  blindMatches: getBlindDateMatches(
                    currentState.blind_date_group_id,
                  ),
                });
                setLoading(false);
              }
            } else {
              logJoinHappyHour(currentState.blind_date_group_id);
              updateState('JOINED_WAITING', res.data);
              navigation.navigate('BlindDateScreen');
              setLoading(false);
            }
          },
        );
      } else {
        navigation.navigate('MicPermissionModal');
        setLoading(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startPress = async () => {
    try {
      await processPurchases();
      const permissionStatus = await request(PERMISSIONS.IOS.MICROPHONE);
      if (permissionStatus === RESULTS.GRANTED) {
        blindApi.join(
          userData,
          currentState.blind_date_group_id,
          null,
          expirationDate.current,
          (res) => {
            if (res.extra_data && res.extra_data.reason) {
              if (res.extra_data.reason === 'MATCH_LIMIT_REACHED') {
                if (isPremium) {
                  navigation.navigate('EndHappyHour', {
                    blindMatches: getBlindDateMatches(
                      currentState.blind_date_group_id,
                    ),
                  });
                  setLoading(false);
                } else {
                  navigation.navigate('ReachedModal');
                  setLoading(false);
                }
              } else if (res.extra_data.reason === 'ENDED') {
                navigation.navigate('EndHappyHour', {
                  blindMatches: getBlindDateMatches(
                    currentState.blind_date_group_id,
                  ),
                });
                setLoading(false);
              }
            } else {
              logJoinHappyHour(currentState.blind_date_group_id);
              updateState('JOINED_WAITING', res.data);
              navigation.navigate('BlindDateScreen');
              setLoading(false);
            }
          },
        );
      } else {
        navigation.navigate('MicPermissionModal');
        setLoading(false);
      }
    } catch (e) {
      // console.log('error', e);
    }
  };

  const renderJoinButton = () => {
    return (
      <TouchableOpacity
        style={styles.startButton}
        activeOpacity={loading ? 1 : 0.4}
        onPress={() => {
          if (!loading) {
            setLoading(true);
            if (isFirst) {
              setFlag('first_happy_hour', 'true');
              setIsFirst(false);
              navigation.navigate('BlindDateInstruction', {
                callBack: () => {
                  Platform.OS === 'ios'
                    ? startPress()
                    : requestCameraAndAudioPermission();
                },
              });
              setLoading(false);
            } else {
              Platform.OS === 'ios'
                ? startPress()
                : requestCameraAndAudioPermission();
            }
          }
        }}>
        <Image
          style={styles.logoIcon}
          source={require('../../Assets/Image/startbutton.png')}
        />
        {loading ? (
          <LottieView
            source={require('../../Assets/Animation/loader_white.json')}
            autoPlay
            loop
            style={styles.disableTouch}
          />
        ) : (
          <Text style={styles.start}>Click start</Text>
        )}
      </TouchableOpacity>
    );
  };

  const clickHideTutorial = () => {
    setFlag('happy_hour_tutorial', 'true');
    setShowTutorial(false);
  };

  const renderStatus = () => {
    return (
      <>
        <Text style={styles.date}>
          Go on 3-min audio blind dates{'\n'}
          with up to 5 potential matches{'\n'}
          daily.
        </Text>
        <View style={styles.status}>
          <Text style={styles.next}>Next Date Game:</Text>
          <Text style={styles.text}>
            {latestHappyHour &&
              latestHappyHour.status === 'scheduled' &&
              dayjs(latestHappyHour.start_time).calendar()}
            {!latestHappyHour && 'Coming soon'}
          </Text>
        </View>
        {latestHappyHour && latestHappyHour.status === 'scheduled' && (
          <TouchableOpacity
            onPress={() => setReminderModalVisible(true)}
            style={styles.button}>
            <Text style={styles.buttonText}>Remind me via text</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        {latestHappyHour && latestHappyHour.status === 'happening' ? (
          <>
            <View style={styles.padding}>
              <Text style={styles.title}>Happy Hour 🎉</Text>
              <Text style={styles.play}>Go on live audio dates</Text>
            </View>
            <View style={styles.container}>
              <View>
                {renderJoinButton()}
                <View style={styles.cancel} />
                {showTutorial && (
                  <HappyHourTutorial
                    renderJoinButton={renderJoinButton}
                    hide={clickHideTutorial}
                    userData={userData}
                  />
                )}
              </View>
            </View>
            {!showTutorial ? (
              <TouchableOpacity
                style={styles.see}
                onPress={() => setTipVisible(true)}>
                <Text style={styles.instructions}>See how does it work</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.seeHide}>
                <Text style={styles.instructions}>Hide</Text>
              </View>
            )}
          </>
        ) : (
          <>
            <View style={styles.padding}>
              <Text style={[styles.title, styles.leftText]}>Happy Hour 🎉</Text>
              {renderStatus()}
            </View>
            <TouchableOpacity
              style={styles.see}
              onPress={() => setTipVisible(true)}>
              <Text style={styles.instructions}>See how does it work</Text>
            </TouchableOpacity>
          </>
        )}
        <View style={styles.bg}>
          <Image
            style={styles.bgImg}
            source={require('../../Assets/Image/gameBg.png')}
          />
        </View>
      </View>
      {screenHeight > 700 && (
        <Text style={styles.swipe}>Swipe sideways to see profiles</Text>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={reminderModalVisible}>
        <ReminderModal
          isEnabled={isEnabled}
          setIsEnabled={setIsEnabled}
          hide={hideReminderModal}
          user={user}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <BlindDateInstructionModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    paddingTop: 37,
    paddingBottom: 22,
    paddingHorizontal: 21,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'space-between',
    height: screenWidth + 139,
    backgroundColor: AppColors.MainColor,
  },
  title: {
    lineHeight: 39,
    fontSize: screenHeight > 700 ? 25 : 20,
    marginBottom: 2,
    fontFamily: 'Poppins-Bold',
    color: AppColors.white,
    textAlign: 'center',
  },
  title1: {
    lineHeight: 39,
    fontSize: 20,
    marginBottom: 2,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    textAlign: 'center',
  },
  date: {
    lineHeight: 24,
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    marginBottom: 10,
  },
  earn: {
    lineHeight: 25,
    fontSize: 18,
    marginBottom: 7,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
  },
  points: {
    lineHeight: 20,
    fontSize: 14,
    marginBottom: 23,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  play: {
    lineHeight: 21,
    fontSize: screenHeight > 700 ? 15 : 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    textAlign: 'center',
  },
  leftText: {
    textAlign: 'left',
  },
  text: {
    color: '#FFFF40',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 7,
  },
  next: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 3,
  },
  whiteText: {
    color: AppColors.white,
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    padding: 23,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 14,
    lineHeight: 20,
    marginRight: 7,
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'underline',
  },
  smallText: {
    fontSize: 12,
    lineHeight: 17,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: -100,
    backgroundColor: AppColors.white,
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  see: {
    paddingVertical: 14,
    marginHorizontal: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeHide: {
    zIndex: -2,
    paddingVertical: 14,
  },
  startButton: {
    borderWidth: 6,
    borderColor: AppColors.white + 'CC',
    borderRadius: 70,
    width: screenHeight > 700 ? 140 : 100,
    height: screenHeight > 700 ? 140 : 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  logoIcon: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    width: screenHeight > 700 ? 128 : 88,
    height: screenHeight > 700 ? 128 : 88,
    borderRadius: 64,
    opacity: 0.9,
  },
  start: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: AppColors.white,
  },
  disableTouch: {
    zIndex: 20,
    width: 48,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 62,
  },
  swipe: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + '99',
    marginTop: 20,
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
  bgImg: {
    width: 199,
    height: 210,
  },
  cancel: {
    marginTop: 24,
    paddingVertical: 9,
    alignItems: 'center',
    height: 62,
  },
});

export default HappyHour;
