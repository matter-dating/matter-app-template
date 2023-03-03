/* eslint-disable react-hooks/exhaustive-deps */
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import RtcEngine, {UserOfflineReason} from 'react-native-agora';
import RtmEngine from 'agora-react-native-rtm';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../Providers/AuthProvider';
import LottieView from 'lottie-react-native';
import dayjs from 'dayjs';
var duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
import notifee from '@notifee/react-native';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
// import JustTalk from '../Components/Blind/JustTalk';
// import DateGame from '../Components/Blind/DateGame';
import SuggestionTopic from '../Components/Blind/SuggestionTopic';
import BlindFooter from '../Components/Blind/BlindFooter';
import BlindHeader from '../Components/Blind/BlindHeader';
import LookingNextDate from '../Components/Blind/LookingNextDate';
import WantDateThem from '../Components/Blind/WantDateThem';
import ClockIcon from '../Assets/Svg/ClockIcon';

import Discon from '../Assets/Svg/Discon';

import SureLeaveModal from './Modals/SureLeaveModal';
import ProfileMoreModal from './Modals/ProfileMoreModal';
import OtherLeaveModal from './Modals/OtherLeaveModal';
import ReportSuccesfulModal from './Modals/ReportSuccesfulModal';
import SurveyModal from './Modals/SurveyModal';

import AlertModal from './Modals/AlertModal';

import {formatTime} from '../Utils/Functions';
import {useBlindDate} from '../Providers/BlindDateProvider';
import HttpQuery from '../Api/HttpQuery';
import BlindDateQuery from '../Api/BlindDateQuery';
import {useAppFlag} from '../Providers/AppFlagProvider';
import {agora_app_id} from '../Utils/EnvironmentVariables';
import {
  logEndHappyHour,
  logExtendAcceptHappyHour,
  logExtendRejectHappyHour,
  logExtendRequestHappyHour,
  logHappyHourDecline,
  logHappyHourExpire,
  logHappyHourPending,
  logLeaveHappyHour,
  logQuizClickAnswer,
  logQuizEnd,
  logQuizLeave,
  logQuizNextQuestion,
  logQuizStart,
  logQuizSubmitAnswer,
  logStartHappyHour,
} from '../Utils/Analytics';

//suggested topics
import {useAppContent} from '../Providers/AppContentProvider';
import {usePremium} from '../Providers/PremiumProvider';

const getRandomSoundEffect = () => {
  const randomNumber = (Math.floor(Math.random() * 10) % 4) + 1;
  switch (randomNumber) {
    case 1:
      return 'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/1.mp3';
    case 2:
      return 'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/2.mp3';
    case 3:
      return 'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/3.mp3';
    case 4:
      return 'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/4.mp3';
    default:
      return 'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/1.mp3';
  }
};

const backgroundSound = getRandomSoundEffect();

const dateSound =
  'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/date.mp3';
const feedbackSound =
  'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/feedback.mp3';
const last10Sound =
  'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/last10.mp3';
const leftSound =
  'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/left.mp3';
const extendSound =
  'https://d3aync0g4e02cp.cloudfront.net/happyhour-background/extend.mp3';

