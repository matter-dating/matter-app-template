import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

import AppColors from '../../Utils/AppColors';
import CustomImage from '../../Components/Common/CustomImage';
import CheckIcon from '../../Assets/Svg/CheckAIcon';
import AlertModal from './AlertModal';

const SuccessMusicModal = ({clickHide, clickDone, selectedItem, isOnBoard}) => {
  return (
    <AlertModal hide={clickHide}>
      <View style={styles.box}>
        <Text style={styles.title}>Song added to your playlist</Text>
        <View style={styles.singleMusic}>
          <CustomImage
            style={styles.img}
            source={{uri: selectedItem.album.images[0].url}}
          />
          <View style={styles.flex}>
            <Text numberOfLines={1} style={styles.songTitle}>
              {selectedItem.artists[0].name}
            </Text>
            <Text numberOfLines={1} style={styles.artist}>
              {selectedItem.name}
            </Text>
          </View>
          <CheckIcon color={AppColors.MainColor} width={21} height={16} />
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
    marginBottom: 16,
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
  singleMusic: {
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 16,
    backgroundColor: '#E8EDF8',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    width: 56,
    height: 48,
    borderRadius: 4,
    marginRight: 16,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 20,
  },
  songTitle: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    marginBottom: 2,
    color: AppColors.MainColor1 + 'CC',
  },
  artist: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: AppColors.MainColor1,
    lineHeight: 18,
  },
});

export default SuccessMusicModal;
