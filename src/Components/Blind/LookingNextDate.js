import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import AppColors from '../../Utils/AppColors';
import PairOfHearts from '../../Assets/Svg/PairOfHearts';

const LookingNextDate = ({clickLeave}) => {
  const insets = useSafeArea();
  return (
    <View style={styles.wrap}>
      <View style={styles.empty} />
      <View style={styles.container}>
        <View style={styles.mb}>
          <View style={styles.icon}>
            <PairOfHearts width={76} height={49} color={AppColors.white} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.looking}>Searching for your pair</Text>
          <LottieView
            source={require('../../Assets/Animation/loader_white.json')}
            autoPlay
            loop
            style={styles.dot}
          />
        </View>
        <Text style={styles.might}>Please wait</Text>
        <Text style={styles.text}>We will notify you when you’re paired</Text>
      </View>
      <TouchableOpacity
        style={[styles.exit, {marginBottom: insets.bottom + 20}]}
        onPress={clickLeave}>
        <Text style={styles.exitText}>Exit Happy Hour</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.MainColor,
    justifyContent: 'space-between',
  },
  looking: {
    color: AppColors.white,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 6,
  },
  might: {
    color: AppColors.white,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  text: {
    color: AppColors.white,
    fontSize: 12,
    lineHeight: 19,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  exit: {
    alignItems: 'center',
    paddingTop: 30,
  },
  mb: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  dot: {
    marginTop: 0.5,
    width: 20,
  },
  empty: {
    padding: 30,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exitText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-medium',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LookingNextDate;
