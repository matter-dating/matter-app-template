import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {userMaxImage} from '../../Utils/Constants';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import EditIcon from '../../Assets/Svg/EditIcon';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';

import {useAuth} from '../../Providers/AuthProvider';
import {makeid, calculateUserStatus} from '../../Utils/Functions';
import {ios_build_number} from '../../Utils/EnvironmentVariables';

const {width: screenWidth} = Dimensions.get('window');
const imgWidth = (screenWidth - 62) / 3;

import PhotoSuggestionModal from '../Modals/PhotoSuggestionModal';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import {logPhotoPermissionDenied, logPhotoUpload} from '../../Utils/Analytics';

const RegisterPhoto = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeArea();
  const {user, userData, updateUserData, userInvitation} = useAuth();
  const [imagesUrl, setImagesUrl] = useState([]);
  const [orderUrl, setOrderUrl] = useState([]);
  const [ready, setReady] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (userInvitation.length > 0) {
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
          await user.callFunction('updateUserField', [
            userData.user_id,
            'status',
            userNewStatus,
          ]);
          await updateUserData();
        }
      })();
    }
  }, [userInvitation]);

  useEffect(() => {
    if (imagesUrl.length > 0) {
      setReady(true);
    } else {
      setReady(false);
    }
    const r = [];
    for (i = 0; i < userMaxImage; i++) {
      if (imagesUrl[i]) {
        r.push(imagesUrl[i]);
      } else {
        r.push('create');
      }
    }
    setOrderUrl(r);
  }, [imagesUrl]);

  const imageDelete = (index) => {
    imagesUrl.splice(index, 1);
    setImagesUrl([...imagesUrl]);
  };

  const imageUpload = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: userMaxImage - imagesUrl.length,
      mediaType: 'photo',
    })
      .then(async (imgs) => {
        setLoader(true);
        const result = [];
        for (const image of imgs) {
          try {
            result.push(
              await ImagePicker.openCropper({
                path: image.path,
                width: 600,
                height: 600,
                includeBase64: true,
              }),
            );
          } catch (e) {
            console.error(e);
          }
        }
        let length = imagesUrl.length;
        for (i = 0; i < result.length; i++) {
          imagesUrl[length + i] = result[i].data;
        }
        setImagesUrl([...imagesUrl]);
        setLoader(false);
      })
      .catch((e) => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          logPhotoPermissionDenied();
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  const renderItem = ({item, index}) => {
    if (item !== 'create') {
      return (
        <View key={index} style={styles.container}>
          <View style={styles.box}>
            <Image
              loadingIndicatorSource={require('../../Assets/Image/default.png')}
              source={{uri: `data:image/gif;base64,${item}`}}
              style={styles.img}
              resizeMode="cover"
            />
            {imagesUrl.length === 1 ? (
              <TouchableOpacity style={styles.delete} onPress={imageUpload}>
                <EditIcon
                  width={17}
                  height={17}
                  color={AppColors.AppBlack + 'CC'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.delete}
                onPress={() => imageDelete(index)}>
                <DeleteIcon
                  width={18}
                  height={18}
                  color={AppColors.AppBlack + 'B8'}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    }
    return (
      <View key={index} style={styles.container}>
        <TouchableOpacity style={styles.box} onPress={imageUpload}>
          <View style={styles.add}>
            <AddIcon
              color={AppColors.MainColor1 + '47'}
              width={30}
              height={30}
            />
          </View>
          {index === 0 && (
            <View style={styles.mainPhoto}>
              <Text style={styles.mainPhotoText}>{t('Photo.MainPhoto')}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const setupProfile = async () => {
    setLoader(true);
    let imageIds = [],
      at_least_one_face = 0;
    await Promise.all(
      imagesUrl.map(async (i) => {
        const imageId = makeid(20);
        await user.callFunction('uploadImageToS3', [
          i,
          imageId,
          'matter-profile-photos',
        ]);
        at_least_one_face = 1;
        imageIds.push(imageId);
      }),
    );
    if (at_least_one_face !== 0) {
      await user.callFunction('updateImageOrderRefactor', [
        imageIds,
        ios_build_number,
      ]);
      updateUserData();
      setLoader(false);
      logPhotoUpload(imageIds.length);
      navigation.navigate('RegisterPhotoVerify', {isFromProfile: false});
    } else {
      navigation.navigate('RealPhoto', {is_onboard_type: 'new_onboard'});
    }
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {marginTop: insets.top}]} />
      <View style={styles.body}>
        <Text style={styles.title}>{t('Photo.Title')}</Text>
        <Text style={styles.description}>
        {t('Photo.Main')}{'\n'}{t('Photo.Face')}
        </Text>
        <FlatList
          data={orderUrl}
          style={styles.list}
          scrollEnabled={false}
          numColumns={3}
          keyExtractor={(item, index) => 'key' + index.toString()}
          renderItem={(item, index) => {
            return renderItem(item, index);
          }}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.tips}
          onPress={() => setMoreVisible(true)}>
          <Text style={styles.tipTitle}>{t('Photo.See')}</Text>
        </TouchableOpacity>
        <ScrollView
          style={styles.scroll}
          // contentContainerStyle={styles.containerStyle}
          directionalLockEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.safety}>
            <View style={styles.icon}>
              <ExclamationIcon
                color={AppColors.MainColor}
                width={12}
                height={12}
              />
            </View>
            <Text style={styles.greenText}>
              {t('Photo.Please')}
            </Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, {marginBottom: insets.bottom + 20}]}
          activeOpacity={ready ? 0.2 : 1}
          onPress={() => {
            if (ready) {
              setupProfile();
            }
          }}>
          <View style={[styles.linear, ready && styles.linearReady]}>
            <Text style={[styles.buttonText, styles.whiteText]}> {t('General.Continue')}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <PhotoSuggestionModal hide={() => setMoreVisible(false)} />
      </Modal>
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
    flexDirection: 'row',
    height: 50,
  },

  title: {
    color: Colors.MainColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 23,
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    color: Colors.IconColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 22,
  },
  body: {
    alignItems: 'center',
    marginHorizontal: 22,
  },
  footer: {
    alignItems: 'center',
    marginHorizontal: 22,
    flex: 1,
  },
  scroll: {
    width: '100%',
  },
  tips: {
    padding: 10,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginRight: -9,
  },
  mainPhoto: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  mainPhotoText: {
    fontSize: 12,
    lineHeight: 18,
    color: AppColors.IconColor + '8A',
  },
  box: {
    backgroundColor: '#EDEEF0',
    borderRadius: 8,
    marginRight: 9,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: imgWidth,
    height: imgWidth,
  },
  img: {
    width: imgWidth,
    height: imgWidth,
    borderRadius: 8,
  },
  add: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    position: 'absolute',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    right: -4,
    bottom: -4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#EFF3F9',
  },
  tipTitle: {
    lineHeight: 20,
    color: AppColors.AppBlack + 'F5',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
  },
  linear: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor + '8F',
  },
  linearReady: {
    backgroundColor: AppColors.MainColor,
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
  safety: {
    paddingHorizontal: 4,
    marginVertical: 32,
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AppColors.MainColor,
    marginRight: 7,
  },
  greenText: {
    fontSize: 13,
    lineHeight: 20,
    flex: 1,
    color: AppColors.MainColor4,
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
});

export default RegisterPhoto;
