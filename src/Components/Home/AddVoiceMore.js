import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {useNavigation, useFocusEffect} from '@react-navigation/core';
import CustomImage from '../Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import VoiceUploaded from './VoiceUploaded';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const AddVoiceMore = ({userData, userCards}) => {
  const navigation = useNavigation();
  const [audioCard, setAudioCard] = useState([]);

  useEffect(() => {
    setAudioCard(userCards.filter((c) => c.type === 'voice-intro'));
  }, [userCards]);

  useFocusEffect(
    useCallback(() => {
      setAudioCard(userCards.filter((c) => c.type === 'voice-intro'));
    }, []),
  );

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('Home');
  };

  if (audioCard.length > 0) {
    return <VoiceUploaded userData={userData} />;
  }
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            See <Text style={styles.titleBold}>+10</Text> more profiles
          </Text>
          <Text style={styles.description}>Add your voice intro</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnVoiceCreateProfile,
              })
            }>
            <CustomImage
              style={styles.img}
              source={{
                uri: S3_PHOTO_URL + userData.profile_hd_images[0] + '.jpg',
              }}
            />
            <CustomImage
              style={styles.img1}
              source={require('../../Assets/Image/addVoice.png')}
            />
          </TouchableOpacity>
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
            <VoiceIcon width={17} height={17} color={'#5077E2'} />
            <Text style={styles.buttonText}>Add voice intro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.premiumButton}
            onPress={() => navigation.navigate('BenefitsModal', {start: 0})}>
            <Text style={styles.premium}>Go Premium instead</Text>
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
    paddingHorizontal: screenHeight > 700 ? 14 : 6,
    paddingTop: 48,
    overflow: 'hidden',
    justifyContent: 'space-between',
    height: screenWidth + 139,
    backgroundColor: '#5077E2',
  },
  img: {
    width: screenHeight > 700 ? 164 : 140,
    height: screenHeight > 700 ? 200 : 170,
    borderRadius: 8,
  },
  img1: {
    position: 'absolute',
    width: screenHeight > 700 ? 164 : 140,
    height: screenHeight > 700 ? 63 : 52,
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 21,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 33,
  },
  titleBold: {
    fontSize: 28,
  },
  description: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
    lineHeight: 28,
  },
  header: {
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: AppColors.white,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginHorizontal: 9,
    lineHeight: 50,
  },
  premium: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 50,
    textDecorationLine: 'underline',
  },
});

export default AddVoiceMore;
