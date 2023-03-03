import React, {useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Image,
  Share,
} from 'react-native';
import dayjs from 'dayjs';
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

import AppColors from '../../Utils/AppColors';
import {S3_MAIN_URL} from '../../Utils/Constants';
import CustomImage from '../../Components/Common/CustomImage';
import ModalBackground from '../../Components/Common/ModalBackground';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import ClockIcon from '../../Assets/Svg/ClockIcon';
import ShareIcon from '../../Assets/Svg/ShareIcon';
import {useAuth} from '../../Providers/AuthProvider';

const SpeakEasyWelcomeModal = ({
  hide,
  speakEasy,
  // setContactsVisible,
  navigation,
  modalBg,
  // setSharedEvent,
}) => {
  const {userInvitation} = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  // const eventColor = '#18023B';
  const eventColor = speakEasy.speakeasy_color;
  const eventName = speakEasy.speakeasy_name;
  // const eventBgImage = require('../../Assets/Image/demo.png');
  const eventLogo = speakEasy.speakeasy_logo;
  const eventBgImage = null;
  // const eventLogo = null;
  const eventMembers = ['', ''];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const shareEvent = async () => {
    try {
      const result = await Share.share({
        url: speakEasy.speakeasy_url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // const inviteFriend = () => {
  //   if (modalBg) {
  //     hide();
  //   }
  //   setSharedEvent(speakEasy);
  // };
  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      {modalBg && <ModalBackground />}
      {/* <TouchableOpacity style={styles.bg} onPress={hide} /> */}
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        {!!eventBgImage && (
          <CustomImage source={eventBgImage} style={styles.bgImage} />
        )}
        {!!eventColor && (
          <View style={[styles.overlay, {backgroundColor: eventColor}]} />
        )}
        <View style={styles.header}>
          <TouchableOpacity style={styles.delete} onPress={hide}>
            <DeleteIcon color={AppColors.white} width={24} height={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          {eventLogo ? (
            <CustomImage style={styles.logo} source={{uri: eventLogo}} />
          ) : (
            <></>
          )}
          <Text style={styles.name}>{eventName}</Text>
          <View style={styles.time}>
            <ClockIcon color={AppColors.white} width={16} height={16} />
            <Text style={styles.text}>
              {speakEasy &&
                speakEasy.status === 'scheduled' &&
                dayjs().isBefore(speakEasy.start_time) &&
                dayjs(speakEasy.start_time).calendar()}
              {speakEasy &&
                !dayjs().isBefore(speakEasy.start_time) &&
                'Coming soon'}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (modalBg) {
                hide();
              } else {
                navigation.navigate('SpeakEasy', {
                  activeCode: speakEasy.speakeasy_code,
                  codeList: userInvitation[0].joined_speakeasy_list,
                  isJoin: false,
                });
              }
            }}>
            <Text style={styles.buttonText}>See who’s coming</Text>
            {!!eventMembers && (
              <View style={styles.members}>
                <Image
                  style={styles.img}
                  source={
                    eventMembers[0]
                      ? {uri: S3_MAIN_URL + eventMembers[0] + '.jpg'}
                      : require('../../Assets/Image/tip1.png')
                  }
                />
                <Image
                  style={[styles.img, styles.img2]}
                  source={
                    eventMembers[1]
                      ? {uri: S3_MAIN_URL + eventMembers[1] + '.jpg'}
                      : require('../../Assets/Image/tip1.png')
                  }
                />
              </View>
            )}
            <Text style={styles.buttonText}>+20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.border]}
            onPress={shareEvent}>
            <ShareIcon color={AppColors.white} width={19} height={19} />
            <Text style={[styles.buttonText, styles.borderText]}>
              {'  '}
              Share event
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.share} onPress={inviteFriend}>
            <Text style={styles.shareText}>Invite a friend</Text>
          </TouchableOpacity> */}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    margin: 12,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  box: {
    paddingHorizontal: 36,
  },
  footer: {
    width: '100%',
    paddingBottom: 24,
    paddingTop: 45,
    paddingHorizontal: 31,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 45,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 58,
    height: 58,
    marginBottom: 26,
  },
  name: {
    fontSize: 32,
    fontFamily: 'BarBoothAtMatts',
    color: AppColors.white,
    marginBottom: 15,
    lineHeight: 32,
  },
  button: {
    alignItems: 'center',
    borderRadius: 29,
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    lineHeight: 48,
  },
  border: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: AppColors.white,
  },
  borderText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
  },
  // share: {
  //   alignItems: 'center',
  // },
  // shareText: {
  //   textDecorationLine: 'underline',
  //   fontSize: 15,
  //   fontFamily: 'Poppins-SemiBold',
  //   color: AppColors.white,
  //   lineHeight: 48,
  // },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.white,
    lineHeight: 25,
    marginHorizontal: 7,
  },
  new: {
    width: 204,
    height: 152,
  },
  members: {
    marginLeft: 8,
    marginRight: 2,
    flexDirection: 'row',
  },
  img: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: -13,
    borderWidth: 1.5,
    borderColor: AppColors.white,
    zIndex: 1,
  },
  img2: {
    zIndex: 2,
    marginRight: 0,
  },
});

export default SpeakEasyWelcomeModal;
