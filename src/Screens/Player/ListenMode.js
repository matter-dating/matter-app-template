import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../../Providers/AuthProvider';
import AppColors from '../../Utils/AppColors';

import SingleUser from '../../Components/Player/SingleUser';
import PlayerControl from '../../Components/Player/PlayerControl';
import NewLikeModal from '../Modals/NewLikeModal';
import dayjs from 'dayjs';
var durationPlugin = require('dayjs/plugin/duration');
dayjs.extend(durationPlugin);

import TrackPlayer, {
  State,
  Event,
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Capability,
} from 'react-native-track-player';
import {S3_MAIN_URL} from '../../Utils/Constants';
import {logSeekNext, logSeekPrevious} from '../../Utils/Analytics';

function ListenMode({route, navigation}) {
  const {trackProfile, setPlayed, setLikedId} = route.params;
  const insets = useSafeArea();
  // const [voiceCommand, setVoiceCommand] = useState(false);
  const {userData} = useAuth();
  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const currentIndex = useRef(0);
  const [currentUser, setCurrentUser] = useState(
    trackProfile[currentIndex.current],
  );
  const {position, duration} = useProgress();
  const [recordTime, setRecordTime] = useState('00:00');
  const playbackState = usePlaybackState();

  const [likeVisible, setLikeVisible] = useState(false);
  const [pass, setPass] = useState([]);

  useEffect(() => {
    const init_player = async () => {
      await TrackPlayer.setupPlayer({waitForBuffer: true});
      const tracks = trackProfile.map((profile, index) => {
        if (
          profile &&
          profile.user_cards &&
          profile.user_cards.filter((c) => c.type === 'voice-intro').length > 0
        ) {
          return {
            url: JSON.parse(
              profile.user_cards.filter((c) => c.type === 'voice-intro')[0]
                .content,
            ).media,
            title: 'Voice Intro',
            artist: profile.user_info.first_name,
            artwork: S3_MAIN_URL + profile.user_info.user_id + '.jpg', // Load artwork from the network
            duration: JSON.parse(
              profile.user_cards.filter((c) => c.type === 'voice-intro')[0]
                .content,
            ).duration,
          };
        }
      });
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      await TrackPlayer.add(tracks);
      await TrackPlayer.play();
      fillValue.setValue(0);
    };
    init_player();
    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  useEffect(() => {
    if (playbackState === State.Playing || playbackState === State.Ready) {
      setIsPlay(true);
      setDisabled(false);
    } else {
      setIsPlay(false);
      setDisabled(true);
    }
  }, [playbackState]);

  useEffect(() => {
    fillValue.setValue(0);
    if (currentUser) {
      setRecordTime(
        dayjs
          .duration(
            JSON.parse(
              currentUser.user_cards.filter((c) => c.type === 'voice-intro')[0]
                .content,
            ).duration,
            'seconds',
          )
          .format('mm:ss'),
      );
    }
  }, [currentUser]);

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async (event) => {
      if (event.type === Event.PlaybackTrackChanged && event.position !== 0) {
        setPlayed(currentIndex.current);
        const current = await TrackPlayer.getCurrentTrack();
        if (
          event.nextTrack !== null &&
          event.track !== null &&
          event.track < event.nextTrack
        ) {
          currentIndex.current = current;
          setCurrentUser(trackProfile[current]);
        }
        if (
          event.nextTrack !== null &&
          event.track !== null &&
          event.track > event.nextTrack
        ) {
          currentIndex.current = current;
          setCurrentUser(trackProfile[current]);
        }
      } else if (event.type === Event.PlaybackQueueEnded) {
        setPlayed(currentIndex.current);
        navigation.goBack();
        navigation.navigate('ListenModeEnd', {
          trackProfile: trackProfile,
        });
      }
    },
  );

  useEffect(() => {
    if (isPlay && position > 0) {
      if (!isPause) {
        Animated.timing(fillValue, {
          toValue: 1,
          duration: (duration - position) * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(fillValue, {
          toValue: 1,
          duration: duration * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }).stop();
      }
    }
  }, [isPlay, isPause, position]);

  const stopPlayer = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
      setIsPause(true);
    }
  };

  const togglePlay = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      TrackPlayer.pause();
      setIsPause(true);
    } else {
      setIsPause(false);
      TrackPlayer.play();
    }
  };

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const hideModal = (reported) => {
    setPass([]);
    setLikeVisible(false);
  };

  useEffect(() => {
    if (!!pass && Object.keys(pass).length > 0) {
      setLikeVisible(true);
    }
  }, [pass]);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <Image
          style={styles.logo}
          source={require('../../Assets/Image/matter_logo.png')}
        />
      </View>
      <View style={styles.body}>
        {currentUser && (
          <SingleUser
            user={currentUser}
            userData={userData}
            isPlay={isPlay}
            stopPlayer={stopPlayer}
          />
        )}
        <View style={styles.player}>
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
          <Text style={styles.time}>{recordTime}</Text>
        </View>
        {currentUser && (
          <PlayerControl
            user={currentUser}
            userData={userData}
            isPlay={isPlay}
            isPause={isPause}
            togglePlay={togglePlay}
            stopPlayer={stopPlayer}
            disabled={disabled}
            setPass={setPass}
            hidePrev={currentIndex.current === 0}
            hideNext={currentIndex.current === trackProfile.length - 1}
            previousUser={() => {
              if (currentIndex.current !== 0) {
                TrackPlayer.seekTo(0);
                TrackPlayer.pause();
                TrackPlayer.skipToPrevious();
                togglePlay();
                logSeekPrevious();
              }
            }}
            nextUser={() => {
              if (currentIndex.current < trackProfile.length - 1) {
                TrackPlayer.seekTo(0);
                TrackPlayer.pause();
                TrackPlayer.skipToNext();
                togglePlay();
                logSeekNext();
              }
            }}
          />
        )}
      </View>
      <View style={[styles.absolute, {bottom: insets.bottom + 20}]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.close}>Exit</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={likeVisible}>
        <NewLikeModal hide={hideModal} pass={pass} setLikedId={setLikedId} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#06607B',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 19,
    alignItems: 'center',
  },
  logo: {
    width: 105,
    height: 30,
  },
  close: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  button: {
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  absolute: {
    paddingTop: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 27,
  },
  player: {
    paddingHorizontal: 10,
    paddingTop: 9,
  },
  bar: {
    backgroundColor: AppColors.white,
    borderRadius: 12,
    height: 4,
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
    width: 0,
  },
  time: {
    marginTop: 12,
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white + 'D6',
    marginLeft: 'auto',
  },
});

export default ListenMode;
