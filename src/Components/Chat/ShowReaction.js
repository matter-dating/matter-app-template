import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

import Reactions from '../../Assets/Reaction';
import AppColors from '../../Utils/AppColors';

const ReactionView = ({item}) => {
  const Value = JSON.parse(item.reaction).value;
  const Icon = Reactions[Value];
  const animatedValue = useRef(new Animated.Value(5)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 0,
      duration: 300,
      friction: 1,
      tension: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const bounce = {
    transform: [
      {translateY: animatedValue},
      {
        scaleX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
      {
        scaleY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  };
  return (
    <Animated.View style={bounce}>
      <View style={styles.reactionWrap}>
        <Icon
          width={17}
          height={Value === 'Reaction1' ? 13 : Value === 'Reaction5' ? 13 : 17}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  reactionWrap: {
    borderRadius: 12,
    height: 21,
    width: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.white,
  },
});

export default ReactionView;
