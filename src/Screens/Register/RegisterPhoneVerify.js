import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import Toast from '../../Assets/Package/react-native-toast-message';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {useAuth} from '../../Providers/AuthProvider';

import Colors from '../../Utils/Colors';
import {formatPhoneNumber} from '../../Utils/Functions';
import AppColors from '../../Utils/AppColors';
import BackIcon from '../../Assets/Svg/BackIcon';
import {logLogin, logOnboardStart, logVerifyPhone} from '../../Utils/Analytics';

const RegisterPhoneVerify = ({route, navigation}) => {
  const {verification, phoneNumber} = route.params;
  const [pin, setPin] = useState('');
  const insets = useSafeArea();
  const inputRef = useRef(null);
  const {signInWithNumber} = useAuth();
  const [isFocus, setIsFocus] = useState(false);
  const {t} = useTranslation();

  const clickRow = () => {
    setPin('');
    inputRef.current.clear();
    inputRef.current.focus();
  };

  const login = async () => {
    const user = await signInWithNumber(phoneNumber);
    if (user.customData.profile_hd_images.length > 0) {
      navigation.reset({
        index: 0,
        routes: [{name: 'TabNavigator'}],
      });
    } else {
      navigation.navigate('RegisterPhoto');
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidHide', callBack);
    }
    return () => {
      if (Platform.OS === 'android') {
        Keyboard.removeListener('keyboardDidHide', callBack);
      }
    };
  }, []);

  const callBack = () => {
    inputRef.current.blur();
  };

  useEffect(() => {
    if (pin.length === 4) {
      clickNext();
    }
  }, [pin]);

  const clickBack = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: `${t('General.VerifyReEnter')}`,
      topOffset: 0,
      visibilityTime: 2000,
    });
    navigation.goBack();
  };

  const clickNext = () => {
    if (pin.length === 4) {
      if (pin === verification.code.toString()) {
        logVerifyPhone();
        if (verification.action === 'REGISTER') {
          logOnboardStart();
          navigation.navigate('CommunityRules', {phoneNumber});
        } else {
          logLogin();
          login();
        }
      } else {
        Toast.show({
          position: 'top',
          type: 'notif',
          text1: `${t('General.VerifyWrong')}`,
          topOffset: 0,
          visibilityTime: 2000,
        });
      }
    } else {
      Toast.show({
        position: 'top',
        type: 'notif',
        text1: `${t('General.VerifyWrong')}`,
        topOffset: 0,
        visibilityTime: 2000,
      });
    }
  };
  return (
    <View style={styles.flex}>
      <View style={[styles.header, {marginTop: insets.top}]}>
        <TouchableOpacity style={styles.back} onPress={clickBack}>
          <BackIcon width={20} height={20} color={Colors.MainColor + 'CC'} />
        </TouchableOpacity>
        <View style={styles.empty} />
      </View>
      <View style={styles.contain}>
        <Text style={styles.title}>{t('General.VerifyPhone')}</Text>
        <Text style={styles.description}>
          {t('General.VerifyDigit')}{'\n'}
          {t('General.VerifyTo')} {formatPhoneNumber(phoneNumber)}
        </Text>
        <TouchableOpacity style={styles.row} onPress={clickRow}>
          <View style={[styles.box, isFocus && styles.greenBox]}>
            <Text style={styles.boxText}>{pin && pin.charAt(0)}</Text>
          </View>
          <View style={[styles.box, isFocus && styles.greenBox]}>
            <Text style={styles.boxText}>{pin && pin.charAt(1)}</Text>
          </View>
          <View style={[styles.box, isFocus && styles.greenBox]}>
            <Text style={styles.boxText}>{pin && pin.charAt(2)}</Text>
          </View>
          <View style={[styles.box, isFocus && styles.greenBox]}>
            <Text style={styles.boxText}>{pin && pin.charAt(3)}</Text>
          </View>
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          style={styles.phoneInput}
          placeholder="Enter number"
          placeholderTextColor={Colors.MainColor + 'A3'}
          value={pin}
          returnKeyType={'done'}
          keyboardType="phone-pad"
          onChangeText={(text) => setPin(text)}
          maxLength={4}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />
        <TouchableOpacity style={styles.resend} onPress={clickBack}>
          <Text style={styles.resendText}>{t('General.VerifyDidnt')}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <TouchableOpacity style={styles.button} onPress={clickNext}>
          <View style={styles.linear}>
            <Text style={[styles.buttonText, styles.whiteText]}>{t('General.Continue')}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    marginVertical: 12,
    textAlign: 'center',
  },
  phoneInput: {
    display: 'none',
  },
  description: {
    color: Colors.MainColor + 'B8',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  resend: {
    alignItems: 'center',
    padding: 10,
  },
  resendText: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#0063D1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 56,
  },
  box: {
    borderRadius: 4,
    borderColor: '#030F1D',
    borderWidth: 0.5,
    width: 28,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  greenBox: {
    borderColor: AppColors.MainColor,
  },
  boxText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
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

export default RegisterPhoneVerify;
