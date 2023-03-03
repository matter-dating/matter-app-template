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
import {useAuth} from '../../Providers/AuthProvider';
import {calculateUserStatus} from '../../Utils/Functions';

import AppColors from '../../Utils/AppColors';

const termsURL = 'https://matter.dating/terms';
const contactURL = 'https://matter.dating/contact';

function BannedModal() {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const {signOut, user, userData, updateUserData, userInvitation} = useAuth();
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

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(termsURL);
    if (supported) {
      await Linking.openURL(termsURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${termsURL}`);
    }
  };
  const handlePressContact = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(contactURL);
    if (supported) {
      await Linking.openURL(contactURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${contactURL}`);
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
          <Text style={styles.title}>Your account is suspended</Text>
        </View>
        <Text style={styles.description}>
          We have received complaints about your account violating our Community
          Rules.
        </Text>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>Read our Community Rules</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <Text style={styles.footerText}>
          If you believe you did nothing wrong, you can contact our customer
          service at
        </Text>
        <TouchableOpacity onPress={handlePressContact}>
          <Text style={styles.bold}>www.matter.dating/contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Welcome');
            signOut();
          }}>
          <Text style={styles.buttonText}>Log out</Text>
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
    backgroundColor: '#C93737',
    width: 33,
    height: 33,
    borderRadius: 17,
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'center',
  },
  title: {
    color: '#C93737',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 30,
  },
  description: {
    color: AppColors.AppBlack + 'E6',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
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
  footerText: {
    color: '#3FABCB',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
    color: '#3FABCB',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
    marginTop: 24,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.white,
  },
});

export default BannedModal;
