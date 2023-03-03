import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, StyleSheet, AppState, Platform} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Colors from '../Utils/Colors';
import HomeSwitch from '../Components/Home/HomeSwitch';
import {useAuth} from '../Providers/AuthProvider';
import {calculateUserStatus} from '../Utils/Functions';

function HomeScreen({navigation, route}) {
  const {scrollToTop} = route.params;
  const {updateLocation, user, userData, updateUserData, userInvitation} =
    useAuth();
  const isFocused = useIsFocused();
  const [locationAllowed, setLocationAllowed] = useState(null);
  const locationAllowedRef = useRef(null);
  const insets = useSafeArea();
  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
          //checkLocationPermission();
          await user.callFunction('updateUserField', [
            userData.user_id,
            'status',
            userNewStatus,
          ]);
          await updateUserData();
          if (userNewStatus === 7) {
            navigation.navigate('WaitList', {waitList: 'WaitList'});
          } else if (userNewStatus === 6) {
            navigation.navigate('WaitList', {waitList: 'BlackList'});
          } else if (userNewStatus === 5) {
            navigation.navigate('UnderAge');
          } else if (userNewStatus === 4) {
            navigation.navigate('BannedModal');
          } else if (userNewStatus === 3) {
            navigation.navigate('StrikeModal');
          } else if (userNewStatus === 2) {
            // console.log('NoLocation Home');
          } else if (userNewStatus === 1) {
            // console.log('Hidden Profile Home');
          } else if (userNewStatus === 11) {
            navigation.navigate('RegisterPhoto');
          } else if (userNewStatus === 0 || userNewStatus === 8) {
            // console.log('Normal Home:');
            navigation.navigate('TabNavigator');
          }
        }
      })();
    }
  }, [userInvitation]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    checkLocationPermission();
    if (user.customData) {
      if (user.customData.status === 7) {
        navigation.navigate('WaitList', {waitList: 'WaitList'});
      } else if (user.customData.status === 6) {
        navigation.navigate('WaitList', {waitList: 'BlackList'});
      } else if (user.customData.status === 5) {
        navigation.navigate('UnderAge');
      } else if (user.customData.status === 4) {
        navigation.navigate('BannedModal');
      } else if (user.customData.status === 3) {
        navigation.navigate('StrikeModal');
      } else if (user.customData.status === 2) {
        // console.log('NoLocation Home');
      } else if (user.customData.status === 1) {
        // console.log('Hidden Profile Home');
      } else if (user.customData.status === 11) {
        navigation.navigate('RegisterPhoto');
      } else if (user.customData.status === 0 || user.customData.status === 8) {
        // console.log('Normal Home:');
      }
    }
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active' && locationAllowedRef.current === false) {
      checkLocationPermission();
    }
  };

  const checkLocationPermission = async () => {
    updateLocation(
      () => {
        setLocationAllowed(true);
        locationAllowedRef.current = true;
      },
      () => {
        setLocationAllowed(false);
        locationAllowedRef.current = false;
      },
    );
  };

  if (locationAllowed === null) {
    return (
      <View style={styles.wrap}>
        <View style={styles.indicator}>
          <LottieView
            source={require('../Assets/Animation/image_loader.json')}
            autoPlay
            loop
            style={styles.disableTouch}
          />
        </View>
      </View>
    );
  }

  const paddingValue = Platform.OS === 'android' ? insets.top : 0;
  return (
    <View style={styles.wrap}>
      <View style={[styles.safe, {paddingTop: paddingValue}]}>
        <HomeSwitch
          scrollToTop={scrollToTop}
          locationAllowed={locationAllowed}
          userData={userData}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  safe: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disableTouch: {
    width: 300,
  },
});

export default HomeScreen;
