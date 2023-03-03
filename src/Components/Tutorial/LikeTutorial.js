import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import AppColors from '../../Utils/AppColors';
import ItemLikeIcon from '../../Assets/Svg/ItemLikeIcon';

const screenWidth = Math.round(Dimensions.get('window').width);
const imgWidth = screenWidth - 24;
const imgHeight = (imgWidth / 3) * 4;

const LikeTutorial = () => {
  const insets = useSafeArea();
  return (
    <View style={[styles.like, {top: insets.top + (imgHeight - 45)}]}>
      <ItemLikeIcon width={23} height={23} color={AppColors.AppBlack + 'C2'} />
    </View>
  );
};

const styles = StyleSheet.create({
  like: {
    backgroundColor: AppColors.white,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    right: 30,
    zIndex: 110,
    position: 'absolute',
  },
});

export default LikeTutorial;
