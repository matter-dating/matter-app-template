import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppColors from '../../Utils/AppColors';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import {useAuth} from '../../Providers/AuthProvider';
import CustomImage from '../../Components/Common/CustomImage';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import HomeTutorialModal from '../../Screens/Modals/HomeTutorialModal';

import FilterIcon from '../../Assets/Svg/FilterIcon';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const PhotoErrorFeed = () => {
  const navigation = useNavigation();
  const {userData} = useAuth();

  const [tipVisible, setTipVisible] = useState(false);

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
          <View style={styles.body}>
            <Text style={styles.title}>Please upload a real photo</Text>
            <Text style={styles.text}>
              We can’t show you other profiles until you upload a real photo of
              yourself as your main profile photo
            </Text>
            <View>
              <CustomImage
                source={{
                  uri: S3_PHOTO_URL + userData.profile_hd_images[0] + '.jpg',
                }}
                style={styles.img}
              />
              <View style={styles.icon}>
                <ExclamationIcon
                  width={3}
                  height={17}
                  color={AppColors.white}
                />
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.buttonText}>Upload photo</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              For safety reasons, we ask everyone{'\n'}
              to upload a real photo of themselves
            </Text>
          </View>
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
    backgroundColor: AppColors.MainColor,
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
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: AppColors.white,
    marginTop: 37,
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
    paddingHorizontal: 35,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: 23,
    backgroundColor: '#E8557C',
  },
  buttonText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 8,
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
    left: -8,
  },
  speakeasy: {
    color: AppColors.white,
    fontFamily: 'BarBoothAtMatts',
    fontSize: 14,
    lineHeight: 30,
  },
});

export default PhotoErrorFeed;
