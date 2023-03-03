import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Share,
  Linking,
  Alert,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../Utils/AppColors';
import {useAuth} from '../Providers/AuthProvider';

function InviteFriendsScreen({navigation, route}) {
  const insets = useSafeArea();
  const {waitList} = route.params;
  const {userInvitation, userData} = useAuth();

  useEffect(() => {
    if (
      userInvitation.length > 0 &&
      userInvitation[0].limit <= 0 &&
      userData.status === 7
    ) {
      navigation.navigate('WaitThank', {waitList});
    } else {
      onShare();
    }
  });
  const onShare = async () => {
    Share.share({
      title: 'Matter invite link',
      message:
        'https://matter.mn/' +
        (waitList !== 'BlackList' ? userInvitation[0].code : ''),
      url:
        'https://matter.mn/' +
        (waitList !== 'BlackList' ? userInvitation[0].code : ''),
    });
  };

  const termsURL = 'https://matter.dating/about';
  const handlePress = async () => {
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
          <View style={styles.header}>
            <Text style={styles.top}>
              Invite{' '}
              {waitList !== 'BlackList' &&
                (userInvitation[0].limit <= 0
                  ? 0
                  : userInvitation[0].limit)}{' '}
              Friends
            </Text>
            <Text style={styles.bottom}>
              {waitList !== 'BlackList'
                ? 'When 5 of your friends join, you can access the nearest available city.'
                : 'Add friends to shorten the waiting time.'}
            </Text>
          </View>
          <View style={[styles.body, {bottom: insets.bottom + 20}]}>
            <Text style={styles.title}>Coming soon{'\n'}to your city.</Text>
            <Text style={styles.subTitle}>Don’t want to wait?</Text>
            <Text style={styles.text}>
              Shorten the waiting time by inviting friends.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.bgButton]}
              onPress={onShare}>
              <Text style={[styles.buttonText, styles.whiteText]}>
                Invite friends
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>About matter</Text>
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
  top: {
    fontSize: 30,
    lineHeight: 42,
    color: AppColors.AppBlack + 'D6',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  bottom: {
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.AppBlack + 'D6',
    fontFamily: 'Poppins-Medium',
  },
  title: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    lineHeight: 42,
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

export default InviteFriendsScreen;
