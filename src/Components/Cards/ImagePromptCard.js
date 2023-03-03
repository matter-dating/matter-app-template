import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
} from 'react-native';

import CustomImage from '../Common/CustomImage';
import ItemLike from '../Home/ItemLike';
import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';
import Toast from '../../Assets/Package/react-native-toast-message';
import {S3_PROMPT_URL} from '../../Utils/Constants';
import {useAuth} from '../../Providers/AuthProvider';
import EditPromptModal from '../../Screens/Modals/EditPromptModal';
import ImageModal from '../../Screens/Modals/ImageModal';

const screenWidth = Math.round(Dimensions.get('window').width);
const imgWidth = screenWidth - 24;
const imgHeight = (imgWidth / 3) * 4;

const ImagePromptCard = ({
  card,
  userInfo,
  likeContent,
  stopIntroPlayer,
  hideLike,
  isModal,
  setPass,
}) => {
  const imagePrompt = JSON.parse(card.content);
  const {userData, deleteCard} = useAuth();
  const [moreVisible, setMoreVisible] = useState(false);
  const [editPrompt, setEditPrompt] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const hideModal = () => {
    setEditPrompt(null);
    setMoreVisible(false);
    setModalVisible(false);
  };

  const clickEditIcon = (item) => {
    setEditPrompt(item);
    setMoreVisible(true);
  };

  const deletePrompt = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'Your prompt has been deleted',
      topOffset: 0,
      visibilityTime: 2000,
    });
    deleteCard(card);
  };

  const showModal = (i) => {
    setModalVisible(true);
  };

  return (
    <View>
      <View style={styles.outer}>
        <View style={styles.wrap}>
          <Text style={styles.title}>{imagePrompt.question}</Text>
          <TouchableOpacity activeOpacity={0.9} onPress={() => showModal(true)}>
            <CustomImage
              style={styles.img}
              source={{uri: S3_PROMPT_URL + imagePrompt.image + '.jpg'}}
            />
          </TouchableOpacity>
          <Text style={styles.text}>{imagePrompt.answer}</Text>
          {userInfo.user_id !== userData.user_id &&
            !userInfo.is_liked &&
            !hideLike && (
              <View style={styles.like}>
                <ItemLike
                  width={23}
                  height={23}
                  color={AppColors.AppBlack + 'C2'}
                  onPress={() => {
                    stopIntroPlayer && stopIntroPlayer();
                    if (!likeContent) {
                      setPass({
                        type: 'prompt',
                        isModal: isModal,
                        card: card,
                        target: userInfo,
                      });
                    } else {
                      setPass({
                        type: 'likeBack',
                        isModal: isModal,
                        likeContent: likeContent,
                        target: userInfo,
                      });
                    }
                  }}
                />
              </View>
            )}
          {userInfo.user_id === userData.user_id && (
            <View style={styles.like}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopIntroPlayer && stopIntroPlayer();
                  clickEditIcon(imagePrompt);
                }}>
                <EditIcon width={20} height={20} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditPromptModal
          card={card}
          editPrompt={editPrompt}
          deletePrompt={deletePrompt}
          hide={hideModal}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <ImageModal
          source={S3_PROMPT_URL + imagePrompt.image + '.jpg'}
          itemHeight={imgHeight}
          itemWidth={imgWidth}
          hideModal={hideModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
  },
  wrap: {
    paddingBottom: 50,
    paddingTop: 25,
    paddingHorizontal: 16,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
  },
  text: {
    marginTop: 12,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 25,
    color: AppColors.AppBlack + 'F5',
    fontSize: 16,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
    marginLeft: -17,
    marginVertical: 17,
  },
  like: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: 12,
    bottom: 12,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
  },
});

export default ImagePromptCard;
