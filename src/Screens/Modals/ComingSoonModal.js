import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';

import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';

const ComingSoonModal = ({hide}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

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
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.box}>
          <Text style={styles.title}>Coming soon</Text>
          <Text style={styles.text}>
            There are few people in your area.{'\n'}
            We will add more preference filters soon{'\n'}
            for you to use!
          </Text>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={hide}>
              <View style={styles.linear}>
                <Text style={styles.buttonText}>Okay, got it</Text>
              </View>
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
    backgroundColor: 'rgba(3,15,29,0.24)',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    margin: 12,
  },
  box: {
    padding: 19,
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 27,
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 21,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    lineHeight: 22,
    marginBottom: 36,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 52,
  },
});

export default ComingSoonModal;
