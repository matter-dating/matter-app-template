import React, {useState, useEffect, useRef} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
  Text,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Contacts from 'react-native-contacts';
import Toast from '../../Assets/Package/react-native-toast-message';

import SearchBar from '../../Components/Contacts/SearchBar';
import ContactItem from '../../Components/Contacts/ContactItem';
import ContactImage from '../../Components/Contacts/ContactImage';
import CustomText from '../../Components/Common/Text';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import CheckIcon from '../../Assets/Svg/CheckIcon';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {sortByName} from '../../Utils/Functions';
import ModalBackground from '../../Components/Common/ModalBackground';
import {useAuth} from '../../Providers/AuthProvider';

const ContactsModal = ({speakEasy, hide}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteLoader, setInviteLoader] = useState(false);

  const [selectedContact, setSelectedContact] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimMain = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  const slideBottomMain = useRef(new Animated.Value(-100)).current;
  const insets = useSafeArea();
  const {user} = useAuth();

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
    Animated.timing(fadeAnimMain, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottomMain, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then((cont) => {
        setContacts(sortByName(cont));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
    Contacts.checkPermission();
  };

  const getAvatarInitials = (textString) => {
    if (!textString) {
      return '';
    }
    const text = textString.trim();
    const textSplit = text.split(' ');

    if (textSplit.length <= 1) {
      return text.charAt(0);
    }
    const initials =
      textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
  };

  // useEffect(() => {
  //   console.log('selectedContact', selectedContact);
  // }, [selectedContact]);

  useEffect(() => {
    if (selectedContact.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(slideBottom, {
        toValue: 40 + insets.top + insets.bottom,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(slideBottom, {
        toValue: -100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedContact]);

  const onPressContact = (contact) => {
    let arr = selectedContact;
    if (arr.indexOf(contact) === -1) {
      arr.push(contact);
    } else {
      arr.splice(arr.indexOf(contact), 1);
    }
    setSelectedContact([...arr]);
  };

  const search = (text) => {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text).then((cont) => {
        setContacts(sortByName(cont));
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text).then((cont) => {
        setContacts(sortByName(cont));
      });
    } else {
      Contacts.getContactsMatchingString(text).then((cont) => {
        setContacts(sortByName(cont));
      });
    }
  };

  const shareInvite = async () => {
    setInviteLoader(true);
    // console.log('selectedContact:', selectedContact);
    let phone_list = [];
    selectedContact.forEach((p) => {
      // console.log(p.phoneNumbers[0].number);
      phone_list.push(p.phoneNumbers[0].number);
    });
    let res = await user.callFunction('sendSpeakEasyInvite', [
      user.customData.first_name,
      phone_list,
      speakEasy.speakeasy_code,
    ]);

    if (res.result === 'invited') {
      setInviteLoader(false);
      hide();
      Toast.show({
        position: 'top',
        type: 'notif',
        text1: 'Invite sent',
        topOffset: 0,
        visibilityTime: 2000,
      });
    } else {
      Toast.show({
        position: 'top',
        type: 'notif',
        text1: 'Oops! Something went wrong.',
        topOffset: 0,
        visibilityTime: 2000,
      });
    }
    // Share.share({
    //   title: 'Matter invite link',
    //   message:
    //     'https://matter.mn/' +
    //     (waitList !== 'BlackList' ? userInvitation[0].code : ''),
    //   url:
    //     'https://matter.mn/' +
    //     (waitList !== 'BlackList' ? userInvitation[0].code : ''),
    // });
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnimMain}]}>
      <ModalBackground />
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            top: insets.top + 40,
            bottom: slideBottomMain,
          },
        ]}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.empty} onPress={hide}>
              <DeleteIcon width={24} height={24} color={Colors.MainColor} />
            </TouchableOpacity>
            <CustomText.TitleText style={styles.pageTitle}>
              Contact List
            </CustomText.TitleText>
            <View style={styles.empty} />
          </View>
          <View>
            <SearchBar onChangeText={search} />
          </View>
        </View>

        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color={AppColors.MainColor} />
          </View>
        ) : (
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            style={[
              styles.scroll,
              {marginBottom: insets.top + insets.bottom + 40},
            ]}>
            {contacts.map((contact) => {
              return (
                <ContactItem
                  leftElement={
                    selectedContact.filter(
                      (x) => x.recordID === contact.recordID,
                    ).length === 0 ? (
                      <ContactImage
                        img={
                          contact.hasThumbnail
                            ? {uri: contact.thumbnailPath}
                            : undefined
                        }
                        placeholder={getAvatarInitials(
                          `${contact.givenName} ${contact.familyName}`,
                        )}
                      />
                    ) : (
                      <CheckIcon
                        width={40}
                        height={40}
                        color={AppColors.MainColor}
                      />
                    )
                  }
                  key={contact.recordID}
                  title={`${contact.givenName} ${contact.familyName}`}
                  description={`${contact.company}`}
                  onPress={() => onPressContact(contact)}
                />
              );
            })}
            {contacts.length === 0 && (
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color={AppColors.MainColor} />
              </View>
            )}
          </ScrollView>
        )}
        <Animated.View
          style={[
            styles.footer,
            {
              paddingBottom: insets.bottom + 8,
              opacity: fadeAnim,
              bottom: slideBottom,
            },
          ]}>
          <LinearGradient
            colors={['#FFFFFF00', '#FFFFFF']}
            style={styles.linear}
          />
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={inviteLoader && 1}
              onPress={() => !inviteLoader && shareInvite()}>
              {inviteLoader ? (
                <View style={styles.loader}>
                  <ActivityIndicator size="small" color={AppColors.white} />
                </View>
              ) : (
                <Text style={styles.buttonText}>Share</Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 24,
    overflow: 'hidden',
    flex: 1,
  },
  header: {
    // height: 100,
  },
  headerRow: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.colorF56,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  empty: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    padding: 50,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 30,
    color: AppColors.MainColor1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  linear: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  box: {
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    width: '100%',
    backgroundColor: AppColors.MainColor,
  },
  button: {
    width: '100%',
    padding: 13,
    textAlign: 'center',
    alignItems: 'center',
    height: 51,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    color: Colors.white,
  },
});

export default ContactsModal;
