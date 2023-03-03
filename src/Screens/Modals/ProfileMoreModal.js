import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  Alert,
} from 'react-native';
import Toast from '../../Assets/Package/react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import MoreModal from './MoreModal';
import BackIcon from '../../Assets/Svg/BackIcon';
import {
  logBlock,
  logBlockHappyHour,
  logReport,
  logReportHappyHour,
  logUnmatch,
} from '../../Utils/Analytics';

const reasons = {
  fake: [
    {
      id: 'reason1',
      text: 'This person is catfishing',
    },
    {
      id: 'reason2',
      text: 'This profile is a spam',
    },
    {
      id: 'reason3',
      text: 'Other',
    },
  ],
  voice: [
    {
      id: 'reason6',
      text: 'It’s offensive',
    },
    {
      id: 'reason7',
      text: 'It’s suicidal / promotes self-harm',
    },
    {
      id: 'reason8',
      text: 'This person is in danger',
    },
    {
      id: 'reason9',
      text: 'It’s a random noise',
    },
    {
      id: 'reason10',
      text: 'It’s an advertisement',
    },
    {
      id: 'reason11',
      text: 'It’s catfishing',
    },
    {
      id: 'reason12',
      text: 'Other',
    },
  ],
};

const ProfileMoreModal = ({
  profile,
  hide,
  endBlindDate,
  isChat,
  blockAndRemove,
}) => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [titleText, setTitleText] = useState(null);
  const [reasonText, setReasonText] = useState(null);
  const [activeReason, setActiveReason] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [audioCard, setAudioCard] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      LayoutAnimation.configureNext({
        duration: 200,
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 0.4,
        },
        update: {
          type: LayoutAnimation.Types.linear,
          springDamping: 0.4,
        },
      });
    }
    if (titleText) {
      if (!reasonText) {
        setActiveReason(reasons[titleText]);
      }
    } else {
      setActiveReason([]);
    }
  }, [titleText, reasonText]);

  useEffect(() => {
    if (profile.user_cards) {
      setAudioCard(profile.user_cards.filter((c) => c.type === 'voice-intro'));
    }
  }, [profile]);

  const showConfirmDialog = (type) => {
    return Alert.alert(
      'Are you sure you want to ' + type + ' this person?',
      '',
      [
        {
          text: 'Yes',
          onPress: () => {
            if (type === 'block') {
              blockUser();
            } else if (type === 'unmatch') {
              unMatchUser();
            } else {
              reportUser();
            }
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const blockUser = () => {
    user.callFunction('sendReject', [profile._id, 'BLOCK', '']);
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'User blocked!',
      topOffset: 0,
      visibilityTime: 2000,
    });
    hide(true);
    if (endBlindDate) {
      logBlockHappyHour(profile._id);
      endBlindDate();
    } else {
      logBlock(profile._id);
    }
    if (blockAndRemove) {
      blockAndRemove(profile._id);
    }
  };

  const reportUser = () => {
    user.callFunction('sendReject', [
      profile._id,
      'REPORT',
      JSON.stringify({reason: reasonText, answer}),
    ]);
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'Your report has been submitted',
      topOffset: 0,
      visibilityTime: 2000,
    });
    hide(true);
    setReasonText(null);
    setTitleText(null);
    setAnswer(null);
    if (endBlindDate) {
      logReportHappyHour(profile._id, reasonText);
      endBlindDate();
    } else {
      logReport(profile._id, reasonText);
    }
  };

  const unMatchUser = () => {
    user.callFunction('sendReject', [profile._id, 'UNMATCH', '']);
    hide(true);
    logUnmatch(profile._id);
    navigation.navigate('Chat');
  };

  const renderFirstItem = () => {
    if (isChat) {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            showConfirmDialog('unmatch');
          }}>
          <Text style={styles.text}>Unmatch</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            showConfirmDialog('block');
          }}>
          <Text style={styles.text}>Remove</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <MoreModal hide={() => hide(false)}>
      <View style={reasonText && styles.hide}>
        <View style={activeReason.length !== 0 && styles.hide}>
          {audioCard.length > 0 && (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setTitleText('voice')}>
              <Text style={styles.text}>Report Voice Intro</Text>
            </TouchableOpacity>
          )}
          {!!profile && renderFirstItem()}
          <TouchableOpacity
            style={styles.item}
            onPress={() => setTitleText('fake')}>
            <Text style={styles.text}>Fake profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setReasonText('I think this person is underage')}>
            <Text style={styles.text}>This person is underage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setReasonText('Inappropriate')}>
            <Text style={styles.text}>Inappropriate </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setReasonText('Other')}>
            <Text style={styles.text}>Other</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item, styles.lastItem]}
            onPress={() => hide(false)}>
            <Text style={[styles.text, styles.red]}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={activeReason.length === 0 && styles.hide}>
          <TouchableOpacity
            style={[styles.item, styles.titleItem]}
            onPress={() => setTitleText(null)}>
            <BackIcon width="20" height="20" color={Colors.MainColor} />
            <Text style={styles.text}>
              {titleText === 'fake' ? 'Fake profile' : 'Inappropriate'}
            </Text>
            <View style={styles.empty} />
          </TouchableOpacity>
          {activeReason.map((item, i) => {
            return (
              <TouchableOpacity
                style={styles.item}
                key={item.id}
                onPress={() => {
                  setReasonText(item.text);
                  // hide();å
                }}>
                <Text style={[styles.text, styles.reason]}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={!reasonText && styles.hide}>
        <TouchableOpacity
          style={[styles.item, styles.reportItem]}
          onPress={() => setReasonText(null)}>
          <BackIcon width="20" height="20" color={Colors.MainColor} />
          <Text style={[styles.text, styles.reasonText]}>{reasonText}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              showConfirmDialog('report');
            }}>
            <Text style={styles.buttonText}>Report</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.answer}>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={(text) => setAnswer(text)}
            multiline={true}
            numberOfLines={4}
            placeholderTextColor={Colors.MainColor + 'A3'}
            placeholder="Add explanation…."
            returnKeyType="done"
            blurOnSubmit={true}
            maxLength={150}
          />
        </View>
      </View>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#7070706B',
    paddingVertical: 20,
    alignItems: 'center',
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  reportItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  reasonText: {
    marginRight: 'auto',
    marginLeft: 10,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 8,
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  buttonText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
  },
  empty: {
    width: 20,
  },
  text: {
    color: Colors.MainColor + 'F2',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
  },
  hide: {
    display: 'none',
  },
  reason: {
    fontFamily: 'Poppins-Light',
  },
  red: {
    color: Colors.delete + 'F2',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  answer: {
    padding: 20,
  },
  input: {
    minHeight: 50,
    maxHeight: 100,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 21,
    fontSize: 14,
    width: '100%',
    textAlignVertical: 'top',
  },
});

export default ProfileMoreModal;
