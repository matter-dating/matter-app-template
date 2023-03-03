import React, {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
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
import AppColors from '../Utils/AppColors';
import {useAuth} from '../Providers/AuthProvider';
import {calculateUserStatus} from '../Utils/Functions';
import {logClickWaitlistAbout} from '../Utils/Analytics';

function WaitListScreen({navigation, route}) {
  const insets = useSafeArea();
  const {waitList} = route.params ? route.params : 'WaitList';
  const termsURL = 'https://matter.dating/about';
  const {user, userData, updateUserData, userInvitation} = useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
          // console.log(userData.status, '->', userNewStatus);
          if (
            userData.status === 7 &&
            (userNewStatus === 0 || userNewStatus === 11 || userNewStatus === 8)
          ) {
            navigation.navigate('WaitThank', {userNewStatus});
          } else {
            await user.callFunction('updateUserField', [
              userData.user_id,
              'status',
              userNewStatus,
            ]);
            await updateUserData();
            if (userNewStatus === 7) {
              navigation.navigate('WaitList', {waitList: 'WaitList'});
            } else if (userNewStatus === 6) {
              navigation.navigate('WaitList', {waitList: 'BlackList'});
            } else if (userNewStatus === 5) {
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
          }
        }
      })();
    }
  }, [userInvitation]);

  const handlePress = async () => {
    logClickWaitlistAbout();
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
        defaultSource={require('../Assets/Image/waitList.png')}
        source={require('../Assets/Image/waitList.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.contain}>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            <Text style={styles.title}>Coming soon{'\n'}to your city.</Text>
            <Text style={styles.text}>
              We’ll let you know when we launch{'\n'}
              In your city. You can invite friends.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.bgButton]}
              onPress={handlePress}>
              <Text style={[styles.buttonText, styles.whiteText]}>
                About matter
              </Text>
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
  title: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    lineHeight: 42,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: AppColors.AppBlack + 'CC',
    fontFamily: 'Poppins-Medium',
    marginBottom: 62,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 26,
    marginTop: 17,
  },
  bgButton: {
    padding: 0,
    borderWidth: 0,
    backgroundColor: AppColors.MainColor4,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 52,
    color: AppColors.IconColor,
  },
  whiteText: {
    color: AppColors.white,
  },
});

export default WaitListScreen;
