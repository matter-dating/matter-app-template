import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Animated,
  Alert,
  Easing,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import ChatFooter from '../Components/Chat/ChatFooter';
import ChatDetailHeader from '../Components/Chat/ChatDetailHeader';
import ChatDetailInfo from '../Components/Chat/ChatDetailInfo';
import ChatTutorial from '../Components/Common/ChatTutorial';
import SelectStickers from '../Components/Chat/SelectStickers';

import SingleMessage from '../Components/Chat/SingleMessage';
import ReactionView from '../Components/Chat/ReactionView';
import FullScreenLoader from '../Components/Common/FullScreenLoader';
import AnimatedView from '../Components/Common/AnimatedView';
import {useMessages} from '../Providers/MessagesProvider';
import {useAuth} from '../Providers/AuthProvider';
import {useAppContent} from '../Providers/AppContentProvider';
import {useAppFlag} from '../Providers/AppFlagProvider';

import AppColors from '../Utils/AppColors';
import ProfileMoreModal from './Modals/ProfileMoreModal';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  logCreateRoom,
  logSendExpression,
  logUnlockText,
} from '../Utils/Analytics';
const audioRecorderPlayer = new AudioRecorderPlayer();
import {makeid} from '../Utils/Functions';
import RNFS from 'react-native-fs';
import {logSendVoice} from '../Utils/Analytics';
import {S3_CHAT_PHOTO_URL} from '../Utils/Constants';

