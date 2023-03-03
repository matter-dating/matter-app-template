import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AppColors from '../../Utils/AppColors';
import LottieView from 'lottie-react-native';

const {width: screenWidth} = Dimensions.get('window');
const DateGameEnd = ({point, clickClose}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={styles.contain}>
        {point > 0 ? (
          <>
            <LottieView
              source={require('../../Assets/Animation/end_game.json')}
              autoPlay
              loop
              style={styles.disableTouch}
            />
            <Text style={styles.great}>Great job!</Text>
          </>
        ) : (
          <>
            <Text style={styles.icon}>😊 </Text>
            <Text style={styles.text}>Better luck next time</Text>
            <Text style={styles.text1}>You both haven’t earned any points</Text>
          </>
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={clickClose}>
          <Text style={styles.close}>Close</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    marginBottom: 11,
    fontSize: 40,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + 'F5',
    marginBottom: 4,
  },
  text1: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
  },
  footer: {
    paddingVertical: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2F5FD',
    borderRadius: 24,
    height: 48,
  },
  close: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
  },
  great: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + 'F5',
  },
  disableTouch: {
    width: screenWidth - 96,
    height: screenWidth - 96,
    position: 'absolute',
  },
});

export default DateGameEnd;
