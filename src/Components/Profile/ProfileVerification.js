import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppColors from '../../Utils/AppColors';

import PhotoIcon from '../../Assets/Svg/PhotoIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import NextIcon from '../../Assets/Svg/NextIcon';
import CheckBIcon from '../../Assets/Svg/CheckBIcon';
import AlertIcon from '../../Assets/Svg/AlertIcon';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';

const ProfileVerification = ({userVerification, styles}) => {
  const navigation = useNavigation();

  if (userVerification.length === 0) {
    return (
      <TouchableOpacity
        style={styles.link}
        onPress={() => {
          navigation.navigate('RegisterPhotoVerify', {isFromProfile: true});
        }}>
        <View style={styles.icon}>
          <VerificationIcon
            width="14"
            height="14"
            color={AppColors.MainColor}
          />
        </View>
        <Text style={styles.linkText} numberOfLines={1}>
          Earn people's trust, get verified!
        </Text>
        <NextIcon width="15" height="15" color={AppColors.AppBlack + 'A3'} />
      </TouchableOpacity>
    );
  }
  if (userVerification[0].status === 0) {
    return (
      <View style={styles.link}>
        <View style={styles.icon}>
          <PhotoIcon width="14" height="14" color={AppColors.AppBlack} />
        </View>
        <Text style={styles.linkText}>Photo verification</Text>
        <Text style={styles.pending}>Pending…</Text>
      </View>
    );
  }
  if (userVerification[0].status === 1) {
    return (
      <View style={styles.link}>
        <View style={styles.icon}>
          <PhotoIcon width="14" height="14" color={AppColors.AppBlack} />
        </View>
        <Text style={styles.linkText}>You are photo verified</Text>
        <CheckBIcon width="15" height="15" color={AppColors.MainColor} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() => {
        navigation.navigate('RegisterPhotoVerify', {isFromProfile: true});
      }}>
      <View style={styles.icon}>
        <AlertIcon width="26" height="26" color={AppColors.white} />
      </View>
      <Text style={styles.linkText}>Re-verify your photo</Text>
      <AddIcon width="20" height="20" color={AppColors.AppBlack + 'A3'} />
    </TouchableOpacity>
  );
};

export default ProfileVerification;
