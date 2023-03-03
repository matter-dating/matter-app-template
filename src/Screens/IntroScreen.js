import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import AppColors from '../Utils/AppColors';

function IntroScreen({navigation}) {
  const insets = useSafeArea();
  const {t} = useTranslation();

  return (
    <View style={styles.wrap}>
      <View style={[styles.viewPager, {marginBottom: insets.bottom + 20}]}>
        <ImageBackground
          defaultSource={require('../Assets/Image/intro1.png')}
          source={require('../Assets/Image/intro1.png')}
          style={styles.bg}
          resizeMode="cover">
          <View style={styles.contain}>
            <View style={styles.body}>
              <Text style={styles.welcome}>{t('BoardEnd.Title')}</Text>
              <Text style={styles.title}>
                {t('BoardEnd.Text')}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.bgButton]}
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'TabNavigator'}],
                  });
                }}>
                <Text style={styles.buttonText}>{t('General.Start')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  viewPager: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  contain: {
    marginTop: 'auto',
    flex: 1,
  },
  body: {
    paddingTop: 60,
    paddingHorizontal: 27,
    marginTop: 'auto',
  },
  welcome: {
    color: AppColors.IconColor + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    lineHeight: 43,
    marginBottom: 8,
  },
  text: {
    color: AppColors.IconColor + 'A3',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 8,
  },
  title: {
    color: AppColors.IconColor + 'C7',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    marginBottom: 80,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    padding: 0,
    borderWidth: 0,
    backgroundColor: AppColors.MainColor,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 50,
    color: AppColors.white,
  },
});

export default IntroScreen;
