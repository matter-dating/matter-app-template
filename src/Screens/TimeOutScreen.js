import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import BlindDateQuery from '../Api/BlindDateQuery';
import {useAuth} from '../Providers/AuthProvider';
import {useBlindDate} from '../Providers/BlindDateProvider';
import {usePremium} from '../Providers/PremiumProvider';
import { logJoinHappyHour } from '../Utils/Analytics';
import AppColors from '../Utils/AppColors';

function TimeOutScreen({navigation, route}) {
  const {otherUserName, decline} = route.params;
  const insets = useSafeArea();
  const [fillAnim] = useState(new Animated.Value(0));
  const blindApi = new BlindDateQuery();
  const {userData, getBlindDateMatches} = useAuth();
  const {currentState, updateState} = useBlindDate();
  const {isPremium, expirationDate, processPurchases} = usePremium();
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fillAnim, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      }).start(() => {
        processPurchases();
        blindApi.join(
          userData,
          currentState.blind_date_group_id,
          null,
          expirationDate.current,
          (res) => {
            if (res.extra_data && res.extra_data.reason) {
              updateState('NOT_ACTIVE');
              if (res.extra_data.reason === 'MATCH_LIMIT_REACHED') {
                if (isPremium) {
                  navigation.navigate('EndHappyHour', {
                    blindMatches: getBlindDateMatches(
                      currentState.blind_date_group_id,
                    ),
                  });
                } else {
                  navigation.navigate('ReachedModal');
                }
              } else if (res.extra_data.reason === 'ENDED') {
                navigation.navigate('EndHappyHour', {
                  blindMatches: getBlindDateMatches(
                    currentState.blind_date_group_id,
                  ),
                });
              }
            } else {
              logJoinHappyHour(currentState.blind_date_group_id);
              updateState('JOINED_WAITING', res.data);
              navigation.navigate('BlindDateScreen');
            }
          },
        );
      });
    }, 1000);
  }, []);
  const widthAnimation = fillAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={styles.wrap}>
      <View style={styles.empty} />
      <View style={styles.container}>
        {otherUserName &&
          (decline ? (
            <Text style={styles.title}>{otherUserName} kindly declined</Text>
          ) : (
            <Text style={styles.title}>{otherUserName} did not respond</Text>
          ))}
        <Text style={styles.text}>Showing you the next suggested match</Text>
        <View style={styles.barWrap}>
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
        </View>
      </View>
      <TouchableOpacity
        style={[styles.exit, {marginBottom: insets.bottom + 20}]}
        onPress={() => {}}>
        {/* <Text style={styles.exitText}></Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.MainColor,
    justifyContent: 'space-between',
  },
  empty: {
    padding: 30,
  },
  container: {
    alignItems: 'center',
  },
  exit: {
    alignItems: 'center',
    paddingTop: 20,
  },
  exitText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  title: {
    color: AppColors.white,
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 14,
    fontFamily: 'Poppins-Medium',
  },
  text: {
    color: AppColors.white,
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
  },
  barWrap: {
    paddingHorizontal: 68,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 30,
  },
  bar: {
    backgroundColor: '#A4DCED',
    borderRadius: 12,
    height: 4,
    width: '100%',
  },
  progress: {
    position: 'absolute',
    backgroundColor: AppColors.white,
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
});

export default TimeOutScreen;
