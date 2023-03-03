import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import {calculateUserStatus} from '../../Utils/Functions';
import UseDataModal from '../Modals/UseDataModal';
import {logLocationPermission} from '../../Utils/Analytics';

function RegisterLocation({navigation}) {
  const insets = useSafeArea();
  const {t} = useTranslation();
  const {user, userData, updateLocation, userInvitation, updateUserData} =
    useAuth();
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();
  const [moreVisible, setMoreVisible] = useState(false);

  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        // console.log('invitation changed:', userInvitation.length, isFocused);

        if (
          userNewStatus !== userData.status &&
          userInvitation[0].region !== 'noList'
        ) {
          // console.log(userData.status, '->', userNewStatus, ' :', userData.is_location_allowed);
          await user.callFunction('updateUserField', [
            userData.user_id,
            'status',
            userNewStatus,
          ]);
          await updateUserData();
          setLoader(false);
          if (userNewStatus === 7) {
            navigation.navigate('RegisterNotification', {waitList: 'WaitList'});
          } else if (userNewStatus === 6) {
            navigation.navigate('RegisterNotification', {waitList: 'WaitList'});
          } else {
            navigation.navigate('RegisterNotification', {waitList: 'Normal'});
          }
        }
      })();
    }
  }, [userInvitation]);

  const navigateToWaitList = async () => {
    logLocationPermission('allowed');
    // console.log('location given');
  };
  const navigateToWaitListError = async () => {
    logLocationPermission('not_now');
    navigation.navigate('RegisterNotification', {waitList: 'NoLocation'});
  };
  const clickThenFailed = async (e) => {
    logLocationPermission('denied');
    // console.log('error on allow location (clickThenFailed)', e);
    navigation.navigate('RegisterNotification', {waitList: 'NoLocation'});
  };
  const clickAllow = async () => {
    setLoader(true);
    updateLocation(navigateToWaitList, clickThenFailed);
  };
  const hideModal = () => {
    setMoreVisible(false);
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <ImageBackground
        defaultSource={require('../../Assets/Image/location.png')}
        source={require('../../Assets/Image/location.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.contain}>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            <Text style={styles.title}>{t('Location.Title')}</Text>
            <Text style={styles.description1}>{t('Location.Find')}</Text>
            <Text style={styles.title1}>
              {t('Location.Share')}{'\n'}
              <TouchableOpacity onPress={() => setMoreVisible(true)}>
                <Text style={styles.underLine}>{t('Location.Learn')}</Text>
              </TouchableOpacity>
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => clickAllow()}>
              <View style={styles.linear}>
                <Text style={[styles.buttonText, styles.whiteText]}>
                  {t('General.Continue')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigateToWaitListError();
              }}>
              <Text style={styles.buttonText}>{t('General.NotNow')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <UseDataModal hide={hideModal} />
      </Modal>
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
  },
  contain: {
    marginTop: 'auto',
    paddingHorizontal: 27,
    flex: 1,
    paddingTop: 60,
  },
  body: {
    marginTop: 'auto',
    paddingTop: 0,
  },
  description1: {
    color: AppColors.IconColor + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    lineHeight: 31,
    marginBottom: 10,
  },
  title1: {
    color: AppColors.IconColor + 'C7',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 58,
  },
  title: {
    color: AppColors.IconColor + 'C7',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 10,
  },
  button: {
    marginTop: 17,
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
  },
  linear: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 50,
    color: AppColors.IconColor,
  },
  whiteText: {
    color: AppColors.white,
  },
  underLine: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: AppColors.MainColor,
    textDecorationLine: 'underline',
  },
});

export default RegisterLocation;
