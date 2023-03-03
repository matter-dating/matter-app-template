import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Alert,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {logClickLogin, logClickRegister} from '../Utils/Analytics';

import AppColors from '../Utils/AppColors';
import {useTranslation} from 'react-i18next';

function WelcomeScreen({navigation}) {
  const {t} = useTranslation();
  const insets = useSafeArea();
  const termsURL = 'https://matter.dating/terms';

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(termsURL);
    if (supported) {
      await Linking.openURL(termsURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${termsURL}`);
    }
  };

  return (
    <View style={styles.wrap}>
      <ImageBackground
        defaultSource={require('../Assets/Image/welcome.png')}
        source={require('../Assets/Image/welcome.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.contain}>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            <Text style={styles.welcome}>{t('General.WelcomeTitle')}</Text>
            <Text style={styles.title}>
              {t('General.WelcomeSubTitle1')}{'\n'}
              {t('General.WelcomeSubTitle2')}
            </Text>
            <View style={styles.bottom}>
              <Text style={styles.termsText}>
                {t('General.WelcomebyClick1')}
              </Text>
              <TouchableOpacity onPress={handlePress}>
                <Text style={styles.termsText}>
                {t('General.WelcomebyClick2')} <Text style={styles.link}>{t('General.WelcomebyClick3')}</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.bgButton]}
              onPress={() => {
                logClickRegister();
                navigation.navigate('RegisterPhone');
              }}>
              <Text style={[styles.buttonText, styles.whiteText]}>
                {t('General.WelcomeRegister')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                logClickLogin();
                navigation.navigate('RegisterPhone');
              }}>
              <Text style={styles.buttonText}>{t('General.WelcomeLogin')}</Text>
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
  welcome: {
    color: AppColors.IconColor + 'C7',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 8,
  },
  title: {
    color: AppColors.IconColor + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 26,
    lineHeight: 39,
    marginBottom: 44,
    textTransform: 'uppercase',
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    marginTop: 17,
  },
  bgButton: {
    padding: 0,
    borderWidth: 0,
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
  bottom: {
    paddingBottom: 11,
  },
  termsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 'auto',
    textAlign: 'center',
    color: AppColors.IconColor,
  },
  link: {
    color: '#1684FF',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default WelcomeScreen;
