import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../Utils/Colors';
import CustomImage from '../Components/Common/CustomImage';
import {useAuth} from '../Providers/AuthProvider';
import BlindDateQuery from '../Api/BlindDateQuery';
import {useBlindDate} from '../Providers/BlindDateProvider';
import {usePremium} from '../Providers/PremiumProvider';

const BlindFeedBack = ({route}) => {
  const insets = useSafeArea();
  const {completeProfile, keepRoom} = route.params;
  const navigation = useNavigation();
  const {userData, userInvitation} = useAuth();
  const {updateState, currentState} = useBlindDate();
  const blindApi = new BlindDateQuery();
  const {expirationDate, processPurchases} = usePremium();

  return (
    <View style={styles.wrap}>
      <View style={styles.contain}>
        <View style={styles.empty} />
        <View style={styles.imgBox}>
          <CustomImage
            style={styles.img}
            source={require('../Assets/Image/blind.png')}
            // source={{
            //   uri: S3_MAIN_URL + like.user_id + '.jpg'
            // }}
          />
          {completeProfile ? (
            <Text style={styles.description}>
              I’ll let you know when{'\n'}
              <Text style={styles.bold}>Brian</Text> completes his profile
            </Text>
          ) : (
            <Text style={styles.miniDescription}>
              <Text style={styles.description}>Great!</Text>
              {'\n'}
              I’ll let you know if its a match{'\n'}
              after the Happy hour ends.
            </Text>
          )}
        </View>
        <View style={[styles.footer, {bottom: insets.bottom + 20}]}>
          <Text style={styles.time}>
            Happy hour ends in
            <Text style={styles.miniDescription}>
              {currentState && currentState.blind_date_to_end
                ? ' ' +
                  Math.floor(
                    parseInt(currentState.blind_date_to_end, 10) / 60,
                  ) +
                  ' hr '
                : 0 + ' hr '}
              {currentState && currentState.blind_date_to_end
                ? ' ' +
                  (parseInt(currentState.blind_date_to_end, 10) % 60) +
                  ' min'
                : 0 + ' min'}
            </Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              await processPurchases();
              blindApi.join(
                userData,
                currentState.blind_date_group_id,
                null,
                expirationDate.current,
                (res) => {
                  updateState('JOINED_WAITING', res.data.agora_info);
                  navigation.navigate('BlindDateScreen');
                },
              );
            }}>
            <Text style={styles.buttonText}>Okay, got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contain: {
    justifyContent: 'space-between',
    paddingHorizontal: 36,
    flex: 1,
  },
  description: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
  },
  miniDescription: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 26,
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
  imgBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 154,
    height: 154,
    marginBottom: 30,
    borderRadius: 77,
  },
  time: {
    color: '#636B76',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#5CC4E3',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.white,
  },
});

export default BlindFeedBack;
