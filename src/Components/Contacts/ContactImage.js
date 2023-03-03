import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

import AppColors from '../../Utils/AppColors';

const ContactImage = ({img, placeholder}) => {
  const renderImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={img} />
      </View>
    );
  };

  const renderPlaceholder = () => {
    return (
      <View style={styles.placeholderContainer}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          minimumFontScale={0.01}
          style={styles.placeholderText}>
          {placeholder}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {img ? renderImage() : renderPlaceholder()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 20,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dddddd',
    height: '100%',
    borderRadius: 20,
  },
  placeholderText: {
    fontWeight: '700',
    color: AppColors.white,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
});

export default ContactImage;
