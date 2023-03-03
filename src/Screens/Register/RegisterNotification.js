import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import CustomImage from '../../Components/Common/CustomImage';
import {
  logActiveRegistration,
  logNotificationPermission,
  logWaitlistRegistration,
} from '../../Utils/Analytics';

function RegisterNotification({navigation, route}) {
  const {waitList} = route.params;
  const insets = useSafeArea();
  const {updateFcmToken} = useAuth();
  const [loader, setLoader] = useState(false);
  const {t} = useTranslation();

  const navigateToNextStep = () => {
    // console.log('waitlist value:', waitList);
    setLoader(false);
    if (waitList === 'BlackList' || waitList === 'WaitList') {
      logWaitlistRegistration();
      navigation.navigate('WaitList', {waitList});
    } else {
      logActiveRegistration();
      navigation.navigate('RegisterPhoto');
    }
  };
  const clickAllow = () => {
    setLoader(true);
    updateFcmToken(
      () => {
        logNotificationPermission('allowed');
        navigateToNextStep();
      },
      () => {
        logNotificationPermission('denied');
        navigateToNextStep();
      },
    );
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <ImageBackground
        // defaultSource={require('../../Assets/Image/notification.png')}
        // source={require('../../Assets/Image/notification.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.contain}>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            <View style={styles.center}>
              <LottieView
                source={require('../../Assets/Animation/notification.json')}
                autoPlay
                loop
                style={styles.disableTouch}
              />
              <CustomImage
                style={styles.hello}
                source={require('../../Assets/Image/hello.png')}
              />
            </View>
            <Text style={styles.title}>{t('Notification.Title')}</Text>
            <Text style={styles.description}>
              {t('Notification.Text1')}{'\n'}
              {t('Notification.Text2')}
            </Text>
            <Text style={styles.text}>
              {t('Notification.Text3')}
            </Text>
            <TouchableOpacity style={styles.button} onPress={clickAllow}>
              <View style={styles.linear}>
                <Text style={[styles.buttonText, styles.whiteText]}>
                  {t('General.Continue')}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                logNotificationPermission('not_now');
                navigateToNextStep();
              }}>
              <Text style={styles.buttonText}>{t('General.NotNow')}</Text>
            </TouchableOpacity>
          </View>
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
  description: {
    color: AppColors.IconColor + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    lineHeight: 31,
    marginBottom: 10,
  },
  text: {
    color: AppColors.IconColor + 'B8',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 67,
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
  center: {
    width: 178,
    marginBottom: 25,
  },
  hello: {
    width: 178,
    height: 178,
  },
  disableTouch: {
    zIndex: 1,
    position: 'absolute',
    right: -6,
    top: 0,
    width: 60,
  },
});

export default RegisterNotification;
