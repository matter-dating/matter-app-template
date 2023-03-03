import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';

const DateModal = ({birthDate, setBirthDate, setDateModalVisible}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const [slideBottom] = useState(new Animated.Value(-100));

  var now = new Date();
  const [date, setDate] = useState(birthDate);

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
  }, [setDateModalVisible]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const selectDate = () => {
    setBirthDate(date);
    setDateModalVisible(false);
  };
  const offset = new Date().getTimezoneOffset() * -1;

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity
        style={styles.bg}
        onPress={() => setDateModalVisible(false)}
      />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
            paddingBottom: insets.bottom,
          },
        ]}>
        <View style={styles.dragitem} />
        <View style={styles.gapless}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => setDateModalVisible(false)}>
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Date of birth</Text>
            <TouchableOpacity onPress={selectDate}>
              <Text style={styles.close}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>
            <DateTimePicker
              testID="dateofBirth"
              value={date}
              mode={'date'}
              timeZoneOffsetInMinutes={offset}
              textColor={Colors.MainColor}
              minimumDate={
                new Date(new Date().setFullYear(now.getFullYear() - 100))
              }
              maximumDate={now}
              // maximumDate={new Date(new Date().setFullYear(now.getFullYear() - 18))}
              display="spinner"
              onChange={onChange}
            />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    paddingBottom: 10,
    paddingVertical: 11,
    paddingHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  wrapper: {
    backgroundColor: '#F5F5F5',
  },
  title: {
    color: Colors.MainColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  close: {
    fontSize: 14,
    color: Colors.MainColor,
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  dragitem: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    left: '50%',
    marginLeft: -25,
    position: 'absolute',
    top: -16,
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 'auto',
    left: 0,
    elevation: 3,
    zIndex: 3,
  },
  gapless: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default DateModal;
