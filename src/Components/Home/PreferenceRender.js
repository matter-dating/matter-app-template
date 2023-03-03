import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

import HomeTown from '../../Assets/Svg/New/HomeTown';
import Height from '../../Assets/Svg/New/Height';
import Vaccine from '../../Assets/Svg/New/Vaccine';
import Religion from '../../Assets/Svg/New/Religion';
import Ethnicity from '../../Assets/Svg/New/Ethnicity';
import Children from '../../Assets/Svg/New/Children';
import WantChildren from '../../Assets/Svg/New/WantChildren';
import Political from '../../Assets/Svg/New/Political';
import Smoke from '../../Assets/Svg/New/Smoke';
import Drink from '../../Assets/Svg/New/Drink';
import Marijuana from '../../Assets/Svg/New/Marijuana';
import Drug from '../../Assets/Svg/New/Drug';
import Exercise from '../../Assets/Svg/New/Exercise';
import Zodiac from '../../Assets/Svg/New/Zodiac';

import {cmToInch, cmToCm} from '../../Utils/Functions';

const PreferenceRender = ({item, userInfo}) => {
  const listItem =
    userInfo.user_info[item.category_slug] &&
    userInfo.user_info[item.category_slug][item.question];

  const renderInfoIcon = () => {
    switch (item.question) {
      case 'HomeTown':
        return <HomeTown width={22} height={15} color={Colors.black} />;
      case 'Height':
        return <Height width={22} height={15} color={Colors.black} />;
      case 'Religion':
        return <Religion width={22} height={15} color={Colors.black} />;
      case 'Ethnicity':
        return <Ethnicity width={22} height={15} color={Colors.black} />;
      case 'Have children':
        return <Children width={22} height={15} color={Colors.black} />;
      case 'Want children':
        return <WantChildren width={22} height={15} color={Colors.black} />;
      case 'Politics':
        return <Political width={22} height={15} color={Colors.black} />;
      case 'Smoking':
        return <Smoke width={22} height={15} color={Colors.black} />;
      case 'Drinking':
        return <Drink width={22} height={15} color={Colors.black} />;
      case 'Marijuana use':
        return <Marijuana width={22} height={15} color={Colors.black} />;
      case 'Drug use':
        return <Drug width={22} height={15} color={Colors.black} />;
      case 'Exercise':
        return <Exercise width={22} height={15} color={Colors.black} />;
      case 'Zodiac sign':
        return <Zodiac width={22} height={15} color={Colors.black} />;
      case 'Vaccinated':
        return <Vaccine width={22} height={15} color={Colors.black} />;
      default:
        return <></>;
    }
  };

  const renderAnswer = () => {
    if (item.option_type === 'multi_input') {
      return <></>;
    }
    if (item.option_type === 'date') {
      return <></>;
    }
    if (item.question === 'Education level') {
      return <></>;
    }
    if (item.question === 'Name') {
      return <></>;
    }
    if (item.question === 'Gender') {
      return <></>;
    }
    if (listItem && listItem.visible) {
      return (
        <View style={styles.horizontalItem}>
          {renderInfoIcon()}
          <Text numberOfLines={1} style={styles.itemValue}>
            {item.option_type === 'height'
              ? cmToInch(listItem.value) + ' ( ' + cmToCm(listItem.value) + ' )'
              : listItem.value}
          </Text>
        </View>
      );
    }
    return <></>;
  };
  return renderAnswer();
};

const styles = StyleSheet.create({
  horizontalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    marginRight: 18,
  },
  itemValue: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginLeft: 8,
    marginRight: 10,
    color: AppColors.IconColor,
  },
});

export default PreferenceRender;
