import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';

const data = [{}, {}, {}];
const {width: screenWidth} = Dimensions.get('window');
const SpeakEasyInstructionModal = ({hide}) => {
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
      <ModalBackground />
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.delete} onPress={hide}>
            <DeleteIcon color={AppColors.AppBlack} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>What is Speakeasy?</Text>
          <Text style={styles.text}>
            Speakeasy is a virtual event within
            <Text style={styles.bold}> communities</Text> where members have
            {'\n'}
            <Text style={styles.bold}>1-on-1 live-audio conversations</Text>
          </Text>
          <Text style={styles.text}>You will need the code to enter.</Text>
          <Text style={styles.text}>
            To create a new community, reach out to
            <Text style={styles.bold}> BlindTiger@GoToSpeakeasy.com</Text>
          </Text>
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
    margin: 13,
    paddingBottom: 23,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
    paddingVertical: 13,
    paddingHorizontal: 13,
  },
  delete: {
    padding: 10,
  },
  body: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  title: {
    fontFamily: 'BarBoothAtMatts',
    fontSize: 24,
    color: AppColors.AppBlack,
    lineHeight: 30,
    marginBottom: 5,
  },
  text: {
    marginVertical: 12,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
});

export default SpeakEasyInstructionModal;
