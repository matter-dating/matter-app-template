import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Share,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import AppColors from '../../Utils/AppColors';

import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import PinIcon from '../../Assets/Svg/PinIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import CheckIcon from '../../Assets/Svg/CheckBIcon';
import ItemLikeIcon from '../../Assets/Svg/ItemLikeIcon';
import ExclamationIcon from '../../Assets/Svg/ExclamationIcon';
import MoreIcon from '../../Assets/Svg/MoreIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import ShareIcon from '../../Assets/Svg/ShareIcon';

import ProfileImage from './ProfileImage';
import ProfileMoreModal from '../../Screens/Modals/ProfileMoreModal';

import {S3_PHOTO_URL} from '../../Utils/Constants';
import {useAuth} from '../../Providers/AuthProvider';
import {logClickProfile} from '../../Utils/Analytics';
import {checkRecently} from '../../Utils/Functions';
const {height: screenHeight} = Dimensions.get('window');

const ProfileCard = ({
  profile,
  togglePlay,
  isPlay,
  audioCard,
  fillValue,
  stopIntroPlayer,
  activeUser,
  likeContent,
  noBlur,
  currentVoice,
  hideLike,
  playerLoader,
  blockAndRemove,
  passWidth,
  setPass,
}) => {
  const navigation = useNavigation();
  const {userData} = useAuth();
  const [page, setPage] = useState(0);
  const [moreVisible, setMoreVisible] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const renderVerificationBadge = () => {
    if (profile.user_info.is_photo_verified) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };
  useEffect(() => {
    setIsLike(profile.user_info.is_liked);
  }, [profile.user_info.is_liked]);

  const renderLike = () => {
    if (isLike) {
      return (
        <View
          style={[styles.likedButton, screenHeight < 700 && styles.miniButton]}>
          <CheckIcon
            width={screenHeight > 700 ? 23 : 17}
            height={screenHeight > 700 ? 23 : 17}
            color={AppColors.white}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.button, screenHeight < 700 && styles.miniButton]}
        onPress={() => {
          stopIntroPlayer();
          if (!likeContent) {
            setPass({
              type: 'voice-intro',
              card: audioCard,
              isModal: true,
              target: profile.user_info,
              noBlur: noBlur,
            });
          } else {
            setPass({
              type: 'likeBack',
              isModal: true,
              likeContent: likeContent,
              target: profile.user_info,
            });
          }
          if (audioCard.length > 0) {
          } else {
            if (!likeContent) {
              setPass({
                type: 'image',
                card:
                  S3_PHOTO_URL +
                  profile.user_info.profile_hd_images[page] +
                  '.jpg',
                isModal: true,
                noBlur: noBlur,
                target: profile.user_info,
              });
            } else {
              setPass({
                type: 'likeBack',
                isModal: true,
                likeContent: likeContent,
                target: profile.user_info,
              });
            }
          }
        }}>
        <ItemLikeIcon
          width={screenHeight > 700 ? 23 : 17}
          height={screenHeight > 700 ? 23 : 17}
          color={AppColors.white}
        />
      </TouchableOpacity>
    );
  };

  const clickMoreIcon = () => {
    stopIntroPlayer && stopIntroPlayer();
    setMoreVisible(true);
  };

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('MyProfile');
  };

  const hideModal = (reported) => {
    if (reported) {
      setMoreVisible(false);
    } else {
      setMoreVisible(false);
    }
  };
  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const shareProfile = async () => {
    Share.share({
      title: 'Listen to ' + profile.user_info.first_name + '’s Voice Intro!',
      message: 'Click to hear and see ' + profile.user_info.first_name,
      url: 'https://matter.dating/share/' + profile.user_info.user_id,
    });
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.image}>
        <ProfileImage
          big={true}
          profile={profile.user_info}
          page={page}
          setPage={setPage}
          userData={userData}
          audioCard={audioCard}
          activeUser={activeUser}
          noBlur={noBlur}
          togglePlay={togglePlay}
          isPlay={isPlay}
          currentVoice={currentVoice}
          playerLoader={playerLoader}
        />
        <TouchableOpacity style={styles.share} onPress={shareProfile}>
          <ShareIcon color={AppColors.white} width={16} height={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={styles.flex}>
          <View style={styles.nameWrap}>
            <Text style={styles.name} numberOfLines={1}>
              {profile.user_info.first_name}
            </Text>
            {renderVerificationBadge()}
            {checkRecently(profile.user_info.created_at, 72) && (
              <View style={styles.box}>
                <Text style={styles.just}>Just joined</Text>
              </View>
            )}
          </View>
          {profile.user_info.location_name && (
            <View style={styles.locationWrap}>
              <PinIcon width={14} height={14} color="#3F4853" />
              <Text style={styles.location} numberOfLines={1}>
                {profile.user_info.location_name}
              </Text>
            </View>
          )}
          {audioCard.length > 0 && (
            <>
              <Text style={styles.voiceText}>Voice intro</Text>
              <View style={styles.bar}>
                {activeUser === profile._id &&
                  currentVoice === JSON.parse(audioCard[0].content).media && (
                    <Animated.View
                      style={[
                        styles.progress,
                        {
                          width: !!passWidth ? passWidth : widthAnimation,
                        },
                      ]}
                    />
                  )}
              </View>
            </>
          )}
          {audioCard.length === 0 &&
            profile.user_info.user_id === userData.user_id && (
              <View style={styles.noVoice}>
                <View style={styles.noVoiceRow}>
                  <View style={styles.alert}>
                    <ExclamationIcon
                      width={3}
                      height={21}
                      color={AppColors.white}
                    />
                  </View>
                  <View>
                    <Text style={styles.noVoiceText}>
                      You have no voice intro
                    </Text>
                    <Text style={styles.pleaseText}>
                      People can’t see you on their Explore tab
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AddVoiceIntro', {
                      callBack: ReturnVoiceCreateProfile,
                    })
                  }
                  style={styles.addButton}>
                  <VoiceIcon width={16} height={16} color={AppColors.white} />
                  <Text style={[styles.buttonText, styles.buttonWhiteText]}>
                    Upload Voice intro
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </View>
        {audioCard.length > 0 && (
          <TouchableOpacity
            style={[styles.button, screenHeight < 700 && styles.miniButton]}
            onPress={() => {
              togglePlay(
                JSON.parse(audioCard[0].content).media,
                JSON.parse(audioCard[0].content).duration * 1000,
              );
            }}>
            {playerLoader &&
            currentVoice === JSON.parse(audioCard[0].content).media ? (
              <LottieView
                source={require('../../Assets/Animation/player.json')}
                autoPlay
                loop
                style={styles.loader}
              />
            ) : isPlay &&
              currentVoice === JSON.parse(audioCard[0].content).media ? (
              <PauseIcon
                width={screenHeight > 700 ? 17 : 12}
                height={screenHeight > 700 ? 17 : 12}
                color={AppColors.white}
              />
            ) : (
              <PlayIcon
                width={screenHeight > 700 ? 17 : 12}
                height={screenHeight > 700 ? 17 : 12}
                color={AppColors.white}
              />
            )}
          </TouchableOpacity>
        )}
        {profile.user_info.user_id !== userData.user_id &&
          !hideLike &&
          renderLike()}
      </View>
      {profile.user_info.user_id !== userData.user_id && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.more} onPress={clickMoreIcon}>
            <MoreIcon color="#030F1D" width={20} height={10} />
          </TouchableOpacity>
          <View style={styles.more} />
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <ProfileMoreModal
          profile={profile}
          hide={hideModal}
          blockAndRemove={blockAndRemove}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 32,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
    // overflow: 'hidden',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingBottom: 30,
    paddingTop: 10,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 23,
    marginRight: 8,
    color: AppColors.AppBlack,
  },
  locationWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 9,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack + 'CC',
    marginLeft: 6,
  },
  voiceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    lineHeight: 19,
    color: AppColors.AppBlack,
    marginBottom: 8,
  },
  bar: {
    backgroundColor: '#D2F3FC',
    borderRadius: 12,
    height: 5,
    width: '100%',
  },
  progress: {
    position: 'absolute',
    backgroundColor: AppColors.MainColor,
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
    fontSize: 13,
    marginLeft: 7,
    color: AppColors.white,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
    // marginLeft: 'auto',
  },
  miniButton: {
    borderRadius: 18,
    width: 36,
    height: 36,
  },
  loader: {
    width: '100%',
  },
  addButton: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 11,
    backgroundColor: AppColors.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    marginLeft: 'auto',
    marginTop: 16,
  },
  likedButton: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 9,
  },
  more: {
    width: 45,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    height: 30,
  },
  moreText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack + 'D6',
  },
  footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 12,
    marginTop: 'auto',
  },
  center: {
    alignItems: 'center',
    flex: 1,
  },
  noVoice: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: '#707070',
    marginLeft: -18,
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  noVoiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alert: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#E35C5C',
    marginRight: 6,
  },
  pleaseText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
  },
  noVoiceText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    marginBottom: 1,
  },
  share: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#5BC4E2',
    borderTopEndRadius: 8,
    borderBottomStartRadius: 8,
    width: 35,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 11,
    backgroundColor: '#5B8AE2',
    height: 22,
  },
  just: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: AppColors.white,
  },
});
export default ProfileCard;
