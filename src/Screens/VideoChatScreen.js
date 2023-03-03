import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  LayoutAnimation,
} from 'react-native';
import RtcEngine, {
  AudioRemoteState,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
  VideoRenderMode,
} from 'react-native-agora';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../Providers/AuthProvider';

import Colors from '../Utils/Colors';
import CallIcon from '../Assets/Svg/CallIcon';
import VoiceIcon from '../Assets/Svg/VoiceIcon';
import MuteIcon from '../Assets/Svg/MuteIcon';
import VideoIcon from '../Assets/Svg/VideoIcon';
import HiddenCameraIcon from '../Assets/Svg/HiddenCameraIcon';
import RoundIcon from '../Assets/Svg/RoundIcon';
import {agora_app_id} from '../Utils/EnvironmentVariables';

const VideoChatScreen = ({route}) => {
  const insets = useSafeArea();
  // const [rotation] = useState(new Animated.Value(0));
  const [rotateOpacity] = useState(new Animated.Value(1));
  const {room_id, user_id, fname} = route.params;
  const [joined, setJoined] = useState(false);
  const [peerId, setPeerId] = useState(null);
  const peerRef = useRef(null);
  const [peerVideo, setPeerVideo] = useState(false);
  const [peerAudio, setPeerAudio] = useState(false);

  const {user, userData} = useAuth();
  const engine = useRef();
  const navigation = useNavigation();

  const [mute, setMute] = useState(false);
  const [hide, setHide] = useState(false);
  // const [filtered, setFiltered] = useState(true);

  useEffect(() => {
    const init_agora = async () => {
      engine.current = await RtcEngine.create(agora_app_id);
      await engine.current.enableVideo();
      await engine.current.startPreview();
      engine.current.addListener(
        'JoinChannelSuccess',
        (channel, uid, elapsed) => {
          engine.current.stopPreview();
          setJoined(true);
        },
      );
      engine.current.addListener('UserJoined', (uid, elapsed) => {
        setPeerId(uid);
        peerRef.current = uid;
      });
      engine.current.addListener('UserOffline', (uid, reason) => {
        setPeerId(null);
        peerRef.current = null;
      });
      engine.current.addListener(
        'RemoteVideoStateChanged',
        (uid, state, reason, elapsed) => {
          if (peerRef.current === uid) {
            if (state === VideoRemoteState.Stopped) {
              setPeerVideo(false);
            } else {
              setPeerVideo(true);
            }
          }
        },
      );

      engine.current.addListener(
        'RemoteAudioStateChanged',
        (uid, state, reason, elapsed) => {
          if (peerRef.current === uid) {
            if (state === AudioRemoteState.Stopped) {
              setPeerAudio(false);
            } else {
              setPeerAudio(true);
            }
          }
        },
      );
    };
    init_agora();
    return () => {
      if (engine.current) {
        engine.current.stopPreview();
        engine.current.leaveChannel();
        engine.current.destroy();
        engine.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!hide) {
      Animated.spring(rotateOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(rotateOpacity, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [hide]);

  useEffect(() => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 0.4,
      },
      update: {
        type: LayoutAnimation.Types.linear,
        springDamping: 0.4,
      },
    });
  }, [joined, peerId]);

  const joinChannel = async () => {
    const {token} = await user.callFunction('generateAgoraToken', [room_id]);
    await engine.current.stopPreview();
    await engine.current.joinChannelWithUserAccount(token, room_id, user.id);
  };

  // const rotate = rotation.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '180deg']
  // });

  const toggleMute = async () => {
    await engine.current.muteLocalAudioStream(!mute);
    setMute(!mute);
  };

  const switchCamera = async () => {
    if (!hide) {
      await engine.current.switchCamera();
    }
  };

  const toggleCamera = async () => {
    if (!joined) {
      if (hide) {
        await engine.current.startPreview();
      } else {
        await engine.current.stopPreview();
      }
    }
    await engine.current.enableLocalVideo(hide);
    setHide(!hide);
  };

  // const toggleFilter = () => {
  //   setFiltered(!filtered);
  // }

  const renderMyCam = () => {
    if (!hide) {
      return (
        <>
          <RtcLocalView.SurfaceView channelId={room_id} style={styles.myCam} />
          {joined && mute && (
            <View style={styles.smallMute}>
              <MuteIcon width={12} height={19} color={Colors.white} />
            </View>
          )}
        </>
      );
    } else {
      return (
        <View style={styles.myCam}>
          <View style={[styles.empty, joined && styles.column]}>
            <HiddenCameraIcon width={19} height={11} color={Colors.videoHide} />
            <Text style={[styles.off, joined && styles.centerOff]}>
              Your camera is off
            </Text>
          </View>
          {joined && mute && (
            <View style={styles.smallMute}>
              <MuteIcon width={12} height={19} color={Colors.white} />
            </View>
          )}
        </View>
      );
    }
  };

  const renderFilterStatus = () => {
    return <></>;
    // return (
    //   <TouchableOpacity style={[styles.peerAudio, {top: insets.top + 42}]} onPress={() => toggleFilter()}>
    //     <Text style={styles.filter}>Filter</Text>
    //     <Text style={[styles.off, filtered ? styles.filterOn : styles.filterOff]}>{filtered ? 'ON' : 'OFF'}</Text>
    //   </TouchableOpacity>
    // );
  };

  const renderPeerAudio = () => {
    return (
      <View
        style={[
          styles.peerAudio,
          !hide ? {top: insets.top + 98} : {top: insets.top + 42},
        ]}>
        <View style={styles.otherMute}>
          <MuteIcon width={9} height={13} color={Colors.white} />
        </View>
        <Text style={[styles.off]}>{fname}’s mic is off</Text>
      </View>
    );
  };

  const renderOtherCam = () => {
    if (peerId) {
      if (peerVideo) {
        return (
          <>
            <RtcRemoteView.SurfaceView
              uid={peerId}
              style={styles.myCam}
              channelId={room_id}
              renderMode={VideoRenderMode.Hidden}
            />
            {!hide && renderFilterStatus()}
            {!peerAudio && renderPeerAudio()}
          </>
        );
      } else {
        return (
          <View style={styles.myCam}>
            <View style={styles.empty}>
              <HiddenCameraIcon
                width={19}
                height={11}
                color={Colors.videoHide}
              />
              <Text style={[styles.off]}>{fname}’s camera is off</Text>
            </View>
            {!hide && renderFilterStatus()}
            {!peerAudio && renderPeerAudio()}
          </View>
        );
      }
    } else {
      return (
        <View style={styles.myCam}>
          <View style={styles.empty}>
            {!hide && renderFilterStatus()}
            <Text style={[styles.off]}>Waiting for {fname}</Text>
          </View>
        </View>
      );
    }
  };
  const bottomValue = insets.bottom > 30 ? 40 : 10;
  return (
    <View style={styles.wrap}>
      <View style={styles.container}>
        {joined ? (
          <View style={[styles.small, {paddingTop: insets.top + 42}]}>
            <View style={styles.smallCam}>{renderMyCam()}</View>
          </View>
        ) : (
          renderMyCam()
        )}
        {joined && renderOtherCam()}
        {/* {(joined && peerId && peerVideo) &&
        } */}
      </View>
      <Animated.View style={styles.options}>
        <View style={[styles.box, {paddingBottom: bottomValue}]}>
          <View style={styles.boxRow}>
            <TouchableOpacity
              style={styles.leave}
              onPress={() => navigation.goBack()}>
              <CallIcon color={Colors.white} width={26} height={26} />
            </TouchableOpacity>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.round, mute && styles.mute]}
                onPress={toggleMute}>
                {mute ? (
                  <MuteIcon width={14} height={19} color={Colors.white} />
                ) : (
                  <VoiceIcon width={14} height={19} color={Colors.white} />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.round, hide && styles.mute]}
                onPress={toggleCamera}>
                {hide ? (
                  <HiddenCameraIcon
                    width={17}
                    height={10}
                    color={Colors.white}
                  />
                ) : (
                  <VideoIcon width={17} height={10} color={Colors.white} />
                )}
              </TouchableOpacity>
              <Animated.View style={{opacity: rotateOpacity}}>
                <TouchableOpacity style={styles.round} onPress={switchCamera}>
                  <RoundIcon color={Colors.white} width={20} height={20} />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
          {!joined && (
            <TouchableOpacity
              style={[styles.button, styles.join]}
              onPress={joinChannel}>
              <Text style={styles.buttonText}>
                Join {!hide ? 'with' : 'without'} camera
              </Text>
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
    backgroundColor: Colors.MainColor1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  myCam: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  small: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 17,
    zIndex: 1,
  },
  smallCam: {
    width: 122,
    height: 189,
    overflow: 'hidden',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.MainColor1,
  },
  column: {
    paddingHorizontal: 14,
    flexDirection: 'column',
  },
  filterOn: {
    color: '#00FF1E',
  },
  filterOff: {
    color: Colors.red,
  },
  off: {
    marginLeft: 8,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  filter: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  centerOff: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
  },
  otherCam: {
    flex: 1,
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  leave: {
    backgroundColor: Colors.videoEnd,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  options: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 100,
    right: 0,
    backgroundColor: Colors.black + '8F',
  },
  click: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
  },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
  },
  hide: {
    opacity: 0,
  },
  box: {
    paddingHorizontal: 10,
  },
  boxRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 14,
  },
  join: {
    marginTop: 20,
  },
  buttonText: {
    color: Colors.white,
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
  },
  mute: {
    borderColor: Colors.mute + 'CC',
    backgroundColor: Colors.mute + 'CC',
  },
  smallMute: {
    backgroundColor: Colors.videoHide,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    bottom: 7,
    right: 7,
    position: 'absolute',
  },
  otherMute: {
    backgroundColor: Colors.videoHide,
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  peerAudio: {
    backgroundColor: Colors.black + '73',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    left: 16,
    position: 'absolute',
    paddingTop: 4,
    paddingBottom: 5,
    paddingHorizontal: 8,
    zIndex: 100,
  },
});

export default VideoChatScreen;
