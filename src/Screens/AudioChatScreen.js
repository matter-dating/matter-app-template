import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import RtcEngine from 'react-native-agora';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../Providers/AuthProvider';

import Colors from '../Utils/Colors';
import CustomImage from '../Components/Common/CustomImage';
import VoiceIcon from '../Assets/Svg/VoiceIcon';
import MuteIcon from '../Assets/Svg/MuteIcon';
import SpeakerIcon from '../Assets/Svg/SpeakerIcon';
import UnSpeakerIcon from '../Assets/Svg/UnSpeakerIcon';

import {S3_MAIN_URL, S3_PHOTO_URL} from '../Utils/Constants';
import {agora_app_id} from '../Utils/EnvironmentVariables';

const AudioChatScreen = ({route}) => {
  const insets = useSafeArea();
  const {room_id, user_id, fname} = route.params;
  const [joined, setJoined] = useState(false);
  const [peerId, setPeerId] = useState(null);

  const {user, userData, getFormattedProfile} = useAuth();
  const engine = useRef();
  const navigation = useNavigation();
  const [profile, setProfile] = useState(getFormattedProfile());

  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(true);

  useEffect(() => {
    const init_agora = async () => {
      engine.current = await RtcEngine.create(agora_app_id);
      await engine.current.setDefaultAudioRoutetoSpeakerphone(true);
      engine.current.addListener(
        'JoinChannelSuccess',
        (channel, uid, elapsed) => {
          setJoined(true);
        },
      );

      engine.current.addListener('UserJoined', (uid, elapsed) => {
        setPeerId(uid);
      });

      engine.current.addListener('UserOffline', (uid, reason) => {
        setPeerId(null);
      });
      const {token} = await user.callFunction('generateAgoraToken', [room_id]);
      await engine.current.joinChannelWithUserAccount(token, room_id, user.id);
    };

    init_agora();
    return () => {
      if (engine.current) {
        engine.current.leaveChannel();
        engine.current.destroy();
        engine.current = null;
      }
    };
  }, []);

  useEffect(() => {
    user && setProfile(getFormattedProfile());
  }, [user, userData]);

  const toggleMute = async () => {
    await engine.current.muteLocalAudioStream(!mute);
    setMute(!mute);
  };

  const toggleSpeaker = async () => {
    await engine.current.setEnableSpeakerphone(!speaker);
    setSpeaker(!speaker);
  };

  // console.log('user', userData.user_info);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.center}>
          <Text style={styles.title}>DATING ROOM</Text>
          <Text style={styles.text}>
            {peerId
              ? 'Please keep things respectful'
              : 'Waiting for ' + fname + ' to join'}
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.users}>
          <View style={styles.flex}>
            <View style={styles.imgBox}>
              <CustomImage
                style={[styles.img, !joined && styles.wait]}
                source={{
                  uri:
                    S3_PHOTO_URL +
                    profile.user_info.profile_hd_images[0] +
                    '.jpg',
                }}
              />
            </View>
            <Text style={[styles.name, !joined && styles.wait]}>
              {userData.first_name}
            </Text>
            {/* <Text
              style={[styles.age, !joined && styles.wait]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {userData && dayjs().diff(dayjs(userData.date_of_birth), 'year')},{' '}
              {userData && userData.location_name.split(',')[0]}
            </Text> */}
          </View>
          <View style={styles.flex}>
            <View style={styles.imgBox}>
              <CustomImage
                style={[styles.img, peerId == null && styles.wait]}
                source={{uri: S3_MAIN_URL + user_id + '.jpg'}}
              />
            </View>
            <Text style={[styles.name, peerId == null && styles.wait]}>
              {fname}
            </Text>
            {/* <Text
              style={[styles.age, peerId == null && styles.wait]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {otherUserInfo &&
                dayjs().diff(
                  dayjs(otherUserInfo.date_of_birth['$date']),
                  'year',
                )}
              , {otherUserInfo && otherUserInfo.location_name.split(',')[0]}
            </Text> */}
          </View>
        </View>
      </View>

      <View style={[styles.footer, {marginBottom: insets.bottom + 25}]}>
        <TouchableOpacity
          style={styles.leave}
          onPress={() => navigation.goBack()}>
          <Text style={styles.leaveText}>Leave</Text>
        </TouchableOpacity>
        <View style={styles.shadow}>
          <TouchableOpacity
            style={[styles.button, mute && styles.mute]}
            onPress={toggleMute}>
            {mute ? (
              <MuteIcon width={14} height={19} color={Colors.white} />
            ) : (
              <VoiceIcon width={14} height={19} color={Colors.MainColor} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.shadow}>
          <TouchableOpacity style={styles.button} onPress={toggleSpeaker}>
            {speaker ? (
              <SpeakerIcon width={21} height={19} color={Colors.MainColor} />
            ) : (
              <UnSpeakerIcon width={21} height={19} color={Colors.MainColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 15,
    paddingBottom: 8,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    color: Colors.MainColor1 + 'D9',
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.MainColor1,
  },
  footer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leave: {
    backgroundColor: Colors.leave,
    borderRadius: 6,
    paddingHorizontal: 48,
    alignItems: 'center',
    paddingVertical: 15,
    marginRight: 'auto',
  },
  leaveText: {
    color: Colors.leaveText,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  users: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  imgBox: {
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 13,
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
    fontSize: 16,
  },
  wait: {
    opacity: 0.4,
  },
  shadow: {
    elevation: 0,
    backgroundColor: Colors.white + 'CC',
    marginHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white + 'CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mute: {
    backgroundColor: Colors.mute + 'CC',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginLeft: 12,
  },
});

export default AudioChatScreen;
