import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import AppColors from '../Utils/AppColors';

function AvailableScreen({navigation}) {
  const insets = useSafeArea();
  return (
    <View style={styles.wrap}>
      <ImageBackground
        defaultSource={require('../Assets/Image/available.png')}
        source={require('../Assets/Image/available.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.contain}>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            <Text style={styles.city}>Los Angeles</Text>
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.text}>
              You now have access to the nearest available city.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('TabNavigator');
              }}>
              <Text style={styles.buttonText}>Start</Text>
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
    paddingHorizontal: 28,
    flex: 1,
    paddingTop: 60,
  },
  body: {
    marginTop: 'auto',
    paddingTop: 0,
  },
  city: {
    fontSize: 19,
    color: AppColors.AppBlack + 'CC',
    fontFamily: 'Poppins-Medium',
    marginBottom: 62,
    marginLeft: 10,
  },
  title: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    lineHeight: 42,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: AppColors.AppBlack + 'CC',
    fontFamily: 'Poppins-Medium',
    marginBottom: 62,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 26,
    marginTop: 17,
    padding: 0,
    borderWidth: 0,
    backgroundColor: AppColors.MainColor4,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 52,
    color: AppColors.white,
  },
});

export default AvailableScreen;
