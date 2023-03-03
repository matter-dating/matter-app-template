import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import {useAppContent} from '../Providers/AppContentProvider';
import {useAuth} from '../Providers/AuthProvider';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import CustomText from '../Components/Common/Text';
import ListItem from '../Components/Profile/ListItem';

import EditInformationModal from './Modals/EditInformationModal';

import BackIcon from '../Assets/Svg/BackIcon';

function InformationScreen({navigation}) {
  const insets = useSafeArea();
  const {contents} = useAppContent();
  const {user, userData, updateUserData} = useAuth();

  const [editVisible, setEditVisible] = useState(false);
  const [editInfo, setEditInfo] = useState(null);
  const [show, setShow] = useState(false);

  // Birthday
  var now = new Date();
  const [date, setDate] = useState(userData.date_of_birth);

  const save = async (currentDate) => {
    const match = {
      Name: 'first_name',
      Gender: 'gender',
      Birthday: 'date_of_birth',
    };
    await user.callFunction('updateUserField', [
      userData.user_id,
      match[editInfo.question],
      currentDate,
    ]);
    updateUserData();
    setShow(false);
  };

  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    save(currentDate);
  };

  const hideModal = async (reported) => {
    setEditVisible(false);
    setEditInfo(null);
  };

  useEffect(() => {
    if (editInfo) {
      if (Platform.OS === 'android') {
        if (editInfo.option_type !== 'date') {
          setEditVisible(true);
        } else {
          setShow(true);
        }
      } else {
        setEditVisible(true);
      }
    }
  }, [editInfo]);

  const offset = new Date().getTimezoneOffset() * -1;
  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <View>
            <CustomText.TitleText style={styles.title}>
              Your Information
            </CustomText.TitleText>
            <Text style={styles.edit}>Tap to edit</Text>
          </View>
          <View style={styles.empty} />
        </View>
      </View>
      <View style={styles.flex}>
        <ScrollView>
          <View style={styles.subHeader}>
            <Text style={styles.subTitle}>Credentials</Text>
            {/* <EditIcon width={16} height={16} color={Colors.MainColor1 + '80'}/> */}
          </View>
          <View style={styles.itemList}>
            {contents
              .filter(
                (x) => x.type === 'info' && x.category_slug === 'Credentials',
              )
              .sort((a, b) => (a.priority < b.priority ? 1 : -1))
              .map((item, i) => (
                <ListItem
                  userInfo={userData}
                  key={i}
                  setEditInfo={setEditInfo}
                  editable={item.option_type !== 'location'}
                  item={item}
                  isEmpty={true}
                />
              ))}
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.subTitle}>Primary</Text>
            {/* <EditIcon width={16} height={16} color={Colors.MainColor1 + '80'}/> */}
          </View>
          <View style={styles.itemList}>
            {contents
              .filter((x) => x.type === 'info' && x.category_slug === 'Primary')
              .sort((a, b) => (a.priority < b.priority ? 1 : -1))
              .map((item, i) => (
                <ListItem
                  userInfo={userData}
                  key={i}
                  setEditInfo={setEditInfo}
                  editable={item.option_type !== 'location'}
                  item={item}
                  isEmpty={true}
                />
              ))}
          </View>
          <View style={styles.subHeader}>
            <Text style={styles.subTitle}>Lifestyle</Text>
            {/* <EditIcon width={16} height={16} color={Colors.MainColor1 + '80'}/> */}
          </View>
          <View style={[styles.itemList, {marginBottom: insets.bottom + 25}]}>
            {contents
              .filter(
                (x) => x.type === 'info' && x.category_slug === 'Lifestyle',
              )
              .sort((a, b) => (a.priority < b.priority ? 1 : -1))
              .map((item, i) => (
                <ListItem
                  userInfo={userData}
                  key={i}
                  setEditInfo={setEditInfo}
                  editable={item.option_type !== 'location'}
                  item={item}
                  isEmpty={true}
                />
              ))}
          </View>
        </ScrollView>
      </View>

      {show && (
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

      <Modal animationType="fade" transparent={true} visible={editVisible}>
        <EditInformationModal editInfo={editInfo} hide={hideModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  edit: {
    textAlign: 'center',
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    marginTop: 7,
  },
  empty: {
    width: 24,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  subTitle: {
    lineHeight: 23,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1 + '80',
  },
  itemList: {
    marginBottom: 25,
  },
});

export default InformationScreen;
