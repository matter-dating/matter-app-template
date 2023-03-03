import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import AppColors from '../../Utils/AppColors';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import PinIcon from '../../Assets/Svg/PinIcon';
import JobIcon from '../../Assets/Svg/JobIcon';
import EducationIcon from '../../Assets/Svg/EducationIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import CustomImage from '../Common/CustomImage';
import {logHappyHourAccept, logStartHappyHour} from '../../Utils/Analytics';

const {width: screenWidth} = Dimensions.get('window');
const WantDateThem = ({
  rtmEngine,
  currentStateRef,
  myAccept,
  setMyAccept,
  accept,
  otherUserInfo,
  otherUserRef,
  otherUserCards,
  engine,
  otherAgoraId,
  fillValue,
  togglePlay,
  currentVoice,
  isPlay,
  clickLeave,
  recordTime,
  setInstaleTime,
  declineDate,
  stopIntroPlayer
}) => {
  const insets = useSafeArea();
  const [page, setPage] = useState(0);
  const [timerCount, setTimer] = useState(45);

  const occupation =
    otherUserInfo.user_info['Credentials'] &&
    otherUserInfo.user_info['Credentials']['Occupation'];
  const school =
    otherUserInfo.user_info['Credentials'] &&
    otherUserInfo.user_info['Credentials']['School'];

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };
  const renderVerificationBadge = () => {
    if (otherUserInfo.is_photo_verified) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };

  const multiItem = (item) => {
    const obj = JSON.parse(item.value);
    let val = '';
    let first = true;
    Object.entries(obj).forEach(([key, value]) => {
      let sep = first ? '' : ', ';
      if (value !== '') {
        val += sep + value;
      }
      first = false;
    });
    return val;
  };

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

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <TouchableOpacity style={styles.back} onPress={() => clickLeave()}>
          <BackIcon width={24} height={24} color={AppColors.AppBlack} />
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.title}>Happy Hour</Text>
          <Text style={styles.text}>
            {currentStateRef.current.total_blind_dates -
              currentStateRef.current.blind_dates_left +
              1}{' '}
            / {currentStateRef.current.total_blind_dates}
          </Text>
        </View>
        <View style={styles.back} />
      </View>
      <View style={styles.container}>
        <View style={styles.photo}>
          <PagerView
            onPageScroll={onPageScroll}
            style={styles.viewPager}
            initialPage={0}>
            {otherUserInfo.profile_hd_images.map((image, index) => (
              <View key={index} style={styles.imgBox}>
                <CustomImage
                  style={styles.img}
                  source={{
                    uri: S3_PHOTO_URL + image + '.jpg',
                  }}
                />
                <View style={styles.imgDot} />
              </View>
            ))}
          </PagerView>
          <View style={styles.pagination}>
            {otherUserInfo.profile_hd_images.length > 1 &&
              otherUserInfo.profile_hd_images.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      page === index && styles.activeDot,
                    ]}
                  />
                );
              })}
          </View>
        </View>
        <View style={styles.nameWrap}>
          <Text style={styles.name} numberOfLines={1}>
            {otherUserInfo.first_name}
          </Text>
          {renderVerificationBadge()}
        </View>
        {/* {otherUserInfo.location_name && (
          <View style={styles.locationWrap}>
            <PinIcon width={14} height={14} color="#3F4853" />
            <Text style={styles.location} numberOfLines={1}>
              {otherUserInfo.location_name}
            </Text>
          </View>
        )} */}
        {occupation && (
          <View style={styles.locationWrap}>
            <JobIcon
              width={20}
              height={15}
              color={AppColors.MainColor + 'CC'}
            />
            <Text style={styles.value} numberOfLines={1}>
              {occupation && !!occupation.value && multiItem(occupation)}
            </Text>
          </View>
        )}
        {school && (
          <View style={styles.locationWrap}>
            <EducationIcon
              width={20}
              height={15}
              color={AppColors.MainColor + 'CC'}
            />
            <Text style={styles.value} numberOfLines={1}>
              {school && !!school.value && multiItem(school)}
            </Text>
          </View>
        )}
        {!!otherUserCards && otherUserCards.length > 0 && (
          <View style={styles.player}>
            <Text style={styles.voiceText}>Voice intro</Text>
            <View style={styles.playerRow}>
              <TouchableOpacity
                style={styles.play}
                onPress={() => {
                  togglePlay(
                    JSON.parse(otherUserCards[0].content).media,
                    JSON.parse(otherUserCards[0].content).duration * 1000,
                  );
                }}>
                {isPlay &&
                currentVoice === JSON.parse(otherUserCards[0].content).media ? (
                  <PauseIcon width={12} height={12} color={AppColors.white} />
                ) : (
                  <PlayIcon width={12} height={12} color={AppColors.white} />
                )}
              </TouchableOpacity>
              <View style={styles.bar}>
                <Animated.View
                  style={[
                    styles.progress,
                    {
                      width: widthAnimation,
                    },
                  ]}
                />
              </View>
            </View>
            <Text style={styles.time}>{recordTime}</Text>
          </View>
        )}
      </View>
      <View style={[styles.footer, {marginBottom: insets.bottom + 10}]}>
        <Text style={styles.want}>
          Go on an audio date with {otherUserInfo.first_name}?
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            styles.yes,
            myAccept.current === false && timerCount < 20 && styles.red,
          ]}
          onPress={() => {
            rtmEngine.current.sendMessageByChannelId(
              currentStateRef.current.agora_room_id,
              'ACCEPT',
            );
            logHappyHourAccept(
              currentStateRef.current.blind_date_group_id,
              otherUserInfo.user_id,
            );
            myAccept.current = true;
            setMyAccept(true);
            if (accept === true) {
              stopIntroPlayer();
              engine.current.muteRemoteAudioStream(otherAgoraId.current, false);
              setInstaleTime();
              logStartHappyHour(
                currentStateRef.current.blind_date_group_id,
                otherUserInfo.user_id,
              );
            }
          }}>
          {myAccept.current === false ? (
            <View style={styles.row}>
              <View style={styles.left} />
              <View style={styles.dotWrap}>
                <View style={styles.dot} />
                <Text style={styles.yesText}>Yes</Text>
              </View>
              <View style={styles.left}>
                <Text style={styles.secText}>
                  0:{('0' + timerCount).slice(-2)}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.waitWrap}>
              <Text style={styles.yesText}>Waiting for a response…</Text>
              <LottieView
                source={require('../../Assets/Animation/loader_white.json')}
                autoPlay
                loop
                style={styles.disableTouch}
              />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={declineDate}>
          <Text style={styles.decline}>Kindly decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'space-between',
  },
  decline: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
  button: {
    borderRadius: 28,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 23,
  },
  center: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  yes: {
    backgroundColor: AppColors.MainColor,
  },
  red: {
    backgroundColor: '#D65252',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 28,
  },
  dot: {
    backgroundColor: '#85FA85',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 7,
  },
  imgDot: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    backgroundColor: '#85FA85',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F5F7FA',
  },
  dotWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waitWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
  },
  yesText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
  },
  sec: {
    width: 39,
    height: 39,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DC8D5',
  },
  lastSec: {
    backgroundColor: '#52B8D6',
  },
  secText: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    lineHeight: 48,
  },
  imgBox: {
    alignItems: 'center',
    width: 190,
  },
  img: {
    width: 190,
    height: 190,
    borderRadius: 95,
  },
  footer: {
    paddingHorizontal: 43,
  },
  pagination: {
    position: 'absolute',
    height: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
    zIndex: 1,
  },
  viewPager: {
    height: 190,
    width: 190,
    alignItems: 'center',
  },
  paginationDot: {
    width: 7,
    height: 7,
    marginHorizontal: 3,
    borderRadius: 4,
    backgroundColor: AppColors.white + 'B8',
  },
  activeDot: {
    backgroundColor: AppColors.MainColor + 'B8',
  },
  photo: {
    marginBottom: 8,
    alignItems: 'center',
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 47,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    marginRight: 7,
    lineHeight: 25,
    color: AppColors.AppBlack,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: AppColors.AppBlack,
    marginLeft: 10,
  },
  locationWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    paddingHorizontal: 47,
  },
  player: {
    paddingHorizontal: 47,
    // marginBottom: 30,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 19,
    color: AppColors.AppBlack + 'CC',
    marginLeft: 6,
  },
  want: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 23,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 12,
  },
  title: {
    color: AppColors.AppBlack + 'E6',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  left: {
    width: 58,
  },
  back: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: AppColors.AppBlack + 'F5',
  },
  bar: {
    backgroundColor: '#A4DCED',
    borderRadius: 12,
    height: 4,
    width: screenWidth - 134,
  },
  progress: {
    position: 'absolute',
    backgroundColor: '#52B8D6',
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  play: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 14,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  voiceText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color: '#52B8D6F5',
    marginBottom: 8,
  },
  disableTouch: {
    zIndex: 20,
    width: 30,
    marginRight: 10,
    marginLeft: 6,
  },
  time: {
    fontSize: 13,
    color: AppColors.MainColor,
    textAlign: 'right',
    marginBottom: 10,
  },
});

export default WantDateThem;
