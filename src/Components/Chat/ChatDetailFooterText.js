import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  View,
  Text,
  Keyboard,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import StickerIcon from '../../Assets/Svg/StickerIcon';
import GifIcon from '../../Assets/Svg/GifIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import ImagesIcon from '../../Assets/Svg/ImagesIcon';
import {logSendText} from '../../Utils/Analytics';
import {makeid} from '../../Utils/Functions';
import {useAuth} from '../../Providers/AuthProvider';
import {useMessages} from '../../Providers/MessagesProvider';
import {S3_CHAT_PHOTO_URL} from '../../Utils/Constants';

const ChatDetailFooterText = ({
  item,
  createMessage,
  clickSticker,
  focus,
  setFocus,
  clickStartFromText,
  clickSendGif,
  clickSendImage,
}) => {
  const {user} = useAuth();
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const {updateMessageStatus, updateMessageStatusFail} = useMessages();
  const tempImageRef = useRef(null);

  const sendMessage = () => {
    if (message) {
      logSendText(item.pubnub_room_id, message);
      createMessage(item.pubnub_room_id, message, 'TEXT_MESSAGE');
    }
    setMessage('');
  };

  const onMessageEdit = (text) => {
    setMessage(text);
  };

  const pressGif = () => {
    Keyboard.dismiss();
    navigation.navigate('GifModal', {
      selectGif: clickSendGif,
    });
  };

  const imageUpload = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      includeBase64: true,
      compressImageMaxWidth: 480,
    })
      .then(async (image) => {
        const imageId = makeid(20);
        const realmMessage = clickSendImage(
          image.path,
          image.width,
          image.height,
        );
        if (realmMessage) {
          tempImageRef.current = realmMessage;
          const res = await user.callFunction('uploadImageToS3', [
            image.data,
            imageId,
            'matter-chat-photos',
          ]);
          updateMessageStatus(
            realmMessage,
            S3_CHAT_PHOTO_URL + imageId + '.jpg',
          );
        }
      })
      .catch((e) => {
        updateMessageStatusFail(tempImageRef.current, '-1');
        if (e.code === 'E_PICKER_CANCELLED') {
          navigation.navigate('CameraPermissionModal');
        }
      });
    tempImageRef.current = null;
  };

  // const retryImageMessage = async (temp_image_path) => {
  //   console.log(temp_image_path);
  //   // const imageId = makeid(20);
  //   // const realmMessage = clickSendImage(temp_image_path, image.width, image.height);
  //   // if (realmMessage) {
  //   //   try {
  //   //     tempImageRef.current = realmMessage;
  //   //     const res = await user.callFunction('uploadImageToS3', [
  //   //       image.data,
  //   //       imageId,
  //   //       'matter-chat-photos',
  //   //     ]);
  //   //     updateMessageStatus(realmMessage, S3_CHAT_PHOTO_URL + imageId + '.jpg');
  //   //   } catch(e) {
  //   //     updateMessageStatusFail(tempImageRef.current, '-1');
  //   //     if (e.code === 'E_PICKER_CANCELLED') {
  //   //       navigation.navigate('CameraPermissionModal');
  //   //     }
  //   //   };
  //   // }
  // };

  return (
    <View style={styles.wrapper}>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <View style={[styles.border, focus && styles.focusBorder]}>
            <TextInput
              style={[
                styles.input,
                focus && styles.focusInput,
                message.length === 0 && styles.emptyInput,
                Platform.OS === 'ios' && {paddingTop: 10},
              ]}
              autoCorrect={false}
              autoComplete={false}
              onChangeText={(text) => onMessageEdit(text)}
              value={message}
              keyboardType="default"
              placeholder="Type text here..."
              placeholderTextColor={AppColors.AppBlack + '7A'}
              blurOnSubmit={false}
              multiline={true}
              textAlignVertical="center"
              onFocus={() => setFocus(true)}
              onEndEditing={() => setFocus(false)}
              onBlur={() => setFocus(false)}
            />
            {!focus && (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.buttonImage]}
                  onPress={() => imageUpload()}>
                  <ImagesIcon
                    width={23}
                    height={22}
                    color={AppColors.AppBlack + '8F'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonGif]}
                  onPress={pressGif}>
                  <GifIcon
                    width={25}
                    height={22}
                    color={AppColors.AppBlack + '8F'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={clickSticker}>
                  <StickerIcon
                    width={23}
                    height={23}
                    color={AppColors.AppBlack + '8F'}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>

          {(focus || message.length > 0) && (
            <TouchableOpacity
              style={styles.send}
              activeOpacity={message.length > 0 ? 0.6 : 1}
              onPress={sendMessage}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          )}
          {message.length === 0 && !focus && (
            <TouchableOpacity
              style={styles.voice}
              onPress={() => clickStartFromText()}>
              <VoiceIcon width={28} height={28} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  footer: {
    paddingHorizontal: 20,
  },
  button: {
    position: 'absolute',
    right: 74,
    bottom: 0,
    width: 37,
    borderRadius: 24,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGif: {
    right: 37,
  },
  buttonImage: {
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  border: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: AppColors.AppBlack + '6B',
    borderWidth: 1,
    borderRadius: 24,
    flex: 1,
    maxHeight: 48,
    minHeight: 48,
  },
  focusBorder: {
    maxHeight: 140,
  },
  input: {
    fontSize: 13,
    borderRadius: 24,
    fontFamily: 'Poppins-Regular',
    flex: 1,
    lineHeight: 20,
    color: AppColors.AppBlack + 'E6',
    paddingLeft: 16,
    paddingRight: 110,
    minHeight: 40,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  emptyInput: {
    paddingRight: 16,
    fontFamily: 'Poppins-Light',
    height: 40,
    textAlignVertical: 'top',
  },
  focusInput: {
    paddingRight: 16,
  },
  send: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.MainColor,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginLeft: 11,
  },
  sendText: {
    color: AppColors.white,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  voice: {
    backgroundColor: AppColors.MainColor,
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatDetailFooterText;
