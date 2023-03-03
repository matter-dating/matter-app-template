import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppColors from '../../Utils/AppColors';
import Talk from '../../Assets/Svg/New/Talk';

const LikedYou = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.flex}>
      <ImageBackground
        defaultSource={require('../../Assets/Image/Empty/likedYou.png')}
        source={require('../../Assets/Image/Empty/likedYou.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.box}>
          <View style={styles.img}>
            <Talk width={90} height={90} />
          </View>
          <Text style={styles.title}>You haven’t received a like yet</Text>
          <Text style={styles.text}>
            While you wait, complete your{'\n'}
            profile to better attract{'\n'}
            potential matches
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.buttonText}>Complete my profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  box: {
    alignItems: 'center',
    marginTop: '20%',
  },
  img: {
    marginVertical: 27,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: AppColors.MainColor1,
    marginBottom: 15,
    lineHeight: 23,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    color: AppColors.MainColor1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF4B7B',
    marginTop: 36,
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LikedYou;