const {width: screenWidth} = Dimensions.get('window');

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const ChatDetailScreen = ({navigation, route}) => {
  const insets = useSafeArea();
  const {pubnub_room_id, profile} = route.params;
  const {getMatch, setLastSeenTime, setEnableTextRoom, userData, user} =
    useAuth();
  const {checkFlag, setFlag} = useAppFlag();
  const room = getMatch(pubnub_room_id);
  const {
    roomMessages,
    createMessage,
    updateMessage,
    updateMessageStatus,
    updateMessageStatusFail,
    seenMessage,
    seenExpressionMessages,
    loadMore,
  } = useMessages();
  const [messages, setMessages] = useState([
    ...roomMessages(room.pubnub_room_id),
  ]);

  const [moreVisible, setMoreVisible] = useState(false);

  // Tutorial
  const [showTutorial1, setShowTutorial1] = useState(false);

  const [currentVoice, setCurrentVoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const fillValue = useRef(new Animated.Value(0)).current;
  const [fadeValue] = useState(new Animated.Value(0));
  const [isClick, setIsClick] = useState(false);

  const [stop, setStop] = useState(false);

  // Sticker
  const [showSticker, setShowSticker] = useState(false);
  const {miscs, contents} = useAppContent();
  const [cats, setCats] = useState(null);
  const [suggestions, setSuggestions] = useState(
    contents.filter((c) => c.type === 'sticker'),
  );
  const [category, setCategory] = useState(null);

  // Reaction
  const [reactionItem, setReactionItem] = useState(null);
  const [reactionTop, setReactionTop] = useState(0);

  const [enableText, setEnableText] = useState(
    room.enable_text ? room.enable_text : false,
  );

  // Pagination Loader
  const [showLoader, setShowLoader] = useState(false);
  const tempImageRef = useRef(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (
      enableText === true &&
      (room.enable_text === null || room.enable_text === false)
    ) {
      logUnlockText(room.pubnub_room_id);
      setEnableTextRoom(room);
    }
  }, [enableText]);

  useEffect(() => {
    fillValue.setValue(0);
    fadeValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration: duration * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  useEffect(() => {
    setLastSeenTime(room);
    seenExpressionMessages(room.pubnub_room_id);
    roomMessages(room.pubnub_room_id).addListener(() => {
      // setMessages(roomMessages(room.pubnub_room_id).map(msg => {
      //   return {
      //     id : msg.id,
      //     user_id: msg.user_id,
      //     room_id: msg.room_id,
      //     text: msg.text,
      //     timetoken: msg.timetoken,
      //     status: msg.status,
      //     type: msg.type,
      //     added: msg.added,
      //     payload: msg.payload,
      //     expire_at: msg.expire_at,
      //     duration: msg.duration,
      //     width: msg.width,
      //     height: msg.height
      //   }

      // }));
      setMessages(roomMessages(room.pubnub_room_id));
    });
    audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.currentPosition === e.duration) {
        setCurrentVoice(null);
        audioRecorderPlayer.stopPlayer();
      }
      if (e.currentPosition > 0) {
        setIsPlay(true);
        setIsLoading(false);
      }
    });
    if (checkFlag('create_rom_tutorial') === null) {
      setShowTutorial1(true);
    }
    return () => {
      setLastSeenTime(room);
      audioRecorderPlayer.stopPlayer();
      setIsPlay(false);
      setDuration(0);
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  useEffect(() => {
    if (
      miscs &&
      miscs.length > 0 &&
      miscs.filter((c) => c.type === 'sticker').length > 0
    ) {
      setCats(miscs.filter((c) => c.type === 'sticker')[0].slug_list);
      setCategory(miscs.filter((c) => c.type === 'sticker')[0].slug_list[0]);
    }
  }, [miscs]);

  useEffect(() => {
    if (category) {
      var q = contents.filter((c) => c.type === 'sticker');
      setSuggestions(q.filter((c) => c.category_slug === category));
    } else {
      setSuggestions(contents.filter((c) => c.type === 'sticker'));
    }
  }, [category]);

  useEffect(() => {
    setReactionItem(null);
  }, [messages]);

  const endSate = (index) => {
    updateMessage(messages[index]);
  };

  const showReactions = (item, e) => {
    setReactionTop(e.nativeEvent.pageY);
    setReactionItem(item);
    ReactNativeHapticFeedback.trigger('impactMedium', options);
  };

  const retryMessage = async (item) => {
    if (flatListRef.current && messages && messages.length > 0) {
      flatListRef.current.scrollToIndex({animated: true, index: 0});
    }
    if (item.type === 'PHOTO') {
      updateMessageStatusFail(item, '5');
      const imageId = makeid(20);
      const realmMessage = clickSendImage(
        item.payload,
        item.width,
        item.height,
      );
      try {
        tempImageRef.current = realmMessage;
        const base64 = await RNFS.readFile(item.payload, 'base64');
        const res = await user.callFunction('uploadImageToS3', [
          base64,
          imageId,
          'matter-chat-photos',
        ]);
        updateMessageStatus(realmMessage, S3_CHAT_PHOTO_URL + imageId + '.jpg');
        // console.log('remove old pubnub -1 status message', item.id);
      } catch (e) {
        updateMessageStatusFail(tempImageRef.current, '-1');
        // console.log('error on try again photo', e);
      }
    } else if (item.type === 'VOICE_NOTE') {
      try {
        const voiceId = makeid(20);
        const base64 = await RNFS.readFile(item.payload, 'base64');
        let voice_folder =
          room.user_id < room.other_user_id
            ? room.user_id + '_' + room.other_user_id
            : room.other_user_id + '_' + room.user_id;
        const realmMessage = createMessage(
          room.pubnub_room_id,
          'Please Update your App to see this message.',
          'VOICE_NOTE',
          item.payload,
          item.duration,
        );
        //handling function to pubnub, progress bar test
        await user.callFunction('uploadVoiceToS3', [
          base64,
          voice_folder + '/' + voiceId,
          'matter-voices',
        ]);
        updateMessageStatus(realmMessage, voice_folder + '/' + voiceId);
        logSendVoice(
          room.pubnub_room_id,
          voice_folder + '/' + voiceId + '.m4a',
          item.duration,
        );
      } catch (e) {
        //Same as image logic tempImageRef.current if needs
        // console.log('error on try again voice_note', e);
      }
    }
    // if (realmMessage) {
    //   try {
    //     tempImageRef.current = realmMessage;
    //     const res = await user.callFunction('uploadImageToS3', [
    //       image.data,
    //       imageId,
    //       'matter-chat-photos',
    //     ]);
    //     updateMessageStatus(realmMessage, S3_CHAT_PHOTO_URL + imageId + '.jpg');
    //   } catch(e) {
    //     updateMessageStatusFail(tempImageRef.current, '-1');
    //     if (e.code === 'E_PICKER_CANCELLED') {
    //       navigation.navigate('CameraPermissionModal');
    //     }
    //   };
    // }
    tempImageRef.current = null;
  };

  const startAudioRoom = () => {
    setReactionItem(null);
    logCreateRoom(room.pubnub_room_id);
    navigation.navigate('AudioChatScreen', {
      room_id: room.agora_room_id,
      user_id: room.other_user_id,
      fname: room.other_user_fname,
    });
    createMessage(
      room.pubnub_room_id,
      userData.first_name + ' created a audio room. Join them',
      'AUDIO_ROOM',
    );
  };

  const showConfirmDialog = (callback) => {
    return Alert.alert(
      'Are you sure you want to stop the recording?',
      'You cannot take any other action while recording is in session. Please, stop the recording to proceed with other actions.',
      [
        {
          text: 'Stop recording',
          onPress: () => {
            setStop(true);
            callback();
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
        },
      ],
    );
  };

  const stopPlayVoice = () => {
    setIsLoading(false);
    setCurrentVoice(null);
    audioRecorderPlayer.stopPlayer();
    setDuration(0);
    setIsPlay(false);
  };

  const clickTutorial1 = () => {
    setFlag('create_rom_tutorial', 'true');
    setShowTutorial1(false);
  };

  const hideModal = (reported) => {
    setMoreVisible(false);
  };

  const playMusic = async (voice, message) => {
    setDuration(0);
    setIsPlay(false);
    audioRecorderPlayer.stopPlayer();
    if (voice !== currentVoice) {
      setCurrentVoice(voice);
      audioRecorderPlayer.stopPlayer();
      setIsLoading(true);
      audioRecorderPlayer.startPlayer(voice);
      if (message.user_id !== user.id) {
        seenMessage(message);
      }
      setDuration(message.duration === 0 ? 1 : message.duration);
    } else if (voice === currentVoice) {
      stopPlayVoice();
    }
  };

  const clickSendSticker = async (item) => {
    var widthHeight = item.long_question.split(':');
    try {
      createMessage(
        room.pubnub_room_id,
        'Please Update your App to see this message.',
        'EXPRESSION',
        item.question,
        0,
        widthHeight[0],
        widthHeight[1],
      );
      logSendExpression(room.pubnub_room_id, item.question);
      setShowSticker(false);
    } catch (e) {
      // console.log(e);
    }
  };

  const clickSendGif = async (url, obj) => {
    try {
      createMessage(
        room.pubnub_room_id,
        'Please Update your App to see this message.',
        'GIF',
        url,
        0,
        obj.images['480w_still']['width'],
        obj.images['480w_still']['height'],
      );
    } catch (e) {
      // console.log(e);
    }
  };

  const clickSendImage = (url, width, height) => {
    try {
      const realmMessage = createMessage(
        room.pubnub_room_id,
        'Please Update your App to see this message.',
        'PHOTO',
        url,
        0,
        width.toString(),
        height.toString(),
      );
      return realmMessage;
    } catch (e) {
      // console.log(e);
      return null;
    }
  };

  const loadMoreMessages = () => {
    // setShowLoader(true);
    loadMore(pubnub_room_id, messages[messages.length - 1].timetoken);
  };

  const renderMessage = ({item, index}) => {
    if (item.isValid()) {
      return (
        <AnimatedView added={item.added} index={index} endSate={endSate}>
          <SingleMessage
            stopPlayVoice={stopPlayVoice}
            index={index}
            item={item}
            room={room}
            playMusic={playMusic}
            currentVoice={currentVoice}
            isLoading={isLoading}
            fillValue={fillValue}
            fadeValue={fadeValue}
            showConfirmDialog={showConfirmDialog}
            isClick={isClick}
            showReactions={showReactions}
            retryMessage={retryMessage}
          />
        </AnimatedView>
      );
    } else {
      return <></>;
    }
  };

  return (
    <View style={styles.flex}>
      {!room && <FullScreenLoader />}
      {showTutorial1 && (
        <ChatTutorial
          arrowTop={true}
          hide={clickTutorial1}
          top={insets.top + 72}
          right={80}
          alignRight={true}
          fontSize={14}
          maxWidth={screenWidth - 102}
          title="Go on an audio date!"
          text="Create a room and invite your"
          text1="match for an audio date"
        />
      )}
      {showSticker && (
        <SelectStickers
          clickSendSticker={clickSendSticker}
          setShowSticker={setShowSticker}
          showSticker={showSticker}
          suggestions={suggestions}
          cats={cats}
          category={category}
          setCategory={setCategory}
        />
      )}
      <ChatDetailHeader
        // clickTutorial={clickTutorial}
        item={room}
        setMoreVisible={setMoreVisible}
        startAudioRoom={startAudioRoom}
        showConfirmDialog={showConfirmDialog}
        isClick={isClick}
        setReactionItem={setReactionItem}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 40}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <View style={styles.flex}>
          <View style={styles.flex}>
            <FlatList
              ref={flatListRef}
              style={styles.container}
              showsVerticalScrollIndicator={false}
              data={messages}
              renderItem={(item, index) => renderMessage(item, index)}
              keyExtractor={(item, index) => index.toString()}
              inverted={Object.keys(messages).length === 0 ? false : true}
              onEndReached={loadMoreMessages}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                Object.keys(messages).length === 0 ? (
                  <></>
                ) : (
                  <>
                    {showLoader && (
                      <View style={styles.loader}>
                        <ActivityIndicator color={AppColors.MainColor} />
                      </View>
                    )}
                    <ChatDetailInfo
                      header={false}
                      match={room}
                      profile={profile}
                    />
                  </>
                )
              }
              ListEmptyComponent={
                <ChatDetailInfo header={true} match={room} profile={profile} />
              }
            />
          </View>
          <ChatFooter
            room={room}
            clickSendGif={clickSendGif}
            clickSendImage={clickSendImage}
            createMessage={createMessage}
            isClick={isClick}
            setIsClick={setIsClick}
            stop={stop}
            setStop={setStop}
            stopPlayVoice={stopPlayVoice}
            showSticker={showSticker}
            setShowSticker={setShowSticker}
            enableText={enableText}
            setEnableText={setEnableText}
          />
          {reactionItem && (
            <TouchableOpacity
              onPress={() => setReactionItem(null)}
              style={styles.reactionBg}
            />
          )}
        </View>
      </KeyboardAvoidingView>
      {reactionItem && (
        <ReactionView
          reactionTop={reactionTop}
          isMine={reactionItem.user_id === user.id}
          reactionItem={reactionItem}
          setReactionItem={setReactionItem}
        />
      )}
      <View style={{height: insets.bottom > 14 ? insets.bottom : 14}} />
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <ProfileMoreModal
          profile={room && {_id: room.other_user_id}}
          isChat={true}
          hide={hideModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  container: {
    marginTop: 0,
    paddingHorizontal: 20,
    // flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200%',
    paddingTop: 7,
  },
  reactionBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: -100,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  loader: {
    paddingTop: 15,
  },
});

export default ChatDetailScreen;
