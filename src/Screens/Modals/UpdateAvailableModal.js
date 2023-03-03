import React, {useState, useEffect} from 'react';

import {
  Text,
  StyleSheet,
  View,
  Animated,
  Image,
  Linking,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../Utils/AppColors';
// import {useAppFlag} from '../../Providers/AppFlagProvider';
// import {android_build_number, ios_build_number} from '../../Utils/EnvironmentVariables';
import {useAppContent} from '../../Providers/AppContentProvider';

function UpdateAvailableModal({route}) {
  const navigation = useNavigation();
  const {appVersion} = useAppContent();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, bottom: slideBottom}]}>
      <View style={styles.wrap}>
        <Image
          style={styles.icon}
          source={require('../../Assets/Image/update.png')}
        />
        <Text style={styles.title}>App update now available</Text>
        <Text style={styles.text}>
          For a better experience, download{'\n'}our latest app version
        </Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonColor]}
          onPress={() => {
            if (Platform.OS === 'ios') {
              const link =
                'itms-apps://itunes.apple.com/us/app/id1534978330?mt=8';
              Linking.canOpenURL(link).then(
                (supported) => {
                  supported && Linking.openURL(link);
                },
                (err) => console.error(err),
              );
            } else if (Platform.OS === 'android') {
              const link = 'market://details?id=dating.matter.group';
              Linking.canOpenURL(link).then(
                (supported) => {
                  supported && Linking.openURL(link);
                },
                (err) => console.error(err),
              );
            }
          }}>
          <Text style={styles.update}>Update now</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' && appVersion && appVersion.ios_update_mandatory === false && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.later}>Later</Text>
          </TouchableOpacity>
        )}

        {Platform.OS === 'android' && appVersion && appVersion.android_update_mandatory === false && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={styles.later}>Later</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    paddingVertical: 40,
    paddingBottom: 11,
    paddingHorizontal: 27,
    width: '100%',
    borderRadius: 8,
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: AppColors.AppBlack,
    marginBottom: 2,
  },
  icon: {
    width: 106,
    height: 57,
    marginBottom: 17,
  },
  text: {
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: AppColors.AppBlack,
    marginBottom: 33,
  },
  button: {
    borderRadius: 8,
    marginVertical: 5,
    width: 250,
    alignItems: 'center',
  },
  buttonColor: {
    backgroundColor: AppColors.MainColor,
  },
  update: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    padding: 14,
    color: AppColors.white,
  },
  later: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    padding: 14,
    color: AppColors.MainColor,
  },
});

export default UpdateAvailableModal;
