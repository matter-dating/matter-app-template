import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';

function ListenModeEnd({navigation, route}) {
  const {trackProfile} = route.params;
  const insets = useSafeArea();
  const [rate, setRate] = useState(null);
  const [showDone, setShowDone] = useState(false);
  const {user} = useAuth();
  const ratingCompleted = (rating) => {
    setRate(rating);
  };

  const clickExit = () => {
    if (rate) {
      // console.log(rate);
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'TabNavigator'}],
    });
  };

  useEffect(() => {
    rate && setShowDone(true);
  }, [rate]);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <Image
          style={styles.logo}
          source={require('../../Assets/Image/matter_logo.png')}
        />
      </View>
      <View style={styles.body}>
        <Image
          style={styles.cloud}
          source={require('../../Assets/Image/cloud.png')}
        />
        <Text style={styles.text1}>
          You’ve heard all Voice Intros for today
        </Text>
        <Text style={styles.text2}>Please rate your experience</Text>
        <View style={styles.rating}>
          <Rating
            count={5}
            defaultRating={0}
            size={30}
            jumpValue={0.5}
            // type={'star'}
            showRating={false}
            tintColor={'#06607B'}
            onFinishRating={ratingCompleted}
          />
        </View>
      </View>
      <View style={[styles.absolute, {bottom: insets.bottom + 20}]}>
        <TouchableOpacity
          style={styles.listen}
          onPress={() => {
            navigation.navigate('ListenMode', {
              trackProfile: trackProfile,
              setPlayed: (index) => {
                trackProfile[index].user_info.is_played = true;
                user.callFunction('playedVoiceIntro', [
                  trackProfile[index].user_info.user_id,
                ]);
              },
            });
          }}>
          <Text style={styles.close}>Listen from beginning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clickExit}>
          <Text style={styles.close}>{showDone ? 'Save & Exit' : 'Exit'}</Text>
        </TouchableOpacity>
      </View>
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
  listen: {
    height: 45,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: AppColors.white,
    borderRadius: 23,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  absolute: {
    paddingTop: 19,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 53,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 27,
  },
  cloud: {
    width: 141,
    height: 96,
    marginBottom: 48,
  },
  text1: {
    color: AppColors.white,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 23,
    marginBottom: 7,
  },
  text2: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  rating: {
    marginVertical: 10,
  },
});

export default ListenModeEnd;
