import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeArea} from 'react-native-safe-area-context';
import phones from '../../Assets/Json/country_dial_info.json';

import Toast from '../../Assets/Package/react-native-toast-message';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import {useAuth} from '../../Providers/AuthProvider';

import Colors from '../../Utils/Colors';
import {
  formatPhoneNumber,
  formatPhoneNumberRegister,
} from '../../Utils/Functions';
import AppColors from '../../Utils/AppColors';
import PhoneModal from '../Modals/PhoneModal';
import DownIcon from '../../Assets/Svg/DownIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import {logSetupPhone} from '../../Utils/Analytics';

const RegisterPhone = ({navigation}) => {
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const {signInAnon} = useAuth();
  const [phonePrefix, setPhonePrefix] = useState(phones[0]);
  const [phone, setPhone] = useState('');
  const [lastPhone, setLastPhone] = useState('');
  const [loader, setLoader] = useState(false);
  const insets = useSafeArea();
  const {t} = useTranslation();

  useEffect(() => {
    if (phone.startsWith(phonePrefix.dial_code)) {
      setLastPhone(
        phonePrefix.dial_code +
          phone.substring(phonePrefix.dial_code.length).replace(/\D/g, ''),
      );
    } else {
      setLastPhone(phonePrefix.dial_code + phone.replace(/\D/g, ''));
    }
  }, [phone, phonePrefix]);

  const openModal = () => {
    // Keyboard.dismiss();
    setPhoneModalVisible(true);
  };

  const termsURL = 'https://matter.dating/terms';
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
  // const handlePressCookies = async () => {
  //   // Checking if the link is supported for links with custom URL scheme.
  //   const supported = await Linking.canOpenURL(cookiesURL);
  //   if (supported) {
  //     await Linking.openURL(cookiesURL);
  //   } else {
  //     Alert.alert(`Don't know how to open this URL: ${cookiesURL}`);
  //   }
  // };

  const clickNext = async () => {
    setLoader(true);
    if (phone.trim().length === 0) {
      Toast.show({
        position: 'top',
        type: 'notif',
        text1: `${t('General.PhoneError1')}`,
        topOffset: 0,
        visibilityTime: 2000,
      });
      setLoader(false);
      return false;
    }
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: `${t('General.PhoneSuccess')}` + formatPhoneNumber(lastPhone),
      text2: `${t('General.PhoneSuccess1')}`,
      topOffset: 0,
      visibilityTime: 2000,
    });
    const anonUser = await signInAnon();
    try {
      var verification = await anonUser.callFunction('sendTwilioSms', [
        lastPhone,
      ]);
      setLoader(false);
      logSetupPhone();
      navigation.navigate('RegisterPhoneVerify', {
        verification,
        phoneNumber: lastPhone,
      });
    } catch (err) {
      Toast.show({
        position: 'top',
        type: 'error',
        text1: `${t('General.PhoneError2')}`,
        topOffset: 0,
        visibilityTime: 2000,
      });
      setLoader(false);
      return false;
    }
  };

  return (
    <View style={styles.flex}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {marginTop: insets.top}]}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <BackIcon width={20} height={20} color={Colors.MainColor + 'CC'} />
        </TouchableOpacity>
        <View style={styles.empty} />
      </View>
      <View style={styles.contain}>
        <Text style={styles.title}>{t('General.PhoneTitle')}</Text>
        <View style={styles.phoneRow}>
          <TouchableOpacity onPress={openModal} style={styles.innerContainer}>
            <Text numberOfLines={1} style={styles.text}>
              {phonePrefix.flag && phonePrefix.flag} {phonePrefix.code}{' '}
              {phonePrefix.dial_code}
            </Text>
            <DownIcon width={18} height={18} color={Colors.MainColor} />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder={t('General.PhonePlaceholder')}
            placeholderTextColor={Colors.MainColor + 'A3'}
            value={formatPhoneNumberRegister(phonePrefix.dial_code, phone)}
            autoCompleteType="tel"
            dataDetectorTypes="phoneNumber"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(text) => setPhone(text)}
            returnKeyType="done"
          />
        </View>
        <Text style={styles.description}>
          {t('General.PhoneText1')}{'\n'}
          {t('General.PhoneText2')}{'\n'}
          {t('General.PhoneText3')}
        </Text>
        <View style={styles.bottom}>
          <Text style={styles.termsText}>{t('General.PhoneLearn')} </Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.termsText}>
              <Text style={styles.link}>{t('General.PhonePrivacy')}</Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={handlePressCookies}>
          <Text style={styles.termsText}>
            and <Text style={styles.link}>Cookies Policy</Text>
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <TouchableOpacity style={styles.button} onPress={() => clickNext()}>
          <View style={styles.linear}>
            <Text style={[styles.buttonText, styles.whiteText]}>{t('General.Continue')}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={phoneModalVisible}>
        <PhoneModal
          phones={phones}
          phonePrefix={phonePrefix}
          setPhoneModalVisible={setPhoneModalVisible}
          setPhonePrefix={setPhonePrefix}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    justifyContent: 'space-between',
    flex: 1,
  },
  contain: {
    flex: 1,
    paddingHorizontal: 45,
    paddingBottom: 30,
  },
  title: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    marginVertical: 12,
    textAlign: 'center',
  },
  description: {
    color: Colors.MainColor + 'B8',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 55,
  },
  text: {
    marginRight: 8,
    fontSize: 15,
  },
  phoneInput: {
    borderBottomWidth: 0.5,
    borderColor: Colors.MainColor + 'CC',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    width: '100%',
    fontSize: 15,
    flex: 1,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.MainColor + 'CC',
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  bottom: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  termsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 38,
    marginTop: 'auto',
    textAlign: 'center',
    color: Colors.MainColor,
  },
  link: {
    color: '#0088FF',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textDecorationLine: 'underline',
    lineHeight: 38,
  },
  androidPicker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    padding: 10,
  },
  empty: {
    width: 40,
  },
  fullEmpty: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 31,
  },
  linear: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.white,
  },
});

export default RegisterPhone;
