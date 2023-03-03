import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

import Icon from '../icon';
import { icons } from '../../assets';
import styles, { HEIGHT } from './styles';

import HearthIcon from '../../assets/HearthIcon';

const ImageToast = (props) => {
  const { color, text, image, image1, onClick, onClose, like, match , textBody, message } = props;
  const customClick = () => {
    if(!!onClick) {
      onClick();
    }
    onClose();
  }
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.base, match && {backgroundColor: '#CD94F4'}, message && {backgroundColor: '#9F94F4'}]} onPress={customClick}>
      <View style={styles.contentContainer}>
        <View style={[{flex: 1}, message ? styles.messageBody : styles.body]}>
          {image && (
            <View>
              <Image source={image} style={message ? styles.messageStyle : styles.icon} resizeMode='cover' />
              {like && (
                <View style={styles.like}>
                  <HearthIcon color="#FF4B7B" width={15} height={13} />
                </View>
              )}
            </View>
          )}
          {image1 && (
            <View>
              <Image source={image1} style={styles.icon1} resizeMode='cover' />
              <View style={[styles.like, styles.matchLike]}>
                <HearthIcon color="#FF4B7B" width={15} height={13} />
              </View>
            </View>
          )}
          <View style={{flex: 1}}>
          {text !== undefined &&
            <View>
              <Text style={styles.text} numberOfLines={1}>
                {text}
              </Text>
            </View>
          }
          {textBody !== undefined &&
            <View>
              <Text style={styles.bodyText} numberOfLines={1}>
                {textBody}
              </Text>
            </View>
          }
          </View>
          {message &&
          <>
            <View style={{marginHorizontal: 10}}>
              <Text style={styles.bodyText} numberOfLines={1}>
                Now
              </Text>
            </View>
          </>
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

ImageToast.HEIGHT = HEIGHT;

export default ImageToast;
