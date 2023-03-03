import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AppColors from '../../Utils/AppColors';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import PinBigIcon from '../../Assets/Svg/PinBigIcon';
import FilterIcon from '../../Assets/Svg/FilterIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import HomeTutorialModal from '../../Screens/Modals/HomeTutorialModal';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const LocationErrorFeed = () => {
  const navigation = useNavigation();
  const [tipVisible, setTipVisible] = useState(false);
  const handleClick = () => {
    if (Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:')
        .then((supported) => {
          if (!supported) {
          } else {
            return Linking.openURL('app-settings:');
          }
        })
        .catch((err) => console.error('An error occurred', err));
    } else {
      Linking.openSettings();
    }
  };
  const hideModal = (reported) => {
    setTipVisible(false);
  };
  return (
    <View style={styles.flex}>
      <View style={styles.top}>
        <View style={styles.listen}>
          <Text style={styles.speakeasy}>SPEAKEASY</Text>
        </View>
        <TouchableOpacity
          style={styles.help}
          onPress={() => {
            setTipVisible(true);
          }}>
          <Text style={styles.helpText}>?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filter}
          onPress={() => {
            navigation.navigate('Preferences');
          }}>
          <FilterIcon color={AppColors.AppBlack} width={13} height={13} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Please share your location</Text>
          <Text style={styles.text}>
            We won’t be able to show you{'\n'}
            profiles unless you share your location
          </Text>
          <View>
            <PinBigIcon width={75} height={85} color={AppColors.white} />
            <View style={styles.icon}>
              <ExclamationIcon width={3} height={17} color={AppColors.white} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <Text style={styles.buttonText}>Share location</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <HomeTutorialModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  top: {
    padding: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filter: {
    marginLeft: 20,
    backgroundColor: '#DEEFF4',
    borderRadius: 17,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  help: {
    marginLeft: 20,
    backgroundColor: '#DEEFF4',
    borderRadius: 17,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listen: {
    backgroundColor: AppColors.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 22,
    borderRadius: 15,
    height: 30,
  },
  speakeasy: {
    color: AppColors.white,
    fontFamily: 'BarBoothAtMatts',
    fontSize: 14,
    lineHeight: 30,
  },
  modeText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 20,
    marginLeft: 6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    width: screenHeight > 700 ? screenWidth - 54 : screenWidth - 72,
    height: screenWidth + 139,
    backgroundColor: '#5C9AE3',
    borderRadius: 12,
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 10,
    color: AppColors.white,
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: AppColors.white,
    marginBottom: 36,
  },
  button: {
    paddingHorizontal: 32,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 23,
    marginTop: 46,
    backgroundColor: AppColors.white,
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 20,
  },
  icon: {
    backgroundColor: '#E8557C',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -6,
  },
});

export default LocationErrorFeed;
