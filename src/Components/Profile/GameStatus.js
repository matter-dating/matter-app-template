import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
} from 'react-native';

import AppColors from '../../Utils/AppColors';
import DateGameInstructionModal from '../../Screens/Modals/DateGameInstructionModal';
const {height: screenHeight} = Dimensions.get('window');

const GameStatus = ({stopIntroPlayer, userInvitation}) => {
  const [tipVisible, setTipVisible] = useState(false);

  const hideModal = () => {
    setTipVisible(false);
  };

  return (
    <View style={styles.body}>
      <View style={styles.row}>
        <View style={styles.wrap}>
          <Text style={styles.title} numberOfLines={1}>
            Your date quiz score
          </Text>
          {/* <TouchableOpacity>
            <Text style={styles.progress}>See your progress</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.scoreWrap}>
          {!!userInvitation[0].game_score && userInvitation[0].game_score > 0 && (
            <View style={styles.bg}>
              <Image
                style={styles.logoIcon}
                source={require('../../Assets/Image/startbutton.png')}
              />
            </View>
          )}
          <View style={styles.scoreBorder}>
            <Text style={styles.score}>
              {!!userInvitation[0].game_score
                ? userInvitation[0].game_score
                : 0}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.helpWrap}
          onPress={() => setTipVisible(true)}>
          <View style={styles.help}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <DateGameInstructionModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: AppColors.white,
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingLeft: 16,
    paddingRight: 6,
    borderRadius: 12,
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  wrap: {
    marginRight: 16,
    flex: 1,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 21,
    // marginBottom: 2,
  },
  scoreWrap: {
    width: screenHeight > 700 ? 60 : 40,
    height: screenHeight > 700 ? 60 : 40,
    borderRadius: 30,
    backgroundColor: '#9DCCDE',
    alignItems: 'center',
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  scoreBorder: {
    width: screenHeight > 700 ? 50 : 30,
    height: screenHeight > 700 ? 50 : 30,
    borderRadius: 25,
    borderColor: AppColors.white,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
  },
  progress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: AppColors.AppBlack,
    textDecorationLine: 'underline',
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoIcon: {
    width: screenHeight > 700 ? 60 : 40,
    height: screenHeight > 700 ? 60 : 40,
    borderRadius: 30,
  },
  helpWrap: {
    marginBottom: 'auto',
    marginLeft: 16,
    marginRight: 0,
    marginTop: -4,
  },
  helpText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#69ADC4',
  },
  help: {
    backgroundColor: '#DEEFF4',
    borderRadius: 17,
    width: screenHeight > 700 ? 30 : 20,
    height: screenHeight > 700 ? 30 : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GameStatus;
