import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../Providers/AuthProvider';
import {useMessages} from '../../Providers/MessagesProvider';
import {S3_MAIN_URL} from '../../Utils/Constants';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';

import Swipeable from '../Common/Swipeable';
import CustomImage from '../Common/CustomImage';
import {useState} from 'react';
import HttpQuery from '../../Api/HttpQuery';
import {checkRecently} from '../../Utils/Functions';

var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

const SingleChat = ({item, index, onOpen, onClose, deleteItem}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const {roomMessages, lastRecieved} = useMessages();
  const [lastMessage, setLastMessage] = useState(
    roomMessages(item.pubnub_room_id)[0],
  );
  const api = new HttpQuery();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.getSingle(item.other_user_id, setProfile);
  }, []);

  useEffect(() => {
    setLastMessage(roomMessages(item.pubnub_room_id)[0]);
  }, [lastRecieved]);

  // const rightButtons = [
  //   <Pressable style={styles.button}>
  //     <Text style={styles.buttonText}>More</Text>
  //   </Pressable>,
  //   <Pressable style={[styles.button, styles.button2]}>
  //     <Text style={styles.buttonText}>Mute</Text>
  //   </Pressable>,
  //   <Pressable
  //     onPress={() => deleteItem(item.name)}
  //     style={[styles.button, styles.button3]}>
  //     <Text style={[styles.buttonText, styles.buttonText1]}>Delete</Text>
  //   </Pressable>,
  // ];

  const renderLastMessagePreview = (lastMessage) => {
    if (lastMessage.isValid() && lastMessage) {
      if (lastMessage.user_id !== user.id) {
        switch (lastMessage.type) {
          case 'VOICE_NOTE':
            return 'Sent you a voice note';
          case 'EXPRESSION':
            return 'Sent you a expression';
          case 'TEXT_MESSAGE':
            return lastMessage.text;
          default:
            return 'Tap to send a message';
        }
      } else {
        switch (lastMessage.type) {
          case 'VOICE_NOTE':
            return lastMessage.expire_at
              ? 'Heard your voice message'
              : 'Recieved your voice message';
          case 'EXPRESSION':
            return 'Recieved your expression';
          case 'TEXT_MESSAGE':
            return 'You: ' + lastMessage.text;
          default:
            return 'Tap to send a message';
        }
      }
    }
    return 'Tap to send a message';
  };

  if (roomMessages(item.pubnub_room_id).length === 0) {
    return <></>;
  }
  return (
    <View style={styles.wrap}>
      <Swipeable
        // rightButtons={rightButtons}
        rightButtonWidth={80}
        onRightButtonsOpenRelease={onOpen}
        onRightButtonsCloseRelease={onClose}>
        <Pressable
          onPress={() => {
            navigation.navigate('ChatDetail', {
              pubnub_room_id: item.pubnub_room_id,
              profile,
            });
          }}
          style={[styles.single, item.deleted && styles.hide]}>
          <View>
            <CustomImage
              style={styles.img}
              source={{uri: S3_MAIN_URL + item.other_user_id + '.jpg'}}
            />
            {profile &&
              profile.user_info.is_online &&
              checkRecently(profile.user_info.last_active_timestamp) && (
                <View style={styles.active} />
              )}
          </View>
          <View style={styles.info}>
            <View style={styles.flex}>
              <View style={styles.nameWrap}>
                <Text numberOfLines={1} style={styles.username}>
                  {item.other_user_fname}
                </Text>
                {item.other_user_verified && (
                  <VerificationIcon
                    width={14}
                    height={14}
                    color={AppColors.MainColor}
                  />
                )}
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.message,
                  lastMessage.isValid() &&
                    lastMessage &&
                    lastMessage.user_id &&
                    lastMessage.user_id !== user.id &&
                    dayjs(lastMessage.timetoken / 10000) >
                      dayjs(item.last_seen_time) &&
                    styles.messageBold,
                ]}>
                {renderLastMessagePreview(lastMessage)}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.timeText}>
                {lastMessage.isValid() &&
                  lastMessage &&
                  dayjs(lastMessage.timetoken / 10000).fromNow()}
              </Text>
            </View>
          </View>
        </Pressable>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  single: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 17,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  wrap: {
    borderBottomWidth: 0.5,
    borderColor: AppColors.MainColor1 + '1F',
  },
  img: {
    height: 55,
    width: 55,
    borderRadius: 28,
    marginRight: 16,
  },
  active: {
    position: 'absolute',
    bottom: -3,
    right: 20,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: Colors.active,
    borderWidth: 2,
    borderColor: Colors.colorF5,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingRight: 4,
  },
  username: {
    color: AppColors.IconColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    marginRight: 6,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor + 'A3',
    marginRight: 12,
  },
  messageBold: {
    color: AppColors.IconColor,
    fontFamily: 'Poppins-Bold',
  },
  timeText: {
    alignSelf: 'flex-start',
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: AppColors.IconColor + 'A3',
  },
  button: {
    width: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F9',
  },
  button2: {
    backgroundColor: '#BFC4D3',
  },
  button3: {
    backgroundColor: '#CF6679',
  },
  buttonText: {
    color: '#12124299',
    fontSize: 12,
  },
  buttonText1: {
    color: 'white',
  },
  column: {
    flexDirection: 'column',
  },
});

export default SingleChat;
