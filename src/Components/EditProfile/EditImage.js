import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import ImagePicker from 'react-native-image-crop-picker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {AutoDragSortableView} from 'react-native-drag-sort';
import ImageMoreModal from '../../Screens/Modals/ImageMoreModal';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {userMaxImage, S3_PHOTO_URL} from '../../Utils/Constants';
import EditIcon from '../../Assets/Svg/EditIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import CustomImage from '../Common/CustomImage';
import {makeid, calculateUserStatus} from '../../Utils/Functions';
import {useAuth} from '../../Providers/AuthProvider';
import {ios_build_number} from '../../Utils/EnvironmentVariables';

const {width: screenWidth} = Dimensions.get('window');

const imgWidth = (screenWidth - 52) / 3;
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const EditImage = ({setScrollEnabled, stopIntroPlayer}) => {
  const navigation = useNavigation();
  const {user, userData, updateUserData, userInvitation} = useAuth();
  const [orderUrl, setOrderUrl] = useState([]);
  const [fixedItems, setFixedItems] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [imagesUrl, setImagesUrl] = useState(userData.profile_hd_images);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
          await user.callFunction('updateUserField', [
            userData.user_id,
            'status',
            userNewStatus,
          ]);
          await updateUserData();
          if (userNewStatus.status === 7) {
            navigation.navigate('WaitList', {waitList: 'WaitList'});
          } else if (userNewStatus === 6) {
            navigation.navigate('WaitList', {waitList: 'BlackList'});
          } else if (userNewStatus === 5) {
            navigation.navigate('UnderAge');
          } else if (userNewStatus === 4) {
            navigation.navigate('BannedModal');
          } else if (userNewStatus === 3) {
            navigation.navigate('StrikeModal');
          }
        }
      })();
    }
  }, [userInvitation, userData]);

  useEffect(() => {
    const r = [];
    const f = [];
    for (i = 0; i < userMaxImage; i++) {
      if (imagesUrl[i]) {
        r.push(imagesUrl[i]);
      } else {
        f.push(i);
        r.push('create');
      }
    }
    setOrderUrl(r);
    setFixedItems(f);
    (async () => {
      await user.callFunction('updateImageOrderRefactor', [
        r.filter((x) => x !== 'create'),
        ios_build_number,
      ]);
      await updateUserData();
    })();
  }, [imagesUrl]);

  const onSelectedDragEnd = () => {
    setScrollEnabled(true);
  };

  const onSelectedDragStart = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', options);
    setScrollEnabled(false);
  };

  const onDataChange = async (data) => {
    const r = [];
    for (i = 0; i < data.length; i++) {
      if (data[i] !== 'create') {
        r.push(data[i]);
      }
    }
    setImagesUrl(r);
  };

  const imageUpload = async () => {
    // const check_image_id = 'patfGZ5fxD0qf2RIirAJ';
    // const is_valid = await user.callFunction('imageValidation', [check_image_id]);
    // let at_least_one_face = 0;

    ImagePicker.openPicker({
      multiple: true,
      maxFiles: userMaxImage - imagesUrl.length,
      mediaType: 'photo',
    })
      .then(async (images) => {
        const result = [];
        for (const image of images) {
          const cropped = await ImagePicker.openCropper({
            path: image.path,
            width: 600,
            height: 600,
            includeBase64: true,
          });
          const imageId = makeid(20);
          const res = await user.callFunction('uploadImageToS3', [
            cropped.data,
            imageId,
            'matter-profile-photos',
          ]);
          // const is_valid_task = await user.callFunction('imageValidation', [imageId]);
          // console.log('is_valid.result', is_valid_task.result);
          // if (is_valid_task && is_valid_task.result > 0){
          //   at_least_one_face = at_least_one_face + is_valid_task.result;
          // }
          result.push(imageId);
        }
        let length = imagesUrl.length;
        // if (length == 0) {
        //   console.log('main photo replacing...');
        // }
        for (i = 0; i < result.length; i++){
          imagesUrl[length + i] = result[i];
        }
        setImagesUrl([...imagesUrl]);
        // if (at_least_one_face !== 0){
        //   setImagesUrl([...imagesUrl]);
        // } else {
        //   for (i = 0; i < length; i++){
        //     const resExistingPhoto = await user.callFunction('imageValidation', [imagesUrl[i]]);
        //     console.log('resExistingPhoto.result', resExistingPhoto.result);
        //     if (resExistingPhoto && resExistingPhoto.result > 0){
        //       at_least_one_face = at_least_one_face + resExistingPhoto.result;
        //     }
        //   }
        //   if (at_least_one_face !== 0){
        //     console.log('try again editImage');
        //   }else{
        //     await user.callFunction('updateUserField', [user.customData.user_id, 'status', 2]);
        //     navigation.navigate('RealPhoto', {is_onboard_type: 'edit_profile'});
        //   }
        // }
      })
      .catch((e) => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  const renderItem = (item, index) => {
    if (item !== 'create') {
      return (
        <View style={styles.imageBox} key={index}>
          <CustomImage
            // source={{uri: item}}
            source={{uri: S3_PHOTO_URL + item + '.jpg'}}
            style={styles.img}
          />
          {index === 0 && user.customData && user.customData.status === 8 && (
            <View style={styles.alertBg}>
              <Text style={styles.alertText}>
                Upload your real photo As your main photo
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              stopIntroPlayer();
              clickEditIcon(index);
            }}>
            <EditIcon
              width={17}
              height={17}
              color={AppColors.AppBlack + 'CC'}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity
          key={index}
          style={styles.imageBox}
          onPress={() => {
            stopIntroPlayer();
            imageUpload();
          }}>
          <View style={styles.add}>
            <AddIcon
              color={AppColors.MainColor1 + '47'}
              width={30}
              height={30}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const clickEditIcon = (index) => {
    setEditIndex(index);
    setEditVisible(true);
  };

  const hideModal = (reported) => {
    setEditVisible(false);
  };

  return (
    <View style={styles.row}>
      <View style={styles.drag}>
        {user && (
          <AutoDragSortableView
            parentWidth={screenWidth}
            dataSource={orderUrl}
            childrenWidth={imgWidth}
            childrenHeight={imgWidth}
            delayLongPress={300}
            marginChildrenBottom={6}
            marginChildrenRight={9}
            // marginChildrenLeft = {8}
            marginChildrenTop={6}
            fixedItems={fixedItems}
            // maxScale={0.9}
            onDataChange={(data) => onDataChange(data)}
            keyExtractor={(item, index) => 'key' + index.toString()}
            renderItem={(item, index) => {
              return renderItem(item, index);
            }}
            isDragFreely={false}
            bottomViewHeight={40}
            onDragStart={onSelectedDragStart}
            onDragEnd={onSelectedDragEnd}
          />
        )}
        {user.customData && user.customData.status === 8 && (
          <View style={styles.alert}>
            <ExclamationIcon width={3} height={17} color={AppColors.white} />
          </View>
        )}
      </View>
      <Modal animationType="fade" transparent={true} visible={editVisible}>
        <ImageMoreModal
          setImagesUrl={setImagesUrl}
          hide={hideModal}
          editIndex={editIndex}
          imagesUrl={imagesUrl}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  drag: {
    paddingTop: 22,
    marginBottom: 16,
    paddingHorizontal: 17,
    backgroundColor: Colors.colorF56,
    height: imgWidth * 2 + 52,
  },
  imageBox: {
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    width: imgWidth,
    height: imgWidth,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderRadius: 16,
    right: -4,
    bottom: -4,
    backgroundColor: '#FFFDFD',
  },
  img: {
    width: imgWidth,
    height: imgWidth,
    borderRadius: 4,
  },
  alert: {
    backgroundColor: '#C93737',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'center',
    position: 'absolute',
    top: 18,
    left: 10,
  },
  alertBg: {
    backgroundColor: AppColors.AppBlack + 'A3',
    borderRadius: 4,
    width: imgWidth,
    height: imgWidth,
    marginRight: 8,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 10,
  },
  alertText: {
    color: AppColors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});

export default EditImage;
