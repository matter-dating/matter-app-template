import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeArea} from 'react-native-safe-area-context';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import EditIcon from '../../Assets/Svg/EditIcon';
import {useAuth} from '../../Providers/AuthProvider';
import {userMaxImage, S3_PHOTO_URL} from '../../Utils/Constants';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import CustomImage from '../../Components/Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import {makeid} from '../../Utils/Functions';
import {ios_build_number} from '../../Utils/EnvironmentVariables';

const {width: screenWidth} = Dimensions.get('window');
const imgWidth = (screenWidth - 80) / 3;

function RealPhotoModal({navigation, route}) {
  // const navigation = useNavigation();
  const {is_onboard_type} = route.params;
  const insets = useSafeArea();
  const {userData, signOut, user, updateUserData} = useAuth();
  const [imagesUrl, setImagesUrl] = useState(userData.profile_hd_images);
  const [orderUrl, setOrderUrl] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
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
      .then(async images => {
        setLoader(true);
        const result = [];
        for (const image of images) {
          result.push(
            await ImagePicker.openCropper({
              path: image.path,
              width: 600,
              height: 600,
              includeBase64: true,
            }),
          );
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
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  const setupProfile = async () => {
    setLoader(true);
    let at_least_one_face = 0;
    let imageIds = [];
    await Promise.all(
      orderUrl.map(async (i) => {
        if (i !== 'create' && i.length !== 20) {
          // console.log('--base64---', i.length);
          const imageId = makeid(20);
          await user.callFunction('uploadImageToS3', [
            i,
            imageId,
            'matter-profile-photos',
          ]);
          // console.log('uploaded', task);
          imageIds.push(imageId);
          // const is_valid_task = await user.callFunction('imageValidation', [imageId]);
          // console.log('is_valid.result', is_valid_task.result);
          // if (is_valid_task && is_valid_task.result > 0){
          //   at_least_one_face = at_least_one_face + is_valid_task.result;
          // }
          at_least_one_face = 1;
        } else if (i.length === 20) {
          imageIds.push(i);
        }
      }),
    );

    if (at_least_one_face !== 0) {
      // console.log('responses:', imageIds);
      await user.callFunction('updateImageOrderRefactor', [
        imageIds,
        ios_build_number,
      ]);
      // console.log('called updateImageOrderRefactor from RealPhoto');
      updateUserData();
      setLoader(false);
      if (is_onboard_type === 'edit_profile') {
        navigation.navigate('RegisterPhotoVerify', {isFromProfile: true});
      } else if (is_onboard_type === 'old_onboard') {
        navigation.navigate('RegisterPhotoVerify', {isFromProfile: false});
      } else if (is_onboard_type === 'edit_profile') {
        navigation.navigate('Home');
      }
    } else {
      setLoader(false);
      // console.log('doesnt fit');
      navigation.navigate('RealPhoto', {is_onboard_type: is_onboard_type});
    }
  };
  const renderItem = ({item, index}) => {
    if (item !== 'create') {
      return (
        <View key={index} style={styles.containerI}>
          <View style={styles.box}>
            {item.length !== 20 ? (
              <CustomImage
                source={{uri: `data:image/gif;base64,${item}`}}
                style={styles.img}
              />
            ) : (
              <CustomImage
                source={{uri: S3_PHOTO_URL + item + '.jpg'}}
                style={styles.img}
              />
            )}
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
            {index === 0 && (
              <View style={styles.alert}>
                <ExclamationIcon
                  width={3}
                  height={17}
                  color={AppColors.white}
                />
              </View>
            )}
          </View>
        </View>
      );
    }
    return (
      <View key={index} style={styles.containerI}>
        <TouchableOpacity style={styles.box} onPress={imageUpload}>
          <View style={styles.add}>
            <AddIcon
              color={AppColors.MainColor1 + '47'}
              width={30}
              height={30}
            />
          </View>
          {index === 0 && (
            <View style={styles.alert}>
              <ExclamationIcon width={3} height={17} color={AppColors.white} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {marginTop: insets.top + 8}]} />
      <View style={styles.contain}>
        <Text style={styles.title}>
          Please upload a real picture of yourself
        </Text>
        <Text style={styles.description}>
          Looks like your photo is either fake or{'\n'}
          violates our community guidelines.
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
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <View style={styles.safety}>
          <Text style={styles.greenTitle}>For the safety of our users</Text>
          <Text style={styles.greenText}>
            Your account is <Text style={styles.bold}>paused</Text> until you
            upload a real picture of yourself.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={setupProfile}>
          <Text style={styles.buttonText}>Upload photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.log}
          onPress={() => {
            navigation.navigate('Welcome');
            signOut();
          }}>
          <Text style={styles.out}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  containerI: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    height: 40,
  },
  contain: {
    justifyContent: 'center',
    paddingHorizontal: 25,
    flex: 1,
  },
  title: {
    color: '#C93737',
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
  },
  description: {
    color: '#C93737',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 32,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
    marginTop: 24,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.white,
  },
  log: {
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  out: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 48,
    color: AppColors.AppBlack,
  },
  safety: {
    paddingHorizontal: 4,
    marginTop: 40,
  },
  greenTitle: {
    fontSize: 20,
    color: AppColors.MainColor4 + 'F5',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 28,
    marginBottom: 8,
  },
  greenText: {
    fontSize: 13,
    lineHeight: 20,
    color: AppColors.MainColor4,
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
  list: {
    marginTop: 28,
  },
  box: {
    backgroundColor: '#EDEEF0',
    borderRadius: 8,
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
  alert: {
    backgroundColor: '#C93737',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 8,
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    left: -5,
  },
});

export default RealPhotoModal;
