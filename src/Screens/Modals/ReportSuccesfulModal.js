import React, {useState, useEffect, FunctionComponent} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

const ReportSuccesfulModal: FunctionComponent = (props) => {
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
      <TouchableOpacity style={styles.bg} onPress={props.hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.wrapper}>
          <View style={styles.modalBody}>
            <Text style={styles.text}>
              Report Succesful{'\n'}
              Thank you for reporting
            </Text>
          </View>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                props.hide();
                props.navigation.navigate('Home');
              }}>
              <Text style={styles.buttonText}>Okay, got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0009143D',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    // backgroundColor: Colors.white,
    borderRadius: 8,
    margin: 21,
  },
  modalBody: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 37,
    paddingBottom: 51,
  },
  modalFooter: {
    borderTopWidth: 0.5,
    borderColor: Colors.MainColor1 + 'A3',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 18,
    flex: 1,
    alignItems: 'center',
  },
  buttonBorder: {
    borderRightWidth: 0.5,
    borderColor: Colors.MainColor1 + 'A3',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.black + 'F2',
    lineHeight: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.black + 'F2',
    lineHeight: 20,
    fontSize: 13,
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: AppColors.black + 'F2',
    lineHeight: 20,
    fontSize: 13,
  },
});

export default ReportSuccesfulModal;
