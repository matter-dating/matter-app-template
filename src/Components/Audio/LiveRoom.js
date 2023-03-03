import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../Utils/AppColors';
import CustomImage from '../Common/CustomImage';

const LiveRoom = () => {
  const navigation = useNavigation();

  const goLive = () => {
    navigation.navigate('LiveIntro');
  };

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        navigation.navigate('MicPermissionModal');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.item}>
      <LinearGradient
        start={{x: 0.25, y: 0.5}}
        end={{x: 1, y: 0.5}}
        colors={['#7f7fd5', '#91eae4']}
        style={styles.box}>
        <View style={styles.row}>
          <View style={styles.dot} />
          <Text style={styles.title}>LIVE ROOM</Text>
        </View>
        <Text style={styles.description}>Live audio conversations</Text>
        <Text style={styles.text}>Want to talk to someone right now?</Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            Platform.OS === 'ios'
              ? goLive()
              : requestCameraAndAudioPermission();
          }}>
          <CustomImage
            style={styles.logoIcon}
            source={require('../../Assets/Image/startbutton.png')}
          />
          <Text style={styles.start}>Go live</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>What’s Liveroom?</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 31,
    width: '100%',
    marginBottom: 31,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.white,
    marginRight: 8,
  },
  box: {
    borderRadius: 8,
    paddingHorizontal: 29,
    paddingVertical: 35,
    paddingBottom: 40,
    backgroundColor: AppColors.newPurple,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    // lineHeight: 24,
    color: AppColors.white,
  },
  description: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 20,
    color: AppColors.white,
    marginBottom: 6,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: AppColors.white,
  },
  footerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.white,
    textDecorationLine: 'underline',
  },
  startButton: {
    borderWidth: 6,
    borderColor: AppColors.white,
    borderRadius: 70,
    width: 140,
    height: 140,
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
    marginTop: 32,
    marginBottom: 29,
  },
  start: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: AppColors.white,
  },
  logoIcon: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    width: 128,
    height: 128,
    borderRadius: 64,
  },
});

export default LiveRoom;
