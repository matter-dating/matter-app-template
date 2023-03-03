import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../Providers/AuthProvider';
import {S3_MAIN_URL} from '../../Utils/Constants';
import CustomImage from '../Common/CustomImage';
import ShowReaction from './ShowReaction';

import AppColors from '../../Utils/AppColors';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import ExpiredIcon from '../../Assets/Svg/ExpiredIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import RefreshIcon from '../../Assets/Svg/AgainIcon';
const screenWidth = Math.round(Dimensions.get('window').width);
import {S3_VOICE_URL} from '../../Utils/Constants';
import {logJoinRoom, logPlayVoice} from '../../Utils/Analytics';

var dayjs = require('dayjs');
var duration = require('dayjs/plugin/duration');
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);
dayjs.extend(duration);

import Reactions from '../../Assets/Reaction';
const iconNames = [
  'Reaction1',
  'Reaction2',
  'Reaction3',
  'Reaction4',
  'Reaction5',
];

const SingleMessage = ({
  item,
  index,
  room,
  playMusic,
  currentVoice,
  isLoading,
  fillValue,
  fadeValue,
  isClick,
  retryMessage,
  showConfirmDialog,
  stopPlayVoice,
  showReactions,
}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const ref = useRef(null);
  const [isPlay, setIsPlay] = useState(false);
  const [itemReaction, setItemReaction] = useState(null);
  const now = new Date();

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    if (item.type === 'VOICE_NOTE') {
      if (currentVoice === S3_VOICE_URL + item.payload + '.m4a') {
        if (ref.current !== null && !isLoading) {
          ref.current.play();
        }
        setIsPlay(true);
      } else {
        if (ref.current !== null) {
          ref.current.reset();
        }
        setIsPlay(false);
      }
    }
  }, [currentVoice, item, isLoading]);

  const togglePlay = () => {
    if (item.expire_at === null || item.expire_at > now) {
      logPlayVoice(room.pubnub_room_id);
      playMusic(S3_VOICE_URL + item.payload + '.m4a', item);
    }
  };

  const messageLongPress = (i, e) => {
    if (isClick) {
      showConfirmDialog(() => showReactions(i, e));
    } else if (item.user_id !== user.id) {
      showReactions(i, e);
    }
  };

  const renderReactionView = () => {
    if (itemReaction) {
      var iconIndex = iconNames.findIndex((u) => u && u === itemReaction);
      var ReactionIcon = Reactions[iconNames[iconIndex]];
      return (
        <View style={styles.reaction}>
          <ReactionIcon width={20} height={20} />
        </View>
      );
    }
    return <></>;
  };

  const renderReaction = () => {
    if (item.reaction && item.reaction !== null && item.reaction !== '') {
      return (
        <View style={styles.reactionWrap}>
          <ShowReaction item={item} />
        </View>
      );
    }
    return <></>;
  };

  const renderFailAlert = () => {
    if (item.status === '-1') {
      return (
        <View style={styles.fail}>
          <View style={styles.alert}>
            <ExclamationIcon width={3} height={21} color={'#CE4545'} />
          </View>
          <Text style={styles.failText}>Failed to send</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };

  const renderVoiceStatus = (renderItem) => {
    if (!(renderItem.expire_at === null || renderItem.expire_at > now)) {
      return <Text style={styles.played}>Expired</Text>;
    }
    if (renderItem.expire_at !== null && renderItem.user_id === user.id) {
      return <Text style={styles.played}>Played</Text>;
    }
    if (renderItem.status === '0') {
      return <Text style={styles.played}>Sending</Text>;
    }
    if (renderItem.status === '1') {
      return <Text style={styles.played}>Sent</Text>;
    }
    if (
      renderItem.status === '2' &&
      renderItem.expire_at === null &&
      renderItem.user_id === user.id
    ) {
      return <Text style={styles.played}>Sent</Text>;
    }
    if (
      renderItem.status === '3' &&
      renderItem.expire_at === null &&
      renderItem.user_id === user.id
    ) {
      return <Text style={styles.played}>Sent</Text>;
    }
    if (renderItem.status === '4') {
      return <Text style={styles.played}>Uploading</Text>;
    }
  };

  const renderMessage = () => {
    if (item.type === 'AUDIO_ROOM') {
      if (item.user_id === user.id) {
        return null;
      }
      return (
        <View style={styles.item}>
          <View style={styles.audioMessage}>
            <Text style={styles.roomTitle}>
              {room.other_user_fname} invited you to an audio room
            </Text>
            <Text style={styles.roomText}>
              This is especially for you! Join me now.
            </Text>
            <TouchableOpacity
              style={styles.join}
              onPress={() => {
                logJoinRoom(room.pubnub_room_id);
                navigation.navigate('AudioChatScreen', {
                  room_id: room.agora_room_id,
                  user_id: room.other_user_id,
                  fname: room.other_user_fname,
                });
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#5CC4E3', '#C78EF7']}
                style={styles.room}>
                <Text style={styles.text}>Join now</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.row}>
              <Text style={styles.timeText}>
                {dayjs(item.timetoken / 10000).isToday()
                  ? dayjs(item.timetoken / 10000).format('HH:mm a')
                  : dayjs(item.timetoken / 10000).format('MMM DD, HH:mm a')}
              </Text>
            </View>
          </View>
          {renderFailAlert()}
        </View>
      );
    }
    if (item.type === 'EXPRESSION') {
      return (
        <View
          style={[
            styles.itemExp,
            item.width && {
              width: parseInt(item.width, 10),
            },
            item.user_id === user.id && styles.itemMineExp,
          ]}>
          <TouchableOpacity
            onLongPress={(e) => messageLongPress(item, e)}
            activeOpacity={1}>
            <CustomImage
              style={[
                styles.sticker,
                item.width && {
                  width: parseInt(item.width, 10),
                  height: parseInt(item.height, 10),
                },
              ]}
              defaultSource={require('../../Assets/Image/default.png')}
              source={{uri: item.payload}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View style={styles.row}>
            {item.status === '0' && item.user_id === user.id && (
              <Text style={styles.played}>Sending</Text>
            )}
            {item.status === '1' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.status === '2' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.status === '3' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.expire_at !== null && item.user_id === user.id && (
              <Text style={styles.played}>Seen</Text>
            )}
            <Text style={styles.timeText}>
              {dayjs(item.timetoken / 10000).isToday()
                ? dayjs(item.timetoken / 10000).format('HH:mm a')
                : dayjs(item.timetoken / 10000).format('MMM DD, HH:mm a')}
            </Text>
          </View>
          {renderReactionView()}
          {renderFailAlert()}
          {renderReaction()}
        </View>
      );
    }
    if (item.type === 'GIF') {
      return (
        <View
          style={[
            styles.itemExpGif,
            item.height !== 0 && {
              height:
                item.status !== '-1'
                  ? item.height * ((screenWidth - 164) / item.width)
                  : item.height * ((screenWidth - 164) / item.width) + 20,
            },
            item.user_id === user.id && styles.itemMineExp,
          ]}>
          <TouchableOpacity
            onLongPress={(e) => messageLongPress(item, e)}
            activeOpacity={0.9}
            onPress={() => {
              stopPlayVoice && stopPlayVoice();
              navigation.navigate('ImageViewer', {
                source: item.payload,
                itemHeight: item.height,
                itemWidth: item.width,
              });
            }}>
            <CustomImage
              style={[
                styles.gif,
                item.height !== 0 && {
                  height: item.height * ((screenWidth - 164) / 480),
                },
              ]}
              // defaultSource={require('../../Assets/Image/default.png')}
              source={{uri: item.payload}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <View style={styles.row}>
            {item.status === '0' && item.user_id === user.id && (
              <Text style={styles.played}>Sending</Text>
            )}
            {item.status === '1' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.status === '2' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.status === '3' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.expire_at !== null && item.user_id === user.id && (
              <Text style={styles.played}>Seen</Text>
            )}
            <Text style={styles.timeText}>
              {dayjs(item.timetoken / 10000).isToday()
                ? dayjs(item.timetoken / 10000).format('HH:mm a')
                : dayjs(item.timetoken / 10000).format('MMM DD, HH:mm a')}
            </Text>
          </View>
          {renderReactionView()}
          {renderFailAlert()}
          {renderReaction()}
        </View>
      );
    }
    if (item.type === 'PHOTO') {
      return (
        <View
          style={[
            styles.itemExpGif,
            item.height !== 0 && {
              height:
                item.status !== '-1'
                  ? item.height * ((screenWidth - 164) / item.width)
                  : item.height * ((screenWidth - 164) / item.width) + 20,
            },
            item.user_id === user.id && styles.itemMineExp,
          ]}>
          <TouchableOpacity
            onLongPress={(e) => messageLongPress(item, e)}
            activeOpacity={0.9}
            onPress={() => {
              stopPlayVoice && stopPlayVoice();
              navigation.navigate('ImageViewer', {
                source: item.payload,
                itemHeight: item.height,
                itemWidth: item.width,
              });
            }}>
            <CustomImage
              style={[
                styles.gif,
                item.height !== 0 && {
                  height: item.height * ((screenWidth - 164) / item.width),
                },
              ]}
              // defaultSource={require('../../Assets/Image/default.png')}
              source={{uri: item.payload}}
              resizeMode={'contain'}
            />
            {item.status === '-1' && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.sendAgain}
                onPress={() => retryMessage(item)}>
                <RefreshIcon color={AppColors.white} width={20} height={20} />
                <Text style={styles.tap}>Tap to send again</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <View style={styles.row}>
            {item.status === '4' && (
              <Text style={styles.played}>Uploading</Text>
            )}
            {item.status === '0' && item.user_id === user.id && (
              <Text style={styles.played}>Sending</Text>
            )}
            {item.status === '1' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.status === '2' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.status === '3' &&
              item.expire_at === null &&
              item.user_id === user.id && (
                <Text style={styles.played}>Sent</Text>
              )}
            {item.expire_at !== null && item.user_id === user.id && (
              <Text style={styles.played}>Seen</Text>
            )}
            <Text style={styles.timeText}>
              {dayjs(item.timetoken / 10000).isToday()
                ? dayjs(item.timetoken / 10000).format('HH:mm a')
                : dayjs(item.timetoken / 10000).format('MMM DD, HH:mm a')}
            </Text>
          </View>
          {renderReactionView()}
          {renderFailAlert()}
          {renderReaction()}
        </View>
      );
    }
    if (item.type === 'VOICE_NOTE') {
      return (
        <View
          style={[styles.item, item.user_id === user.id && styles.itemMine]}>
          <TouchableOpacity
            onLongPress={(e) => messageLongPress(item, e)}
            onPress={() =>
              isClick ? showConfirmDialog(togglePlay) : togglePlay()
            }
            activeOpacity={
              item.expire_at === null || item.expire_at > now ? 0.2 : 1
            }
            style={[
              styles.voice,
              item.user_id === user.id && styles.voiceMine,
            ]}>
            <View style={styles.innerVoice}>
              {item.expire_at === null || item.expire_at > now ? (
                <View style={styles.icon}>
                  {isLoading &&
                  currentVoice === S3_VOICE_URL + item.payload + '.m4a' ? (
                    <LottieView
                      source={require('../../Assets/Animation/player.json')}
                      autoPlay
                      loop
                      style={styles.loader}
                    />
                  ) : isPlay ? (
                    <PauseIcon
                      width={10}
                      height={10}
                      color={AppColors.MainColor4}
                    />
                  ) : (
                    <PlayIcon
                      width={10}
                      height={10}
                      color={AppColors.MainColor4}
                    />
                  )}
                </View>
              ) : (
                <View style={styles.icon}>
                  <ExpiredIcon
                    width={16}
                    height={16}
                    color={AppColors.MainColor4}
                  />
                </View>
              )}
              <LottieView
                source={require('../../Assets/Animation/voice.json')}
                ref={ref}
                style={styles.wave}
                loop
              />
              <Text style={styles.time}>
                {dayjs
                  .duration(item.duration === 0 ? 1 : item.duration, 'seconds')
                  .format('mm:ss')}
              </Text>
            </View>
            <View style={styles.audioRow}>
              {renderVoiceStatus(item)}
              <Text style={styles.timeText}>
                {dayjs(item.timetoken / 10000).isToday()
                  ? dayjs(item.timetoken / 10000).format('HH:mm a')
                  : dayjs(item.timetoken / 10000).format('MMM DD, HH:mm a')}
              </Text>
            </View>
            <Animated.View
              style={[
                styles.progress,
                currentVoice === S3_VOICE_URL + item.payload + '.m4a' && {
                  width: widthAnimation,
                  opacity: fadeValue,
                },
              ]}
            />
          </TouchableOpacity>
          {renderReactionView()}
          {renderFailAlert()}
          {renderReaction()}
        </View>
      );
    }
    if (item.type === 'TEXT_MESSAGE') {
      return (
        <View
          style={[
            styles.messageWrap,
            item.user_id === user.id && styles.messageWrapMine,
          ]}>
          <TouchableOpacity
            onLongPress={(e) => messageLongPress(item, e)}
            activeOpacity={1}
            style={[
              styles.message,
              item.user_id === user.id && styles.messageMine,
            ]}>
            <Text style={styles.mainText}>{item.text}</Text>
            <View style={styles.row}>
              {item.expire_at !== null && item.user_id === user.id && (
                <Text style={styles.played}>Seen</Text>
              )}
              <Text style={styles.timeText}>
                {dayjs(item.timetoken / 10000).isToday()
                  ? dayjs(item.timetoken / 10000).format('HH:mm a')
                  : dayjs(item.timetoken / 10000).format('MMM DD, HH:mm a')}
              </Text>
            </View>
          </TouchableOpacity>
          {renderReactionView()}
          {renderFailAlert()}
          {renderReaction()}
        </View>
      );
    }
  };
  if (item.type === 'VIDEO_ROOM') {
    return <></>;
  }
  return (
    <View
      style={[styles.messageContainer, item.status === '5' && styles.hidden]}>
      {item.user_id !== user.id && (
        <Image
          style={styles.userImage}
          // defaultSource={require('../../Assets/Image/default.png')}
          source={{uri: S3_MAIN_URL + item.user_id + '.jpg'}}
        />
      )}
      {renderMessage()}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 16,
  },
  hidden: {
    height: 0,
    overflow: 'hidden',
    paddingVertical: 0,
  },
  sticker: {
    width: screenWidth - 164,
    height: screenWidth - 164,
    // borderRadius: 2,
    marginBottom: 10,
  },
  gif: {
    width: screenWidth - 164,
    height: screenWidth - 164,
    borderRadius: 8,
    marginBottom: 10,
  },
  userImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
  roomTitle: {
    marginBottom: 5,
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.black + 'E6',
    fontFamily: 'Poppins-SemiBold',
  },
  roomText: {
    fontSize: 12,
    lineHeight: 17,
    color: AppColors.black + 'E6',
    fontFamily: 'Poppins-Medium',
  },
  mainText: {
    fontSize: 14,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 8,
  },
  message: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingRight: 15,
    paddingLeft: 17,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 8,
  },
  audioMessage: {
    overflow: 'hidden',
    backgroundColor: AppColors.backgroundColor1,
    padding: 14,
    paddingBottom: 10,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 8,
  },
  join: {
    marginBottom: 10,
  },
  messageWrap: {
    maxWidth: screenWidth * 0.66,
  },
  messageMine: {
    backgroundColor: '#CFF0FA',
    borderTopStartRadius: 8,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 8,
    overflow: 'hidden',
  },
  messageWrapMine: {
    marginLeft: 'auto',
  },
  voice: {
    backgroundColor: AppColors.backgroundColor1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 8,
    width: screenWidth - 104,
    overflow: 'hidden',
  },
  innerVoice: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 11,
    paddingBottom: 4,
    paddingRight: 15,
    paddingLeft: 11,
  },
  loader: {
    width: 17,
  },
  voiceMine: {
    backgroundColor: '#CFF0FA',
    borderTopStartRadius: 8,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 8,
    overflow: 'hidden',
  },
  item: {
    width: screenWidth - 104,
  },
  itemExp: {
    width: screenWidth - 164,
    marginBottom: 10,
  },
  itemExpGif: {
    width: screenWidth - 164,
    height: screenWidth - 164,
    marginBottom: 10,
  },
  itemMine: {
    marginLeft: 'auto',
    // marginVertical: 20,
  },
  itemMineExp: {
    marginLeft: 'auto',
  },
  wave: {
    zIndex: -1,
    width: 'auto',
    flex: 1,
  },
  time: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginLeft: 18,
    color: AppColors.IconColor + 'B8',
  },
  room: {
    paddingHorizontal: 11,
    borderRadius: 6,
    alignItems: 'center',
    height: 36,
    marginTop: 14,
  },
  icon: {
    marginRight: 9,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginRight: 9,
    width: 28,
    height: 28,
  },
  text: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 36,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  audioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 17,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  played: {
    fontFamily: 'Poppins-Italic',
    fontSize: 10,
    color: '#45AECE',
    marginRight: 10,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 'auto',
    fontSize: 10,
    color: '#45AECE',
  },
  progress: {
    position: 'absolute',
    backgroundColor: AppColors.MainColor + 'CC',
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  fail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  alert: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 3,
    borderColor: '#CE4545',
    borderWidth: 1,
  },
  failText: {
    color: '#CE4545',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    lineHeight: 16,
  },
  sendAgain: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 10,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.AppBlack + '9E',
    borderRadius: 8,
  },
  tap: {
    color: AppColors.white,
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    lineHeight: 16,
    marginTop: 7,
  },
  reaction: {
    position: 'absolute',
    top: -5,
    right: 0,
  },
  reactionWrap: {
    position: 'absolute',
    top: -7,
    right: 0,
  },
});

export default SingleMessage;
