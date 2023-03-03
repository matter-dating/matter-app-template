import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import AppColors from '../../Utils/AppColors';
import CoffeeIcon from '../../Assets/Svg/CoffeeIcon';
import DateGameInstructionModal from '../../Screens/Modals/DateGameInstructionModal';
import {logQuizTips} from '../../Utils/Analytics';

const {height: screenHeight} = Dimensions.get('window');
const DateGameMessage = ({startGame, point, isEnd}) => {
  const [tipVisible, setTipVisible] = useState(false);

  const hideModal = () => {
    setTipVisible(false);
  };

  return (
    <View style={styles.wrap}>
      {isEnd ? (
        <View style={styles.container}>
          {point > 0 ? (
            <>
              <Image
                style={styles.img}
                source={require('../../Assets/Image/confetti.png')}
              />
              <Text style={styles.great}>Great job!</Text>
              <Text style={styles.text1}>
                You both earned{' '}
                <Text style={styles.bold}>{point * 5} points</Text>
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.icon1}>😊 </Text>
              <Text style={styles.text}>Better luck next time</Text>
              <Text style={styles.text2}>
                You both haven’t earned any points
              </Text>
            </>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.helpWrap}
            onPress={() => {
              setTipVisible(true);
              logQuizTips();
            }}>
            <View style={styles.help}>
              <Text style={styles.helpText}>?</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.title}>
            Play a multiple choice quiz game to spice up your date!
          </Text>
          <TouchableOpacity
            activeOpacity={point < 0 && 0.6}
            style={[styles.startButton, point < 0 && styles.disable]}
            onPress={() => {
              if (point >= 0) {
                startGame();
              }
            }}>
            <Text style={styles.start}>Start</Text>
            <Text style={styles.icon}>🎉</Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <Text style={styles.talk}>Or just talk</Text>
            <CoffeeIcon
              color={AppColors.AppBlack + '91'}
              width={18}
              height={10}
            />
          </View>
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <DateGameInstructionModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingTop: 19,
    paddingBottom: screenHeight > 700 ? 42 : 21,
    paddingHorizontal: screenHeight > 700 ? 42 : 21,
    backgroundColor: AppColors.white,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: AppColors.AppBlack,
    lineHeight: 20,
    fontSize: 13,
  },
  startButton: {
    backgroundColor: '#D0EDF4',
    borderRadius: 20,
    height: 40,
    width: 214,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: screenHeight > 700 ? 31 : 10,
    flexDirection: 'row',
  },
  start: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 40,
    color: AppColors.AppBlack,
  },
  icon: {
    marginLeft: 8,
    fontSize: 13,
    lineHeight: 40,
  },
  icon1: {
    marginBottom: 11,
    fontSize: 40,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  talk: {
    fontSize: 12,
    lineHeight: 17,
    marginRight: 7,
    color: AppColors.AppBlack + '75',
  },
  helpWrap: {
    marginBottom: screenHeight > 700 ? 40 : 5,
    marginLeft: 'auto',
    marginRight: screenHeight > 700 ? -28 : 0,
  },
  disable: {
    opacity: 0.6,
  },
  helpText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'D6',
  },
  help: {
    backgroundColor: '#DEEFF4',
    borderRadius: 17,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 52,
    height: 49,
    marginBottom: 8,
  },
  great: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + 'F5',
    marginBottom: 4,
  },
  text: {
    fontSize: screenHeight > 700 ? 20 : 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + 'F5',
    marginBottom: 4,
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  text1: {
    fontSize: screenHeight > 700 ? 17 : 14,
    lineHeight: 24,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    textAlign: 'center',
  },
});

export default DateGameMessage;
