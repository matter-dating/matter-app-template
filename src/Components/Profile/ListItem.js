import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import HideIcon from '../../Assets/Svg/HideIcon';
import Colors from '../../Utils/Colors';

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
import Cake from '../../Assets/Svg/New/Cake';
import Education from '../../Assets/Svg/New/Education';
import JobIcon from '../../Assets/Svg/JobIcon';
import EducationIcon from '../../Assets/Svg/EducationIcon';
import Gender from '../../Assets/Svg/New/Gender';
import Name from '../../Assets/Svg/New/Name';
import Location from '../../Assets/Svg/New/Location';

import {dateToString, cmToInch, capitalize} from '../../Utils/Functions';

const ListItem = ({item, userInfo, setEditInfo, editable}) => {
  const [hidable, setHidable] = useState(
    !!item.hidable && item.hidable ? true : false,
  );
  const [show, setShow] = useState(
    userInfo.user_info[item.category_slug] &&
      userInfo.user_info[item.category_slug][item.question]
      ? userInfo.user_info[item.category_slug][item.question]['visible']
      : item.question === 'Birthday'
      ? userInfo.age_visible
      : true,
  );
  const listItem =
    userInfo.user_info[item.category_slug] &&
    userInfo.user_info[item.category_slug][item.question];

  useEffect(() => {
    setShow(
      userInfo.user_info[item.category_slug] &&
        userInfo.user_info[item.category_slug][item.question]
        ? userInfo.user_info[item.category_slug][item.question]['visible']
        : item.question === 'Birthday'
        ? userInfo.age_visible
        : true,
    );
  }, [userInfo]);

  const editItem = () => {
    setEditInfo(item);
  };

  const renderAnswer = () => {
    if (item.option_type === 'location') {
      return userInfo.location_name;
    }
    if (item.option_type === 'date') {
      return dateToString(userInfo.date_of_birth);
    }
    if (item.question === 'Name') {
      return userInfo.first_name;
    }
    if (item.question === 'Gender') {
      return capitalize(userInfo.gender);
    }
    if (listItem) {
      if (item.option_type === 'multi_input' && !!listItem.value) {
        const obj = JSON.parse(listItem.value);
        let val = '';
        let first = true;
        Object.entries(obj).forEach(([key, value]) => {
          let sep = first ? '' : ', ';
          if (value !== '') {
            val += sep + value;
          }
          first = false;
        });
        return val;
      }
      if (item.option_type === 'height') {
        return cmToInch(listItem.value);
      }
      if (item.question === 'Vaccinated') {
        return listItem.value + ' vaccinated';
      }
      return listItem.value;
    }
    return '';
  };

  const renderInfoIcon = () => {
    switch (item.question) {
      case 'Hometown':
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
      case 'Education level':
        return <Education width={22} height={15} color={Colors.black} />;
      case 'Occupation':
        return <JobIcon width={22} height={15} color={Colors.black} />;
      case 'Birthday':
        return <Cake width={12} height={15} color={Colors.black} />;
      case 'School':
        return <EducationIcon width={22} height={15} color={Colors.black} />;
      case 'Name':
        return <Name width={22} height={15} color={Colors.black} />;
      case 'Gender':
        return <Gender width={22} height={20} color={Colors.black} />;
      case 'Location':
        return <Location width={22} height={15} color={Colors.black} />;
      case 'Vaccinated':
        return <Vaccine width={22} height={15} color={Colors.black} />;
      default:
        return <></>;
    }
  };
  const renderItem = (
    <View style={styles.item}>
      <View style={styles.icon}>{renderInfoIcon()}</View>
      <Text numberOfLines={1} style={styles.itemName}>
        {item.question}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          styles.itemValue,
          setEditInfo && styles.value,
          !!item && item.option_type === 'location' && styles.disable,
        ]}>
        {renderAnswer()}
        {/* {listItem && listItem.value} */}
      </Text>
      {hidable ? (
        <View style={styles.empty}>
          {show ? (
            <></>
          ) : (
            <HideIcon width={20} height={20} color={Colors.black + '33'} />
          )}
        </View>
      ) : (
        <View style={styles.empty} />
      )}
    </View>
  );

  if (editable) {
    return <TouchableOpacity onPress={editItem}>{renderItem}</TouchableOpacity>;
  }
  return renderItem;
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  icon: {
    marginRight: 15,
    width: 22,
    alignItems: 'center',
  },
  itemName: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
    flex: 1,
  },
  empty: {
    width: 40,
    height: 20,
    paddingLeft: 20,
  },
  itemValue: {
    flex: 1,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginLeft: 20,
    color: Colors.MainColor1 + '80',
  },
  value: {
    color: Colors.MainColor1 + 'B8',
  },
  disable: {
    color: Colors.MainColor1 + '66',
  },
});
export default ListItem;
