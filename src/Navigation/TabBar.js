import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Easing,
  Animated,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Icons from '../Assets/Svg';
import AppColors from '../Utils/AppColors';

import {useAppContent} from '../Providers/AppContentProvider';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const TabBar = ({state, descriptors, navigation}) => {
  const {latestHappyHour} = useAppContent();
  const degree = useRef(new Animated.Value(0)).current;
  const insets = useSafeArea();
  const iconNames = ['HomeTab', 'ChatBottom', 'UserTab'];
  const tabNames = ['Explore', 'Talk', 'Profile'];
  const [blindDot, setBlindDot] = useState(
    latestHappyHour !== undefined &&
      latestHappyHour !== null &&
      latestHappyHour.isValid() &&
      latestHappyHour.status === 'happening',
  );
  const [chatDot, setChatDot] = useState(false);

  useEffect(() => {
    setBlindDot(
      latestHappyHour !== undefined &&
        latestHappyHour !== null &&
        latestHappyHour.isValid() &&
        latestHappyHour.status === 'happening',
    );
  }, [latestHappyHour]);

  const animated = () => {
    Animated.timing(degree, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      degree.setValue(0);
      animated();
    });
  };

  useEffect(() => {
    if (blindDot) {
      animated();
    }
  }, [blindDot]);

  const heightValue = () => {
    if (insets.bottom > 12) {
      return insets.bottom + 48;
    } else {
      return 60;
    }
  };

  const _degree = degree.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={[
        styles.tabWrapper,
        {
          height: heightValue(),
        },
      ]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          ReactNativeHapticFeedback.trigger('soft', options);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          } else if (index === 0) {
            navigation.navigate(route.name, {scrollToTop: true});
          }
        };

        const onLongPress = () => {
          ReactNativeHapticFeedback.trigger('soft', options);
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const renderIcon = () => {
          const Icon = Icons[iconNames[index]];
          return (
            <View style={styles.iconWrap}>
              <View style={styles.wrap}>
                {index === 0 && blindDot ? (
                  <Animated.Image
                    style={[styles.img, {transform: [{rotate: _degree}]}]}
                    source={require('../Assets/Image/me.png')}
                  />
                ) : (
                  <Icon
                    color={isFocused ? AppColors.MainColor : '#3F4852'}
                    active={isFocused}
                    width={21}
                    height={18}
                  />
                )}
                {index === 1 && chatDot && <View style={styles.dot} />}
              </View>
              <Text style={[styles.name, isFocused && styles.focusName]}>
                {tabNames[index]}
              </Text>
            </View>
          );
        };
        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.singleTab}
            activeOpacity={0.9}>
            {renderIcon()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
    paddingHorizontal: 16,
  },
  singleTab: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 8,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 38,
    width: '100%',
  },
  name: {
    fontSize: 11,
    lineHeight: 16,
    color: AppColors.AppBlack,
    marginTop: 4,
  },
  focusName: {
    color: '#45ADCC',
  },
  img: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: AppColors.red,
    position: 'absolute',
    top: -2,
    right: -2,
  },
});

export default TabBar;
