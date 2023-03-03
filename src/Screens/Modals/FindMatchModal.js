import React, {useState, useEffect, FunctionComponent} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import LottieView from 'lottie-react-native';

import AppColors from '../../Utils/AppColors';
import Colors from '../../Utils/Colors';
import {useAuth} from '../../Providers/AuthProvider';
import BlindDateQuery from '../../Api/BlindDateQuery';

const FindMatchModal: FunctionComponent = (props) => {
  const {userData} = useAuth();
  const blindApi = new BlindDateQuery();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const [timer, setTimer] = useState(3);
  const [showCountDown, setShowCountDown] = useState(false);
  const [countDown, setCountDown] = useState(false);

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

  useEffect(() => {
    let interval = null;
    if (countDown) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      if (timer === 0) {
        clearInterval(interval);
        props.endCount();
        props.hide();
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countDown, timer]);

  useEffect(() => {
    if (props.isCount) {
      setTimeout(() => {
        setShowCountDown(true);
        setCountDown(true);
      }, 3000);
    }
  }, [props.isCount]);

  const renderModalContent = () => {
    if (showCountDown) {
      return (
        <>
          <View style={styles.timer}>
            <View style={styles.center}>
              <Text style={styles.timeText}>{timer}</Text>
            </View>
          </View>
        </>
      );
    } else if (props.isStart) {
      return (
        <>
          <View style={styles.center}>
            <Text style={styles.text}>Waiting for your date to start</Text>
          </View>
          <View style={styles.modalBody}>
            <LottieView
              source={require('../../Assets/Animation/loading.json')}
              autoPlay
              loop
            />
          </View>
        </>
      );
    } else if (props.otherUserLeft) {
      return (
        <>
          <View style={styles.modalBody}>
            <Text style={styles.emoji}>😢</Text>
            <Text style={styles.centerText}>
              Oops, looks like your date went offline at the last minute
            </Text>
          </View>
          <TouchableOpacity
            style={styles.modalFooter}
            onPress={() => {
              props.leaveChannel();
              blindApi.getBlindDate(userData.location.coordinates, (res) => {
                blindApi.join(
                  userData.gender,
                  userData.interest,
                  res.data.blind_date_group_id,
                  res.data.blind_date_to_end.toString(),
                  () => {
                    props.hide();
                    props.navigation.navigate('BlindWaiting');
                  },
                );
              });
            }}>
            <Text style={styles.start}>Go to lobby</Text>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.modalBody}>
            <Text style={styles.text}>🎉 I found you a date! 🎉</Text>
          </View>
          <TouchableOpacity
            style={styles.modalFooter}
            onPress={props.clickStart}>
            <Text style={styles.start}>Ok, let’s start</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity
        style={styles.bg}
        // onPress={props.hide}
      />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View>
          <BlurView
            style={styles.absolute}
            blurType="xlight"
            blurAmount={10}
            reducedTransparencyFallbackColor="white">
            {!showCountDown && (
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={props.cancel}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
            {renderModalContent()}
          </BlurView>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0009143D',
  },
  absolute: {
    // backgroundColor: 'white',
    borderRadius: 8,
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    // backgroundColor: Colors.white,
    borderRadius: 8,
    margin: 21,
  },
  modalHeader: {
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  center: {
    paddingHorizontal: 16,
    paddingTop: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 37,
    paddingBottom: 51,
  },
  modalFooter: {
    borderTopWidth: 0.5,
    borderColor: Colors.MainColor1 + 'A3',
    paddingVertical: 18,
    alignItems: 'center',
  },
  start: {
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1 + 'D9',
    lineHeight: 20,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1 + 'D9',
    lineHeight: 24,
    fontSize: 17,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 15,
  },
  centerText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: AppColors.black + 'F2',
    lineHeight: 20,
    fontSize: 13,
  },
  timer: {
    paddingTop: 56,
    paddingBottom: 78,
  },
  timeText: {
    fontSize: 48,
    fontFamily: 'Poppins-Medium',
    lineHeight: 67,
  },
});

export default FindMatchModal;
