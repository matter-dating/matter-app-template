import {getInputRangeFromIndexes} from 'react-native-snap-carousel';

export function customScrollInterpolator(index, carouselProps) {
  const range = [1, 0, -1];
  const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
  const outputRange = range;
  return {inputRange, outputRange};
}

export function customAnimatedStyles(index, animatedValue, carouselProps) {
  return {
    zIndex: animatedValue.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-1, 1, -1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [0.9, 1, 0.9],
        }),
      },
      {
        translateX: animatedValue.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [20, 0, -20],
          extrapolate: 'clamp',
        }),
      },
    ],
  };
}
