import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../../Providers/AuthProvider';

import Colors from '../../Utils/Colors';
import {formatPhoneNumber} from '../../Utils/Functions';
import CustomText from '../../Components/Common/Text';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import BackIcon from '../../Assets/Svg/BackIcon';
import {logDeleteAccount} from '../../Utils/Analytics';

function Account({navigation}) {
  const insets = useSafeArea();
  const {
    user,
    userData,
    updateUserData,
    signOut,
    userInvitation,
    updateInvitationProperty,
  } = useAuth();
  const [loader, setLoader] = useState(false);

  const [isEnabled, setIsEnabled] = useState(userData.status === 1);

  const toggleSwitch = async () => {
    setIsEnabled(!isEnabled);
    await user.callFunction('updateUserField', [
      userData.user_id,
      'status',
      !isEnabled === true ? 1 : 0,
    ]);
    updateInvitationProperty(userInvitation[0], 'hidden', !isEnabled);
    updateUserData();
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are you sure?',
      'Deleting your account is permanent and will remove all content including matches, likes and profile settings. Are you sure you want to delete your account? ',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteAccount();
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const deleteAccount = async () => {
    setLoader(true);
    await user.callFunction('deleteAuthAccount', []);
    setLoader(false);
    logDeleteAccount();
    navigation.reset({
      index: 0,
      routes: [{name: 'Welcome'}],
    });
    signOut(true);
  };

  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            My account
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
      </View>
      <View style={[styles.flex, {paddingBottom: insets.bottom}]}>
        <ScrollView style={styles.scroll}>
          {userData.status < 2 && userInvitation && userInvitation.length > 0 && (
            <>
              <View style={styles.itemList}>
                <View style={styles.item}>
                  <View style={styles.flex}>
                    <Text numberOfLines={1} style={styles.itemName}>
                      Hide account
                    </Text>
                    <Text style={styles.itemText}>
                      Your profile will not be visible to others.{'\n'}
                      You can still chat and join audio or{'\n'}
                      video calls with your matches.
                    </Text>
                  </View>
                  <Switch
                    style={styles.switch}
                    trackColor={{false: Colors.disable, true: Colors.enable}}
                    thumbColor={Colors.white}
                    ios_backgroundColor={Colors.disable}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
            </>
          )}
          <View style={styles.subTitle}>
            <Text style={styles.itemName}>Your account information</Text>
          </View>
          <View style={styles.items}>
            <Text style={[styles.itemValue, styles.flex]}>Phone number:</Text>
            <Text numberOfLines={1} style={[styles.value, styles.flex]}>
              {formatPhoneNumber(userData.phone)}
            </Text>
          </View>
          <View style={styles.items}>
            <Text style={[styles.itemValue, styles.flex]}>Email:</Text>
            <Text numberOfLines={1} style={[styles.value, styles.flex]}>
              {userData.email}
            </Text>
          </View>
          {/* <View style={styles.items}>
            <Text style={[styles.itemValue, styles.flex]}>Password:</Text>
            <Text style={[styles.value, styles.flex]}>M*******</Text>
          </View> */}
          {/* <View style={[styles.item, styles.marginTop]}>
            <TouchableOpacity>
              <Text style={styles.underLine}>Download my data</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={styles.underLine}>
              <Text style={styles.underLine}>Delete my data</Text>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={showConfirmDialog}>
            <Text style={styles.delete}>Delete my account</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 23,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  itemValue: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: Colors.MainColor1,
  },
  value: {
    lineHeight: 20,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.MainColor1 + 'B8',
  },
  itemName: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
  },
  subTitle: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
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
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  delete: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: Colors.dddelete,
  },
  underLine: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: Colors.MainColor1,
    textDecorationLine: 'underline',
  },
  marginTop: {
    marginTop: 15,
  },
});

export default Account;
