import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import {calculateUserStatus} from '../../Utils/Functions';
import {useAuth} from '../../Providers/AuthProvider';

import AppColors from '../../Utils/AppColors';

const termsURL = 'https://matter.dating/terms';

function StrikeModal() {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const {user, userData, updateUserData, userInvitation, updateInvitation} =
    useAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      // console.log(
      //   'userInvitation is_valid_photo:',
      //   userInvitation[0].is_valid_photo,
      // );
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
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
            // console.log('Normal Home:');
            navigation.navigate('TabNavigator');
          }
        }
      })();
    }
  }, [userInvitation]);

  const okGotIt = async () => {
    if (userData.status === 3) {
      let last_seen_report_count = userInvitation[0].seen_report_count;
      // console.log('ok got it', last_seen_report_count);
      updateInvitation(userInvitation[0], last_seen_report_count + 1);
      navigation.navigate('TabNavigator');
    }
  };
  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(termsURL);
    if (supported) {
      await Linking.openURL(termsURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${termsURL}`);
    }
  };
  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {marginTop: insets.top + 8}]} />
      <View style={styles.contain}>
        <View style={styles.row}>
          <View style={styles.alert}>
            <ExclamationIcon width={3} height={17} color={AppColors.white} />
          </View>
          {userInvitation &&
            userInvitation.length > 0 &&
            userInvitation[0].report_count > 0 && (
              <Text style={styles.title}>
                {userInvitation[0].report_count === 1
                  ? 'First strike! '
                  : 'Second strike! '}
                <Text style={styles.light}>
                  {userInvitation[0].report_count}/3
                </Text>
              </Text>
            )}
        </View>
        <Text style={styles.description}>
          You have received your first strike for bad behavior on our app. If
          you get <Text style={styles.boldDescription}>3 strikes</Text>, you
          will be permanently suspended from our platform.
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>Read our community guidelines</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <TouchableOpacity style={styles.see}>
          <Text style={styles.why}>See why you get strikes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => okGotIt()}>
          <Text style={styles.buttonText}>Okay, got it</Text>
        </TouchableOpacity>
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
    height: 40,
  },
  contain: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#E57A10',
    width: 33,
    height: 33,
    borderRadius: 17,
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'center',
  },
  title: {
    color: '#E57A10',
    fontFamily: 'Poppins-Medium',
    fontSize: 26,
  },
  light: {
    fontFamily: 'Poppins-Light',
  },
  description: {
    color: AppColors.AppBlack + 'E6',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  boldDescription: {
    fontFamily: 'Poppins-Bold',
  },
  text: {
    color: AppColors.AppBlack + 'E6',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: 32,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
    marginTop: 24,
    backgroundColor: AppColors.MainColor,
  },
  see: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
    marginTop: 24,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
  },
  why: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: AppColors.AppBlack,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.white,
  },
});

export default StrikeModal;
