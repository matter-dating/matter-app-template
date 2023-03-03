import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeArea} from 'react-native-safe-area-context';
import CustomImage from '../Components/Common/CustomImage';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import {useAuth} from '../Providers/AuthProvider';

const {width: screenWidth} = Dimensions.get('window');

function LiveNotificationScreen({navigation}) {
  const insets = useSafeArea();
  const {updateFcmToken} = useAuth();
  const navigateToNextStep = () => {
    navigation.navigate('LivePhotoVerification');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.back, {marginTop: insets.top}]} />
      </View>
      <View style={styles.contain}>
        <View>
          <Text style={styles.title}>Turn on your notification</Text>
          <Text style={styles.description}>
            to get requests for audio date!
          </Text>
        </View>
        <View style={styles.imgBox}>
          <CustomImage
            style={styles.img}
            source={require('../Assets/Image/Empty/notification.png')}
          />
        </View>
        <View style={[styles.footer, {bottom: insets.bottom + 20}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              updateFcmToken(navigateToNextStep);
            }}>
            <LinearGradient
              start={{x: 0.25, y: 0.5}}
              end={{x: 1, y: 0.5}}
              colors={['#7f7fd5', '#91eae4']}
              style={styles.linear}>
              <Text style={[styles.buttonText, styles.whiteText]}>Turn on</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToNextStep}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    marginBottom: 40,
  },
  back: {
    padding: 10,
  },
  contain: {
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    flex: 1,
  },
  title: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  description: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 62,
    height: ((screenWidth - 62) / 312) * 168,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
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
});

export default LiveNotificationScreen;
