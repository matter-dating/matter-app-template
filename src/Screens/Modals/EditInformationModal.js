import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Switch,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

// Date
import DateTimePicker from '@react-native-community/datetimepicker';
// Height
import RangeSlider from 'rn-range-slider';

import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {cmToInch, cmToCm, capitalize} from '../../Utils/Functions';
import MoreModal from './MoreModal';

import CheckBIcon from '../../Assets/Svg/CheckBIcon';
import {useAppFlag} from '../../Providers/AppFlagProvider';

const {height: screenHeight} = Dimensions.get('window');

const EditInformationModal = ({editInfo, hide}) => {
  const [show, setShow] = useState(true);
  const [initShow, setInitShow] = useState(true);
  const {user, userData, updateUserData} = useAuth();
  const insets = useSafeArea();
  const {updateFlag} = useAppFlag();
  // Select
  const [activeItem, setActiveItem] = useState(null);
  const [initItem, setInitItem] = useState(null);
  // Birthday
  var now = new Date();
  const [date, setDate] = useState(userData.date_of_birth);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setActiveItem(currentDate);
  };

  // Height
  const [isCm, setIsCm] = useState(false);

  // Multi Input
  const [multiAnswer, setMultiAnswer] = useState(null);

  // Name

  useEffect(() => {
    var listItem =
      userData.user_info[editInfo.category_slug] &&
      userData.user_info[editInfo.category_slug][editInfo.question];
    if (listItem) {
      setShow(listItem.visible);
      setInitShow(listItem.visible);
      // setShow(userInfo.user_info[item.category_slug][item.question]['visible'] : (item.question === 'Birthday' ? userInfo.age_visible : true)
      setActiveItem(listItem.value);
      setInitItem(listItem.value);
      if (editInfo.option_type === 'multi_input') {
        setMultiAnswer(JSON.parse(listItem.value));
      }
    }
  }, [editInfo]);

  const save = async () => {
    const field =
      'user_info.' + editInfo.category_slug + '.' + editInfo.question;
    let docValue;
    if (activeItem === initItem && show === initShow) {
      hide();
    } else {
      if (
        editInfo.question === 'Name' ||
        editInfo.question === 'Gender' ||
        editInfo.question === 'Birthday'
      ) {
        if (editInfo.question === 'Gender') {
          updateFlag(
            'should_reload_home',
            (Date.now() + 3 * 60 * 60 * 1000).toString(),
          );
        }
        const match = {
          Name: 'first_name',
          Gender: 'gender',
          Birthday: 'date_of_birth',
        };
        if (editInfo.question === 'Gender') {
          docValue = activeItem.toLowerCase();
        } else if (editInfo.question === 'Birthday') {
          docValue = activeItem.toString();
        } else {
          docValue = activeItem;
          if (docValue.length < 3) {
            return false;
          }
        }
        await user.callFunction('updateUserField', [
          userData.user_id,
          match[editInfo.question],
          docValue,
        ]);
      } else {
        await user.callFunction('updateUserField', [
          userData.user_id,
          field,
          {
            value: activeItem,
            visible: show,
          },
        ]);
      }
      updateUserData();
      hide();
    }
  };

  const toggleItem = (item) => {
    if (activeItem === item) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  // const saveVisible = async (show) => {
  //   const field = "user_info." + editInfo.category_slug + '.' + editInfo.question
  //   const mongo = user.mongoClient("mongodb-atlas");
  //   const collection = mongo.db("matter").collection("User");
  //   const filter = {
  //     user_id: userData.user_id, // Query for the user object of the logged in user
  //   };
  //   let updateDoc;

  //   if (editInfo.hidable && activeItem){
  //     updateDoc = {
  //       $set: {
  //         [field]: {
  //             value: listItem.value,
  //             visible: !show
  //           }
  //       },
  //     };pedi
  //     const result = await collection.updateOne(filter, updateDoc);
  //     modifiedCount = await result.modifiedCount;
  //     if(modifiedCount === 1) {
  //       setShow(!show);
  //       setTimeout(function(){setLoading(false)}, 500);
  //       updateUserData();
  //     }
  //   } else if (editInfo.question === 'Birthday'){
  //     updateDoc = {
  //       $set: {
  //         ['age_visible']: !show
  //       },
  //     };
  //     const result = await collection.updateOne(filter, updateDoc);
  //     modifiedCount = await result.modifiedCount;
  //     if(modifiedCount === 1) {
  //       setShow(!show);
  //       setTimeout(function(){setLoading(false)}, 500);
  //       updateUserData();
  //     }
  //   } else {
  //     setTimeout(function(){setLoading(false)}, 500);
  //   }
  // }

  const visibleToggle = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (editInfo.question === 'Name') {
      setActiveItem(userData.first_name);
    }
    if (editInfo.option_type === 'date') {
      setDate(userData.date_of_birth);
    }
    if (editInfo.question === 'Gender') {
      setActiveItem(userData.gender);
    }
  }, []);

  useEffect(() => {
    if (multiAnswer) {
      setActiveItem(JSON.stringify(multiAnswer));
    }
  }, [multiAnswer]);

  const offset = new Date().getTimezoneOffset() * -1;
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
                  item === capitalize(activeItem) && styles.activeBox,
                ]}
                onPress={() => toggleItem(item)}>
                <Text style={styles.text} numberOfLines={1}>
                  {item}
                  {editInfo.question === 'Vaccinated' && ' vaccinated'}
                </Text>
                {item === capitalize(activeItem) && (
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

      {editInfo.option_type === 'date' && (
        <DateTimePicker
          testID="dateofBirth"
          value={date}
          mode={'date'}
          timeZoneOffsetInMinutes={offset}
          textColor={Colors.MainColor}
          minimumDate={
            new Date(new Date().setFullYear(now.getFullYear() - 100))
          }
          maximumDate={new Date(new Date().setFullYear(now.getFullYear() - 18))}
          display="spinner"
          onChange={onChange}
        />
      )}

      {editInfo.option_type === 'height' && (
        <View style={styles.range}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.tab} onPress={() => setIsCm(false)}>
              <Text style={[styles.tabText, !isCm && styles.tabActiveText]}>
                Inch
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={() => setIsCm(true)}>
              <Text style={[styles.tabText, isCm && styles.tabActiveText]}>
                Cm
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[styles.heightText, styles.heightActiveText]}
            numberOfLines={1}>
            {isCm
              ? cmToCm(activeItem ? activeItem : 170)
              : cmToInch(activeItem ? activeItem : 170)}
          </Text>
          <RangeSlider
            style={styles.range}
            rangeEnabled={false}
            min={90}
            max={221}
            initialLowValue={
              userData.user_info[editInfo.category_slug] &&
              userData.user_info[editInfo.category_slug][editInfo.question]
                ? userData.user_info[editInfo.category_slug][editInfo.question]
                    .value
                : 170
            }
            step={1}
            selectionColor={AppColors.MainColor}
            thumbColor={AppColors.MainColor}
            blankColor="#D7DADE"
            labelStyle={'none'}
            lineWidth={4}
            thumbRadius={10}
            thumbBorderWidth={0}
            onValueChanged={(low, high, fromUser) => {
              setActiveItem(low);
            }}
          />
        </View>
      )}

      {editInfo.option_type === 'multi_input' && (
        <View style={styles.box}>
          {editInfo.option_list.map((item, i) => {
            return (
              <View key={i} style={[styles.item, styles.inputRow]}>
                <Text style={styles.inputItem} numberOfLines={1}>
                  {item}
                </Text>
                <TextInput
                  value={multiAnswer ? multiAnswer[item] : ''}
                  style={styles.input}
                  onChangeText={(text) =>
                    setMultiAnswer({...multiAnswer, [item]: text})
                  }
                  multiline={false}
                  numberOfLines={1}
                  placeholderTextColor={Colors.MainColor + 'A3'}
                  placeholder={'Enter ' + item}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  maxLength={150}
                />
              </View>
            );
          })}
        </View>
      )}

      {editInfo.option_type === 'text' && (
        <View style={styles.box}>
          <View style={[styles.item, styles.inputRow]}>
            <Text style={styles.inputItem} numberOfLines={1}>
              {editInfo.question}
            </Text>
            <TextInput
              value={activeItem}
              style={styles.input}
              onChangeText={(text) => {
                setActiveItem(text);
              }}
              multiline={false}
              numberOfLines={1}
              placeholderTextColor={Colors.MainColor + 'A3'}
              placeholder="Enter your name..."
              returnKeyType="done"
              blurOnSubmit={true}
              maxLength={150}
            />
          </View>
          {editInfo.question === 'Name' &&
            (!activeItem || activeItem.length < 3) && (
              <Text style={styles.error}>
                Name must be longer than 3 letters
              </Text>
            )}
        </View>
      )}

      {editInfo.hidable && (
        <View style={styles.hide}>
          <Text style={styles.itemText}>Visible on profile</Text>
          <Switch
            style={styles.switch}
            trackColor={{false: Colors.disable, true: Colors.enable}}
            thumbColor={Colors.white}
            ios_backgroundColor={Colors.disable}
            onValueChange={() => visibleToggle()}
            value={show}
          />
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.button,
          {marginBottom: -insets.bottom, paddingBottom: insets.bottom + 14},
        ]}
        onPress={save}>
        <Text style={styles.save}>
          {activeItem !== initItem || show !== initShow
            ? 'Save & close'
            : 'Close'}
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
  activeBox: {
    backgroundColor: AppColors.MainColor + '24',
  },
  check: {
    position: 'absolute',
    right: 17,
    top: 22,
  },
  lastItem: {
    borderBottomWidth: 0,
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
  heightActiveText: {
    color: Colors.MainColor1,
    fontFamily: 'Poppins-Medium',
  },
  inputItem: {
    color: Colors.MainColor1,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    width: 100,
  },
  heightText: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: AppColors.save,
    paddingVertical: 14,
    alignItems: 'center',
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
  close: {
    paddingHorizontal: 20,
  },
  question: {
    flex: 1,
    paddingHorizontal: 21,
    lineHeight: 23,
    fontSize: 16,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
  },
  cancel: {
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
  range: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
  },
  hide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 17,
    paddingVertical: 30,
    backgroundColor: AppColors.backgroundColor1 + 'B8',
  },
  itemText: {
    fontSize: 12,
    color: AppColors.AppBlack + 'B8',
    marginHorizontal: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    height: 48,
    paddingVertical: 0,
  },
  input: {
    flex: 1,
    height: 48,
  },
  tab: {
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black + '80',
  },
  tabActiveText: {
    color: Colors.black,
  },
  error: {
    color: AppColors.error,
    lineHeight: 48,
    paddingHorizontal: 20,
  },
});

export default EditInformationModal;
