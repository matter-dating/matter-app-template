import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';
import HearthIcon from '../../Assets/Svg/HearthIcon';
import EndIcon from '../../Assets/Svg/EndIcon';

import {S3_MAIN_URL} from '../../Utils/Constants';
import {useAppContent} from '../../Providers/AppContentProvider';

const screenWidth = Math.round(Dimensions.get('window').width);

function EndHappyHourModal({route}) {
  const navigation = useNavigation();
  const {blindMatches} = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const {latestHappyHour} = useAppContent();

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

  const renderNextSchedule = () => {
    if (
      latestHappyHour !== undefined &&
      latestHappyHour !== null &&
      latestHappyHour.isValid() &&
      latestHappyHour.status === 'scheduled'
    ) {
      return (
        <Text style={styles.schedule}>
          Next Happy Hour is on{' '}
          {dayjs(latestHappyHour.start_time).format('dddd / MMM, D')}
        </Text>
      );
    }
  };

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, bottom: slideBottom}]}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          {blindMatches.length > 0 && (
            <Text style={styles.title}>Happy Hour ended</Text>
          )}
        </View>
        <View style={styles.body}>
          {blindMatches.length > 0 ? (
            <View style={styles.list}>
              <View style={styles.imgBox}>
                <CustomImage
                  style={styles.img}
                  source={{
                    uri: S3_MAIN_URL + blindMatches[0].other_user_id + '.jpg',
                  }}
                  // source={require('../../Assets/Image/startbutton.png')}
                />
                <View style={styles.icon}>
                  <HearthIcon
                    width={30}
                    active
                    height={30}
                    color={Colors.white}
                  />
                </View>
              </View>
              <Text style={styles.title1}>
                You got <Text style={styles.bold}>{blindMatches.length}</Text>{' '}
                match{blindMatches.length > 1 && 'es'}!
              </Text>
              {renderNextSchedule()}
            </View>
          ) : (
            <>
              <EndIcon width={83} height={107} />
              <Text style={styles.title1}>Happy Hour ended</Text>
              <Text style={styles.thank}>Thank you for your participation</Text>
            </>
          )}
        </View>
        <View style={styles.footer}>
          {blindMatches.length > 0 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat')}
              style={styles.button}>
              <HearthIcon width={20} height={20} color={Colors.white} />
              <CustomText.TitleText style={styles.buttonText}>
                Go to chat
              </CustomText.TitleText>
            </TouchableOpacity>
          ) : (
            renderNextSchedule()
          )}
          <TouchableOpacity
            style={[
              styles.cancelButton,
              blindMatches.length === 0 && styles.button1,
            ]}
            onPress={() => navigation.navigate('Home')}>
            <CustomText.TitleText style={styles.cancelText}>
              Exit Happy Hour
            </CustomText.TitleText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.MainColor,
  },
  safe: {
    flex: 1,
  },
  title: {
    lineHeight: 24,
    fontSize: 17,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
  },
  title1: {
    lineHeight: 40,
    fontSize: 20,
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 20,
    marginBottom: 12,
  },
  thank: {
    lineHeight: 24,
    fontSize: 15,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
  },
  description: {
    fontSize: 16,
    color: AppColors.AppBlack,
    lineHeight: 21,
    marginBottom: 18,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  winner: {
    fontSize: 14,
    color: AppColors.AppBlack,
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  bold: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.MainColor1 + 'B8',
  },
  body: {
    alignItems: 'center',
  },
  row: {
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    marginBottom: 8,
    width: screenWidth - 64,
    marginHorizontal: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    height: 48,
    borderColor: AppColors.white,
    borderWidth: 2,
  },
  button1: {
    marginBottom: 40,
    width: screenWidth - 64,
    marginHorizontal: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    height: 48,
    borderColor: AppColors.white,
    borderWidth: 2,
  },
  buttonText: {
    color: Colors.white,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 9,
  },
  cancelButton: {
    height: 48,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: screenWidth - 64,
    marginHorizontal: 51,
  },
  cancelText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  list: {
    alignItems: 'center',
  },
  img: {
    width: 110,
    borderRadius: 100,
    height: 110,
  },
  imgBox: {
    marginBottom: 8,
    borderWidth: 3,
    borderColor: AppColors.white,
    borderRadius: 100,
  },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  schedule: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    marginBottom: 34,
    color: AppColors.white + 'CC',
  },
});

export default EndHappyHourModal;
