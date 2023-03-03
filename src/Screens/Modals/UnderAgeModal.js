import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import {useAuth} from '../../Providers/AuthProvider';

import AppColors from '../../Utils/AppColors';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import {calculateUserStatus} from '../../Utils/Functions';

function UnderAgeModal() {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const {signOut, user, userData, updateUserData, userInvitation} = useAuth();
  const [loader, setLoader] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      // console.log(
      //   'userInvitation is_valid_photo:',
      //   userInvitation[0].is_valid_photo,
      // );
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
          await user.callFunction('updateUserField', [
            userData.user_id,
            'status',
            userNewStatus,
          ]);
          await updateUserData();
          if (userNewStatus === 7) {
            navigation.navigate('WaitList', {waitList: 'WaitList'});
          } else if (userNewStatus === 6) {
            navigation.navigate('WaitList', {waitList: 'BlackList'});
          } else if (userNewStatus === 5) {
            navigation.navigate('UnderAge');
          } else if (userNewStatus === 4) {
            navigation.navigate('BannedModal');
          } else if (userNewStatus === 3) {
            navigation.navigate('StrikeModal');
          } else if (userNewStatus === 2) {
            // console.log('NoLocation Home');
          } else if (userNewStatus === 1) {
            // console.log('Hidden Profile Home');
          } else if (userNewStatus === 11) {
            navigation.navigate('RegisterPhoto');
          } else if (userNewStatus === 0 || userNewStatus === 8) {
            // console.log('Normal Home:');
            navigation.navigate('TabNavigator');
          }
        }
      })();
    }
  }, [userInvitation]);

  const imageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then(async (image) => {
      const result = [];
      result.push(
        await ImagePicker.openCropper({
          path: image.path,
          width: 600,
          height: 700,
          includeBase64: true,
        }),
      );
      setLoader(true);
      const task = user.callFunction('uploadImageToS3', [
        result[0].data,
        user.customData.user_id,
        'matter-under-age',
      ]);
      task.then(() => {
        setLoader(false);
        showDialog();
      });
    });
  };

  const showDialog = (callback) => {
    return Alert.alert(
      'Photo ID submitted successfully',
      'We are currently reviewing your photo ID to verify your age. Please, wait for our review to finish.',
      [
        {
          text: 'OK',
        },
      ],
    );
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {marginTop: insets.top + 8}]} />
      <View style={styles.contain}>
        <View style={styles.row}>
          <View style={styles.alert}>
            <ExclamationIcon width={3} height={17} color={AppColors.white} />
          </View>
          <Text style={styles.title}>Underage alert!</Text>
        </View>
        <Text style={styles.description}>
          We have received complaints about your age. If you are under 18, you
          must not be on our app.
        </Text>
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <Text style={styles.footerText}>
          Want to prove us that you’re 18 and over? Upload an ID picture.
        </Text>
        <TouchableOpacity style={styles.button} onPress={imageUpload}>
          <Text style={styles.buttonText}>Upload an ID picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.log}
          onPress={() => {
            navigation.navigate('Welcome');
            signOut();
          }}>
          <Text style={styles.out}>Log out</Text>
        </TouchableOpacity>
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
    height: 40,
  },
  contain: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: '#C93737',
    width: 33,
    height: 33,
    borderRadius: 17,
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'center',
  },
  title: {
    color: '#C93737',
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 30,
  },
  description: {
    color: AppColors.AppBlack + 'E6',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 32,
  },
  footerText: {
    color: '#3FABCB',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
    marginTop: 24,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.white,
  },
  log: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  out: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.AppBlack,
  },
});

export default UnderAgeModal;
