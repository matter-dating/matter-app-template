import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../Utils/AppColors';
import BlindTipModal from '../../Screens/Modals/BlindTipModal';

function addZeroBefore(n) {
  return (n < 10 ? '0' : '') + n;
}

const BlindDating = ({currentState, blindDateStatus, onRefresh}) => {
  const navigation = useNavigation();
  const [tipVisible, setTipVisible] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(null);
  const [isStart, setIsStart] = useState(false);

  const counter = () => {
    const timer = setInterval(() => {
      if (distance < 0) {
        clearInterval(timer);
        onRefresh();
      } else {
        setDate();
      }
    }, 1000);
    return () => clearInterval(timer);
  };

  useEffect(() => {
    if (distance && !isStart) {
      setIsStart(true);
      counter();
    } else {
      var num = distance;
      var hours = Math.floor(num / 3600);
      num %= 3600;
      var minutes = Math.floor(num / 60);
      var seconds = (num %= 60);

      setHours(addZeroBefore(hours));
      setMinutes(addZeroBefore(minutes));
      setSeconds(addZeroBefore(seconds));
    }
  }, [distance]);

  useEffect(() => {
    if (blindDateStatus && blindDateStatus.blind_date_to_start) {
      setDistance(blindDateStatus.blind_date_to_start * 60);
    }
  }, [blindDateStatus]);

  const setDate = () => {
    setDistance((distance) => distance - 1);
  };

  const hideModal = () => {
    setTipVisible(false);
  };

  const renderTimer = () => {
    if (blindDateStatus && blindDateStatus.blind_date_status === 'empty') {
      return <Text style={styles.soon}>COMING SOON</Text>;
    }
    if (blindDateStatus && blindDateStatus.blind_date_status === 'scheduled') {
      return (
        <View style={styles.row}>
          {renderDigits(hours, 'hours')}
          {renderDigits(minutes, 'min')}
          {renderDigits(seconds, 'sec')}
        </View>
      );
    }
  };

  const renderDigits = (n, txt) => {
    return (
      <View style={styles.center}>
        <View style={styles.row1}>
          <View style={styles.box1}>
            <Text style={styles.digit}>{n[0]}</Text>
          </View>
          <View style={styles.box1}>
            <Text style={styles.digit}>{n[1]}</Text>
          </View>
        </View>
        <Text style={styles.txt}>{txt}</Text>
      </View>
    );
  };

  return (
    <View style={styles.item}>
      <View style={styles.box}>
        <View style={styles.row}>
          <View style={styles.dot}>
            <Image
              style={styles.icon}
              source={require('../../Assets/Image/upcoming1.png')}
            />
          </View>
          <View style={styles.text}>
            <Text style={styles.title}>BLIND AUDIO DATING</Text>
            <Text style={styles.description}>Happy Hour in:</Text>
          </View>
          <View style={styles.dot} />
        </View>
        <View style={styles.status}>
          {currentState && currentState.state !== 'NOT_ACTIVE' && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('WaitingRoom')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#EDCC54', '#F889F9', '#B47DFF', '#5BD0FB']}
                style={styles.linear}>
                <Text style={styles.buttonText}>Join happy hour</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {currentState && currentState.state === 'NOT_ACTIVE' && renderTimer()}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => setTipVisible(true)}>
            <Text style={styles.seeTips}>See tips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.remind}>
            <Text style={styles.remindMe}>Remind me</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <BlindTipModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 31,
    width: '100%',
    paddingVertical: 28,
  },
  icon: {
    width: 31,
    marginTop: 2,
    height: 31,
  },
  row: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  center: {
    marginBottom: 12,
    alignItems: 'center',
  },
  row1: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 8,
    marginBottom: 12,
  },
  box1: {
    width: 29,
    height: 43,
    borderRadius: 4,
    backgroundColor: '#F0F6F8',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  txt: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack + 'A3',
    lineHeight: 21,
  },
  box: {
    borderRadius: 8,
    paddingVertical: 20,
    paddingBottom: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: AppColors.white,
    paddingHorizontal: 30,
  },
  dot: {
    marginHorizontal: 10,
    width: 31,
    height: 31,
  },
  text: {
    alignItems: 'center',
  },
  status: {
    marginVertical: 10,
  },
  soon: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 23,
    color: AppColors.new,
    paddingBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    lineHeight: 23,
    color: AppColors.new,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    lineHeight: 23,
    color: AppColors.new1,
    marginBottom: 6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  seeTips: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.new1 + 'F5',
    textDecorationLine: 'underline',
  },
  remind: {
    backgroundColor: AppColors.new2,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 'auto',
  },
  remindMe: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.new3,
  },
  linear: {
    padding: 14,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 20,
    fontSize: 14,
  },
  digit: {
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack,
    fontSize: 21,
  },
});

export default BlindDating;
