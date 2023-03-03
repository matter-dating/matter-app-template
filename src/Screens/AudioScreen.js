import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useBlindDate} from '../Providers/BlindDateProvider';
import {useAuth} from '../Providers/AuthProvider';
import BlindDateQuery from '../Api/BlindDateQuery';

import LiveRoom from '../Components/Audio/LiveRoom';
import BlindDating from '../Components/Audio/BlindDating';

import AppColors from '../Utils/AppColors';

function AudioScreen({navigation}) {
  const insets = useSafeArea();

  const {userData} = useAuth();

  const blindDate = new BlindDateQuery();
  const {updateState, currentState} = useBlindDate();
  const [blindDateStatus, setBlindDateStatus] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userData.location.coordinates) {
      blindDate.getBlindDate(userData.location.coordinates, (res) => {
        if (res.data.blind_date_status === 'now') {
          updateState('BLIND_ACTIVE', res.data);
        } else {
          updateState('NOT_ACTIVE');
        }
        setBlindDateStatus(res.data);
      });
    } else {
      updateState('NOT_ACTIVE');
    }
  }, []);

  const onRefresh = useCallback(() => {
    if (userData.location.coordinates) {
      blindDate.getBlindDate(userData.location.coordinates, (res) => {
        if (res.data.blind_date_status === 'now') {
          updateState('BLIND_ACTIVE', res.data);
        } else {
          updateState('NOT_ACTIVE');
        }
        setBlindDateStatus(res.data);
        setRefreshing(false);
      });
    } else {
      updateState('NOT_ACTIVE');
      setRefreshing(false);
    }
  }, []);
  const topValue = Platform.OS === 'android' ? insets.top : 0;
  return (
    <View style={styles.wrap}>
      <ImageBackground
        defaultSource={require('../Assets/Image/Empty/audio.png')}
        source={require('../Assets/Image/Empty/audio.png')}
        style={styles.bg}
        resizeMode="cover">
        <SafeAreaView style={styles.flex}>
          <ScrollView
            contentContainerStyle={{
              paddingTop: topValue,
            }}
            style={styles.flex}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <BlindDating
              currentState={currentState}
              blindDateStatus={blindDateStatus}
              onRefresh={onRefresh}
            />
            <LiveRoom />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: AppColors.backgroundColor1,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
});

export default AudioScreen;
