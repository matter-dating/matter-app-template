import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import EndGameModal from '../../Screens/Modals/EndGameModal';
import DateGameSingleQuestion from './DateGameSingleQuestion';
import DateGameEnd from './DateGameEnd';
import {useAuth} from '../../Providers/AuthProvider';

const {height: screenHeight} = Dimensions.get('window');
const DateGame = ({
  endGame,
  forceEndGame,
  questions,
  currentPoint,
  setCurrentPoint,
  submitState,
  nextState,
  selectedState,
  sendSubmit,
  sendNext,
  isEnd,
  setIsEnd,
  sendSelected,
}) => {
  const {user, userInvitation, updateInvitationProperty} = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [timer, setTimer] = useState(3);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [sureExitModal, setSureExitModal] = useState(false);

  const questionFade = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    if (questions.length > 0 && timer === 0) {
      setIsReady(true);
      setCurrentQuestion(questions[currentQuestionId]);
    }
  }, [questions, currentQuestionId, timer]);

  useEffect(() => {
    if (!!currentQuestion) {
      setCorrectAnswer(currentQuestion.correct_answer);
      Animated.timing(questionFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(slideBottom, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      // console.log(currentQuestionId, currentQuestion.correct_answer);
    }
  }, [currentQuestion]);

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (nextState !== '') {
      // console.log('currentQuestion', currentQuestionId, submitted);
      if (submitted) {
        if (currentQuestionId < 4) {
          Animated.timing(questionFade, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
          Animated.timing(slideBottom, {
            toValue: -200,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            setSubmitted(false);
            setCurrentQuestionId(currentQuestionId + 1);
            setSelected(null);
          });
        } else {
          setIsEnd(true);
        }
      } else if (!!selected) {
        submitAnswer();
      } else if (currentQuestionId === 4) {
        setIsEnd(true);
      }
    }
  }, [nextState]);

  useEffect(() => {
    if (submitState !== '') {
      setSubmitted(true);
      if (selected === correctAnswer) {
        setCurrentPoint(currentPoint + 1);
        updateInvitationProperty(
          userInvitation[0],
          'game_score',
          userInvitation[0].game_score + 5,
        );
      }
      user.callFunction('updateQuestionHistory', [
        currentQuestion._id.toString(),
      ]);
    }
  }, [submitState]);

  useEffect(() => {
    if (selectedState !== '') {
      setSelected(selectedState);
    }
  }, [selectedState]);

  const nextQuestion = () => {
    if (submitted) {
      if (currentQuestionId < 4) {
        Animated.timing(questionFade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(slideBottom, {
          toValue: -200,
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          setSubmitted(false);
          setCurrentQuestionId(currentQuestionId + 1);
          setSelected(null);
        });
        sendNext();
      } else {
        setIsEnd(true);
        sendNext();
      }
    } else if (!!selected) {
      submitAnswer();
    } else if (currentQuestionId === 4) {
      setIsEnd(true);
    }
  };

  const submitAnswer = async () => {
    setSubmitted(true);
    if (selected === correctAnswer) {
      setCurrentPoint(currentPoint + 1);
      if ((userInvitation[0].game_score + 5) % 300 === 0) {
        await user.callFunction('earnPromo', [
          userInvitation[0].game_score + 5,
        ]);
      }
      updateInvitationProperty(
        userInvitation[0],
        'game_score',
        userInvitation[0].game_score + 5,
      );
    }
    sendSubmit();
    await user.callFunction('updateQuestionHistory', [
      currentQuestion._id.toString(),
    ]);
  };

  const clickClose = () => {
    endGame();
  };

  const hideModal = () => {
    setSureExitModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.delete}>
            <Text style={styles.count}>
              {!!currentQuestionId ? currentQuestionId + 1 : '1'}/5
            </Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>Earned points</Text>
            <Text style={styles.point}>{currentPoint * 5}</Text>
          </View>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              if (isEnd) {
                clickClose();
              } else {
                setSureExitModal(true);
              }
            }}>
            <DeleteIcon color={AppColors.MainColor} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.contain}>
          {!isReady ? (
            <View style={styles.timerWrap}>
              <Text style={styles.timer}>{timer}</Text>
            </View>
          ) : isEnd ? (
            <DateGameEnd point={currentPoint} clickClose={clickClose} />
          ) : (
            <Animated.View
              style={[
                styles.flex,
                {opacity: questionFade, bottom: slideBottom},
              ]}>
              <DateGameSingleQuestion
                currentQuestion={currentQuestion}
                nextQuestion={nextQuestion}
                submitted={submitted}
                correctAnswer={correctAnswer}
                selected={selected}
                setSelected={(value) => {
                  setSelected(value);
                  sendSelected(value);
                }}
              />
            </Animated.View>
          )}
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={sureExitModal}>
        <EndGameModal hide={hideModal} endGame={forceEndGame} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderRadius: 14,
    marginHorizontal: 26,
    paddingVertical: screenHeight > 700 ? 17 : 7,
    marginBottom: screenHeight > 700 ? 27 : 17,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  count: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 25,
    color: AppColors.AppBlack + '8A',
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'CC',
    lineHeight: 18,
    marginBottom: 4,
  },
  point: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 35,
  },
  center: {
    alignItems: 'center',
  },
  contain: {
    paddingHorizontal: 28,
    flex: 1,
  },
  timerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    color: AppColors.MainColor,
  },
});

export default DateGame;
