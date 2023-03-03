import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Linking,
  Modal,
  Alert,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../../Providers/AuthProvider';

import Colors from '../../Utils/Colors';
import CustomText from '../../Components/Common/Text';

import BackIcon from '../../Assets/Svg/BackIcon';
import AlertModal from '../Modals/AlertModal';

function Privacy({navigation}) {
  const insets = useSafeArea();
  const {user, userData, updateUserData} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const [isEnabled1, setIsEnabled1] = useState(userData.is_online);
  const [isEnabled2, setIsEnabled2] = useState(userData.is_seo_result);

  const privacyURL = 'https://matter.dating/privacy';
  const handlePress = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const hide = () => {
    if (editItem === 1) {
      setIsEnabled1((previousState) => !previousState);
    } else {
      setIsEnabled2((previousState) => !previousState);
    }
    setModalVisible(false);
  };
  const changeSuccess = async () => {
    if (editItem === 1) {
      await user.callFunction('updateUserField', [
        userData.user_id,
        'is_online',
        !isEnabled1,
      ]);
      setIsEnabled1(!isEnabled1);
      // setIsEnabled1((previousState) => !previousState);
    } else {
      await user.callFunction('updateUserField', [
        userData.user_id,
        'is_seo_result',
        !isEnabled2,
      ]);
      setIsEnabled2(!isEnabled2);
      // setIsEnabled2((previousState) => !previousState);
    }
    updateUserData();
    setEditItem(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            Privacy
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
      </View>
      <View style={[styles.flex, {paddingBottom: insets.bottom}]}>
        <ScrollView style={styles.scroll}>
          <View style={styles.itemList}>
            <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Hide online status
                </Text>
                <Text style={styles.itemText}>
                  If you hide your online status from your{'\n'}
                  matches, you won't see their online status{'\n'}
                  as well.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEditItem(1);
                  setModalVisible(true);
                }}>
                <Switch
                  style={styles.switch}
                  trackColor={{false: Colors.disable, true: Colors.enable}}
                  thumbColor={Colors.white}
                  ios_backgroundColor={Colors.disable}
                  value={isEnabled1}
                  disabled
                />
              </TouchableOpacity>
            </View>
            {/* <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>Don’t show me on search results</Text>
                <Text style={styles.itemText}>
                  If you turn this on, you will not be able to{"\n"}
                  use the search function.{"\n"}
                  You can only change this ONCE a week.
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{ false: Colors.disable, true: Colors.enable }}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={toggleSwitch2}
                value={isEnabled2}
              />
            </View> */}
          </View>
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.underLine}
              onPress={() => handlePress(privacyURL)}>
              <Text style={styles.underLine}>Read our full privacy policy</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <AlertModal hide={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>You can only change this once a week</Text>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.firstButton]}
                onPress={hide}>
                <Text style={styles.itemName}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={changeSuccess}>
                <Text style={styles.itemName}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AlertModal>
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
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  scroll: {
    paddingVertical: 24,
  },
  empty: {
    width: 24,
  },
  itemList: {
    marginBottom: 32,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  itemName: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
  },
  itemText: {
    lineHeight: 18,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.MainColor1 + 'B8',
  },
  switch: {
    marginLeft: 30,
  },
  underLine: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.MainColor1,
    textDecorationLine: 'underline',
  },
  modal: {
    justifyContent: 'center',
  },
  modalContent: {
    paddingVertical: 44,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    textAlign: 'center',
    borderTopWidth: 0.5,
    borderTopColor: Colors.MainColor1 + '29',
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstButton: {
    borderRightWidth: 0.5,
    borderRightColor: Colors.MainColor1 + '29',
  },
});

export default Privacy;
