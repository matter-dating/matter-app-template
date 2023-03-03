import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {Picker} from '@react-native-community/picker';

import Colors from '../../Utils/Colors';

const PhoneModal = ({
  phones,
  phonePrefix,
  setPhoneModalVisible,
  setPhonePrefix,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const [slideBottom] = useState(new Animated.Value(-100));
  const [code, setCode] = useState(phonePrefix.dial_code);

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

  const clickDone = () => {
    setPhonePrefix(phones.find((country) => country.dial_code === code));
    setPhoneModalVisible(false);
  };

  const renderItems = () => {
    return (
      <Picker
        selectedValue={code}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCode(itemValue)}>
        {phones.map((g, index) => {
          return (
            <Picker.Item
              key={index}
              label={g.flag + ' ' + g.name + ' ' + g.dial_code}
              value={g.dial_code}
            />
          );
        })}
      </Picker>
    );
  };
  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity
        style={styles.bg}
        onPress={() => setPhoneModalVisible(false)}
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
            <TouchableOpacity onPress={() => setPhoneModalVisible(false)}>
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clickDone}>
              <Text style={styles.close}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapper}>{renderItems()}</View>
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
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  close: {
    fontSize: 14,
    color: Colors.MainColor,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: Colors.bg,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  wrapper: {
    backgroundColor: '#F5F5F5',
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
    top: -16,
    position: 'absolute',
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

export default PhoneModal;
