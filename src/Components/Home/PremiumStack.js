import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

import CustomImage from '../Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import {S3_PHOTO_URL} from '../../Utils/Constants';
const {width: screenWidth} = Dimensions.get('window');
const PremiumStack = ({userData, reloadHome}) => {
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Premium feature is unlocked</Text>
          <Text style={styles.description}>
            See your daily extra 20+ profiles
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.imgBox}>
            <CustomImage
              style={styles.img}
              source={{
                uri: S3_PHOTO_URL + userData.profile_hd_images[0] + '.jpg',
              }}
            />
            <Image
              style={styles.img1}
              source={require('../../Assets/Image/stack.png')}
            />
          </View>
        </View>
        <View />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => reloadHome()}>
            <Text style={styles.buttonText}>Show me extra profiles</Text>
          </TouchableOpacity>
          <View style={styles.premiumButton}>
            <Text style={styles.premium}>For Premium members only</Text>
          </View>
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
    paddingHorizontal: 14,
    paddingTop: 48,
    paddingBottom: 27,
    overflow: 'hidden',
    justifyContent: 'space-between',
    height: screenWidth + 139,
    backgroundColor: '#8850E2',
  },
  imgBox: {
    width: 163,
    alignItems: 'center',
    paddingBottom: 43,
  },
  img: {
    width: 122,
    height: 122,
    borderRadius: 61,
  },
  img1: {
    position: 'absolute',
    width: 163,
    height: 118,
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 24,
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
  buttonText: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 42,
  },
  premium: {
    color: AppColors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 13,
  },
});

export default PremiumStack;
