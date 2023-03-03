import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import AppColors from '../../Utils/AppColors';
import CustomImage from '../../Components/Common/CustomImage';
import ModalBackground from '../../Components/Common/ModalBackground';

const NewProfiles = ({hide, count}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;

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
          <Text style={styles.title}>
            Today’s new profile suggestions are ready!
          </Text>
          <View style={styles.center}>
            <CustomImage
              style={styles.new}
              source={require('../../Assets/Image/newProfiles.png')}
            />
            <Text style={styles.count}>{count}+</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={hide}>
              <View style={styles.linear}>
                <Text style={styles.buttonText}>Let’s see</Text>
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
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    margin: 12,
  },
  box: {
    padding: 35,
  },
  footer: {
    width: '100%',
    paddingBottom: 6,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 25,
    marginBottom: 14,
    marginTop: 21,
  },
  center: {
    position: 'relative',
    marginBottom: 29,
    width: 204,
    height: 152,
  },
  new: {
    width: 204,
    height: 152,
  },
  count: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    position: 'absolute',
    right: 50,
    top: 64,
  },
  button: {
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#4DD3D3',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 48,
  },
});

export default NewProfiles;
