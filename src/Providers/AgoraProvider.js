import React, {useContext, useEffect, useRef, useState} from 'react';
import RtmEngine from 'agora-react-native-rtm';

import {agora_app_id} from '../Utils/EnvironmentVariables';
import {useAuth} from './AuthProvider';
import {useBlindDate} from './BlindDateProvider';
import {useNavigation} from '@react-navigation/native';
import BlindDateQuery from '../Api/BlindDateQuery';

const AgoraContext = React.createContext(null);

const AgoraProvider = ({children}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const {updateState} = useBlindDate();

  const rtmEngine = useRef();
  const roomData = useRef();
  const [isSearching, setIsSearching] = useState(false);

  const blindApi = new BlindDateQuery();

  useEffect(() => {
    const init_agora = async () => {
      rtmEngine.current = new RtmEngine();
      rtmEngine.current.on('channelMemberJoined', (evt) => {
        let {channelId, uid} = evt;
        console.warn('rtm', channelId, uid);
        setIsSearching(false);
        updateState('JOINED_WAITING', roomData.current);
        navigation.navigate('BlindDateScreen');
      });

      const {rtmToken} = await user.callFunction('generateRtmToken', []);
      await rtmEngine.current
        .createClient(agora_app_id)
        .catch((e) => console.error('error0', JSON.stringify(e)));
      await rtmEngine.current
        .login({uid: user.id, token: rtmToken})
        .catch((e) => console.error('error1', JSON.stringify(e)));
    };

    if (user) {
      init_agora();
    }

    return async () => {
      if (rtmEngine.current) {
        rtmEngine.current.destroyClient();
        rtmEngine.current = null;
      }
    };
  }, [user]);

  const joinAgora = async (data) => {
    roomData.current = data;
    // console.log(data);
    await rtmEngine.currentCard
      .joinChannel(data.agora_info.agora_room_id)
      .catch((e) => console.error('error2', JSON.stringify(e)));
    setIsSearching(true);
    if (data.should_wait === false) {
      updateState('JOINED_WAITING', roomData.current);
      navigation.navigate('BlindDateScreen');
      setIsSearching(false);
    } else {
      navigation.navigate('Home');
    }
  };

  const leaveAgora = async () => {
    blindApi.leave(() => console.log('left'));
    await rtmEngine.current.leaveChannel(
      roomData.current.agora_info.agora_room_id,
    );
    setIsSearching(false);
  };

  return (
    <AgoraContext.Provider
      value={{
        joinAgora,
        rtmEngine,
        isSearching,
        leaveAgora,
      }}>
      {children}
    </AgoraContext.Provider>
  );
};

const useAgora = () => {
  const agora = useContext(AgoraContext);
  if (agora == null) {
    throw new Error('useAgora() called outside of a AgoraProvider?');
  }
  return agora;
};

export {AgoraProvider, useAgora};
