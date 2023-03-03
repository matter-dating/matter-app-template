import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppColors from '../../Utils/AppColors';
import StarIcon from '../../Assets/Svg/StarIcon';
import EndStarIcon from '../../Assets/Svg/EndStarIcon';

const GamePointSlider = ({score}) => {
  const [maxScore, setMaxScore] = useState(300);

  useEffect(() => {
    if (score >= 300) {
      if (score >= 600) {
        setMaxScore(900);
      } else {
        setMaxScore(600);
      }
    }
  }, [score]);

  const calclulateWidth = () => {
    return ((score / maxScore) * 100).toFixed(2) + '%';
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.here}>You are here</Text>
      <View style={styles.bar}>
        <View style={styles.endStar}>
          <EndStarIcon width={22} height={22} color={'#FFFF40'} />
        </View>
        <View style={[styles.progress, {width: calclulateWidth()}]} />
        <View style={[styles.star, {left: calclulateWidth()}]}>
          <StarIcon width={22} height={22} color={'#FFFF40'} />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.points}>{score} points</Text>
        <Text style={styles.max}>{maxScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingLeft: 2,
    paddingRight: 14,
    marginBottom: 50,
  },
  here: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 17,
    marginBottom: 4,
  },
  bar: {
    backgroundColor: '#9FF6FD',
    borderRadius: 8,
    height: 9,
    marginRight: 6,
    marginVertical: 7,
  },
  star: {
    position: 'absolute',
    top: -7,
    marginLeft: -11,
  },
  endStar: {
    position: 'absolute',
    right: 0,
    top: -6,
    marginRight: -11,
  },
  progress: {
    position: 'absolute',
    backgroundColor: '#F4F43D',
    borderRadius: 8,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  points: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFF40',
    lineHeight: 21,
  },
  max: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#9FF6FD',
    lineHeight: 21,
  },
});

export default GamePointSlider;
