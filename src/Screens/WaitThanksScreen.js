import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../Utils/AppColors';
import {useAuth} from '../Providers/AuthProvider';

function WaitThanksScreen({navigation, route}) {
  const insets = useSafeArea();
  const {userNewStatus} = route.params ? route.params : 100;
  const {user, userData, updateUserData} = useAuth();

  const handlePress = async () => {
    await user.callFunction('updateUserField', [
      userData.user_id,
      'status',
      userNewStatus,
    ]);
    await updateUserData();
    if (userNewStatus === 5) {
      navigation.navigate('UnderAge');
    } else if (userNewStatus === 4) {
      navigation.navigate('BannedModal');
    } else if (userNewStatus === 3) {
      navigation.navigate('StrikeModal');
    } else if (userNewStatus === 2) {
      // console.log('NoLocation Home');
    } else if (userNewStatus === 1) {
      // console.log('Hidden Profile Home');
    } else if (userNewStatus === 11) {
      navigation.navigate('RegisterPhoto');
    } else if (userNewStatus === 0 || userNewStatus === 8) {
      navigation.navigate('TabNavigator');
    }
  };

  return (
    <View style={styles.wrap}>
      <ImageBackground
        defaultSource={require('../Assets/Image/location.png')}
        source={require('../Assets/Image/location.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.contain}>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            {!!userData.location_name && (
              <Text numberOfLines={1} style={styles.location}>
                {userData.location_name}
              </Text>
            )}
            <Text style={styles.title}>Your region is now open</Text>
            <Text style={styles.text}>
              Continue with your profile completion & start dating.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePress()}>
              <LinearGradient
                style={styles.linear}
                start={{x: 0.25, y: 0.75}}
                end={{x: 1, y: 0.5}}
                colors={['#EDCC54', '#F889F9', '#B47DFF', '#5BD0FB']}>
                <Text style={styles.buttonText}>Start</Text>
              </LinearGradient>
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
  location: {
    fontSize: 19,
    fontFamily: 'Poppins-Medium',
    marginBottom: 60,
    marginHorizontal: 13,
  },
  title: {
    color: AppColors.IconColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 35,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: AppColors.AppBlack + 'D6',
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: AppColors.AppBlack + 'E6',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    borderRadius: 24,
    padding: 0,
    borderWidth: 0,
    marginTop: 62,
    backgroundColor: AppColors.MainColor4,
  },
  linear: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.white,
  },
});

export default WaitThanksScreen;
