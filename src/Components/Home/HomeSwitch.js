/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/native';

import Colors from '../../Utils/Colors';
import HomeFeed from './HomeFeed';
import PhotoErrorFeed from './PhotoErrorFeed';
import LocationErrorFeed from './LocationErrorFeed';

import {useAppContent} from '../../Providers/AppContentProvider';
import {useBlindDate} from '../../Providers/BlindDateProvider';
import {useAppFlag} from '../../Providers/AppFlagProvider';

function HomeSwitch({locationAllowed, userData, scrollToTop}) {
  const navigation = useNavigation();
  const {latestHappyHour} = useAppContent();
  const {updateState, currentState} = useBlindDate();
  const {checkFlag, setFlag} = useAppFlag();
  const [showTutorial, setShowTutorial] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (checkFlag('home_tutorial') === null) {
      setShowTutorial(true);
    }
  });

  useEffect(() => {
    if (showTutorial) {
      navigation.navigate('HomeTutorial');
      setFlag('home_tutorial', 'true');
    }
  }, [showTutorial]);

  useEffect(() => {
    if (
      latestHappyHour &&
      latestHappyHour.isValid() &&
      latestHappyHour.status === 'happening'
    ) {
      if (
        currentState === undefined ||
        currentState.state === 'NOT_ACTIVE' ||
        currentState.state === 'BLIND_ACTIVE' ||
        currentState.state === 'JOINED_WAITING' ||
        currentState.state === 'JOINED_TALKING'
      ) {
        updateState('BLIND_ACTIVE', {
          blind_date_group_id: latestHappyHour._id.toString(),
          blind_date_duration: latestHappyHour.blind_date_duration,
          blind_date_end_time: latestHappyHour.end_time,
        });
      }
    } else {
      if (isFocused) {
        updateState('NOT_ACTIVE');
      }
      // setBlindDateStatus(latestHappyHour);
    }
  }, [latestHappyHour]);

  const errorModal = () => {
    if (!locationAllowed || userData.status === 2) {
      return <LocationErrorFeed />;
    } else if (userData.status === 8) {
      return <PhotoErrorFeed />;
    } else {
      return (
        <HomeFeed
          scrollToTop={scrollToTop}
          latestHappyHour={latestHappyHour}
          userData={userData}
        />
      );
    }
  };

  return (
    <View style={styles.wrap}>
      <SafeAreaView style={styles.flex}>{errorModal()}</SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: Colors.colorF56,
    flex: 1,
  },
  flex: {
    flex: 1,
  },
});

export default HomeSwitch;
