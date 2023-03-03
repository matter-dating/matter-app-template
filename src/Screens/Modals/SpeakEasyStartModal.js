import React, {useRef, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import BlindDateInstructionModal from './BlindDateInstructionModal';
const {height: screenHeight} = Dimensions.get('window');

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useBlindDate} from '../../Providers/BlindDateProvider';
import BlindDateQuery from '../../Api/BlindDateQuery';
import {useAuth} from '../../Providers/AuthProvider';
import {usePremium} from '../../Providers/PremiumProvider';

const SpeakEasyStartModal = ({hide, speakEasy, navigation, modalBg}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  const [loading, setLoading] = useState(false);
  const [tipVisible, setTipVisible] = useState(false);
  const blindApi = new BlindDateQuery();
  const {isPremium, expirationDate, processPurchases} = usePremium();
  const {userData, getBlindDateMatches} = useAuth();
  const {updateState} = useBlindDate();

  const hideModal = () => {
    setTipVisible(false);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    updateState('BLIND_ACTIVE', {
      blind_date_group_id: speakEasy._id.toString(),
      blind_date_duration: speakEasy.blind_date_duration,
      blind_date_end_time: speakEasy.end_time,
    });
  }, []);

  const startPress = async () => {
    setLoading(true);
    try {
      await processPurchases();
      const permissionStatus = await request(PERMISSIONS.IOS.MICROPHONE);
      if (permissionStatus === RESULTS.GRANTED) {
        blindApi.join(
          userData,
          speakEasy._id.toString(),
          null,
          expirationDate.current,
          (res) => {
            if (res.extra_data && res.extra_data.reason) {
              if (res.extra_data.reason === 'MATCH_LIMIT_REACHED') {
                if (isPremium) {
                  navigation.navigate('EndHappyHour', {
                    blindMatches: getBlindDateMatches(speakEasy._id.toString()),
                  });
                  setLoading(false);
                } else {
                  navigation.navigate('ReachedModal');
                  setLoading(false);
                }
              } else if (res.extra_data.reason === 'ENDED') {
                navigation.navigate('EndHappyHour', {
                  blindMatches: getBlindDateMatches(speakEasy._id.toString()),
                });
                setLoading(false);
              }
            } else {
              updateState('JOINED_WAITING', res.data);
              navigation.navigate('BlindDateScreen');
              setLoading(false);
            }
          },
        );
      } else {
        navigation.navigate('MicPermissionModal');
        setLoading(false);
      }
      hide();
    } catch (e) {
      // console.log('error', e);
    }
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      {modalBg && <ModalBackground />}
      {/* <TouchableOpacity style={styles.bg} onPress={hide} /> */}
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.header}>
          {/* <TouchableOpacity style={styles.back} onPress={hide}>
            <BackIcon width={24} height={24} color={AppColors.AppBlack} />
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.delete} onPress={hide}>
            <DeleteIcon color={AppColors.AppBlack} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.title}>{speakEasy.speakeasy_name}</Text>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={loading ? 1 : 0.4}
            onPress={() => {
              startPress();
            }}>
            <Image
              style={styles.img}
              source={require('../../Assets/Image/tiger.png')}
            />
            {loading ? (
              <LottieView
                source={require('../../Assets/Animation/loader_white.json')}
                autoPlay
                loop
                style={styles.disableTouch}
              />
            ) : (
              <Text style={styles.start}>Click start</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.see}
            onPress={() => setTipVisible(true)}>
            <Text style={styles.instructions}>See how does it work</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <BlindDateInstructionModal hide={hideModal} />
      </Modal>
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
    overflow: 'hidden',
  },
  box: {
    paddingHorizontal: 36,
  },
  footer: {
    width: '100%',
    paddingBottom: 24,
    paddingTop: 45,
    paddingHorizontal: 31,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 15,
    justifyContent: 'flex-end',
  },
  welcome: {
    fontSize: 19,
    fontFamily: 'BarBoothAtMatts',
    color: AppColors.AppBlack,
    lineHeight: 26,
    textAlign: 'center',
  },
  title: {
    fontSize: 25,
    fontFamily: 'BarBoothAtMatts',
    color: AppColors.AppBlack,
    lineHeight: 30,
    textAlign: 'center',
    marginBottom: 4,
  },
  startButton: {
    borderWidth: 6,
    borderColor: AppColors.white,
    backgroundColor: AppColors.speakEasy,
    borderRadius: 70,
    width: screenHeight > 700 ? 140 : 100,
    height: screenHeight > 700 ? 140 : 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 26,
  },
  img: {
    width: screenHeight > 700 ? 70 : 50,
    marginBottom: 1,
    height: screenHeight > 700 ? 70 : 50,
  },
  start: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.white,
  },
  disableTouch: {
    zIndex: 20,
    width: 48,
  },
  see: {
    paddingVertical: 14,
    marginHorizontal: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default SpeakEasyStartModal;
