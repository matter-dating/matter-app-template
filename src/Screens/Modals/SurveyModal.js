import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  Dimensions,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import PagerView from 'react-native-pager-view';
import {AirbnbRating} from 'react-native-ratings';

import AppColors from '../../Utils/AppColors';
import Survey from '../../Assets/Svg/Survey/Survey';
import Short from '../../Assets/Svg/Survey/Short';
import Long from '../../Assets/Svg/Survey/Long';
import Sure from '../../Assets/Svg/Survey/Sure';
import Smoothly from '../../Assets/Svg/Survey/Smoothly';
import Fine from '../../Assets/Svg/Survey/Fine';
import Issues from '../../Assets/Svg/Survey/Issues';
import Love from '../../Assets/Svg/Survey/Love';
import Worked from '../../Assets/Svg/Survey/Worked';
import {useAppFlag} from '../../Providers/AppFlagProvider';
import {useAuth} from '../../Providers/AuthProvider';

const {width: screenWidth} = Dimensions.get('window');

const SurveyModal = ({hide, leaveFunction}) => {
  const {user} = useAuth();
  const {setFlag} = useAppFlag();
  const [fadeAnim] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const [slideBottom] = useState(new Animated.Value(-100));
  const [page, setPage] = useState(0);
  const pagerRef = useRef(null);
  const [additional, setAdditional] = useState('');
  const [data, setData] = useState({});

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

  const handlePageChange = async (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
    setPage(pageNumber);
  };

  const ratingCompleted = (rating) => {
    setData({...data, rating});
    handlePageChange(page + 1);
  };

  const clickAnswer = (answer) => {
    setData({...data, duration: answer});
    handlePageChange(page + 1);
  };

  const clickAnswer2 = (answer) => {
    setData({...data, tech: answer});
    handlePageChange(page + 1);
  };

  const sendAnswer = () => {
    setData({...data, additional});
    user.callFunction('blindDateSurvey', [data]);
    setFlag('took_survey', 'true');
    hide();
    leaveFunction();
  };

  const doItLater = () => {
    setFlag('survey_do_it_later', 'true');
    hide();
    leaveFunction();
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <BlurView
        style={styles.bg}
        blurType="dark"
        blurAmount={100}
        reducedTransparencyFallbackColor="white"
      />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
            paddingBottom: insets.bottom,
          },
        ]}>
        <PagerView
          style={[styles.view, {marginTop: insets.top + 10}]}
          initialPage={0}
          ref={pagerRef}
          scrollEnabled={false}>
          <View style={styles.contain} key="0">
            <Text style={styles.question}>
              How was your Happy Hour experience?
            </Text>
            <Text style={styles.text}>Please rate from 1-5 stars</Text>
            <View style={styles.rate}>
              <AirbnbRating
                ratingCount={5}
                defaultRating={0}
                showRating={false}
                onFinishRating={ratingCompleted}
                style={styles.rating}
              />
              <View style={styles.row}>
                <Text style={styles.rateText}>Hated it</Text>
                <Text style={styles.rateText}>Loved it!</Text>
              </View>
            </View>
          </View>
          <View style={styles.contain} key="1">
            <Text style={styles.question}>
              What did you think about 3 min date length?
            </Text>
            <View style={styles.select}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer('I love 3 min length')}>
                <View style={styles.icon}>
                  <Love width={24} height={24} color={AppColors.white} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  I love 3 min length
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer('I think its too short')}>
                <View style={styles.icon}>
                  <Short width={24} height={24} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  I think its too short
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer('I think its too long')}>
                <View style={styles.icon}>
                  <Long width={30} height={30} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  I think its too long
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer('Not sure...')}>
                <View style={styles.icon}>
                  <Sure width={24} height={24} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  Not sure...
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contain} key="2">
            <View style={styles.title}>
              <Text style={[styles.question, styles.mb0]}>
                Did you have any technical difficulty?
              </Text>
              <Survey width={23} height={23} />
            </View>
            <View style={styles.select}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer2('Everything went smoothly')}>
                <View style={styles.icon}>
                  <Smoothly width={24} height={24} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  Everything went smoothly
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer2('Little bit, but it was fine')}>
                <View style={styles.icon}>
                  <Fine width={24} height={24} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  Little bit, but it was fine
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer2('I had multiple technical issues')}>
                <View style={styles.icon}>
                  <Issues width={24} height={24} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  I had multiple technical issues
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => clickAnswer2('Nothing worked ')}>
                <View style={styles.icon}>
                  <Worked width={24} height={24} />
                </View>
                <Text style={styles.text} numberOfLines={1}>
                  Nothing worked
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contain} key="3">
            <Text style={styles.question}>
              Do you want to add more feedback?
            </Text>
            <Text style={styles.text}>It helps us to know your opinion</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                value={additional}
                onChangeText={(text) => setAdditional(text)}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={AppColors.IconColor + 'CC'}
                placeholder="Enter comment here..."
                returnKeyType="done"
                blurOnSubmit={true}
              />
            </View>
            <TouchableOpacity onPress={sendAnswer} style={styles.send}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </PagerView>
        <View style={styles.pagination}>
          <View style={[styles.paginationDot, styles.activeDot]} />
          <View style={[styles.paginationDot, page >= 1 && styles.activeDot]} />
          <View style={[styles.paginationDot, page >= 2 && styles.activeDot]} />
          <View style={[styles.paginationDot, page >= 3 && styles.activeDot]} />
          {/* <View style={[styles.paginationDot, page === 4 && styles.activeDot]}/> */}
        </View>
        <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
          {page === 0 && (
            <TouchableOpacity
              onPress={doItLater}
              style={[styles.button, styles.skip]}>
              <Text style={styles.buttonText}>Do it later</Text>
            </TouchableOpacity>
          )}
          {page === 3 && (
            <TouchableOpacity onPress={sendAnswer} style={styles.button}>
              <Text style={styles.buttonText}>Nope, I'm done</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rating: {
    paddingVertical: 10,
  },
  innerContainer: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 50,
    height: 50,
  },
  button: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AppColors.white,
    width: '100%',
  },
  send: {
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    width: screenWidth - 100,
    backgroundColor: AppColors.MainColor,
    marginTop: 18,
  },
  sendText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  select: {
    marginHorizontal: 50,
    marginTop: 40,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: AppColors.white,
    width: screenWidth - 100,
  },
  icon: {
    marginLeft: 16,
    width: 38,
  },
  skip: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
  },
  pagination: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 40,
  },
  paginationDot: {
    width: 20,
    marginHorizontal: 2,
    height: 3,
    borderRadius: 12,
    backgroundColor: AppColors.button,
  },
  activeDot: {
    backgroundColor: '#29C778',
  },
  question: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  mb0: {
    marginBottom: 0,
    marginRight: 8,
  },
  text: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
    textAlign: 'center',
  },
  rate: {
    marginTop: 38,
  },
  inputWrap: {
    marginTop: 18,
    backgroundColor: AppColors.white,
    borderRadius: 12,
    padding: 14,
  },
  input: {
    height: 100,
    lineHeight: 21,
    fontSize: 16,
    width: screenWidth - 128,
    color: AppColors.AppBlack,
    textAlignVertical: 'top',
  },
  row: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateText: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
  },
});

export default SurveyModal;
