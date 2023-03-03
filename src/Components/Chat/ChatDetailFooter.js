import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import SendIcon from '../../Assets/Svg/SendIcon';

const ChatDetailFooter = ({
  isClick,
  setIsClick,
  clickSend,
  clickDelete,
  recordTime,
  setExpanded,
}) => {
  return (
    <View style={styles.wrapper}>
      {isClick && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              setExpanded(false);
              clickDelete();
            }}>
            <DeleteIcon color={AppColors.white} width={12} height={12} />
          </TouchableOpacity>
          <View style={styles.voice}>
            <View style={styles.button}>
              <LottieView
                // source={require('../../Assets/Animation/image.json')}
                source={require('../../Assets/Animation/voice.json')}
                autoPlay
                loop
                style={styles.wave}
              />
              <Text style={styles.time}>{recordTime}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.send}
            onPress={() => {
              setExpanded(false);
              clickSend(false);
            }}>
            <SendIcon color={AppColors.white} width={18} height={18} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
  },
  footer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wave: {
    width: '90%',
    flex: 1,
    overflow: 'hidden',
    marginLeft: 12,
    alignItems: 'center',
  },
  time: {
    marginHorizontal: 12,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: AppColors.black,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    flex: 1,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: AppColors.backgroundColor1,
  },
  voice: {
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    flex: 1,
    borderRadius: 8,
  },
  delete: {
    width: 37,
    height: 37,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E35C5C',
    marginRight: 12,
  },
  send: {
    width: 37,
    height: 37,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5CE3B9',
    marginLeft: 12,
  },
});

export default ChatDetailFooter;
