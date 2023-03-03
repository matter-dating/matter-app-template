import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Colors from '../../Utils/Colors';

import MuteIcon from '../../Assets/Svg/MuteIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import SpeakerIcon from '../../Assets/Svg/SpeakerIcon';
import UnSpeakerIcon from '../../Assets/Svg/UnSpeakerIcon';

const BlindFooter = ({
  setSureLeaveModal,
  clickLeave,
  mute,
  toggleMute,
  toggleSpeaker,
  otherUserInfo,
  speaker,
}) => {
  const insets = useSafeArea();
  return (
    <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
      <TouchableOpacity
        style={styles.leave}
        onPress={() =>
          otherUserInfo ? setSureLeaveModal(true) : clickLeave()
        }>
        <Text style={styles.leaveText}>Leave</Text>
      </TouchableOpacity>
      <View style={styles.shadow}>
        <TouchableOpacity
          style={[styles.button, mute && styles.mute]}
          onPress={toggleMute}>
          {mute ? (
            <MuteIcon width={14} height={19} color={Colors.white} />
          ) : (
            <VoiceIcon width={14} height={19} color={Colors.MainColor} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.shadow}>
        <TouchableOpacity style={styles.button} onPress={toggleSpeaker}>
          {speaker ? (
            <SpeakerIcon width={21} height={19} color={Colors.MainColor} />
          ) : (
            <UnSpeakerIcon width={21} height={19} color={Colors.MainColor} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leave: {
    backgroundColor: Colors.leave,
    borderRadius: 6,
    paddingHorizontal: 48,
    alignItems: 'center',
    paddingVertical: 15,
    marginRight: 'auto',
  },
  leaveText: {
    color: Colors.leaveText,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  shadow: {
    elevation: 0,
    backgroundColor: Colors.white + 'CC',
    marginHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white + 'CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mute: {
    backgroundColor: Colors.mute + 'CC',
  },
});

export default BlindFooter;
