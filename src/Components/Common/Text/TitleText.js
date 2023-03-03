import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../../../Utils/Colors';

const TitleText = (props) => {
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
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: Colors.MainColor + 'F2',
    lineHeight: 21,
  },
});

export default TitleText;
