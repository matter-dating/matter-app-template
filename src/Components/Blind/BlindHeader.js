import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import SwitchWithIcons from 'react-native-switch-with-icons';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../../Utils/AppColors';

import SureReportModal from '../../Screens/Modals/SureReportModal';
import MusicIcon from '../../Assets/Image/bg_music.png';
// import {useAppContent} from '../../Providers/AppContentProvider';

const BlindHeader = ({
  bgMute,
  toggleBg,
  extended,
  otherUserInfo,
  showReportModal,
  isGame,
  speakEasy,
}) => {
  const [sureReportVisible, setSureReportVisible] = useState(false);
  const insets = useSafeArea();
  const hideModal = () => {
    setSureReportVisible(false);
  };
  return (
    <View style={[styles.header, {paddingTop: insets.top + 8}]}>
      <View style={styles.empty}>
        <SwitchWithIcons
          icon={{true: MusicIcon, false: MusicIcon}}
          value={!bgMute}
          onValueChange={toggleBg}
          iconColor={{true: 'rgb(92, 196, 227)', false: 'rgb(227, 92, 92)'}}
          trackColor={{
            true: 'rgb(92, 196, 227)',
            false: 'rgb(187, 194, 204)',
          }}
          thumbColor={{
            true: 'rgb(255, 255, 255)',
            false: 'rgb(255, 255, 255)',
          }}
        />
        {!isGame && <Text style={styles.text}>Music</Text>}
      </View>
      {!isGame && (
        <View>
          <Text
            style={[styles.title, speakEasy && styles.speakeasyTitle]}
            numberOfLines={1}>
            {speakEasy
              ? speakEasy.speakeasy_name
              : extended.current === true
              ? 'Extended Audio Date'
              : 'Audio Date'}
          </Text>
          <Text style={styles.sayHi}>Say Hi to your date</Text>
        </View>
      )}
      <View style={styles.empty}>
        {otherUserInfo && (
          <TouchableOpacity
            onPress={() => {
              setSureReportVisible(true);
            }}>
            <Text style={styles.report}>Report</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Sure Report Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={sureReportVisible}>
        <SureReportModal
          name={otherUserInfo && otherUserInfo.first_name}
          hide={hideModal}
          showReportModal={showReportModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 22,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  empty: {
    marginTop: 3,
    width: 53,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 17,
    textAlign: 'center',
    color: AppColors.AppBlack + '8A',
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    lineHeight: 23,
    color: AppColors.MainColor1,
    marginTop: 34,
    textAlign: 'center',
  },
  speakeasyTitle: {
    fontFamily: 'BarBoothAtMatts',
    fontSize: 21,
  },
  sayHi: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    lineHeight: 19,
    color: AppColors.AppBlack + '8A',
    marginTop: 8,
    textAlign: 'center',
  },
  report: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    textAlign: 'right',
    color: AppColors.MainColor1 + 'CC',
  },
});

export default BlindHeader;
