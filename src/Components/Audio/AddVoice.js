import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import AppColors from '../../Utils/AppColors';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const imgWidth = screenHeight > 700 ? screenWidth - 154 : screenWidth - 172;
const imgHeight = (imgWidth / 653) * 354;

const AddVoice = ({userData, user}) => {
  const navigation = useNavigation();
  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('NewProfile');
  };
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Image
            style={styles.img}
            source={require('../../Assets/Image/addIntro.png')}
          />
        </View>
        <View>
          <Text style={styles.title}>You are not seen to other users</Text>
          <Text style={styles.text}>
            With Audio Intro, your profile will be recommended to potential
            matches on their daily Explore tab
          </Text>
        </View>
        <View />
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnVoiceCreateProfile,
              })
            }>
            <Text style={styles.buttonText} numberOfLines={1}>
              Add Voice Intro
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  box: {
    borderRadius: 8,
    paddingHorizontal: 20,
    overflow: 'hidden',
    justifyContent: 'space-between',
    height: screenWidth + 139,
    backgroundColor: AppColors.MainColor,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 25,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 25,
  },
  header: {
    paddingTop: 52,
    alignItems: 'center',
  },
  footer: {
    paddingBottom: 43,
    paddingHorizontal: screenHeight > 700 ? 60 : 40,
  },
  button: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    paddingVertical: 9,
    alignItems: 'center',
  },
  buttonText: {
    color: AppColors.MainColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AddVoice;
