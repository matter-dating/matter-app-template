import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

const ItemReject = (props) => {
  const insets = useSafeArea();
  const bottomValue = insets.bottom > 12 ? insets.bottom + 62 : 74;
  const [bottomAnim] = useState(new Animated.Value(bottomValue));

  useEffect(() => {
    if (props.isHide) {
      Animated.timing(bottomAnim, {
        toValue: 18,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottomAnim, {
        toValue: bottomValue,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [props]);

  return (
    <Animated.View style={[styles.reject, props.style, {bottom: bottomAnim}]}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <DeleteIcon width={20} height={20} color={AppColors.white} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  reject: {
    borderRadius: 30,
    left: 30,
    bottom: 100,
    width: 50,
    height: 50,
    zIndex: 110,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 1,
    backgroundColor: AppColors.MainColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.22,
    elevation: 1,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemReject;
