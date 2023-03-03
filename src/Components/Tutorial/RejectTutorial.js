import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

const RejectTutorial = () => {
  const insets = useSafeArea();
  const bottomValue = insets.bottom > 12 ? insets.bottom + 62 : 74;
  return (
    <View style={[styles.reject, {bottom: bottomValue}]}>
      <View style={styles.button}>
        <DeleteIcon width={20} height={20} color={AppColors.white} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reject: {
    borderRadius: 30,
    left: 30,
    bottom: 100,
    width: 50,
    height: 50,
    zIndex: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 1,
    backgroundColor: AppColors.MainColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.22,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RejectTutorial;
