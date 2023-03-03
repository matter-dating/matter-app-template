import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AppColors from '../../Utils/AppColors';
import Chat from '../../Assets/Svg/New/Chat';
import Noticed from '../../Assets/Svg/New/Noticed';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import Happy from '../../Assets/Svg/New/Happy';
import {useAuth} from '../../Providers/AuthProvider';

import MatchTipModal from '../../Screens/Modals/MatchTipModal';
import BlindDateInstructionModal from '../../Screens/Modals/BlindDateInstructionModal';

const MessagesList = ({users}) => {
  const navigation = useNavigation();
  const [tipVisible, setTipVisible] = useState(false);
  const {user, userData, userCards, getFormattedProfile} = useAuth();
  const [audioCard, setAudioCard] = useState([]);
  const [randomNumber] = useState(Math.floor(Math.random() * 90 + 10));
  const [profile, setProfile] = useState(getFormattedProfile());

  useEffect(() => {
    user && setProfile(getFormattedProfile());
  }, [user, userData, userCards]);

  const hideModal = (reported) => {
    setTipVisible(false);
  };

  useEffect(() => {
    setAudioCard(profile.user_cards.filter((c) => c.type === 'voice-intro'));
  }, [profile.user_cards]);

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('Home');
  };

  const renderContent = () => {
    if (users.length > 0) {
      return (
        <>
          <View style={styles.img}>
            <Chat width={122} height={113} />
          </View>
          <Text style={styles.title}>Say Hi to your first match!</Text>
          <Text style={styles.text}>
            Tap on their picture to bring the chat
          </Text>
        </>
      );
    }
    if (audioCard.length === 0) {
      return (
        <>
          <View style={styles.img}>
            <Noticed width={64} height={59} />
          </View>
          <Text style={styles.title}>Not getting noticed?</Text>
          <Text style={styles.text}>
            Upload your Voice Intro to be featured{'\n'}
            on explore page and get more likes
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnVoiceCreateProfile,
              })
            }>
            <View style={styles.icon}>
              <VoiceIcon width={16} height={16} color={AppColors.white} />
            </View>
            <Text style={styles.buttonText}>Upload Voice Intro</Text>
          </TouchableOpacity>
        </>
      );
    }
    if (randomNumber % 2 === 0) {
      return (
        <>
          <View style={styles.img}>
            <Noticed width={64} height={59} />
          </View>
          <Text style={styles.text1}>
            People with completed profiles{'\n'}
            get 2x more engagement
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}>
            {/* <View style={styles.icon}>
              <VoiceIcon width={16} height={16} color={AppColors.white} />
            </View> */}
            <Text style={styles.buttonText}>Complete profile</Text>
          </TouchableOpacity>
        </>
      );
    }
    return (
      <>
        <View style={styles.img}>
          <Happy width={141} height={106} />
        </View>
        <Text style={styles.text2}>
          <Text style={styles.bold}>Happy Hour</Text> is one of the best ways
          {'\n'}
          to meet new people on our app
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTipVisible(true)}>
          <Text style={styles.buttonText}>What’s Happy Hour?</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.flex}>
      <ImageBackground
        defaultSource={require('../../Assets/Image/Empty/messageScreen.png')}
        source={require('../../Assets/Image/Empty/messageScreen.png')}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.box}>
          {renderContent()}
          {/* {users.length > 0 ? (
            <>
              <View style={styles.img}>
                <Chat width={117} height={130} />
              </View>
              <Text style={styles.title}>Say Hi to your match!</Text>
              <Text style={styles.text}>
                Click on your match’s photo to bring{'\n'}
                up the chat screen
              </Text>
            </>
          ) : (
            <>
              <View style={styles.img}>
                <Chat width={117} height={130} />
              </View>
              <Text style={styles.title1}>
                No matches yet, but no worries.{'\n'}
                You are new here, so welcome!
              </Text>
              <Text style={styles.text1}>
                See our tips on how to get noticed{'\n'}
                and get more matches
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setTipVisible(true)}>
                <Text style={styles.buttonText}>See tips</Text>
              </TouchableOpacity>
            </>
          )} */}
        </View>
      </ImageBackground>
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <BlindDateInstructionModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  box: {
    alignItems: 'center',
    marginTop: '-10%',
  },
  img: {
    marginVertical: 18,
  },
  chat: {
    width: 117,
    height: 102,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: AppColors.AppBlack,
    marginBottom: 7,
    lineHeight: 23,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    color: AppColors.AppBlack,
    textAlign: 'center',
  },
  text1: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 22,
    fontSize: 15,
    color: AppColors.AppBlack,
    textAlign: 'center',
  },
  text2: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    fontSize: 14,
    color: AppColors.AppBlack,
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
  },
  title1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: AppColors.IconColor + 'D1',
    lineHeight: 26,
    textAlign: 'center',
  },
  button: {
    backgroundColor: AppColors.MainColor,
    marginTop: 36,
    paddingHorizontal: 40,
    paddingVertical: 11,
    borderRadius: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 7,
  },
  buttonText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    fontSize: 14,
  },
  bg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MessagesList;
