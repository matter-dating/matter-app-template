import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Platform,
  Linking,
} from 'react-native';
import LottieView from 'lottie-react-native';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import AppColors from '../../Utils/AppColors';
import CustomImage from '../../Components/Common/CustomImage';
import ModalBackground from '../../Components/Common/ModalBackground';

const TurnOnNotificationModal = ({hide}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

  const clickAllow = () => {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:')
        .then((supported) => {
          if (!supported) {
          } else {
            return Linking.openURL('app-settings:');
          }
        })
        .catch((err) => console.error('An error occurred', err));
    } else {
      Linking.openSettings();
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ModalBackground />
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.box}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.delete} onPress={hide}>
              <DeleteIcon color={AppColors.AppBlack} width={24} height={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Turn on notification</Text>
          <Text style={styles.text}>
            You’re missing out on your{' '}
            <Text style={styles.bold}>
              likes, matches,{'\n'}
              messages, Happy Hour & more
            </Text>
          </Text>
          <View style={styles.center}>
            <LottieView
              source={require('../../Assets/Animation/notification.json')}
              autoPlay
              loop
              style={styles.disableTouch}
            />
            <CustomImage
              style={styles.hello}
              source={require('../../Assets/Image/hello1.png')}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={clickAllow}>
              <View style={styles.linear}>
                <Text style={styles.buttonText}>Allow notifications</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.later]}
              onPress={hide}>
              <Text style={styles.laterText}>Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    margin: 12,
  },
  box: {
    padding: 26,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  footer: {
    width: '100%',
    paddingHorizontal: 9,
  },
  delete: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 28,
    marginBottom: 8,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    lineHeight: 20,
    marginBottom: 42,
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
  center: {
    width: 121,
    marginBottom: 55,
  },
  hello: {
    width: 121,
    height: 121,
  },
  disableTouch: {
    zIndex: 1,
    position: 'absolute',
    right: -2,
    top: 0,
    width: 40,
  },
  button: {
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 48,
  },
  later: {
    backgroundColor: AppColors.white,
    marginTop: 13,
  },
  laterText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    lineHeight: 48,
  },
});

export default TurnOnNotificationModal;
