import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Colors from '../../Utils/Colors';
import MoreModal from './MoreModal';

const EditPromptModal = ({card, editPrompt, deletePrompt, hide}) => {
  const navigation = useNavigation();

  const editItem = () => {
    hide();
    navigation.navigate('CreatePrompt', {item: editPrompt, card, edit: true});
  };

  const deleteItem = () => {
    hide();
    deletePrompt(card);
    // navigation.navigate('MyPrompt')
  };

  return (
    <MoreModal hide={hide}>
      <TouchableOpacity style={styles.item} onPress={editItem}>
        <Text style={styles.text}>Change answer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={deleteItem}>
        <Text style={[styles.text, styles.red]}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item, styles.lastItem]} onPress={hide}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
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

export default EditPromptModal;
