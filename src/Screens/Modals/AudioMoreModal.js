import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from '../../Assets/Package/react-native-toast-message';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import MoreModal from './MoreModal';
import AddIcon from '../../Assets/Svg/AddIcon';
import {useAuth} from '../../Providers/AuthProvider';
import {logVoiceIntroDeleted} from '../../Utils/Analytics';

const AudioMoreModal = ({hide, card, callBack}) => {
  const navigation = useNavigation();
  const {deleteCard} = useAuth();

  const deleteItem = () => {
    hide();
    deleteAudio();
  };

  const deleteAudio = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'Your audio intro',
      text2: 'is deleted',
      topOffset: 0,
      visibilityTime: 2000,
    });
    logVoiceIntroDeleted();
    deleteCard(card);
  };

  return (
    <MoreModal hide={hide}>
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            hide();
            navigation.navigate('AddVoiceIntro', {callBack});
          }}>
          <AddIcon width={16} height={16} color={AppColors.IconColor + 'F2'} />
          <Text style={styles.text}>Change your voice intro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={deleteItem}>
          <Text style={[styles.text, styles.red]}>Delete</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Colors.MainColor + 'F2',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
    marginHorizontal: 8,
  },
  red: {
    color: Colors.delete + 'F2',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
});

export default AudioMoreModal;
