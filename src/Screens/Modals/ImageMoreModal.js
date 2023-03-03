import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import Colors from '../../Utils/Colors';
import MoreModal from './MoreModal';
import {useAuth} from '../../Providers/AuthProvider';
import {makeid} from '../../Utils/Functions';

const ImageMoreModal = ({hide, editIndex, setImagesUrl, imagesUrl}) => {
  const navigation = useNavigation();
  const {user} = useAuth();

  const replacePhoto = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(async (img) => {
        const cropped = await ImagePicker.openCropper({
          path: img.path,
          width: 600,
          height: 600,
          includeBase64: true,
        });
        const imageId = makeid(20);
        await user.callFunction('uploadImageToS3', [
          cropped.data,
          imageId,
          'matter-profile-photos',
        ]);
        imagesUrl.splice(editIndex, 1, imageId);
        setImagesUrl([...imagesUrl]);
        hide();
      })
      .catch((e) => {
        hide();
        if (e.code && e.code !== 'E_PICKER_CANCELLED') {
          navigation.navigate('CameraPermissionModal');
        }
      });
  };

  return (
    <MoreModal hide={hide}>
      <View>
        <TouchableOpacity style={styles.item} onPress={replacePhoto}>
          <Text style={styles.text}>Replace photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            const removed = imagesUrl.splice(editIndex, 1);
            imagesUrl.unshift(removed[0]);
            setImagesUrl([...imagesUrl]);
            hide();
          }}>
          <Text style={styles.text}>Make main profile photo</Text>
        </TouchableOpacity>
        {editIndex !== 0 && (
          <TouchableOpacity
            style={styles.item}
            onPress={async () => {
              if (editIndex) {
                const array = [...imagesUrl];
                array.splice(editIndex, 1);
                setImagesUrl(array);
                hide();
              }
            }}>
            <Text style={[styles.text, styles.red]}>Delete</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.item, styles.lastItem]} onPress={hide}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#7070706B',
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    color: Colors.MainColor + 'F2',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
  },
  red: {
    color: Colors.delete + 'F2',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});

export default ImageMoreModal;
