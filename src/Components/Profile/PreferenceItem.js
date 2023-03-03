import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';

import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import AlertModal from '../../Screens/Modals/AlertModal';

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
import Global from '../../Assets/Svg/New/Global';

import {
  mileRender,
  capitalize,
  ageToAge,
  cmToInch,
} from '../../Utils/Functions';
import {useAppFlag} from '../../Providers/AppFlagProvider';

const PreferenceItem = ({
  item,
  userInfo,
  setEditInfo,
  editable,
  isEmpty,
  onOff,
  setComingVisible,
}) => {
  const {updateFlag} = useAppFlag();
  const {user, userData, updateUserData} = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const listItem =
    userInfo.preference[item.category_slug] &&
    userInfo.preference[item.category_slug][item.question];

  const [isGlobal, setIsGlobal] = useState(false);
  const renderAnswer = () => {
    if (item.question === 'Looking for') {
      return capitalize(userInfo.interest);
    }
    if (item.question === 'Global mode') {
      return isGlobal ? 'On' : 'Off';
    }
    if (listItem) {
      if (item.option_type === 'multi_select') {
        const obj = listItem.value;
        let val = '';
        let count = 0;
        Object.entries(obj).forEach(([key, value]) => {
          count++;
          if (count === Object.keys(obj).length) {
            val = val + value;
          } else {
            val = val + value + ', ';
          }
        });
        return val;
      }
      if (item.option_type === 'slider' && item.option_list.length === 1) {
        return mileRender(listItem.value) + ' mile';
      }
      if (item.option_type === 'slider' && item.option_list.length === 2) {
        const obj = JSON.parse(listItem.value);
        if (item.question === 'Height') {
          return cmToInch(obj.low) + '-' + cmToInch(obj.high);
        }
        return obj.low + '-' + ageToAge(obj.high);
      }
      return listItem.value;
    }
    if (
      item.category_slug === 'Lifestyle' ||
      item.category_slug === 'Secondary' ||
      item.question === 'Zodiac sign'
    ) {
      return 'Open to All';
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
      case 'Marijuana Use':
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
      case 'Age range':
        return <Cake width={12} height={15} color={Colors.black} />;
      case 'School':
        return <EducationIcon width={22} height={15} color={Colors.black} />;
      case 'Name':
        return <Name width={22} height={15} color={Colors.black} />;
      case 'Looking for':
        return <Gender width={22} height={20} color={Colors.black} />;
      case 'Max distance':
        return <Location width={22} height={15} color={Colors.black} />;
      case 'Global mode':
        return <Global width={22} height={15} color={Colors.black} />;
      case 'Vaccinated':
        return <Vaccine width={22} height={15} color={Colors.black} />;
      default:
        return <></>;
    }
  };

  const clickItem = () => {
    if (item.question === 'Global mode') {
      setModalVisible(true);
    } else {
      setEditInfo(item);
    }
  };

  const changeGlobal = async () => {
    const field = 'preference.Primary.Global mode';
    await user.callFunction('updateUserField', [
      userData.user_id,
      field,
      {
        value: !isGlobal,
      },
    ]);
    updateUserData();
    updateFlag(
      'should_reload_home',
      (Date.now() + 3 * 60 * 60 * 1000).toString(),
    );
    setModalVisible(false);
  };

  useEffect(() => {
    if (item.question === 'Global mode') {
      setIsGlobal(
        userInfo.preference[item.category_slug] &&
          userInfo.preference[item.category_slug][item.question]
          ? userInfo.preference[item.category_slug][item.question].value
          : false,
      );
    }
  }, [userData]);
  return (
    <TouchableOpacity
      style={onOff === 'preference_off' ? styles.inActive : styles.next}
      activeOpacity={0.5}
      onPress={() =>
        onOff !== 'preference_off' ? clickItem() : setComingVisible(true)
      }>
      <View style={styles.item}>
        <View style={styles.icon}>{renderInfoIcon()}</View>
        <Text numberOfLines={1} style={styles.itemName}>
          {item.question}
        </Text>
        <Text numberOfLines={1} style={styles.itemValue}>
          {renderAnswer()}
        </Text>
        <View style={styles.empty} />
      </View>

      {item.question === 'Global mode' && (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <AlertModal hide={() => setModalVisible(false)}>
            <View style={styles.modal}>
              <View style={styles.modalContent}>
                <Text style={styles.text1}>
                  Do you want to {isGlobal ? 'turn off' : 'turn on'} Global
                  mode?
                </Text>
                <Text style={styles.text2}>
                  {isGlobal
                    ? 'We will only show you people from your current location'
                    : 'We will show you people around the world!'}
                </Text>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={[styles.button, styles.firstButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={changeGlobal}>
                  <Text style={styles.buttonText}>
                    {isGlobal ? 'Turn off' : 'Turn on'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </AlertModal>
        </Modal>
      )}
    </TouchableOpacity>
  );
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
    color: Colors.MainColor1 + 'B8',
  },
  value: {
    color: Colors.MainColor1 + 'B8',
  },
  modal: {
    justifyContent: 'center',
  },
  modalContent: {
    paddingVertical: 44,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  text1: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
    marginBottom: 13,
    color: AppColors.MainColor1 + 'D9',
    textAlign: 'center',
  },
  text2: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    lineHeight: 22,
    textAlign: 'center',
    color: AppColors.MainColor1 + 'D9',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.MainColor1 + '29',
    flex: 1,
    height: 48,
    justifyContent: 'center',
  },
  firstButton: {
    borderRightWidth: 0.5,
    borderRightColor: Colors.MainColor1 + '29',
  },
  buttonText: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
  },
  inActive: {
    opacity: 0.5,
  },
  next: {
    opacity: 1,
  },
});

export default PreferenceItem;
