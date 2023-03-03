import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import CustomImage from '../Components/Common/CustomImage';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import DeleteIcon from '../Assets/Svg/DeleteIcon';
import {useAuth} from '../Providers/AuthProvider';

function LiveIntroScreen({navigation}) {
  const insets = useSafeArea();
  const {updateLocation} = useAuth();

  const navigateToNextStep = () => {
    navigation.navigate('LiveLocation');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.back, {marginTop: insets.top}]}
          onPress={() => navigation.goBack()}>
          <DeleteIcon width={30} height={30} color={Colors.MainColor + 'CC'} />
        </TouchableOpacity>
      </View>
      <View style={styles.contain}>
        <View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.title}>LIVE ROOM</Text>
          </View>
          <Text style={styles.description}>
            You can talk to your live matches,{'\n'}your likes, and suggested
            people.
          </Text>
        </View>
        <View style={styles.imgBox}>
          <CustomImage
            style={styles.img}
            source={require('../Assets/Image/Empty/intro.png')}
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
              <Text style={[styles.buttonText, styles.whiteText]}>
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}>
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
  },
  back: {
    padding: 10,
    marginLeft: 'auto',
  },
  contain: {
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    flex: 1,
  },
  title: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    lineHeight: 26,
    textAlign: 'center',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#29C778',
    marginRight: 8,
  },
  description: {
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 27,
    textAlign: 'center',
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 208,
    height: 112,
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

export default LiveIntroScreen;
