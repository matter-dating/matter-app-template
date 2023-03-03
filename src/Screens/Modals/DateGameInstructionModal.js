import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import StarIcon from '../../Assets/Svg/StarIcon';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';

const DateGameInstructionModal = ({hide}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ModalBackground />
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.header}>
          <Text style={styles.title}>Quiz game</Text>
          <Text style={styles.point}>You both earn points!</Text>
          <TouchableOpacity style={styles.delete} onPress={hide}>
            <DeleteIcon color={AppColors.AppBlack} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.contain}>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              Play a multiple-choice general knowledge quiz game.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.text}>
              You both earn 5 points for every right answer.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.star}>
              <StarIcon width={20} height={20} color={'#FADC5D'} />
            </View>
            <Text style={styles.text}>
              If you accumulate <Text style={styles.bold}>300 points,</Text> you
              earn 1 week of{' '}
              <Text style={styles.bold}>FREE premium membership</Text>
            </Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    margin: 13,
    paddingBottom: 21,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 33,
    paddingTop: 23,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderColor: AppColors.MainColor,
  },
  delete: {
    position: 'absolute',
    top: 13,
    right: 11,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + 'F5',
    lineHeight: 28,
    marginBottom: 6,
  },
  point: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'F5',
    lineHeight: 20,
  },
  contain: {
    paddingHorizontal: 19,
    paddingTop: 25,
  },
  row: {
    marginBottom: 24,
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: AppColors.MainColor,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 11,
    marginTop: 4,
  },
  star: {
    width: 20,
    height: 20,
    marginLeft: 11,
    marginRight: 7,
    marginTop: 4,
  },
  text: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'F5',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
});

export default DateGameInstructionModal;
