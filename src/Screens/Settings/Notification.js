import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../../Providers/AuthProvider';

import Colors from '../../Utils/Colors';
import CustomText from '../../Components/Common/Text';

import BackIcon from '../../Assets/Svg/BackIcon';

function Notification({navigation}) {
  const insets = useSafeArea();
  const {user, userData, updateUserData} = useAuth();

  const [isEnabled1, setIsEnabled1] = useState(
    userData.notification && userData.notification['match'],
  );
  const [isEnabled2, setIsEnabled2] = useState(
    userData.notification && userData.notification['message'],
  );
  const [isEnabled3, setIsEnabled3] = useState(
    userData.notification && userData.notification['happy_hour'],
  );
  const [isEnabled4, setIsEnabled4] = useState(
    userData.notification && userData.notification['like'],
  );
  const [isEnabled5, setIsEnabled5] = useState(
    userData.notification && userData.notification['feature'],
  );
  const [isEnabled6, setIsEnabled6] = useState(
    userData.notification && userData.notification['encouragement'],
  );

  const updateNotif = async (type, value) => {
    const field = 'notification.' + type;
    await user.callFunction('updateUserField', [
      userData.user_id,
      field,
      value,
    ]);
    updateUserData();
  };

  useEffect(() => {
    if (isEnabled1 !== userData.notification['match']) {
      updateNotif('match', isEnabled1);
    }
    if (isEnabled2 !== userData.notification['message']) {
      updateNotif('message', isEnabled2);
    }
    if (isEnabled3 !== userData.notification['happy_hour']) {
      updateNotif('happy_hour', isEnabled3);
    }
    if (isEnabled4 !== userData.notification['like']) {
      updateNotif('like', isEnabled4);
    }
    if (isEnabled5 !== userData.notification['feature']) {
      updateNotif('feature', isEnabled5);
    }
    if (isEnabled6 !== userData.notification['encouragement']) {
      updateNotif('encouragement', isEnabled6);
    }
  }, [isEnabled1, isEnabled2, isEnabled3, isEnabled4, isEnabled5, isEnabled6]);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            Notification
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
                  When you get a match
                </Text>
                <Text style={styles.itemText}>
                  We’ll send you a notification when{'\n'}
                  someone likes you back!
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: Colors.disable, true: Colors.enable}}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={() => setIsEnabled1(!isEnabled1)}
                value={isEnabled1}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>
                  When you get a message
                </Text>
                <Text style={styles.itemText}>
                  We’ll send you a notification when{'\n'}
                  someone sends a message to your inbox!
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: Colors.disable, true: Colors.enable}}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={() => setIsEnabled2(!isEnabled2)}
                value={isEnabled2}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>
                  When Happy Hour starts
                </Text>
                <Text style={styles.itemText}>
                  We’ll send you a notification when{'\n'}
                  Happy Hour starts!
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: Colors.disable, true: Colors.enable}}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={() => setIsEnabled3(!isEnabled3)}
                value={isEnabled3}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>
                  When someone likes you
                </Text>
                <Text style={styles.itemText}>
                  We’ll send you a notification when{'\n'}
                  someone sends you a like!
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: Colors.disable, true: Colors.enable}}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={() => setIsEnabled4(!isEnabled4)}
                value={isEnabled4}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>
                  New app features{' '}
                </Text>
                <Text style={styles.itemText}>
                  We’ll send you a notification when{'\n'}
                  we add awesome new features to our app!
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: Colors.disable, true: Colors.enable}}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={() => setIsEnabled5(!isEnabled5)}
                value={isEnabled5}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.flex}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Messages of encouragement
                </Text>
                <Text style={styles.itemText}>
                  We'll send some encouragement your way{'\n'}
                  to get you pumped about dating!
                </Text>
              </View>
              <Switch
                style={styles.switch}
                trackColor={{false: Colors.disable, true: Colors.enable}}
                thumbColor={Colors.white}
                ios_backgroundColor={Colors.disable}
                onValueChange={() => setIsEnabled6(!isEnabled6)}
                value={isEnabled6}
              />
            </View>
          </View>
        </ScrollView>
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
    marginBottom: 25,
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
});

export default Notification;
