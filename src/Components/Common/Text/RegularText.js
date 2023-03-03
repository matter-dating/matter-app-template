import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../../../Utils/Colors';

const RegularText = (props) => {
  return (
    <Text
      style={[styles.title, props.style]}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.MainColor,
    lineHeight: 20,
  },
});

export default RegularText;
