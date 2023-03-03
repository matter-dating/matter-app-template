import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import Camera from '../../Assets/Svg/New/Camera';

function CameraPermissionModal({navigation}) {
  const insets = useSafeArea();

  const handleClick = () => {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:')
        .then((supported) => {
          if (!supported) {
          } else {
            return Linking.openURL('app-settings:');
          }
        })
        .catch((err) => console.error('An error occurred', err));
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.wrap}>
      <ImageBackground
        defaultSource={require('../../Assets/Image/Empty/permission.png')}
        source={require('../../Assets/Image/Empty/permission.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={[styles.header, {marginTop: insets.top + 8}]} />
        <View style={styles.contain}>
          <View style={styles.imgBox}>
            <View style={styles.img}>
              <Camera width={105} height={105} />
            </View>
          </View>
          <Text style={styles.description}>
            Please allow access to your photos
          </Text>
        </View>
        <View style={[styles.footer, {bottom: insets.bottom + 20}]}>
          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <View style={styles.linear}>
              <Text style={[styles.buttonText, styles.whiteText]}>Allow</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
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
  contain: {
    justifyContent: 'center',
    paddingHorizontal: 36,
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    height: 40,
  },
  back: {
    padding: 10,
  },
  footer: {
    paddingHorizontal: 36,
    width: '100%',
  },
  description: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 31,
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 126,
    height: 159,
  },
  button: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: '100%',
    borderRadius: 8,
  },
  linear: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.MainColor,
  },
  whiteText: {
    color: Colors.white,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraPermissionModal;
