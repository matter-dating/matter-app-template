import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../Utils/Colors';
import HearthIcon from '../../Assets/Svg/ItemLikeIcon';

const ItemLike = (props) => {
  return (
    <TouchableOpacity style={styles.wrap} onPress={props.onPress}>
      <HearthIcon
        width={props.width ? props.width : 18}
        height={props.height ? props.height : 18}
        color={props.color ? props.color : Colors.MainColor}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemLike;
