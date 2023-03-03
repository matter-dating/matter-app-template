import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import Colors from '../../Utils/Colors';
import CustomText from '../../Components/Common/Text';
import AppColors from '../../Utils/AppColors';
import MoreModal from './MoreModal';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

const SelectPromptModal = (props) => {
  const clickItem = (item) => {
    props.setQuestion(item.question);
    props.hide();
  };

  const renderSingle = (item, index) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          props.question === item.question && styles.activeItem,
        ]}
        key={item._id}
        onPress={() => clickItem(item)}>
        <CustomText.RegularText style={styles.question}>
          {item.question}
        </CustomText.RegularText>
      </TouchableOpacity>
    );
  };

  return (
    <MoreModal hide={props.hide}>
      <View style={styles.header}>
        <View style={styles.empty} />
        <Text style={styles.title}>Selec a prompt</Text>
        <TouchableOpacity onPress={props.hide}>
          <DeleteIcon
            width={20}
            height={20}
            color={AppColors.MainColor1 + 'CC'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {props.questions.map((item, index) => renderSingle(item, index))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={props.hide}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.MainColor1 + '52',
    padding: 17,
    justifyContent: 'space-between',
  },
  empty: {
    width: 20,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginTop: 6,
  },
  body: {
    position: 'relative',
  },
  footer: {
    paddingHorizontal: 47,
    paddingTop: 41,
  },
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor + '7A',
    paddingVertical: 26,
    paddingHorizontal: 22,
  },
  activeItem: {
    backgroundColor: AppColors.MainColor + '8A',
  },
  question: {
    lineHeight: 21,
    fontSize: 14,
  },

  button: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.white,
  },
});

export default SelectPromptModal;
