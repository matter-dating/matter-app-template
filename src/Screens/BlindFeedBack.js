import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import {useAuth} from '../Providers/AuthProvider';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';

import SingleProfile from '../Components/Home/SingleProfile';
import FeedBackNoteModal from './Modals/FeedBackNoteModal';
import FeedBackGreatModal from './Modals/FeedBackGreatModal';

import DeleteIcon from '../Assets/Svg/DeleteIcon';
import LikeIcon from '../Assets/Svg/LikeIcon';

import {useBlindDate} from '../Providers/BlindDateProvider';
import HttpQuery from '../Api/HttpQuery';
import BlindDateQuery from '../Api/BlindDateQuery';
import {useAppFlag} from '../Providers/AppFlagProvider';
import {
  logJoinHappyHour,
  logLikeHappyHour,
  logMatchHappyHour,
  logRejectHappyHour,
} from '../Utils/Analytics';
import {usePremium} from '../Providers/PremiumProvider';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useAppContent} from '../Providers/AppContentProvider';
const audioRecorderPlayer = new AudioRecorderPlayer();

const BlindFeedBack = ({route}) => {
  const [likeLoader, setLikeLoader] = useState(false);
  const {otherUserInfo} = route.params;
  const navigation = useNavigation();
  const {user, userData, getBlindDateMatches} = useAuth();
  const {currentState, updateState} = useBlindDate();
  const {checkFlag} = useAppFlag();
  const {getSpeakeasyById} = useAppContent();
  const {isPremium, expirationDate, processPurchases} = usePremium();

  const [profile, setProfile] = useState(otherUserInfo);
  const httpApi = new HttpQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const [note, setNote] = useState('');
  const [noteVisible, setNoteVisible] = useState(false);
  const blindApi = new BlindDateQuery();
  const insets = useSafeArea();

  const [currentVoice, setCurrentVoice] = useState(null);
  const [isPlay, setIsPlay] = useState(false);
  const [playerLoader, setPlayerLoader] = useState(false);
  const [speakEasy, setSpeakEasy] = useState(
    getSpeakeasyById(currentState.blind_date_group_id),
  );

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setCurrentVoice(null);
      setPlayerLoader(false);
    }
  };

  useEffect(() => {
    if (currentState.state === 'FEEDBACK') {
      if (profile === undefined || profile === null) {
        httpApi.getSingle(currentState.other_user_id, (res) => {
          setProfile(res);
        });
      }
    }
  }, [currentState]);

  const sendLike = async () => {
    setLikeLoader(true);
    const result = await user.callFunction('sendLike', [
      currentState.other_user_id,
      '',
      speakEasy
        ? 'Speakeasy_' + currentState.blind_date_group_id
        : 'BLIND_' + currentState.blind_date_group_id,
      note,
    ]);
    logLikeHappyHour(
      currentState.blind_date_group_id,
      currentState.other_user_id,
    );
    if (result.matched) {
      logMatchHappyHour(
        currentState.blind_date_group_id,
        currentState.other_user_id,
      );
    }
    if (checkFlag(currentState.blind_date_group_id) === null) {
      setModalVisible(true);
    } else {
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
            logJoinHappyHour(currentState.blind_date_group_id);
            updateState('JOINED_WAITING', res.data);
            navigation.navigate('BlindDateScreen');
          }
        },
      );
    }
    setLikeLoader(false);
    setNoteVisible(false);
  };

  const showNotes = () => {
    setNoteVisible(true);
  };

  const sendReject = async () => {
    await user.callFunction('sendReject', [
      currentState.other_user_id,
      'REJECT',
      '',
      'BLIND',
    ]);
    logRejectHappyHour(
      currentState.blind_date_group_id,
      currentState.other_user_id,
    );
    await processPurchases();
    blindApi.join(
      userData,
      currentState.blind_date_group_id,
      null,
      expirationDate.current,
      (res) => {
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
          logJoinHappyHour(currentState.blind_date_group_id);
          updateState('JOINED_WAITING', res.data);
          navigation.navigate('BlindDateScreen');
        }
      },
    );
  };
  return (
    <View style={styles.wrap}>
      {profile && (
        <View style={styles.flex}>
          <View style={[styles.header, {paddingTop: insets.top + 8}]}>
            <Text style={styles.title}>
              Did you like {profile.user_info.first_name}?
            </Text>
            <Text style={styles.text}>
              If they likes you back, it’s a match
            </Text>
          </View>
          <View style={styles.flex}>
            <SingleProfile
              profile={profile}
              audioRecorderPlayer={audioRecorderPlayer}
              currentVoice={currentVoice}
              setCurrentVoice={setCurrentVoice}
              stopIntroPlayer={stopIntroPlayer}
              isPlay={isPlay}
              setIsPlay={setIsPlay}
              playerLoader={playerLoader}
              setPlayerLoader={setPlayerLoader}
              isModal={false}
              hideLike={true}
              withFooter={true}
              noBlur={true}
            />
          </View>
          <View style={[styles.footer, {bottom: insets.bottom + 20}]}>
            <TouchableOpacity
              style={[styles.whiteButton, styles.noButton]}
              onPress={() => sendReject()}>
              <DeleteIcon color={AppColors.white} width={24} height={24} />
              <Text style={styles.blackText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.whiteButton} onPress={showNotes}>
              <LikeIcon color={AppColors.white} width={18} height={24} />
              <Text style={styles.blackText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <FeedBackGreatModal
          setModalVisible={setModalVisible}
          currentState={currentState}
          blindApi={blindApi}
          updateState={updateState}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={noteVisible}>
        <FeedBackNoteModal
          note={note}
          setNote={setNote}
          sendLike={sendLike}
          likeLoader={likeLoader}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  noButton: {
    backgroundColor: '#C18BDC',
  },
  whiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
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
  blackText: {
    lineHeight: 23,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: AppColors.white,
    marginLeft: 9,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
    color: AppColors.AppBlack,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
});

export default BlindFeedBack;
