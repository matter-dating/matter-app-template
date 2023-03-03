import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Modal} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';

import AudioMoreModal from '../../Screens/Modals/AudioMoreModal';

const EditAudio = ({audioCard, stopIntroPlayer}) => {
  const navigation = useNavigation();
  const [editVisible, setEditVisible] = useState(false);

  const clickEditIcon = (index) => {
    stopIntroPlayer();
    setEditVisible(true);
  };

  const hideModal = () => {
    setEditVisible(false);
  };

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('NewProfile');
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={clickEditIcon}>
        <EditIcon width={20} height={20} color={AppColors.white} />
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={editVisible}>
        <AudioMoreModal
          card={audioCard[0]}
          hide={hideModal}
          callBack={ReturnVoiceCreateProfile}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
  },
});

export default EditAudio;
