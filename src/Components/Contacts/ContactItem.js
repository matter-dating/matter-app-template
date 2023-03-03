import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

const ContactItem = ({leftElement, title, description, onPress}) => {
  const Component = onPress ? TouchableHighlight : View;
  return (
    <Component onPress={onPress} underlayColor="#f2f3f5">
      <View style={styles.itemContainer}>
        {leftElement ? (
          <View style={styles.leftElementContainer}>{leftElement}</View>
        ) : (
          <View />
        )}
        <View style={[styles.rightSectionContainer]}>
          <View style={styles.mainTitleContainer}>
            <Text style={styles.titleStyle}>{title}</Text>
            {description ? (
              <Text style={styles.descriptionStyle}>{description}</Text>
            ) : (
              <View />
            )}
          </View>
          <View />
        </View>
      </View>
    </Component>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    minHeight: 44,
    height: 63,
  },
  leftElementContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    paddingLeft: 13,
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: 'row',
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#515151',
  },
  mainTitleContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  descriptionStyle: {
    fontSize: 14,
    color: '#515151',
    marginLeft: 3,
  },
});

export default ContactItem;
