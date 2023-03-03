/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import AppColors from '../../Utils/AppColors';

const FeedBackNoteModal = ({note, setNote, sendLike, likeLoader}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;

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
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, bottom: slideBottom}]}>
      <View style={styles.absolute} />
      <View style={styles.content}>
        <View style={styles.wrap}>
          <Text style={styles.title}>Leave a reminder note for yourself</Text>
          <View style={styles.inputContent}>
            <TextInput
              value={note}
              style={styles.input}
              onChangeText={(text) => setNote(text)}
              multiline={false}
              numberOfLines={1}
              placeholderTextColor={AppColors.AppBlack + '7A'}
              placeholder={'Ex: Talked about travel to Yosemite'}
              returnKeyType="done"
              blurOnSubmit={true}
              maxLength={150}
            />
            <Text style={styles.only}>
              * This note is only visible to you *
            </Text>
          </View>
          <TouchableOpacity style={styles.continue} onPress={() => sendLike()}>
            {likeLoader ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Save & continue</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.continue, styles.noBorder]}
            onPress={() => sendLike()}>
            {likeLoader ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={[styles.buttonText, styles.underLine]}>
                Skip & continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  wrap: {
    backgroundColor: AppColors.MainColor,
    paddingHorizontal: 31,
    borderRadius: 8,
    paddingTop: 53,
  },
  title: {
    color: AppColors.white,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 21,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  inputContent: {
    padding: 20,
    paddingBottom: 11,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    marginBottom: 28,
    paddingTop: 5,
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: AppColors.AppBlack + '73',
    fontSize: 14,
    marginBottom: 8,
    padding: 12,
  },
  only: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-LightItalic',
    color: AppColors.AppBlack + '8A',
  },
  continue: {
    backgroundColor: AppColors.MainColor,
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: 20,
    borderColor: AppColors.white,
    borderWidth: 1,
  },
  noBorder: {
    borderWidth: 0,
  },
  buttonText: {
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.white,
    marginLeft: 9,
    textAlign: 'center',
  },
  underLine: {
    textDecorationLine: 'underline',
  },
});

export default FeedBackNoteModal;
