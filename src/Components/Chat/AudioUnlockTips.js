import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AppColors from '../../Utils/AppColors';

const AudioUnlockTips = () => {
  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <Text style={styles.text}>
          Texting will be unlocked after you send your first voice message.
        </Text>
      </View>
      <View style={styles.triangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    alignItems: 'center',
  },
  box: {
    maxWidth: 260,
    backgroundColor: '#EDF5F8',
    borderRadius: 18,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  text: {
    color: AppColors.AppBlack,
    fontSize: 17,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
  },
  triangle: {
    width: 0,
    height: 0,
    left: '24%',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#EDF5F8',
    position: 'absolute',
    bottom: -18,
    zIndex: 111,
  },
});

export default AudioUnlockTips;
