import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {Picker} from '@react-native-community/picker';

import Colors from '../../Utils/Colors';
import genders from '../../Utils/Gender';

const SexModal = ({
  interest,
  gender,
  setGender,
  setInterest,
  modalTitle,
  modalType,
  setGenderModalVisible,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const [slideBottom] = useState(new Animated.Value(-100));
  const [seibetsu, setSeibetsu] = useState();
  useEffect(() => {
    if (modalType === 'looking') {
      setSeibetsu(interest);
    } else {
      setSeibetsu(gender);
    }
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
  }, [modalType]);

  const selectSex = () => {
    if (modalType === 'looking') {
      setInterest(seibetsu.toLowerCase());
    } else {
      setGender(seibetsu.toLowerCase());
    }
    setGenderModalVisible(false);
  };

  const renderItems = () => {
    if (modalType === 'all') {
      return (
        <Picker
          selectedValue={seibetsu}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSeibetsu(itemValue)}>
          <Picker.Item label="Select" value="" />
          {genders.map((g, index) => {
            return (
              <Picker.Item key={index} label={g} value={g.toLowerCase()} />
            );
          })}
        </Picker>
      );
    } else {
      return (
        <Picker
          selectedValue={seibetsu}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSeibetsu(itemValue)}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Everyone" value="everyone" />
        </Picker>
      );
    }
  };

  if (Platform.OS === 'ios') {
    return (
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <TouchableOpacity
          style={styles.bg}
          onPress={() => setGenderModalVisible(false)}
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
              <TouchableOpacity onPress={() => setGenderModalVisible(false)}>
                <Text style={styles.close}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.title}>{modalTitle}</Text>
              <TouchableOpacity onPress={selectSex}>
                <Text style={styles.close}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>{renderItems()}</View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  } else {
    return (
      <View style={styles.android}>
        <Text style={[styles.title, styles.androidTitle]}>{modalTitle}</Text>
        <View style={styles.wrapper}>{renderItems()}</View>
        <View style={[styles.headerWrapper, styles.androidHeaderWrapper]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setGenderModalVisible(false)}>
            <Text style={styles.close}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={selectSex}>
            <Text style={styles.close}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
  android: {
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  androidHeaderWrapper: {
    marginHorizontal: -8,
    paddingHorizontal: 0,
    backgroundColor: Colors.white,
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
  title: {
    textAlign: 'center',
    color: Colors.MainColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  androidTitle: {
    marginBottom: 16,
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

export default SexModal;
