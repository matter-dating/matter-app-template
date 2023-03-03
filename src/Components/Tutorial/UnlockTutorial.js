import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../../Utils/AppColors';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';

const UnlockTutorial = (props) => {
  const insets = useSafeArea();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [contentOpacity] = useState(new Animated.Value(0));
  const bottomValue = insets.bottom > 14 ? insets.bottom : 14;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: fadeAnim,
          paddingBottom: bottomValue,
        },
      ]}>
      <Animated.View
        style={{
          opacity: contentOpacity,
        }}>
        <View style={styles.flex}>
          <View style={styles.box}>
            <Text style={styles.text}>
              Texting will be unlocked after you send your first voice message.
            </Text>
            <View style={styles.buttonWrap}>
              <TouchableOpacity
                style={styles.tutorialButton}
                onPress={props.hide}>
                <Text style={styles.buttonText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.triangle} />
        </View>
        <View style={styles.center}>
          <TouchableOpacity style={styles.voice} onPress={props.hide}>
            <View style={styles.button}>
              <VoiceIcon width={23} height={36} color={AppColors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 101,
    elevation: 1,
  },
  button: {
    width: 61,
    height: 61,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
    borderRadius: 32,
  },
  voice: {
    backgroundColor: AppColors.white,
    width: 67,
    height: 67,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  center: {
    alignItems: 'center',
  },
  flex: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 18,
  },
  box: {
    maxWidth: 260,
    backgroundColor: '#EDF5F8',
    borderRadius: 18,
    paddingVertical: 29,
    paddingHorizontal: 22,
  },
  text: {
    marginTop: 5,
    marginBottom: 24,
    color: AppColors.AppBlack,
    fontSize: 17,
    lineHeight: 26,
    fontFamily: 'Poppins-Bold',
  },
  buttonWrap: {
    marginTop: 3,
    alignItems: 'flex-end',
  },
  tutorialButton: {
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    borderRadius: 24,
    paddingVertical: 11,
    paddingHorizontal: 38,
  },
  buttonText: {
    color: AppColors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 18,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#EDF5F8',
    position: 'absolute',
    bottom: -18,
    zIndex: 111,
  },
});

export default UnlockTutorial;
