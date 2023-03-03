import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';
import AddIcon from '../../Assets/Svg/AddIcon';

const EditHobbie = ({userCards, stopIntroPlayer}) => {
  const navigation = useNavigation();
  const [hobbyCard, setHobbyCard] = useState(
    userCards.filter((c) => c.type === 'hobby'),
  );

  useEffect(() => {
    setHobbyCard(userCards.filter((c) => c.type === 'hobby'));
  }, [userCards]);
  return (
    <View style={styles.outer}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Hobbies</Text>
        <Text style={[hobbyCard.length > 0 ? styles.text : styles.emptyText]}>
          {hobbyCard.length > 0
            ? hobbyCard[0].content
              ? hobbyCard[0].content
              : 'Add your hobbies'
            : 'Add your hobbies'}
        </Text>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => {
            stopIntroPlayer();
            navigation.navigate('CreateHobbies');
          }}>
          {hobbyCard.length > 0 ? (
            <EditIcon
              width={18}
              height={18}
              color={AppColors.AppBlack + 'CC'}
            />
          ) : (
            <AddIcon width={17} height={17} color={AppColors.AppBlack + 'B3'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    zIndex: 1000,
    elevation: 100,
  },
  item: {
    paddingBottom: 50,
    paddingTop: 25,
    paddingHorizontal: 16,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemTitle: {
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
  emptyText: {
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 25,
    color: AppColors.AppBlack + 'CC',
    fontSize: 14,
  },
  edit: {
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

export default EditHobbie;
