import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useAuth} from '../Providers/AuthProvider';

import Colors from '../Utils/Colors';
import CustomText from '../Components/Common/Text';
import PurchaseLoader from '../Components/Common/PurchaseLoader';

import BackIcon from '../Assets/Svg/BackIcon';
import NextIcon from '../Assets/Svg/NextIcon';
import {logLogout} from '../Utils/Analytics';
import {usePremium} from '../Providers/PremiumProvider';

function SettingScreen({navigation}) {
  const insets = useSafeArea();
  const {signOut} = useAuth();

  const [loader, setLoader] = useState(false);
  const {isPremium, restorePurchases} = usePremium();
  const termsURL = 'https://matter.dating/terms';
  const aboutURL = 'https://matter.dating/about';
  const contactURL = 'https://matter.dating/contact';

  const handlePress = async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <View style={styles.wrap}>
      {loader && <PurchaseLoader />}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.empty}
            onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            Settings
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
      </View>
      <View style={[styles.flex, {paddingBottom: insets.bottom}]}>
        <ScrollView>
          <View style={styles.itemList}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Preferences')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  My preference
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingAccount')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  My account
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingNotification')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Notifications
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(aboutURL)}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  About us
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingPrivacy')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Privacy
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => {}}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>Safety</Text>
                <NextIcon width={15} height={15} color={Colors.MainColor + '52'}/>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => handlePress(contactURL)}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Contact us
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingFeedback')}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Feedback
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress(termsURL)}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Terms & conditions
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
            {isPremium && (
              <TouchableOpacity
                onPress={() => navigation.navigate('SettingPremium')}>
                <View style={styles.item}>
                  <Text numberOfLines={1} style={styles.itemName}>
                    My membership
                  </Text>
                  <NextIcon
                    width={15}
                    height={15}
                    color={Colors.MainColor + '52'}
                  />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={async () => {
                setLoader(true);
                await restorePurchases();
                setTimeout(() => {
                  Alert.alert(
                    'Nothing to restore.',
                    'All the purchases are already applied to your account.',
                  );
                  setLoader(false);
                }, 2000);
              }}>
              <View style={styles.item}>
                <Text numberOfLines={1} style={styles.itemName}>
                  Restore Purchases
                </Text>
                <NextIcon
                  width={15}
                  height={15}
                  color={Colors.MainColor + '52'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              logLogout();
              navigation.reset({
                index: 0,
                routes: [{name: 'Welcome'}],
              });
              signOut();
            }}>
            <Text style={styles.logout}>Log out</Text>
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
  itemList: {
    marginBottom: 25,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  empty: {
    width: 45,
    paddingVertical: 5,
    // height: 45,
  },
  itemName: {
    lineHeight: 20,
    fontSize: 14,
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
    color: Colors.MainColor1,
    marginRight: 'auto',
  },
  footer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  logout: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: Colors.MainColor1,
  },
});

export default SettingScreen;
