import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import BlindDateQuery from '../../Api/BlindDateQuery';
import dayjs from 'dayjs';
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import WaitingFooter from '../Blind/WaitingFooter';

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {logJoinHappyHour} from '../../Utils/Analytics';
// import {useAuth} from '../../Providers/AuthProvider';
import {usePremium} from '../../Providers/PremiumProvider';

const WaitingRoom = ({currentState, userData, updateState}) => {
  const navigation = useNavigation();
  const blindApi = new BlindDateQuery();
  const endsIn = dayjs(currentState.stale_time).diff(dayjs(), 'm');
  const [loader, setLoader] = useState(false);
  const insets = useSafeArea();
  // const {userInvitation} = useAuth();
  const {expirationDate, processPurchases} = usePremium();

  useEffect(() => {
    setLoader(false);
    return setLoader(false);
  }, []);

  const requestCameraAndAudioPermission = async () => {
    setLoader(true);
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
            if (
              res.extra_data &&
              res.extra_data.reason &&
              res.extra_data.reason === 'MATCH_LIMIT_REACHED'
            ) {
              navigation.navigate('ReachedModal');
              // Alert.alert(
              //   'You have reached your limit of happy hour date profiles for today.',
              // );
            } else {
              logJoinHappyHour(currentState.blind_date_group_id);
              updateState('JOINED_WAITING', res.data);
              setLoader(false);
              navigation.navigate('BlindDateScreen');
            }
          },
        );
      } else {
        setLoader(false);
        navigation.navigate('MicPermissionModal');
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
        setLoader(true);
        blindApi.join(
          userData,
          currentState.blind_date_group_id,
          null,
          expirationDate.current,
          (res) => {
            if (
              res.extra_data &&
              res.extra_data.reason &&
              res.extra_data.reason === 'MATCH_LIMIT_REACHED'
            ) {
              navigation.navigate('ReachedModal');
              // Alert.alert(
              //   'You have reached your limit of happy hour date profiles for today.',
              // );
            } else {
              logJoinHappyHour(currentState.blind_date_group_id);
              updateState('JOINED_WAITING', res.data);
              setLoader(false);
              navigation.navigate('BlindDateScreen');
            }
          },
        );
      } else {
        navigation.navigate('MicPermissionModal');
      }
    } catch (e) {
      setLoader(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.header,
          {paddingTop: Platform.OS === 'android' ? insets.top : 0},
        ]}>
        <Text style={styles.title}>AUDIO SPEED DATE</Text>
        <Text style={styles.time}>
          Ends in {' ' + Math.floor(endsIn / 60) + ' hr '}
          {' ' + (endsIn % 60) + ' min'}
        </Text>
        <Text style={styles.few}>Few people in the room</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            Platform.OS === 'ios'
              ? startPress()
              : requestCameraAndAudioPermission();
          }}>
          <Image
            style={styles.logoIcon}
            source={require('../../Assets/Image/startbutton.png')}
          />
          {loader ? (
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
      </View>
      <WaitingFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'space-around',
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    lineHeight: 25,
    color: AppColors.MainColor1,
    marginBottom: 6,
    marginTop: 24,
    textAlign: 'center',
  },
  time: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: AppColors.AppBlack + 'CC',
    marginBottom: 4,
  },
  few: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: AppColors.AppBlack + '99',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    borderWidth: 9,
    borderColor: Colors.white,
    borderRadius: 100,
    width: 150,
    height: 150,
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
    width: 132,
    height: 132,
    borderRadius: 66,
    opacity: 0.9,
  },
  start: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: Colors.white,
  },
  disableTouch: {
    zIndex: 20,
    width: 48,
  },
});

export default WaitingRoom;