const BlindDateScreen = ({route}) => {
  const {
    latestHappyHour,
    getSpeakeasyById,
    topics,
    voteTopic,
    getCommunityTopics,
  } = useAppContent();

  //connecting communtiy topics on chat
  const [communityTipics, setCommunityTipics] = useState([]);
  useEffect(() => {
    setCommunityTipics(getCommunityTopics('columbia'));
  }, []);
  // console.log('communityTopics:', communityTipics);
  //connecting communtiy topics on chat

  const insets = useSafeArea();
  const [slideTop] = useState(new Animated.Value(-300));

  const [reportVisible, setReportVisible] = useState(false);
  const [sureLeaveModal, setSureLeaveModal] = useState(false);
  const [otherLeaveVisible, setOtherLeaveVisible] = useState(false);
  const [reportSuccessfulVisible, setReportSuccessfulVisible] = useState(false);
  const [surveyVisible, setSurveyVisible] = useState(false);

  const {user, userData} = useAuth();
  const {currentState, currentStateRef, updateState} = useBlindDate();
  const {isPremium} = usePremium();
  const {checkFlag, setFlag} = useAppFlag();
  const httpApi = new HttpQuery();

  const navigation = useNavigation();

  const [bgMute, setBgMute] = useState(false);
  const [mute, setMute] = useState(false);
  const [speaker, setSpeaker] = useState(true);

  const [last10, setLast10] = useState(false);
  const [timeLeft, setTimeLeft] = useState(29);

  const [joined, setJoined] = useState(false);
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const [otherUserCards, setOtherUserCards] = useState(null);
  const [dateLeft, setDateLeft] = useState(false);
  const [dateConnection, setDateConnection] = useState(false);
  const [dateDisconnected, setDateDisconnected] = useState(false);
  const engine = useRef();
  const rtmEngine = useRef();
  const inStaleTime = useRef(null);
  const waitExpireTime = useRef(null);
  const requestWaitTime = useRef(null);
  const otherUserRef = useRef(null);
  const extended = useRef(false);

  const myAgoraId = useRef(null);
  const otherAgoraId = useRef(null);
  const timeElapsed = useRef(null);
  const voiceIntroTimeout = useRef(null);

  const blindApi = new BlindDateQuery();

  // ExtendTime
  const [showExtend, setShowExtend] = useState(false);
  const [extendLoader, setExtendLoader] = useState(false);
  const [extendModalVisible, setExtendModalVisible] = useState(false);
  const [extendRejectVisible, setExtendRejectVisible] = useState(false);

  const [accept, setAccept] = useState(false);
  const [myAcceptState, setMyAccept] = useState(false);

  const myAccept = useRef(false);
  const theirAccept = useRef(false);

  const fillValue = useRef(new Animated.Value(0)).current;
  const [isPlay, setIsPlay] = useState(false);
  const [audioDuration, setDuration] = useState(0);
  const [currentVoice, setCurrentVoice] = useState(null);

  const [recordTime, setRecordTime] = useState('00:00');

  const [speakEasy, setSpeakEasy] = useState(
    getSpeakeasyById(currentStateRef.current.blind_date_group_id),
  );

  // DateGame
  const [isGame, setIsGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  const [submitState, setSubmitState] = useState('');
  const [nextState, setNextState] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const stopIntroPlayer = async () => {
    clearTimeout(voiceIntroTimeout.current);
    await engine.current.pauseEffect(888);
    await engine.current.resumeEffect(999);
    setBgMute(false);
    // setCurrentVoice(null);
    setIsPlay(false);
    setDuration(0);
  };

  const togglePlay = async (item, length) => {
    if (item !== currentVoice) {
      toggleBg();
      setIsPlay(true);
      setCurrentVoice(item);
      setDuration(length);
      await engine.current.preloadEffect(888, item);
      engine.current.playEffect(888, item, 0, 1, 0, 100, false);
      voiceIntroTimeout.current = setTimeout(() => {
        toggleBg();
        setCurrentVoice(null);
        setIsPlay(false);
        setDuration(0);
      }, length);
    } else if (item === currentVoice) {
      clearTimeout(voiceIntroTimeout.current);
      await engine.current.pauseEffect(888);
      toggleBg();
      setCurrentVoice(null);
      setIsPlay(false);
      setDuration(0);
    }
  };

  useEffect(() => {
    fillValue.setValue(0);
    if (isPlay) {
      Animated.timing(fillValue, {
        toValue: 1,
        duration: audioDuration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [isPlay]);

  const animateTopNotice = (noticeDuration, nextAction) => {
    Animated.timing(slideTop, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    if (noticeDuration) {
      setTimeout(() => {
        Animated.timing(slideTop, {
          toValue: -300,
          duration: 300,
          useNativeDriver: false,
        }).start();
        nextAction && nextAction();
      }, noticeDuration);
    }
  };

  const requestFeedback = () => {
    setExtendModalVisible(false);
    setExtendRejectVisible(false);
    if (currentStateRef.current.state !== 'FEEDBACK') {
      updateState('FEEDBACK');
      engine.current.playEffect(111, feedbackSound, 0, 1, 0, 50, false);
      navigation.reset({
        index: 1,
        routes: [
          {name: 'TabNavigator'},
          {
            name: 'BlindFeedBack',
            params: {
              otherUserInfo: otherUserRef.current,
            },
          },
        ],
      });
    }
  };

  const localNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'happyhour',
      name: 'Happy Hour Channel',
    });
    // Display a notification
    await notifee.displayNotification({
      title: 'Your audio date is ready!',
      body: 'We found you a date. Please, respond within 45 seconds to start the date',
      android: {
        channelId,
      },
    });
  };

  const loadAudioEffects = async () => {
    await engine.current.preloadEffect(999, backgroundSound);
    await engine.current.preloadEffect(111, feedbackSound);
    await engine.current.preloadEffect(112, dateSound);
    await engine.current.preloadEffect(113, leftSound);
    await engine.current.preloadEffect(114, extendSound);
    await engine.current.preloadEffect(115, last10Sound);
  };

  useEffect(() => {
    const init_agora = async () => {
      engine.current = await RtcEngine.create(agora_app_id);
      await engine.current.setDefaultAudioRoutetoSpeakerphone(true);
      await loadAudioEffects();
      engine.current.addListener(
        'JoinChannelSuccess',
        async (channel, uid, elapsed) => {
          setJoined(true);
          myAgoraId.current = uid;
          await engine.current.playEffect(
            999,
            backgroundSound,
            -1,
            1,
            0,
            50,
            false,
          );
          blindApi.join_agora(
            user.id,
            currentStateRef.current.blind_date_group_id,
            currentStateRef.current.agora_room_id,
          );
          if (currentStateRef.current.other_user_id) {
            waitExpireTime.current = new Date(new Date().getTime() + 15 * 1000);
          }
        },
      );

      engine.current.addListener('UserInfoUpdated', async (uid, other_user) => {
        otherAgoraId.current = uid;
        blindApi.start(
          user.id,
          other_user.userAccount,
          currentStateRef.current.blind_date_group_id,
          currentStateRef.current.agora_room_id,
        );
        if (
          latestHappyHour &&
          latestHappyHour.type &&
          latestHappyHour.type === 'opt_in'
        ) {
          engine.current.muteRemoteAudioStream(otherAgoraId.current, true);
          // await engine.current.playEffect(112, dateSound, 0, 1, 0, 100, false);
          await engine.current.setVolumeOfEffect(999, 10);
          setDateConnection(false);
          localNotification();
          if (currentStateRef.current.state === 'JOINED_WAITING') {
            logHappyHourPending(
              currentStateRef.current.blind_date_group_id,
              other_user.userAccount,
            );
            updateState('JOINED_TALKING', {
              other_user_id: other_user.userAccount,
            });
          }
          requestWaitTime.current = new Date(new Date().getTime() + 45 * 1000);
        } else {
          setAccept(true);
          setMyAccept(true);
          // await engine.current.playEffect(112, dateSound, 0, 1, 0, 100, false);
          await engine.current.setVolumeOfEffect(999, 10);
          inStaleTime.current = new Date(
            new Date().getTime() +
              currentStateRef.current.blind_date_duration * 1000,
          );
          logStartHappyHour(
            currentStateRef.current.blind_date_group_id,
            other_user.userAccount,
          );
          if (currentStateRef.current.state === 'JOINED_WAITING') {
            updateState('JOINED_TALKING', {
              other_user_id: other_user.userAccount,
            });
          }
        }

        httpApi.getSingle(other_user.userAccount, (res) => {
          otherUserRef.current = res;
          setOtherUserInfo(res.user_info);
          if (
            res.user_cards.filter((c) => c.type === 'voice-intro').length > 0
          ) {
            setOtherUserCards(
              res.user_cards.filter((c) => c.type === 'voice-intro'),
            );
            setRecordTime(
              dayjs
                .duration(
                  JSON.parse(
                    res.user_cards.filter((c) => c.type === 'voice-intro')[0]
                      .content,
                  ).duration,
                  'seconds',
                )
                .format('mm:ss'),
            );
          }
          animateTopNotice(3000);
        });
      });

      engine.current.addListener('UserOffline', (uid, reason) => {
        if (
          latestHappyHour &&
          latestHappyHour.type &&
          latestHappyHour.type === 'opt_in'
        ) {
          if (
            uid !== myAgoraId.current &&
            myAccept.current &&
            theirAccept.current
          ) {
            const diff = inStaleTime
              ? dayjs().diff(dayjs(inStaleTime.current), 'second')
              : -120;
            if (diff < -5 || extended.current === true) {
              engine.current.playEffect(113, leftSound, 0, 1, 0, 100, false);
              if (reason === UserOfflineReason.Quit) {
                setDateLeft(true);
                animateTopNotice(3000, requestFeedback);
              } else if (reason === UserOfflineReason.Dropped) {
                setDateConnection(true);
                animateTopNotice(10000, () => {
                  setDateDisconnected(true);
                  animateTopNotice(3000, requestFeedback);
                });
              }
            }
          }
        } else {
          const diff = inStaleTime
            ? dayjs().diff(dayjs(inStaleTime.current), 'second')
            : -120;
          if (diff < -5 || extended.current === true) {
            engine.current.playEffect(113, leftSound, 0, 1, 0, 100, false);
            if (reason === UserOfflineReason.Quit) {
              blindApi.end(
                user.id,
                currentStateRef.current.other_user_id,
                currentStateRef.current.blind_date_group_id,
                'OTHER_USER_LEFT',
                extended.current,
                diff,
                currentStateRef.current.agora_room_id,
              );
              setDateLeft(true);
              animateTopNotice(3000, requestFeedback);
            } else if (reason === UserOfflineReason.Dropped) {
              setDateConnection(true);
              animateTopNotice(10000, () => {
                blindApi.end(
                  user.id,
                  currentStateRef.current.other_user_id,
                  currentStateRef.current.blind_date_group_id,
                  'OTHER_USER_DROPPED',
                  extended.current,
                  diff,
                  currentStateRef.current.agora_room_id,
                );
                setDateDisconnected(true);
                animateTopNotice(3000, requestFeedback);
              });
            }
          }
        }
      });

      engine.current.addListener('RtcStats', (stats) => {
        timeElapsed.current = stats.duration;
        if (inStaleTime.current) {
          const diff = dayjs().diff(dayjs(inStaleTime.current), 'second');
          if (diff >= -30 && diff <= 0) {
            setLast10(true);
          } else if (diff > 0 && extended.current === false) {
            blindApi.end(
              user.id,
              currentStateRef.current.other_user_id,
              currentStateRef.current.blind_date_group_id,
              'ENDED',
              extended.current,
              diff,
              currentStateRef.current.agora_room_id,
            );
            logEndHappyHour(
              currentStateRef.current.blind_date_group_id,
              currentStateRef.current.other_user_id,
            );
            requestFeedback();
          } else if (
            currentStateRef.current.state === 'JOINED_TALKING' &&
            otherAgoraId.current === null &&
            stats.duration > 15
          ) {
            requestFeedback();
          }
        } else if (requestWaitTime.current) {
          const diff = dayjs().diff(dayjs(requestWaitTime.current), 'second');
          if (
            diff > 0 &&
            (myAccept.current === false || theirAccept.current === false)
          ) {
            stopIntroPlayer();
            logHappyHourExpire(
              currentStateRef.current.blind_date_group_id,
              otherUserRef.current.user_info.user_id,
            );
            setOtherUserInfo(null);
            updateState('BLIND_ACTIVE');
            navigation.reset({
              index: 1,
              routes: [
                {name: 'TabNavigator'},
                {
                  name: 'TimeOutScreen',
                  params: {
                    otherUserName: otherUserRef.current.user_info.first_name,
                    decline: false,
                  },
                },
              ],
            });
          }
        } else if (waitExpireTime.current) {
          const diff = dayjs().diff(dayjs(waitExpireTime.current), 'second');
          if (inStaleTime.current === null && diff > 0) {
            updateState('BLIND_ACTIVE');
            navigation.reset({
              index: 1,
              routes: [
                {name: 'TabNavigator'},
                {
                  name: 'TimeOutScreen',
                  params: {
                    otherUserName: 'User',
                    decline: false,
                  },
                },
              ],
            });
          }
        }
      });

      rtmEngine.current = new RtmEngine();
      rtmEngine.current.on('channelMemberJoined', (evt) => {
        let {channelId, uid} = evt;
        console.warn('rtm', channelId, uid);
      });

      rtmEngine.current.on('channelMessageReceived', (evt) => {
        // received message is of the form - channel:membercount, add it to the state
        let {text} = evt;
        if (text === 'EXTEND_ACCEPT') {
          setFlag(
            currentStateRef.current.blind_date_group_id + '_extend',
            'true',
          );
          extended.current = true;
          setShowExtend(false);
          Animated.timing(slideTop, {
            toValue: -300,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else if (text === 'EXTEND_REQUEST') {
          if (engine.current) {
            engine.current.playEffect(114, extendSound, 0, 1, 0, 100, false);
          }
          setExtendModalVisible(true);
          Animated.timing(slideTop, {
            toValue: -300,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else if (text === 'EXTEND_REJECT') {
          Animated.timing(slideTop, {
            toValue: -300,
            duration: 300,
            useNativeDriver: false,
          }).start();
          setExtendRejectVisible(true);
        } else if (text === 'ACCEPT') {
          theirAccept.current = true;
          setAccept(true);
          if (myAccept.current === true) {
            stopIntroPlayer();
            engine.current.muteRemoteAudioStream(otherAgoraId.current, false);
            inStaleTime.current = new Date(
              new Date().getTime() +
                currentStateRef.current.blind_date_duration * 1000,
            );
            logStartHappyHour(
              currentStateRef.current.blind_date_group_id,
              otherUserRef.current.user_info.user_id,
            );
          }
        } else if (text === 'KINDLY_DECLINE') {
          stopIntroPlayer();
          updateState('BLIND_ACTIVE');
          navigation.reset({
            index: 1,
            routes: [
              {name: 'TabNavigator'},
              {
                name: 'TimeOutScreen',
                params: {
                  otherUserName: otherUserRef.current.user_info.first_name,
                  decline: true,
                },
              },
            ],
          });
        } else if (text.includes('SET_SELECTED')) {
          setSelectedState(text.split('_')[2]);
        } else if (text === 'SUBMIT_ANSWER') {
          setSubmitState('submit');
          setNextState('');
        } else if (text === 'NEXT_QUESTION') {
          setSubmitState('');
          setNextState('next');
        } else if (text === 'QUIT_QUIZ') {
          setCurrentPoint(-1);
          setIsGame(false);
        } else if (text === 'END_QUIZ') {
          setIsGame(false);
        } else {
          setIsGame(true);
          setQuestions(JSON.parse(text));
        }
      });

      const {token} = await user.callFunction('generateAgoraToken', [
        currentStateRef.current.agora_room_id,
      ]);
      await engine.current.joinChannelWithUserAccount(
        token,
        currentStateRef.current.agora_room_id,
        user.id,
      );
      const {rtmToken} = await user.callFunction('generateRtmToken', []);
      await rtmEngine.current
        .createClient(agora_app_id)
        .catch((e) => console.error('error0', JSON.stringify(e)));
      await rtmEngine.current
        .login({uid: user.id, token: rtmToken})
        .catch((e) => console.error('error1', JSON.stringify(e)));
      await rtmEngine.current
        .joinChannel(currentStateRef.current.agora_room_id)
        .catch((e) => console.error('error2', JSON.stringify(e)));
    };

    animateTopNotice(3000);
    init_agora();
    let local_agora_room_id = null;
    if (currentStateRef.current?.agora_room_id) {
      local_agora_room_id = currentStateRef.current.agora_room_id;
    }

    return async () => {
      try {
        if (engine.current) {
          await engine.current.leaveChannel();
          await engine.current.destroy();
          engine.current = null;
        }
        if (rtmEngine.current) {
          // console.log(currentStateRef.current.agora_room_id);
          await rtmEngine.current.leaveChannel(local_agora_room_id);
          await rtmEngine.current.destroyClient();
          rtmEngine.current = null;
        }
      } catch (e) {
        // console.log(JSON.stringify(e));
      }
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (last10) {
      engine.current.playEffect(115, last10Sound, 0, 1, 0, 50, false);
      setShowExtend(true);
      animateTopNotice();
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft > 0) {
            return timeLeft - 1;
          } else {
            return 0;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [last10]);

  const leaveFunction = () => {
    if (currentState.state === 'JOINED_WAITING') {
      blindApi.leave(currentStateRef.current.agora_room_id, () => {
        // console.log('left');
      });
      hideModal();
      updateState('BLIND_ACTIVE');
      navigation.navigate('Home');
    } else if (currentState.state === 'JOINED_TALKING') {
      blindApi.end(
        user.id,
        currentStateRef.current.other_user_id,
        currentStateRef.current.blind_date_group_id,
        'CLICK_LEAVE',
        extended.current,
        0,
        currentStateRef.current.agora_room_id,
      );
      if (timeElapsed.current && timeElapsed.current > 120) {
        requestFeedback();
      } else {
        hideModal();
        updateState('BLIND_ACTIVE');
        navigation.navigate('Home');
      }
    }
  };

  const clickLeave = () => {
    if (currentState.state !== 'FEEDBACK') {
      logLeaveHappyHour(
        currentState.blind_date_group_id,
        currentState.state === 'JOINED_TALKING',
      );
      leaveFunction();
    }
  };

  const toggleMute = async () => {
    await engine.current.muteLocalAudioStream(!mute);
    setMute(!mute);
  };

  const toggleSpeaker = async () => {
    await engine.current.setEnableSpeakerphone(!speaker);
    setSpeaker(!speaker);
  };

  const toggleBg = async () => {
    if (bgMute) {
      await engine.current.resumeEffect(999);
    } else {
      await engine.current.pauseEffect(999);
    }
    setBgMute(!bgMute);
  };

  const showReportModal = () => {
    hideModal();
    setReportVisible(true);
  };

  const hideModal = () => {
    setReportVisible(false);
    setSureLeaveModal(false);
    setOtherLeaveVisible(false);
    setReportSuccessfulVisible(false);
  };

  const hideSurveyModal = () => {
    setSurveyVisible(false);
  };

  const endBlindDate = () => {
    logLeaveHappyHour(
      currentState.blind_date_group_id,
      currentState.state === 'JOINED_TALKING',
    );
    if (engine.current) {
      engine.current.leaveChannel();
    }
    updateState('BLIND_ACTIVE');
    setReportSuccessfulVisible(true);
  };

  const setInstaleTime = () => {
    inStaleTime.current = new Date(
      new Date().getTime() + currentStateRef.current.blind_date_duration * 1000,
    );
  };

  // DateGame
  const startGame = () => {
    blindApi.getQuestions(
      userData.user_id,
      currentStateRef.current.other_user_id,
      (res) => {
        setQuestions(res.data.questions);
        setIsGame(true);
        rtmEngine.current.sendMessageByChannelId(
          currentStateRef.current.agora_room_id,
          JSON.stringify(res.data.questions),
        );
        logQuizStart();
      },
    );
  };
  const endGame = () => {
    rtmEngine.current.sendMessageByChannelId(
      currentStateRef.current.agora_room_id,
      'END_QUIZ',
    );
    setIsGame(false);
    logQuizEnd();
  };
  const forceEndGame = () => {
    rtmEngine.current.sendMessageByChannelId(
      currentStateRef.current.agora_room_id,
      'QUIT_QUIZ',
    );
    setCurrentPoint(-1);
    setIsGame(false);
    logQuizLeave();
  };

  if (otherUserInfo === null) {
    return <LookingNextDate clickLeave={clickLeave} />;
  } else if (otherUserInfo && (accept === false || myAcceptState === false)) {
    return (
      <WantDateThem
        rtmEngine={rtmEngine}
        currentStateRef={currentStateRef}
        myAccept={myAccept}
        setMyAccept={setMyAccept}
        accept={accept}
        otherUserInfo={otherUserInfo}
        otherUserRef={otherUserRef}
        otherUserCards={otherUserCards}
        engine={engine}
        otherAgoraId={otherAgoraId}
        togglePlay={togglePlay}
        fillValue={fillValue}
        currentVoice={currentVoice}
        isPlay={isPlay}
        clickLeave={clickLeave}
        recordTime={recordTime}
        stopIntroPlayer={stopIntroPlayer}
        setInstaleTime={setInstaleTime}
        declineDate={() => {
          rtmEngine.current.sendMessageByChannelId(
            currentStateRef.current.agora_room_id,
            'KINDLY_DECLINE',
          );
          logHappyHourDecline(
            currentStateRef.current.blind_date_group_id,
            otherUserRef.current.user_info.user_id,
          );
          updateState('BLIND_ACTIVE');
          navigation.reset({
            index: 1,
            routes: [
              {name: 'TabNavigator'},
              {
                name: 'TimeOutScreen',
                params: {
                  otherUserName: null,
                  decline: null,
                },
              },
            ],
          });
        }}
      />
    );
  }
  return (
    <View style={styles.wrap}>
      {/* Connection issues */}
      {dateConnection && (
        <Animated.View
          style={[
            styles.modal,
            styles.issues,
            {top: slideTop, paddingTop: insets.top + 8},
          ]}>
          <Discon width={19} height={18} color={AppColors.white} />
          <Text style={styles.modalText}>
            {otherUserInfo && otherUserInfo.first_name} is having connectivity
            issues{'\n'}
            Let’s wait for 10 seconds…
          </Text>
          <View style={styles.width19} />
        </Animated.View>
      )}

      {/* Disconnected */}
      {dateDisconnected && (
        <Animated.View
          style={[
            styles.modal,
            styles.disconnected,
            {top: slideTop, paddingTop: insets.top + 8},
          ]}>
          <Discon width={19} height={18} color={AppColors.white} />
          <Text style={styles.modalText}>
            {otherUserInfo && otherUserInfo.first_name} is disconnected{'\n'}
            Let’s find you a new date!
          </Text>
          <View style={styles.width19} />
        </Animated.View>
      )}

      {/* Left the room */}
      {dateLeft && (
        <Animated.View
          style={[
            styles.modal,
            styles.leftRoom,
            {top: slideTop, paddingTop: insets.top + 8},
          ]}>
          <Text style={styles.modalText}>
            {otherUserInfo && otherUserInfo.first_name} left the room.{'\n'}
            Let’s find you a new date!
          </Text>
        </Animated.View>
      )}

      {showExtend && (
        <Animated.View
          style={[
            styles.timerTop,
            {top: slideTop, paddingTop: insets.top + 8},
          ]}>
          <Text style={styles.extendTitle}>Want to talk longer?</Text>
          {isPremium && (
            <Text style={[styles.extendPassText, styles.small]}>
              You have unlimited extends
            </Text>
          )}
          {!isPremium &&
            checkFlag(
              currentStateRef.current.blind_date_group_id + '_extend',
            ) === null && (
              <Text style={styles.extendPassText}>
                You have <Text style={styles.bold}>1</Text> free pass
              </Text>
            )}
          <TouchableOpacity
            style={styles.extendButton}
            onPress={() => {
              if (
                checkFlag(
                  currentStateRef.current.blind_date_group_id + '_extend',
                ) === null
              ) {
                setExtendLoader(true);
                logExtendRequestHappyHour(
                  currentStateRef.current.other_user_id,
                );
                rtmEngine.current.sendMessageByChannelId(
                  currentStateRef.current.agora_room_id,
                  'EXTEND_REQUEST',
                );
              } else {
                if (isPremium) {
                  setExtendLoader(true);
                  logExtendRequestHappyHour(
                    currentStateRef.current.other_user_id,
                  );
                  rtmEngine.current.sendMessageByChannelId(
                    currentStateRef.current.agora_room_id,
                    'EXTEND_REQUEST',
                  );
                } else {
                  navigation.navigate('BenefitsModal', {start: 0});
                }
              }
            }}>
            {extendLoader ? (
              <View style={styles.loader}>
                <LottieView
                  source={require('../Assets/Animation/loader_white.json')}
                  autoPlay
                  loop
                  style={styles.disableTouch}
                />
              </View>
            ) : (
              <View style={styles.extendRow}>
                <ClockIcon height={15} width={15} color={AppColors.white} />
                <Text style={styles.extendText}>Extend time</Text>
                <Text style={styles.time}>{formatTime(timeLeft)}</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}

      <BlindHeader
        bgMute={bgMute}
        toggleBg={toggleBg}
        extended={extended}
        otherUserInfo={otherUserInfo}
        showReportModal={showReportModal}
        speakEasy={speakEasy}
      />
      <SuggestionTopic
        topics={topics}
        voteTopic={voteTopic}
        joined={joined}
        userData={userData}
        otherUserInfo={otherUserInfo}
      />
      {/* {speakEasy ? (
        <SuggestionTopic
          topics={getCommunityTopics(speakEasy.speakeasy_code)}
          voteTopic={voteTopic}
          joined={joined}
          userData={userData}
          otherUserInfo={otherUserInfo}
        />
      ) : isGame ? (
        <DateGame
          endGame={endGame}
          forceEndGame={forceEndGame}
          questions={questions}
          currentPoint={currentPoint}
          setCurrentPoint={setCurrentPoint}
          submitState={submitState}
          nextState={nextState}
          selectedState={selectedState}
          isEnd={isEnd}
          setIsEnd={setIsEnd}
          sendSubmit={() => {
            rtmEngine.current.sendMessageByChannelId(
              currentStateRef.current.agora_room_id,
              'SUBMIT_ANSWER',
            );
            setNextState('');
            setSubmitState('');
            logQuizSubmitAnswer();
          }}
          sendNext={() => {
            rtmEngine.current.sendMessageByChannelId(
              currentStateRef.current.agora_room_id,
              'NEXT_QUESTION',
            );
            setNextState('');
            setSubmitState('');
            logQuizNextQuestion();
          }}
          sendSelected={(value) => {
            rtmEngine.current.sendMessageByChannelId(
              currentStateRef.current.agora_room_id,
              'SET_SELECTED_' + value,
            );
            logQuizClickAnswer();
          }}
        />
      ) : (
        <JustTalk
          otherUserInfo={otherUserInfo}
          userData={userData}
          joined={joined}
          startGame={startGame}
          currentPoint={currentPoint}
          isEnd={isEnd}
        />
      )} */}

      <BlindFooter
        setSureLeaveModal={setSureLeaveModal}
        clickLeave={clickLeave}
        mute={mute}
        toggleMute={toggleMute}
        otherUserInfo={otherUserInfo}
        toggleSpeaker={toggleSpeaker}
        speaker={speaker}
      />

      {/* Sure Leave Modal */}
      <Modal animationType="fade" transparent={true} visible={sureLeaveModal}>
        <SureLeaveModal
          hide={hideModal}
          showReportModal={showReportModal}
          clickLeave={clickLeave}
        />
      </Modal>
      {/* Report Modal */}
      <Modal animationType="fade" transparent={true} visible={reportVisible}>
        <ProfileMoreModal
          profile={otherUserInfo && {_id: otherUserInfo.user_id}}
          hide={hideModal}
          endBlindDate={endBlindDate}
        />
      </Modal>
      {/* Other User Leave Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={otherLeaveVisible}>
        <OtherLeaveModal
          name={otherUserInfo && otherUserInfo.first_name}
          showReportModal={showReportModal}
          hide={hideModal}
          navigation={navigation}
        />
      </Modal>
      {/* Report Succesful Modal */}
      {/* Other User Leave Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={reportSuccessfulVisible}>
        <ReportSuccesfulModal hide={hideModal} navigation={navigation} />
      </Modal>

      <Modal animationType="fade" transparent={true} visible={surveyVisible}>
        <SurveyModal hide={hideSurveyModal} leaveFunction={leaveFunction} />
      </Modal>

      {/* Extend Request Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={extendModalVisible}>
        <AlertModal hide={() => setExtendModalVisible(false)}>
          <View style={styles.extendModal}>
            <View style={styles.modalContent}>
              <Text style={styles.text1}>
                Your date requested to extend time.
              </Text>
              <Text style={styles.text2}>
                If you accept, there will be no time limit.
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    logExtendRejectHappyHour(
                      currentStateRef.current.other_user_id,
                    );
                    rtmEngine.current.sendMessageByChannelId(
                      currentStateRef.current.agora_room_id,
                      'EXTEND_REJECT',
                    );
                    setExtendModalVisible(false);
                  }}>
                  <Text style={styles.buttonText}>No, end date</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonYes]}
                  onPress={() => {
                    logExtendAcceptHappyHour(
                      currentStateRef.current.other_user_id,
                    );
                    rtmEngine.current.sendMessageByChannelId(
                      currentStateRef.current.agora_room_id,
                      'EXTEND_ACCEPT',
                    );
                    extended.current = true;
                    setShowExtend(false);
                    Animated.timing(slideTop, {
                      toValue: -300,
                      duration: 300,
                      useNativeDriver: false,
                    }).start();
                    setExtendModalVisible(false);
                  }}>
                  <Text style={[styles.buttonText, styles.buttonTextYes]}>
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AlertModal>
      </Modal>

      {/* Extend Request Reject Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={extendRejectVisible}>
        <AlertModal hide={() => setExtendRejectVisible(false)}>
          <View style={styles.extendModal}>
            <View style={styles.modalContent}>
              <Text style={styles.text1}>
                Your date didn’t respond to time extension.
              </Text>
              <Text style={styles.text2}>
                You can use the extend feature later on.
              </Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setExtendRejectVisible(false);
                  }}>
                  <Text style={styles.buttonText}>Okay, got it</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AlertModal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  timerTop: {
    alignItems: 'center',
    position: 'absolute',
    top: -300,
    left: 0,
    right: 0,
    marginBottom: 11,
    backgroundColor: AppColors.MainColor,
    paddingBottom: 24,
    justifyContent: 'center',
    zIndex: 10,
  },
  modal: {
    flexDirection: 'row',
    position: 'absolute',
    top: -300,
    left: 0,
    right: 0,
    marginBottom: 11,
    backgroundColor: AppColors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  issues: {
    backgroundColor: '#7B5CE3',
    paddingBottom: 16,
  },
  disconnected: {
    backgroundColor: '#5C9AE3',
    paddingBottom: 16,
  },
  leftRoom: {
    backgroundColor: '#AF5CE3',
    paddingBottom: 16,
  },
  linear: {
    width: '100%',
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  extendTitle: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    fontSize: 15,
    marginBottom: 2,
  },
  extendPassText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    height: 19,
    fontSize: 13,
  },
  small: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  extendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extendText: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    height: 20,
    fontSize: 14,
    marginLeft: 6,
  },
  extendButton: {
    borderWidth: 1,
    borderColor: AppColors.white,
    borderRadius: 21,
    height: 42,
    marginTop: 10,
    paddingVertical: 11,
    paddingHorizontal: 22,
    backgroundColor: '#E35CAA',
  },
  modalText: {
    color: AppColors.white,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
    fontSize: 14,
    marginHorizontal: 16,
  },
  time: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    fontSize: 14,
    marginLeft: 6,
  },
  width19: {
    width: 19,
  },
  loader: {
    width: 83,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disableTouch: {
    width: 37,
  },
  extendModal: {
    justifyContent: 'center',
  },
  modalContent: {
    paddingTop: 31,
    paddingBottom: 18,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  text1: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 16,
    color: AppColors.AppBlack,
  },
  text2: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    textAlign: 'center',
    color: AppColors.AppBlack,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginLeft: -10,
    marginRight: -10,
  },
  modalButton: {
    textAlign: 'center',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EA',
    flex: 1,
    marginHorizontal: 10,
  },
  modalButtonYes: {
    backgroundColor: AppColors.purple,
  },
  buttonText: {
    lineHeight: 17,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
  },
  buttonTextYes: {
    color: AppColors.white,
  },
});

export default BlindDateScreen;
