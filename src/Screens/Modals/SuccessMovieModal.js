import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import AppColors from '../../Utils/AppColors';
import CustomImage from '../../Components/Common/CustomImage';
import CheckIcon from '../../Assets/Svg/CheckAIcon';
import AlertModal from './AlertModal';

const SuccessMovieModal = ({
  clickHide,
  clickDone,
  selectedItem,
  type,
  isOnBoard,
}) => {
  return (
    <AlertModal hide={clickHide}>
      <View style={styles.box}>
        <Text style={styles.title}>
          {type === 'movie' ? 'Movie' : 'TV show'} added to your list
        </Text>
        <View style={styles.singleBook}>
          <View style={styles.imgWrap}>
            <CustomImage
              style={styles.img}
              source={{
                uri:
                  'https://image.tmdb.org/t/p/w500/' + selectedItem.poster_path,
              }}
            />
          </View>
          <View style={styles.row}>
            <Text numberOfLines={2} style={styles.movieTitle}>
              {type === 'movie' ? selectedItem.title : selectedItem.name}
            </Text>
            <CheckIcon color={AppColors.MainColor} width={21} height={16} />
          </View>
        </View>
        <View style={styles.column}>
          {!isOnBoard && (
            <TouchableOpacity style={styles.button} onPress={clickHide}>
              <Text style={styles.buttonText}>Add more</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.button, styles.bgButton]}
            onPress={clickDone}>
            <Text style={[styles.buttonText, styles.whiteText]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AlertModal>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 28,
    color: AppColors.AppBlack,
  },
  button: {
    borderRadius: 26,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 12,
    borderWidth: 0.5,
    borderColor: AppColors.AppBlack,
  },
  bgButton: {
    borderColor: AppColors.MainColor,
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
  whiteText: {
    color: AppColors.white,
  },
  imgWrap: {
    alignItems: 'center',
  },
  img: {
    width: 125,
    height: 180,
    borderRadius: 4,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 16,
    marginHorizontal: 7,
    color: AppColors.MainColor1,
  },
});

export default SuccessMovieModal;
