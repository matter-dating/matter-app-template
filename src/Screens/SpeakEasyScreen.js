import React, {useState} from 'react';
import {View, StyleSheet, Platform, Modal} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Colors from '../Utils/Colors';
import {useAuth} from '../Providers/AuthProvider';
import SpeakEasyFeed from '../Components/SpeakEasy/SpeakEasyFeed';

import SpeakEasyWelcomeModal from './Modals/SpeakEasyWelcomeModal';
import SpeakEasyStartModal from './Modals/SpeakEasyStartModal';
// import ContactsModal from './Modals/ContactsModal';
import {useAppContent} from '../Providers/AppContentProvider';

function SpeakEasyScreen({navigation, route}) {
  const {codeList, isJoin, activeCode} = route.params;
  const {userData} = useAuth();
  const {getSpeakeasy} = useAppContent();
  const [activeSpeakeasy, setActiveSpeakeasy] = useState(
    getSpeakeasy(activeCode),
  );
  const insets = useSafeArea();
  // const [sharedEvent, setSharedEvent] = useState(null);

  const [welcomeVisible, setWelcomeVisible] = useState(
    isJoin && activeSpeakeasy && activeSpeakeasy.status === 'scheduled',
  );
  // const [contactsVisible, setContactsVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(
    isJoin && activeSpeakeasy && activeSpeakeasy.status === 'happening',
  );

  // useEffect(() => {
  //   if (sharedEvent) {
  //     setContactsVisible(true);
  //   } else {
  //     setContactsVisible(false);
  //   }
  // }, [sharedEvent]);

  const paddingValue = Platform.OS === 'android' ? insets.top : 0;

  const hideModal = (reported) => {
    setWelcomeVisible(false);
    setStartVisible(false);
  };
  return (
    <View style={styles.wrap}>
      <View style={[styles.safe, {paddingTop: paddingValue}]}>
        <SpeakEasyFeed
          userData={userData}
          codeList={codeList}
          activeCode={activeCode}
        />
      </View>
      <Modal animationType="fade" transparent={true} visible={welcomeVisible}>
        <SpeakEasyWelcomeModal
          hide={hideModal}
          // setContactsVisible={setContactsVisible}
          speakEasy={activeSpeakeasy}
          navigation={navigation}
          modalBg={true}
          // setSharedEvent={setSharedEvent}
        />
      </Modal>
      <Modal animationType="fade" transparent={true} visible={startVisible}>
        <SpeakEasyStartModal
          hide={hideModal}
          speakEasy={activeSpeakeasy}
          navigation={navigation}
          modalBg={true}
        />
      </Modal>
      {/* <Modal animationType="fade" transparent={true} visible={contactsVisible}>
        <ContactsModal
          hide={() => {
            setContactsVisible(false);
            setSharedEvent(null);
            setWelcomeVisible(true);
          }}
          speakEasy={sharedEvent}
        />
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safe: {
    flex: 1,
  },
});

export default SpeakEasyScreen;
