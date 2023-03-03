/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';

import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import dayjs from 'dayjs';
import LinearGradient from 'react-native-linear-gradient';

import AlertModal from './AlertModal';

import {usePremium} from '../../Providers/PremiumProvider';
import {useAuth} from '../../Providers/AuthProvider';
import {useAppFlag} from '../../Providers/AppFlagProvider';
import AppColors from '../../Utils/AppColors';

const FeedBackGreatModal = ({
  setModalVisible,
  currentState,
  blindApi,
  updateState,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  const {userData, getBlindDateMatches} = useAuth();
  const {isPremium, expirationDate, processPurchases} = usePremium();
  const {setFlag} = useAppFlag();
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <AlertModal hide={() => setModalVisible(false)} disableDismiss={true}>
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.row}>
            <Text style={styles.modalText}>Great!</Text>
          </View>
          <Text style={styles.modalText}>
            We’ll let you know if its a match after Happy Hour ends.
          </Text>
          <Text style={styles.modalText1}>
            Happy hour ends in{' '}
            <Text style={styles.time}>
              {dayjs(currentState.stale_time).fromNow(true)}
            </Text>
          </Text>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={async () => {
                await processPurchases();
                blindApi.join(
                  userData,
                  currentState.blind_date_group_id,
                  null,
                  expirationDate.current,
                  (res) => {
                    setModalVisible(false);
                    if (res.extra_data && res.extra_data.reason) {
                      updateState('NOT_ACTIVE');
                      if (res.extra_data.reason === 'MATCH_LIMIT_REACHED') {
                        if (isPremium) {
                          navigation.navigate('EndHappyHour', {
                            blindMatches: getBlindDateMatches(
                              currentState.blind_date_group_id,
                            ),
                          });
                        } else {
                          navigation.navigate('ReachedModal');
                        }
                      } else if (res.extra_data.reason === 'ENDED') {
                        navigation.navigate('EndHappyHour', {
                          blindMatches: getBlindDateMatches(
                            currentState.blind_date_group_id,
                          ),
                        });
                      }
                    } else {
                      setFlag(currentState.blind_date_group_id, 'true');
                      updateState('JOINED_WAITING', res.data);
                      navigation.navigate('BlindDateScreen');
                    }
                  },
                );
              }}>
              <LinearGradient
                start={{x: 0.25, y: 0.75}}
                end={{x: 1, y: 0.5}}
                colors={['#5CC4E3', '#5CC4E3', '#5CC4E3', '#5CC4E3']}
                style={styles.button}>
                <Text style={styles.buttonText}>Okay, got it!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AlertModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
  },
  modalContent: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 23,
    color: AppColors.MainColor1,
    textAlign: 'center',
  },
  modalText1: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#45AECE',
    textAlign: 'center',
    marginVertical: 17,
  },
  time: {
    color: '#45AECE',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    paddingVertical: 13,
    paddingHorizontal: 42,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    minWidth: 140,
  },
  buttonText: {
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.white,
    marginLeft: 9,
    textAlign: 'center',
  },
});

export default FeedBackGreatModal;
