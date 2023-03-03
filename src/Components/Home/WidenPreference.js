import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import CustomImage from '../Common/CustomImage';
import AppColors from '../../Utils/AppColors';
const {width: screenWidth} = Dimensions.get('window');
const WidenPreference = ({reloadWithWiden}) => {
  const [loader, setLoader] = useState(false);
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <View style={styles.header}>
          <Text style={styles.title}>You can widen your preferences</Text>
          <Text style={styles.description}>
            Do you want us to show you people outside of your preferences
            criteria?
          </Text>
        </View>
        <View style={styles.body}>
          <CustomImage
            style={styles.img}
            source={require('../../Assets/Image/widen.png')}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setLoader(true);
              reloadWithWiden();
            }}>
            {loader ? (
              <LottieView
                source={require('../../Assets/Animation/loader.json')}
                autoPlay
                loop
                style={styles.disableTouch}
              />
            ) : (
              <Text style={styles.buttonText}>Widen my preferences</Text>
            )}
          </TouchableOpacity>
          <View style={styles.premiumButton} />
        </View>
        <View />
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
    backgroundColor: '#50B5E2',
  },
  img: {
    width: 89,
    height: 96,
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
    textAlign: 'center',
    color: AppColors.white,
    lineHeight: 22,
    marginHorizontal: 20,
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
  premiumButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    height: 50,
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
    marginHorizontal: 9,
    lineHeight: 50,
  },
  disableTouch: {
    height: 10,
  },
});

export default WidenPreference;
