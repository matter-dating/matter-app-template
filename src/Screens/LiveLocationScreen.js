import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import CustomImage from '../Components/Common/CustomImage';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import {useAuth} from '../Providers/AuthProvider';

function LiveLocationScreen({navigation}) {
  const insets = useSafeArea();
  const {updateLocation} = useAuth();

  const navigateToNextStep = () => {
    navigation.navigate('LiveNotification');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.back, {marginTop: insets.top}]} />
      </View>
      <View style={styles.contain}>
        <View>
          <Text style={styles.title}>Turn on your location</Text>
          <Text style={styles.description}>
            to go on live audio date with people in your area.
          </Text>
        </View>
        <View style={styles.imgBox}>
          <CustomImage
            style={styles.img}
            source={require('../Assets/Image/Empty/livelocation.png')}
          />
        </View>
        <View style={[styles.footer, {bottom: insets.bottom + 20}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              updateLocation(navigateToNextStep, navigateToNextStep);
            }}>
            <LinearGradient
              start={{x: 0.25, y: 0.5}}
              end={{x: 1, y: 0.5}}
              colors={['#7f7fd5', '#91eae4']}
              style={styles.linear}>
              <Text style={[styles.buttonText, styles.whiteText]}>Turn on</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={navigateToNextStep}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    marginBottom: 40,
  },
  back: {
    padding: 10,
  },
  contain: {
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    flex: 1,
  },
  title: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  description: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 121,
    height: 132,
  },
  button: {
    marginTop: 16,
    // paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
  },
  linear: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 50,
    color: Colors.MainColor,
  },
  whiteText: {
    color: Colors.white,
  },
});

export default LiveLocationScreen;
