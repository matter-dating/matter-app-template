import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import Icon from '../icon';
import { icons } from '../../assets';
import styles, { HEIGHT } from './styles';
import FilterIcon from '../../assets/FilterIcon';

const CustomToast = (props) => {
  const insets = useSafeArea();
  const { color, text, text1, text2, image, onClose, onClick, alert, error, icon } = props;

  const baseStyle = [
    styles.base,
    {
      paddingTop: insets.top,
    },
    !!alert && styles.alert, 
    !!error && styles.error, 
  ];

  const customClick = () => {
    if(!!onClick) {
      onClick();
    }
    onClose();
  }

  return (
    <View style={baseStyle}>
      <TouchableOpacity style={styles.touch} onPress={customClick}>
        <View style={styles.contentContainer}>
          <View style={styles.row}>
          {error && (
            <Icon style={styles.icon} source={icon} />
          )}
          {text1 !== undefined &&
            <View style={[styles.row, {marginBottom: 3}]}>
              <FilterIcon color="#FFFFFFB3" width={15} height={13} />
              <Text style={styles.text1} numberOfLines={1}>
                {text1}
              </Text>
            </View>
          }
          </View>
          {text2 !== undefined &&
            <Text style={styles.text2} numberOfLines={1}>
              {text2}
            </Text>
          }
        </View>
      </TouchableOpacity>
    </View>
  );
};

CustomToast.HEIGHT = HEIGHT;

export default CustomToast;
