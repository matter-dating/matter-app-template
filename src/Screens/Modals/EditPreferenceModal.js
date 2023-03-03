import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

// Height
import RangeSlider from 'rn-range-slider';

import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {
  capitalize,
  mileRender,
  ageToAge,
  cmToInch,
  cmToCm,
} from '../../Utils/Functions';
import MoreModal from './MoreModal';

import CheckBIcon from '../../Assets/Svg/CheckBIcon';
import {useAppFlag} from '../../Providers/AppFlagProvider';

const {height: screenHeight} = Dimensions.get('window');
const termsURL = 'https://matter.dating/about';

const EditPreferenceModal = ({editInfo, hide}) => {
  const {user, userData, updateUserData} = useAuth();
  const insets = useSafeArea();
  const {updateFlag} = useAppFlag();
  const ref = useRef(null);

  // Slider
  const [low, setLow] = useState(50);

  // Select
  const [activeItem, setActiveItem] = useState(null);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (editInfo.question === 'Looking for') {
      if (userData.interest === 'male' || userData.interest === 'female') {
        setActiveItem(userData.interest);
      } else {
        setActiveItem(['everyone']);
      }
    } else if (editInfo.question === 'Ethnicity') {
      setShowLearnMore(true);
    }
  }, []);

  useEffect(() => {
    if (typeof activeItem === 'object' && activeItem !== null) {
      if (editInfo.option_type === 'multi_select' && activeItem.length === 0) {
        setActiveItem(['Open to All']);
      }
    }
  }, [activeItem, editInfo]);

  useEffect(() => {
    var listItem =
      userData.preference[editInfo.category_slug] &&
      userData.preference[editInfo.category_slug][editInfo.question];
    if (!!listItem) {
      setActiveItem(listItem.value);
      if (
        editInfo.option_type === 'slider' &&
        editInfo.option_list.length === 1
      ) {
        if (ref) {
          ref.current.setLowValue(listItem.value);
        }
        setLow(listItem.value);
      }
    } else {
      if (editInfo.question !== 'Looking for') {
        if (
          editInfo.option_type === 'select' ||
          editInfo.option_type === 'multi_select'
        ) {
          setActiveItem(['Open to All']);
        }
      }
    }
  }, [editInfo]);

  const save = async () => {
    let field =
      'preference.' + editInfo.category_slug + '.' + editInfo.question;
    let fieldValue;
    if (!!activeItem) {
      if (editInfo.question === 'Looking for') {
        const match = {'Looking for': 'interest'};
        field = match[editInfo.question];
        fieldValue = activeItem;
        updateFlag(
          'should_reload_home',
          (Date.now() + 3 * 60 * 60 * 1000).toString(),
        );
      } else if (
        editInfo.question === 'Age range' ||
        editInfo.question === 'Height'
      ) {
        if (editInfo.question === 'Age range') {
          updateFlag(
            'should_reload_home',
            (Date.now() + 3 * 60 * 60 * 1000).toString(),
          );
        }
        fieldValue = {
          value:
            typeof activeItem === 'string'
              ? activeItem
              : JSON.stringify(activeItem),
          visible: true,
        };
      } else if (editInfo.question === 'Max distance') {
        fieldValue = {
          value: activeItem,
          visible: true,
        };
        updateFlag(
          'should_reload_home',
          (Date.now() + 3 * 60 * 60 * 1000).toString(),
        );
      } else {
        fieldValue = {
          value: activeItem,
          visible: true,
        };
      }

      await user.callFunction('updateUserField', [
        userData.user_id,
        field,
        fieldValue,
      ]);

      updateUserData();
    }
    hide();
  };

  const toggleItem = (item) => {
    setIsChanged(true);
    if (activeItem === item) {
      // setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  const addRemoveItem = (item) => {
    setIsChanged(true);
    if (!activeItem) {
      setActiveItem([item]);
    } else {
      if (item === 'Open to All') {
        setActiveItem(['Open to All']);
      } else {
        let r = activeItem;
        r.indexOf('Open to All') !== -1 &&
          r.splice(activeItem.indexOf('Open to All'), 1);
        r.indexOf(item) === -1
          ? r.push(item)
          : r.splice(activeItem.indexOf(item), 1);
        setActiveItem([...r]);
      }
    }
  };

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(termsURL);
    if (supported) {
      await Linking.openURL(termsURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${termsURL}`);
    }
  };

  return (
    <MoreModal borderLess={true} hide={() => hide(false)}>
      <View style={styles.header}>
        <Text style={styles.question} numberOfLines={1}>
          {editInfo.long_question ? editInfo.long_question : editInfo.question}
        </Text>
        <TouchableOpacity style={styles.close} onPress={hide}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {editInfo.option_type === 'select' && (
        <ScrollView style={styles.box}>
          {editInfo.option_list.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.item,
                  i + 1 === editInfo.option_list.length && styles.lastItem,
                  item === activeItem && styles.activeBox,
                ]}
                onPress={() => toggleItem(item)}>
                <Text
                  style={[
                    styles.text,
                    item === activeItem && styles.activeText,
                  ]}
                  numberOfLines={1}>
                  {capitalize(item)}
                </Text>
                {item === activeItem && (
                  <View style={styles.check}>
                    <CheckBIcon
                      width={16}
                      height={16}
                      color={AppColors.MainColor}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {editInfo.option_type === 'multi_select' && (
        <ScrollView style={styles.box}>
          {editInfo.option_list.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.item,
                  i + 1 === editInfo.option_list.length && styles.lastItem,
                  activeItem &&
                    activeItem.indexOf(item) !== -1 &&
                    styles.activeBox,
                ]}
                onPress={() => addRemoveItem(item)}>
                <Text style={styles.text} numberOfLines={1}>
                  {item}
                  {editInfo.question === 'Vaccinated' &&
                    item !== 'Open to All' &&
                    ' vaccinated'}
                </Text>
                {activeItem && activeItem.indexOf(item) !== -1 && (
                  <View style={styles.check}>
                    <CheckBIcon
                      width={16}
                      height={16}
                      color={AppColors.MainColor}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      {/* Max Distance */}
      {editInfo.option_type === 'slider' && editInfo.option_list.length === 1 && (
        <View style={styles.range}>
          <View style={styles.row} />
          <Text
            style={[styles.heightText, styles.activeText]}
            numberOfLines={1}>
            {mileRender(activeItem ? activeItem : 50)} mile
          </Text>
          <RangeSlider
            ref={ref}
            style={styles.range}
            rangeEnabled={false}
            min={1}
            max={101}
            initialLowValue={low}
            step={5}
            selectionColor={AppColors.MainColor}
            thumbColor={AppColors.MainColor}
            blankColor="#D7DADE"
            labelStyle={'none'}
            lineWidth={4}
            thumbRadius={10}
            thumbBorderWidth={0}
            onValueChanged={(small, high, fromUser) => {
              setIsChanged(true);
              setActiveItem(small);
            }}
          />
        </View>
      )}
      {/* Age range */}
      {editInfo.option_type === 'slider' && editInfo.option_list.length === 2 && (
        <View style={styles.range}>
          <View style={styles.row} />
          {activeItem && editInfo.question === 'Height' && (
            <>
              <Text
                style={[styles.heightText, styles.activeText]}
                numberOfLines={1}>
                {!!activeItem.low
                  ? cmToInch(activeItem.low) + ' - ' + cmToInch(activeItem.high)
                  : cmToInch(JSON.parse(activeItem).low) +
                    ' - ' +
                    cmToInch(JSON.parse(activeItem).high)}
              </Text>
              <Text
                style={[styles.heightText, styles.miniText]}
                numberOfLines={1}>
                {!!activeItem.low
                  ? '(' +
                    cmToCm(activeItem.low) +
                    ')   (' +
                    cmToCm(activeItem.high) +
                    ')'
                  : '(' +
                    cmToCm(JSON.parse(activeItem).low) +
                    ')   (' +
                    cmToCm(JSON.parse(activeItem).high) +
                    ')'}
              </Text>
            </>
          )}
          {!activeItem && editInfo.question === 'Height' && (
            <>
              <Text
                style={[styles.heightText, styles.activeText]}
                numberOfLines={1}>
                {cmToInch(90) + ' - ' + cmToInch(220)}
              </Text>
              <Text
                style={[styles.heightText, styles.miniText]}
                numberOfLines={1}>
                {'(' + cmToCm(90) + ')   (' + cmToCm(220) + ')'}
              </Text>
            </>
          )}
          {activeItem && editInfo.question !== 'Height' && (
            <Text
              style={[styles.heightText, styles.activeText]}
              numberOfLines={1}>
              {!!activeItem.low
                ? activeItem.low + ' - ' + ageToAge(activeItem.high)
                : JSON.parse(activeItem).low +
                  ' - ' +
                  ageToAge(JSON.parse(activeItem).high)}
            </Text>
          )}
          {!activeItem && editInfo.question !== 'Height' && (
            <Text
              style={[styles.heightText, styles.activeText]}
              numberOfLines={1}>
              {ageToAge(18) + ' - ' + ageToAge(65)}
            </Text>
          )}
          <RangeSlider
            style={styles.range}
            gravity={'top'}
            min={editInfo.question === 'Height' ? 90 : 18}
            max={editInfo.question === 'Height' ? 221 : 66}
            initialLowValue={
              userData.preference[editInfo.category_slug] &&
              userData.preference[editInfo.category_slug][editInfo.question] &&
              JSON.parse(
                userData.preference[editInfo.category_slug][editInfo.question]
                  .value,
              ).low
            }
            initialHighValue={
              userData.preference[editInfo.category_slug] &&
              userData.preference[editInfo.category_slug][editInfo.question] &&
              JSON.parse(
                userData.preference[editInfo.category_slug][editInfo.question]
                  .value,
              ).high
            }
            step={1}
            selectionColor={AppColors.MainColor}
            thumbColor={AppColors.MainColor}
            blankColor="#D7DADE"
            labelStyle={'none'}
            lineWidth={4}
            thumbRadius={10}
            thumbBorderWidth={0}
            onValueChanged={(small, high, fromUser) => {
              setIsChanged(true);
              setActiveItem({low: small, high: high});
            }}
          />
        </View>
      )}
      {showLearnMore && (
        <View style={styles.learn}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.learnLink}>Learn more </Text>
          </TouchableOpacity>
          <Text style={styles.learnText}>about this preference</Text>
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.button,
          isChanged && styles.colorButton,
          {marginBottom: -insets.bottom, paddingBottom: insets.bottom + 14},
        ]}
        onPress={save}>
        <Text style={[styles.save, isChanged && styles.colorSave]}>
          {isChanged ? 'Save and close' : 'Close'}
        </Text>
      </TouchableOpacity>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.MainColor1 + '29',
    paddingVertical: 20,
    alignItems: 'center',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  activeBox: {
    backgroundColor: AppColors.MainColor + '24',
  },
  check: {
    position: 'absolute',
    right: 17,
    top: 22,
  },
  box: {
    minHeight: 144,
    maxHeight: screenHeight / 2,
  },
  text: {
    color: Colors.MainColor1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
  },
  heightText: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 15,
  },
  row: {
    paddingBottom: 25,
  },
  activeText: {
    color: Colors.MainColor1,
    fontFamily: 'Poppins-Medium',
  },
  miniText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.MainColor1 + 'CC',
  },
  button: {
    backgroundColor: Colors.save,
    alignItems: 'center',
    paddingVertical: 14,
  },
  colorButton: {
    backgroundColor: AppColors.MainColor,
  },
  header: {
    backgroundColor: AppColors.MainColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
  },
  save: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.MainColor1,
  },
  colorSave: {
    color: AppColors.white,
  },
  close: {
    paddingHorizontal: 17,
  },
  question: {
    flex: 1,
    paddingHorizontal: 21,
    lineHeight: 23,
    fontSize: 16,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
  },
  range: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  cancel: {
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  learn: {
    backgroundColor: '#9B7EEE',
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  learnLink: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
  },
  learnText: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.white,
    fontFamily: 'Poppins-Light',
  },
});

export default EditPreferenceModal;
