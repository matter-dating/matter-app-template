import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {decode} from 'html-entities';
import AppColors from '../../Utils/AppColors';
import NextIcon from '../../Assets/Svg/NextIcon';

const {height: screenHeight} = Dimensions.get('window');
const DateGameSingleQuestion = ({
  currentQuestion,
  nextQuestion,
  submitted,
  correctAnswer,
  selected,
  setSelected,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (currentQuestion !== undefined && currentQuestion !== null) {
      let arr = [0, 1, 2, 3];
      arr = arr
        .map((value) => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
      let anss = currentQuestion.incorrect_answers;
      anss.push(currentQuestion.correct_answer);
      anss.sort();
      setAnswers(anss);
    }
  }, [currentQuestion]);

  const renderCorrectWrong = () => {
    if (selected === correctAnswer) {
      return 'Correct answer';
    }
    return 'Wrong answer';
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <View style={styles.contain}>
        <View style={styles.header}>
          <Text
            style={[
              styles.answer,
              selected === correctAnswer && styles.correct,
            ]}>
            {submitted ? renderCorrectWrong() : ' '}
          </Text>
          <Text style={styles.question}>
            {!!currentQuestion && decode(currentQuestion.question)}
          </Text>
        </View>
        <View style={styles.answers}>
          {answers.map((ans, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={submitted ? 1 : 0.82}
                style={[
                  styles.item,
                  selected === ans && styles.selectedItem,
                  submitted && correctAnswer === ans && styles.correctItem,
                  submitted &&
                    selected === ans &&
                    correctAnswer !== ans &&
                    styles.wrongItem,
                ]}
                onPress={() => !submitted && setSelected(ans)}>
                <Text style={styles.itemText}>{decode(ans)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={nextQuestion}
          style={[
            styles.submit,
            !!selected && styles.ready,
            submitted && styles.next,
          ]}>
          <Text style={styles.submitText}>
            {submitted ? 'See next question' : 'Submit answer'}
          </Text>
          <NextIcon width={12} height={12} color={AppColors.white} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: screenHeight > 700 ? 14 : 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'F5',
    lineHeight: screenHeight > 700 ? 20 : 18,
    marginVertical: screenHeight > 700 ? 12 : 6,
    textAlign: 'center',
  },
  answer: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: '#F84343',
  },
  correct: {
    color: '#11D875',
  },
  contain: {
    flex: 1,
    justifyContent: 'space-around',
  },
  submit: {
    borderRadius: 20,
    height: 36,
    backgroundColor: AppColors.MainColor + '7A',
    paddingHorizontal: 25,
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ready: {
    backgroundColor: AppColors.MainColor,
  },
  next: {
    backgroundColor: '#6491E4',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 12,
  },
  submitText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 36,
    marginRight: 6,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: screenHeight > 700 ? 10 : 5,
    paddingHorizontal: 30,
    borderRadius: 24,
    height: screenHeight > 700 ? 48 : 40,
    backgroundColor: '#E8F9FD',
  },
  selectedItem: {
    backgroundColor: '#9FE1F5',
  },
  correctItem: {
    backgroundColor: '#6FEAAD',
  },
  wrongItem: {
    backgroundColor: '#FF9696',
  },
  itemText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default DateGameSingleQuestion;
