import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  TextInput,
  LayoutAnimation,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../../Providers/AuthProvider';
import Toast from '../../Assets/Package/react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../../Utils/Colors';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';

import BackIcon from '../../Assets/Svg/BackIcon';
import NextIcon from '../../Assets/Svg/NextIcon';
import UploadIcon from '../../Assets/Svg/UploadIcon';
import {makeid} from '../../Utils/Functions';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';

function Feedback({navigation}) {
  const insets = useSafeArea();
  const {user} = useAuth();

  const [reasonText, setReasonText] = useState(null);
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [ready, setReady] = useState(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.4,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.4,
      },
    });
  }, [reasonText]);

  useEffect(() => {
    if (image || answer.trim().length > 0) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [answer, image]);

  const cancelClick = () => {
    Keyboard.dismiss();
    setReasonText(null);
    setAnswer('');
    setImage(null);
  };

  const sendFeedBack = () => {
    if (image) {
      setLoader(true);
      let imageId = makeid(20);
      const task = user.callFunction('uploadImageToS3', [
        image,
        imageId,
        'matter-feedback',
      ]);

      task.then(() => {
        user.callFunction('sendFeedback', [reasonText, answer, imageId]);
        setLoader(false);
        Toast.show({
          position: 'top',
          type: 'notif',
          text1: 'Your feedback has been submitted',
          topOffset: 0,
          visibilityTime: 2000,
        });
        cancelClick();
      });
    } else {
      user.callFunction('sendFeedback', [reasonText, answer, '']);
      Toast.show({
        position: 'top',
        type: 'notif',
        text1: 'Your feedback has been submitted',
        topOffset: 0,
        visibilityTime: 2000,
      });
      cancelClick();
    }
  };

  const imageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(async (img) => {
        const result = [];
        result.push(
          await ImagePicker.openCropper({
            path: img.path,
            width: 600,
            height: 700,
            includeBase64: true,
          }),
        );
        setImage(result[0].data);
      })
      .catch((e) => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  const bottomValue = insets.bottom > 14 ? insets.bottom : 14;

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            Feedback
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
      </View>
      <View style={[styles.flex, {paddingBottom: insets.bottom}]}>
        <ScrollView>
          <View style={styles.itemList}>
            <TouchableOpacity onPress={() => setReasonText('Technical issue')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  I’m having a technical issue
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReasonText('Safety concern')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  I want to report a safety concern
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setReasonText('Question')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  I have a question
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <View style={!reasonText ? styles.hide : styles.white}>
          <TouchableOpacity style={styles.reportItem} onPress={cancelClick}>
            <BackIcon width="20" height="20" color={Colors.MainColor} />
            <Text style={styles.reasonText}>{reasonText}</Text>
            <TouchableOpacity
              style={[styles.button, !ready && styles.inActive]}
              activeOpacity={ready ? 0.6 : 1}
              onPress={() => {
                if (ready) {
                  sendFeedBack();
                }
              }}>
              <Text style={[styles.buttonText, !ready && styles.inActiveText]}>
                Send
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={[styles.answer, {paddingBottom: bottomValue}]}>
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={(text) => setAnswer(text)}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={Colors.MainColor + 'A3'}
              placeholder="Enter answer..."
              returnKeyType="done"
              blurOnSubmit={true}
              maxLength={150}
            />
            <View style={styles.footer}>
              {image && (
                <View style={styles.imgBox}>
                  <CustomImage
                    source={{
                      uri: image.includes('amazonaws.com')
                        ? image
                        : `data:image/gif;base64,${image}`,
                    }}
                    style={styles.img}
                  />
                </View>
              )}
              <View style={styles.upload}>
                <TouchableOpacity onPress={imageUpload}>
                  <View style={styles.icon}>
                    <UploadIcon
                      width={24}
                      height={24}
                      color={Colors.MainColor + '7D'}
                    />
                  </View>
                  <Text style={styles.uploadText}>
                    You can add a screenshot
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  itemList: {
    marginBottom: 25,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  empty: {
    width: 24,
  },
  itemName: {
    lineHeight: 20,
    fontSize: 14,
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
    color: Colors.MainColor1,
  },
  hide: {
    display: 'none',
  },
  reportItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#7070706B',
    paddingVertical: 20,
    alignItems: 'center',
  },
  white: {
    backgroundColor: Colors.white,
  },
  reasonText: {
    color: Colors.MainColor + 'F2',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
    marginRight: 'auto',
    marginLeft: 10,
  },
  answer: {
    padding: 20,
  },
  input: {
    minHeight: 50,
    maxHeight: 100,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 21,
    fontSize: 14,
    width: '100%',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E2E6EA',
    borderRadius: 8,
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  inActive: {
    backgroundColor: '#E2E6EA99',
  },
  inActiveText: {
    color: Colors.MainColor1 + '99',
  },
  buttonText: {
    color: Colors.MainColor1,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
  },
  upload: {
    marginLeft: 'auto',
  },
  icon: {
    alignSelf: 'flex-end',
  },
  uploadText: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    marginVertical: 10,
    color: Colors.MainColor + '7D',
  },
  img: {
    width: 60,
    height: 70,
    borderRadius: 8,
  },
});

export default Feedback;
