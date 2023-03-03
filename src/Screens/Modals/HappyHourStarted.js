import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import Chat from '../../Assets/Svg/New/Chat';

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AppColors from '../../Utils/AppColors';
import BlindDateQuery from '../../Api/BlindDateQuery';
import {useAuth} from '../../Providers/AuthProvider';
import {useBlindDate} from '../../Providers/BlindDateProvider';
import {useAppFlag} from '../../Providers/AppFlagProvider';
import {usePremium} from '../../Providers/PremiumProvider';
import {
  logHappyHourModalDismiss,
  logHappyHourModalJoin,
} from '../../Utils/Analytics';

function HappyHourStarted() {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const {isPremium, expirationDate, processPurchases} = usePremium();
  const blindApi = new BlindDateQuery();
  const {currentState, updateState} = useBlindDate();
  const {userData, getBlindDateMatches} = useAuth();
  const {checkFlag, setFlag} = useAppFlag();
  const [isFirst, setIsFirst] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (checkFlag('first_happy_hour') === null) {
      setIsFirst(true);
    }
  }, []);

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await processPurchases();
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
                } else {
                  navigation.navigate('ReachedModal');
                }
              } else if (res.extra_data.reason === 'ENDED') {
                navigation.navigate('EndHappyHour', {
                  blindMatches: getBlindDateMatches(
                    currentState.blind_date_group_id,
                  ),
                });
              }
            } else {
              // console.log(res.data, userData.user_id);
              logHappyHourModalJoin();
              updateState('JOINED_WAITING', res.data);
              navigation.navigate('BlindDateScreen');
            }
          },
        );
      } else {
        navigation.navigate('MicPermissionModal');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startPress = async () => {
    try {
      const permissionStatus = await request(PERMISSIONS.IOS.MICROPHONE);
      if (permissionStatus === RESULTS.GRANTED) {
        await processPurchases();
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
                } else {
                  navigation.navigate('ReachedModal');
                }
              } else if (res.extra_data.reason === 'ENDED') {
                navigation.navigate('EndHappyHour', {
                  blindMatches: getBlindDateMatches(
                    currentState.blind_date_group_id,
                  ),
                });
              }
            } else {
              // console.log(res.data, userData.user_id);
              logHappyHourModalJoin();
              updateState('JOINED_WAITING', res.data);
              navigation.navigate('BlindDateScreen');
            }
          },
        );
      } else {
        navigation.navigate('MicPermissionModal');
      }
    } catch (e) {}
  };
  return (
    <View style={[styles.wrap]}>
      <ImageBackground
        defaultSource={require('../../Assets/Image/Empty/messageScreen.png')}
        source={require('../../Assets/Image/Empty/messageScreen.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={[styles.contain, {marginTop: insets.top + 8}]}>
          <View style={styles.header}>
            <Text style={styles.title}>Happy Hour has started!</Text>
            <Text style={styles.description}>Go on 3 min audio dates</Text>
          </View>
          <View style={styles.center}>
            <Chat width={122} height={113} />
          </View>
          <View style={styles.empty} />
        </View>
        <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
          <LinearGradient
            style={styles.linear}
            start={{x: 0.25, y: 0.75}}
            end={{x: 1, y: 0.5}}
            colors={['#EDCC54', '#F889F9', '#B47DFF', '#5BD0FB']}>
            <TouchableOpacity
              style={styles.button}
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
                  } else {
                    Platform.OS === 'ios'
                      ? startPress()
                      : requestCameraAndAudioPermission();
                  }
                }
              }}>
              {loading ? (
                <LottieView
                  source={require('../../Assets/Animation/loader_white.json')}
                  autoPlay
                  loop
                  style={styles.disableTouch}
                />
              ) : (
                <Text style={styles.buttonText}>Join now</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity
            style={styles.log}
            onPress={() => {
              logHappyHourModalDismiss();
              navigation.goBack();
            }}>
            <Text style={styles.out}>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    height: 70,
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    color: AppColors.IconColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    lineHeight: 33,
    marginBottom: 6,
  },
  description: {
    color: AppColors.IconColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 25,
  },
  footer: {
    paddingHorizontal: 32,
  },
  linear: {
    marginTop: 24,
    borderRadius: 24,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.white,
  },
  disableTouch: {
    zIndex: 20,
    width: 48,
  },
  log: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  out: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: '#09092C',
  },
});

export default HappyHourStarted;
