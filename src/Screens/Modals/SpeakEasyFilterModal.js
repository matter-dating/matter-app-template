import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import {Picker} from '@react-native-community/picker';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

const SpeakEasyFilterModal = ({hide, gender, setGender}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const [selectGender, setSelectGender] = useState(gender);

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
      <Animated.View style={[styles.wrapper, {bottom: slideBottom}]}>
        <View style={styles.box}>
          <View style={styles.contain}>
            <View style={styles.header}>
              <View style={styles.close} />
              <Text style={styles.title}>My preference</Text>
              <TouchableOpacity onPress={hide} style={styles.close}>
                <DeleteIcon color={AppColors.AppBlack} width={20} height={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <Text style={styles.text}>Show me</Text>
              <Picker
                selectedValue={selectGender}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectGender(itemValue)
                }>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Everyone" value="everyone" />
              </Picker>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setGender(selectGender);
                  hide();
                }}>
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contain: {
    width: '100%',
    backgroundColor: AppColors.white,
    borderRadius: 24,
    shadowColor: AppColors.MainColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 17,
    borderBottomWidth: 0.2,
    borderColor: AppColors.AppBlack,
    height: 58,
    paddingTop: 9,
  },
  close: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 21,
    color: AppColors.MainColor1,
  },
  body: {
    paddingHorizontal: 44,
    paddingVertical: 24,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginHorizontal: 7,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: AppColors.MainColor1,
    marginBottom: 17,
  },
  picker: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    fontSize: 14,
    color: AppColors.IconColor + 'B3',
  },
});

export default SpeakEasyFilterModal;
