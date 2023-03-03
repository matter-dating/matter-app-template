import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import FullScreenLoader from '../Components/Common/FullScreenLoader';

import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import CustomImage from '../Components/Common/CustomImage';

import BackIcon from '../Assets/Svg/BackIcon';
import DeleteIcon from '../Assets/Svg/DeleteIcon';
import CheckIcon from '../Assets/Svg/CheckAIcon';
import FaceIcon from '../Assets/Svg/FaceIcon';
import {useAuth} from '../Providers/AuthProvider';
import {S3_MAIN_URL, S3_VERIFICATION_URL} from '../Utils/Constants';
import {makeid} from '../Utils/Functions';

const {width: screenWidth} = Dimensions.get('window');
const imgWidth = screenWidth - 100;

const LivePhotoVerification = ({navigation}) => {
  const {
    user,
    userData,
    userVerification,
    createVerification,
    updateVerification,
  } = useAuth();

  const insets = useSafeArea();
  const [imageUrl, setImageUrl] = useState(
    userVerification.length > 0 ? userVerification[0].selfie_url : null,
  );
  const [isFail, setIsFail] = useState(
    userVerification.length > 0 ? userVerification[0].status === 2 : false,
  );
  const [isUpload, setIsUpload] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setIsFail(false);
      setIsUpload(true);
    } else {
      setIsUpload(false);
    }
  }, [imageUrl]);

  const imageUpload = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      useFrontCamera: true,
    })
      .then(async (image) => {
        const cropped = await ImagePicker.openCropper({
          path: image.path,
          width: 600,
          height: 800,
          includeBase64: true,
        });
        setImageUrl(cropped.data);
      })
      .catch((e) => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  const imageSubmit = () => {
    if (imageUrl) {
      setShowLoader(true);
      const imageId = makeid(20);
      const task = user.callFunction('uploadImageToS3', [
        imageUrl,
        imageId,
        'matter-verification-photos',
      ]);
      task.then(() => {
        let status = 0;
        user.callFunction('imageVerification', [imageId]).then((res) => {
          if (res.success === true) {
            status = 1;
          } else {
            status = 0;
          }
        });
        if (userVerification.length === 0) {
          createVerification(
            userData.user_id,
            'photo',
            S3_MAIN_URL + userData.user_id + '.jpg',
            S3_VERIFICATION_URL + imageId + '.jpg',
            status,
            '',
          );
        } else if (userVerification[0].status === 2) {
          updateVerification(
            userVerification[0],
            status,
            S3_VERIFICATION_URL + imageId + '.jpg',
          );
        }
        setIsSubmit(true);
        setShowLoader(false);
      });
    }
  };
  return (
    <View style={styles.wrap}>
      {showLoader && <FullScreenLoader />}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.back, {marginTop: insets.top}]}
          onPress={() => navigation.goBack()}>
          <BackIcon width={20} height={20} color={Colors.MainColor + 'CC'} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {!isUpload && !isSubmit && (
          <View style={styles.tips}>
            <Text style={styles.title}>Lastly, verify yourself </Text>
            <Text style={styles.description}>
              Only verified people can go live
            </Text>
          </View>
        )}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.containerStyle}>
          <View style={styles.container}>
            {isFail && (
              <View style={styles.fail}>
                <DeleteIcon width={20} height={20} color={AppColors.alert} />
                <Text style={styles.failText}>
                  Looks like your photo doesn’t{'\n'}
                  match the requirements…
                </Text>
              </View>
            )}
            {isSubmit ? (
              <>
                <FaceIcon width={92} height={92} color={AppColors.MainColor} />
                <Text style={styles.great}>
                  Great!{'\n'}
                  We’ll let you know when your photo is verified.
                </Text>
              </>
            ) : (
              <CustomImage
                style={styles.img}
                source={
                  imageUrl
                    ? imageUrl.includes('https')
                      ? {uri: imageUrl}
                      : {uri: `data:image/gif;base64,${imageUrl}`}
                    : require('../Assets/Image/verify.png')
                }
              />
            )}
            {!isSubmit && !isUpload && (
              <View style={styles.box}>
                <View style={styles.row}>
                  <CheckIcon width={16} height={16} color={Colors.green} />
                  <Text style={styles.text}>
                    Take a selfie with a{' '}
                    <Text style={styles.bold}>peace sign</Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <CheckIcon width={16} height={16} color={Colors.green} />
                  <Text style={styles.text}>
                    Clearly show your <Text style={styles.bold}>face</Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <CheckIcon width={16} height={16} color={Colors.green} />
                  <Text style={styles.text}>No group photo</Text>
                </View>
              </View>
            )}
            {isFail && (
              <View style={styles.box}>
                <View style={styles.requirementRow}>
                  <Text style={styles.requirement}>Requirements</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>
                    Take a selfie with a{' '}
                    <Text style={styles.bold}>peace sign</Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>
                    Clearly show your <Text style={styles.bold}>face</Text>
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>No group photo</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        {isSubmit ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LiveInvite')}>
            <Text style={[styles.buttonText, styles.whiteText]}>Continue</Text>
          </TouchableOpacity>
        ) : isUpload ? (
          <>
            {!imageUrl.includes('https') && (
              <>
                <TouchableOpacity style={styles.button} onPress={imageSubmit}>
                  <Text style={[styles.buttonText, styles.whiteText]}>
                    Submit photo
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity
              style={[
                styles.button,
                isFail ? styles.buttonRed : styles.buttonBorder,
              ]}
              onPress={imageUpload}>
              <Text style={[styles.buttonText, isFail && styles.whiteText]}>
                Re-take photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonWhite]}
              onPress={() => navigation.navigate('AudioScreen')}>
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={imageUpload}>
              <Text style={[styles.buttonText, styles.whiteText]}>
                Take a photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonWhite]}
              onPress={() => navigation.navigate('AudioScreen')}>
              <Text style={[styles.buttonText]}>Cancel</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  back: {
    padding: 10,
  },
  containerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    marginVertical: 12,
    textAlign: 'center',
  },
  description: {
    color: Colors.MainColor + 'E6',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 32,
  },
  great: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginVertical: 50,
  },
  img: {
    width: imgWidth,
    borderRadius: 8,
    height: (imgWidth / 275) * 370,
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    width: screenWidth,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tips: {
    alignItems: 'center',
  },
  fail: {
    flexDirection: 'row',
    marginVertical: 7,
    width: imgWidth,
  },
  failText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 7,
  },
  text: {
    marginLeft: 8,
    color: AppColors.IconColor,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Poppins-Regular',
  },
  requirementRow: {
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.AppBlack + '66',
    paddingBottom: 6,
    width: imgWidth,
  },
  requirement: {
    marginLeft: 8,
    color: AppColors.IconColor,
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Poppins-Medium',
  },
  box: {
    marginTop: 17,
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
  footer: {
    paddingHorizontal: 31,
  },
  button: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 12,
    height: 48,
    backgroundColor: AppColors.MainColor,
  },
  buttonWhite: {
    backgroundColor: Colors.white,
  },
  buttonBorder: {
    backgroundColor: Colors.white,
    borderWidth: 0.5,
  },
  buttonRed: {
    backgroundColor: AppColors.alert,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.MainColor,
  },
  whiteText: {
    color: Colors.white,
  },
});

export default LivePhotoVerification;
