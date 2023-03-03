/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, FunctionComponent} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AppColors from '../../Utils/AppColors';
import RefreshIcon from '../../Assets/Svg/RefreshIcon';
import ThumbIcon from '../../Assets/Svg/ThumbIcon';
const {height: screenHeight} = Dimensions.get('window');

const SuggestionTopic: FunctionComponent = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [fadeValue] = useState(new Animated.Value(0));
  const [rotateAnimation] = useState(new Animated.Value(0));
  const [category, setCategory] = useState(null);
  const [review, setReview] = useState('');
  const [questions, setQuestions] = useState(props.topics);
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * props.topics.length),
  );

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start(),
      );
    }, 1000);
  }, []);

  useEffect(() => {
    setReview('');
    if (category) {
      setQuestions(props.topics.filter((c) => c.category_slug === category));
    } else {
      setQuestions(props.topics);
    }
  }, [category]);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * questions.length));
  }, [questions]);

  const clickReview = (str) => {
    if (str === review) {
      setReview('');
      if (str === 'up') {
        props.voteTopic(questions[randomNumber], 'up_vote', -1);
      } else if (str === 'down') {
        props.voteTopic(questions[randomNumber], 'down_vote', -1);
      }
    } else {
      if (str === 'up') {
        props.voteTopic(questions[randomNumber], 'up_vote', 1);
      } else if (str === 'down') {
        props.voteTopic(questions[randomNumber], 'down_vote', 1);
      }
      if (review === 'up') {
        props.voteTopic(questions[randomNumber], 'up_vote', -1);
      } else if (review === 'down') {
        props.voteTopic(questions[randomNumber], 'down_vote', -1);
      }
      setReview(str);
    }
  };

  const clickRefresh = () => {
    setReview('');
    Animated.timing(fadeValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setRandomNumber(Math.floor(Math.random() * questions.length));
      rotateAnimation.setValue(0);
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const rotateInterpolate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const animatedStyles = {transform: [{rotate: rotateInterpolate}]};
  return (
    <View style={styles.wrap}>
      <View style={styles.users}>
        <View style={styles.flex}>
          <View style={styles.imgBox}>
            <Image
              style={[styles.img, !props.joined && styles.wait]}
              source={require('../../Assets/Image/me.png')}
            />
          </View>
          <Text style={[styles.name, !props.joined && styles.wait]}>
            {props.userData.first_name}
          </Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.imgBox}>
            <Image
              style={[styles.img]}
              source={require('../../Assets/Image/other.png')}
            />
            {!props.otherUserInfo && (
              <View style={styles.loader}>
                <LottieView
                  source={require('../../Assets/Animation/loader_white.json')}
                  autoPlay
                  loop
                  style={styles.disableTouch}
                />
              </View>
            )}
          </View>
          <Text style={styles.name}>
            {props.otherUserInfo
              ? props.otherUserInfo.first_name
              : 'Loading...'}
          </Text>
        </View>
      </View>
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <View style={styles.carousel}>
          <TouchableOpacity
            style={[styles.catItem, category === 'Fun' && styles.activeItem]}
            onPress={() =>
              category === 'Fun' ? setCategory(null) : setCategory('Fun')
            }>
            <Text style={styles.catName} numberOfLines={1}>
              Fun
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.catItem,
              category === 'Personality' && styles.activeItem,
            ]}
            onPress={() =>
              category === 'Personality'
                ? setCategory(null)
                : setCategory('Personality')
            }>
            <Text style={styles.catName} numberOfLines={1}>
              Personality Personality
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.catItem,
              category === 'Interest' && styles.activeItem,
            ]}
            onPress={() =>
              category === 'Interest'
                ? setCategory(null)
                : setCategory('Interest')
            }>
            <Text style={styles.catName} numberOfLines={1}>
              Interest
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Ice breaker:</Text>
          <Animated.Text style={[styles.topic, {opacity: fadeValue}]}>
            {!!questions[randomNumber] &&
              !!questions[randomNumber].question &&
              questions[randomNumber].question}
          </Animated.Text>
        </View>
        <View style={styles.center}>
          {!!questions[randomNumber] && !!questions[randomNumber].question && (
            <TouchableOpacity
              style={[styles.upDown, review === 'up' && styles.active]}
              onPress={() => {
                clickReview('up');
              }}>
              <ThumbIcon
                color={review === 'up' ? AppColors.white : AppColors.MainColor}
                width={15}
                height={15}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              clickRefresh();
            }}>
            <Animated.View style={[styles.refresh, animatedStyles]}>
              <RefreshIcon color={AppColors.MainColor} width={18} height={18} />
            </Animated.View>
          </TouchableOpacity>
          {!!questions[randomNumber] && !!questions[randomNumber].question && (
            <TouchableOpacity
              style={[
                styles.upDown,
                styles.down,
                review === 'down' && styles.active,
              ]}
              onPress={() => {
                clickReview('down');
              }}>
              <ThumbIcon
                color={
                  review === 'down' ? AppColors.white : AppColors.MainColor
                }
                width={15}
                height={15}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingTop: screenHeight > 700 ? 20 : 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 27,
    backgroundColor: AppColors.white,
    marginBottom: 46,
    alignItems: 'center',
    zIndex: 10,
  },
  innerContainer: {
    marginHorizontal: 28,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    color: AppColors.AppBlack + '8A',
    lineHeight: 19,
    fontSize: 13,
    marginBottom: 8,
  },
  topic: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    width: '100%',
    color: AppColors.AppBlack + 'F5',
    lineHeight: 20,
    minHeight: 40,
    fontSize: 14,
    marginBottom: 8,
  },
  carousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refresh: {
    backgroundColor: '#DEEFF4CC',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 28,
  },
  center: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  upDown: {
    backgroundColor: '#DEEFF4CC',
    width: 34,
    height: 34,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    backgroundColor: AppColors.MainColor,
  },
  down: {
    transform: [{rotate: '180deg'}],
  },
  catItem: {
    backgroundColor: '#F0F7F8',
    marginHorizontal: 8,
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    flex: 1,
  },
  activeItem: {
    backgroundColor: '#DFF3F8',
  },
  catName: {
    lineHeight: 19,
    fontSize: 13,
    textTransform: 'capitalize',
    color: AppColors.AppBlack + 'F5',
    fontFamily: 'Poppins-Medium',
  },
  users: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  imgBox: {
    backgroundColor: AppColors.white,
    padding: 3,
    borderRadius: 42,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 8,
  },
  img: {
    width: screenHeight > 700 ? 74 : 60,
    height: screenHeight > 700 ? 74 : 60,
    borderRadius: 37,
  },
});

export default SuggestionTopic;
