import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Linking,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import AppColors from '../../Utils/AppColors';
import MoreModal from './MoreModal';

const UseDataModal = ({hide}) => {
  const {t} = useTranslation();
  const termsURL = 'https://matter.dating/privacy';
  // const cookiesURL = 'https://matter.dating/cookies';

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
    <MoreModal hide={hide}>
      <View style={styles.container}>
        <Text style={styles.title}>Privacy policy</Text>
        <View style={styles.box}>
          <Text style={styles.text}>
            If you give us your consent, we will be able to collect your precise
            geolocation (latitude and longitude) in order to offer you features
            that make use of it. Such geolocation is collected through various
            means, depending on the service and device you’re using, including
            GPS, Bluetooth or Wi-Fi connections. If you decline permission for
            us to collect your geolocation, we will not collect it.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={hide}>
          <View style={styles.linear}>
            <Text style={styles.buttonText}>{t('General.Close')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.termsText}>
            <Text style={styles.link}>{t('Location.ModalLearn')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  button: {
    marginTop: 17,
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
  },
  linear: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 50,
    color: AppColors.white,
  },
  container: {
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  box: {
    paddingVertical: 20,
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Regular',
  },
  termsText: {
    paddingVertical: 10,
    marginTop: 10,
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default UseDataModal;
