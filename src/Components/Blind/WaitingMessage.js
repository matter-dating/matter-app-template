import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Animated} from 'react-native';
import AppColors from '../../Utils/AppColors';

const WaitingMessage = ({userVerification}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 500);

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, 5000);
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <Animated.View style={styles.innerContainer}>
        <View style={styles.wrapper}>
          <View style={styles.modalBody}>
            <View style={styles.bell}>
              <Text>🔔</Text>
            </View>
            <Text style={styles.topic}>
              We’ll ring a bell when a new date{'\n'}
              joins your room.{'\n'}
              Meanwhile relax and enjoy!
            </Text>
            <View style={styles.bell} />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
  },
  wrapper: {
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  innerContainer: {
    borderRadius: 8,
    margin: 34,
    backgroundColor: AppColors.white,
    elevation: 0,
  },
  modalBody: {
    padding: 16,
    paddingVertical: 19,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  bell: {
    width: 30,
    textAlign: 'center',
  },
  topic: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 20,
    fontSize: 13,
  },
});

export default WaitingMessage;
