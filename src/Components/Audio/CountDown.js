import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CountDown from 'react-native-countdown-component';
import AppColors from '../../Utils/AppColors';

import dayjs from 'dayjs';
var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

const CountDownWrap = ({blindDateStatus}) => {
  const [time, setTime] = useState(0);
  const now = dayjs(new Date());

  useEffect(() => {
    if (blindDateStatus && blindDateStatus.status === 'scheduled') {
      const date1 = dayjs(blindDateStatus.start_time);
      setTime(date1.diff(now, 'second'));
    }
  }, [blindDateStatus]);

  return (
    <View>
      {blindDateStatus && blindDateStatus.status === 'scheduled' && (
        <>
          <Text style={styles.time}>
            {dayjs(blindDateStatus.start_time).format('ddd, MMM DD')}
            <Text style={styles.bar}> | </Text>
            {dayjs(blindDateStatus.start_time).format('h')} -
            {dayjs(blindDateStatus.end_time).format('h A')}
          </Text>
          {time > 0 && (
            <CountDown
              until={time}
              digitStyle={styles.digitStyle}
              digitTxtStyle={styles.digitTxtStyle}
              timeLabelStyle={styles.timeLabelStyle}
              timeToShow={['D', 'H', 'M', 'S']}
              timeLabels={{d: 'DAYS', h: 'HOURS', m: 'MINS', s: 'SECS'}}
              size={21}
            />
          )}
        </>
      )}
      {!blindDateStatus && <Text style={styles.time}>Coming soon</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  digitStyle: {
    backgroundColor: AppColors.white,
    marginBottom: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    width: 54,
    marginHorizontal: 7,
    height: 50,
  },
  digitTxtStyle: {
    fontSize: 21,
    fontFamily: 'Poppins-SemiBold',
    color: '#45AECED9',
  },
  timeLabelStyle: {
    marginBottom: 23,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + '8A',
  },
  time: {
    marginBottom: 23,
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: AppColors.AppBlack + 'D9',
  },
  bar: {
    color: AppColors.MainColor + 'D9',
  },
});

export default CountDownWrap;
