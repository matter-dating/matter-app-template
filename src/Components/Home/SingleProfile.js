import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Easing,
  Animated,
  Modal,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../Providers/AuthProvider';

import AppColors from '../../Utils/AppColors';

import ProfileCard from '../Profile/ProfileCard';
import LikedItemMessage from './LikedItemMessage';
import LikedItemLike from './LikedItemLike';
import ProfilePreferences from './ProfilePreferences';
import UpArrowIcon from '../../Assets/Svg/UpArrowIcon';

import InstaCard from '../Cards/InstaCard';
import MovieCard from '../Cards/MovieCard';
import MusicCard from '../Cards/MusicCard';
import HobbyCard from '../Cards/HobbyCard';
import TextPromptCard from '../Cards/TextPromptCard';
import ImagePromptCard from '../Cards/ImagePromptCard';
import VoicePromptCard from '../Cards/VoicePromptCard';

import NewLikeModal from '../../Screens/Modals/NewLikeModal';

const screenWidth = Math.round(Dimensions.get('window').width);

const SingleProfile = ({
  profile,
  likeContent,
  stopIntroPlayer,
  currentVoice,
  setCurrentVoice,
  audioRecorderPlayer,
  noBlur,
  isPlay,
  setIsPlay,
  hideLike,
  setPlayerLoader,
  playerLoader,
  isModal,
  widthAnimation,
  hideShowModal,
  setLikedId,
  withFooter,
}) => {
  const navigation = useNavigation();
  const insets = useSafeArea();

  const scrollRef = useRef(null);
  const [audioCard, setAudioCard] = useState({});
  const [duration, setDuration] = useState(0);
  const fillValue = useRef(new Animated.Value(0)).current;
  const {user} = useAuth();

  const [likeVisible, setLikeVisible] = useState(false);
  const [pass, setPass] = useState([]);

  const renderItem = (item, i) => {
    switch (item.type) {
      case 'instagram':
        return (
          <InstaCard
            likeContent={likeContent}
            key={item._id}
            card={item}
            userInfo={profile.user_info}
            token={JSON.parse(item.content).igm_token}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            isModal={isModal}
            setPass={setPass}
          />
        );
      case 'tv-show':
        return (
          <MovieCard
            likeContent={likeContent}
            key={item.content[0]._id}
            userInfo={profile.user_info}
            card={item}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            isModal={isModal}
            setPass={setPass}
          />
        );
      case 'movie':
        return (
          <MovieCard
            likeContent={likeContent}
            key={item.content[0]._id}
            userInfo={profile.user_info}
            card={item}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            setPass={setPass}
          />
        );
      case 'hobby':
        return (
          <HobbyCard
            likeContent={likeContent}
            key={item._id}
            card={item}
            userInfo={profile.user_info}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            isModal={isModal}
            setPass={setPass}
          />
        );
      case 'prompt':
        return (
          <TextPromptCard
            likeContent={likeContent}
            key={item.content[0]._id}
            userInfo={profile.user_info}
            card={item}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            setPass={setPass}
          />
        );
      case 'image_prompt':
        return (
          <ImagePromptCard
            likeContent={likeContent}
            key={item._id}
            userInfo={profile.user_info}
            card={item}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            isModal={isModal}
            setPass={setPass}
          />
        );
      case 'music':
        return (
          <MusicCard
            likeContent={likeContent}
            key={item.content[0]._id}
            userInfo={profile.user_info}
            card={item}
            stopIntroPlayer={stopIntroPlayer}
            hideLike={hideLike}
            isModal={isModal}
            togglePlay={togglePlay}
            currentVoice={currentVoice}
            isPlay={isPlay}
            playerLoader={playerLoader}
            setPass={setPass}
          />
        );
      case 'voice_prompt':
        return (
          <VoicePromptCard
            likeContent={likeContent}
            key={item.content[0]._id}
            userInfo={profile.user_info}
            card={item}
            stopIntroPlayer={stopIntroPlayer}
            fillValue={fillValue}
            togglePlay={togglePlay}
            isPlay={isPlay}
            playerLoader={playerLoader}
            currentVoice={currentVoice}
            hideLike={hideLike}
            isModal={isModal}
            setPass={setPass}
          />
        );
      default:
        return <View key={i} />;
    }
  };

  useEffect(() => {
    setAudioCard(profile.user_cards.filter((c) => c.type === 'voice-intro'));
  }, [profile.user_cards]);

  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
    setIsPlay(false);
    if (currentVoice) {
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition > 0) {
          setIsPlay(true);
          setPlayerLoader(false);
        }
        if (
          audioCard &&
          audioCard.length > 0 &&
          isPlay &&
          currentVoice === JSON.parse(audioCard[0].content).media &&
          praseInt(e.currentPosition) === 35
        ) {
          user.callFunction('playedVoiceIntro', [profile.user_info.user_id]);
          profile.user_info.is_played = true;
        }
        if (e.currentPosition === e.duration) {
          user.callFunction('playedVoiceIntro', [profile.user_info.user_id]);
          profile.user_info.is_played = true;
          setIsPlay(false);
          setCurrentVoice(null);
          audioRecorderPlayer.stopPlayer();
        }
      });
    }
  }, [currentVoice]);

  const togglePlay = async (item, sec) => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (item !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(item);
      setDuration(sec);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(item);
    } else if (item === currentVoice) {
      stopIntroPlayer();
      setDuration(0);
    }
  };

  useEffect(() => {
    fillValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const hideModal = (withLike) => {
    setLikeVisible(false);
    setPass([]);
    if (withLike && !!likeContent) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (!!pass && Object.keys(pass).length > 0) {
      setLikeVisible(true);
    }
  }, [pass]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        scrollEventThrottle={17}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          {!!likeContent && likeContent.message !== '' && (
            <LikedItemMessage likeContent={likeContent} />
          )}
          {!!likeContent && likeContent.message === '' && (
            <LikedItemLike
              userInfo={profile.user_info}
              likeContent={likeContent}
            />
          )}
          <View style={styles.margin}>
            <ProfileCard
              isPlay={isPlay}
              playerLoader={playerLoader}
              profile={profile}
              togglePlay={togglePlay}
              currentVoice={currentVoice}
              audioCard={audioCard}
              fillValue={fillValue}
              stopIntroPlayer={stopIntroPlayer}
              noBlur={noBlur}
              activeUser={profile._id}
              hideLike={hideLike}
              passWidth={widthAnimation}
              setPass={setPass}
              likeContent={likeContent}
            />
          </View>
          <ProfilePreferences
            userInfo={profile.user_info}
            stopIntroPlayer={stopIntroPlayer}
          />
          {profile &&
            profile.user_cards &&
            profile.user_cards.map((item, i) => renderItem(item, i))}
        </View>
        <View
          style={[
            styles.center,
            isModal && {marginBottom: insets.bottom + 80},
          ]}>
          <TouchableOpacity
            style={styles.up}
            onPress={() =>
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              })
            }>
            <UpArrowIcon
              color={AppColors.MainColor1 + 'CC'}
              width={44}
              height={44}
            />
          </TouchableOpacity>
          {withFooter && <View style={{height: insets.bottom + 68}} />}
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={likeVisible}>
        <NewLikeModal
          hide={hideModal}
          pass={pass}
          hideShowModal={hideShowModal}
          setLikedId={setLikedId}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: screenWidth,
  },
  up: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    transform: [{rotate: '180deg'}],
  },
  center: {
    marginVertical: 28,
    marginBottom: 40,
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: 12,
    marginBottom: 24,
  },
  withFooter: {
    height: 60,
  },
});

export default React.memo(SingleProfile);
