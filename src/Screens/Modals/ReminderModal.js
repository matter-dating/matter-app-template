import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import AppColors from '../../Utils/AppColors';
import AlertModal from './AlertModal';
import {useAuth} from '../../Providers/AuthProvider';
import {formatPhoneNumber} from '../../Utils/Functions';

const ReminderModal = ({hide, isEnabled, user, setIsEnabled}) => {
  const {userData} = useAuth();
  const clickOkay = () => {
    user.callFunction('updateUserField', [
      user.id,
      'is_happy_hour_sms_enabled',
      !isEnabled,
    ]);
    setIsEnabled(!isEnabled);
    hide();
  };

  if (isEnabled) {
    return (
      <AlertModal hide={hide}>
        <View style={styles.box}>
          <Text style={styles.title}>
            Are you sure you want to stop receiving Happy Hour reminder?
          </Text>
          <Text style={styles.text}>You could miss out on meeting the one</Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={hide}
              style={[styles.buttonRight, styles.button, styles.grayButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clickOkay}
              style={[styles.buttonLeft, styles.button, styles.bgButton]}>
              <Text style={[styles.buttonText, styles.whiteText]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </AlertModal>
    );
  }
  return (
    <AlertModal hide={hide}>
      <View style={styles.box}>
        <Text style={styles.title}>
          We will only send you 2 SMS{'\n'}per week to this number:
        </Text>
        <Text style={styles.number}>{formatPhoneNumber(userData.phone)}</Text>
        <Text style={styles.bot}>Dont't worry we don't bother you</Text>
        <View style={styles.column}>
          <TouchableOpacity
            style={[styles.button, styles.bgButton]}
            onPress={clickOkay}>
            <Text style={[styles.buttonText, styles.whiteText]}>Okay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={hide}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AlertModal>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
    color: AppColors.AppBlack,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 25,
    textAlign: 'center',
    color: AppColors.AppBlack,
  },
  number: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 40,
    textAlign: 'center',
    color: AppColors.AppBlack + 'A3',
  },
  bot: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 18,
    textAlign: 'center',
    color: AppColors.AppBlack + 'A3',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 3,
  },
  buttonLeft: {
    marginLeft: 10,
    flex: 1,
  },
  buttonRight: {
    marginRight: 10,
    flex: 1,
  },
  grayButton: {
    backgroundColor: '#E5E7EA',
  },
  bgButton: {
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
  whiteText: {
    color: AppColors.white,
  },
  row: {
    flexDirection: 'row',
  },
});

export default ReminderModal;
