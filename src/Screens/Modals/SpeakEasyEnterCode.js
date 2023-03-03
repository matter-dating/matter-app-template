import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Modal,
} from 'react-native';

import {useAppContent} from '../../Providers/AppContentProvider';
import {useAuth} from '../../Providers/AuthProvider';

import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

import BlindDateQuery from '../../Api/BlindDateQuery';

import SpeakEasyInstructionModal from './SpeakEasyInstructionModal';

const SpeakEasyEnterCode = ({navigation}) => {
  const {checkSpeakeasyCode, getSpeakeasy} = useAppContent();
  const {userInvitation, updateInvitationProperty, user} = useAuth();
  const [ready, setReady] = useState(0);
  const [code, setCode] = useState('');
  const [tipVisible, setTipVisible] = useState(false);

  useEffect(() => {
    if (code.trim().length !== 0) {
      // console.log('code is changed');
      setReady(checkSpeakeasyCode(code.toUpperCase()));
    } else {
      setReady(false);
    }
  }, [code]);

  const speakEasyPressed = async () => {
    if (ready && userInvitation && userInvitation.length > 0) {
      // checking existing speakeasy community for this user
      let joined_speakeasy_list = userInvitation[0].joined_speakeasy_list;
      let updated_list = [];

      joined_speakeasy_list.forEach((value) => {
        updated_list.push(value);
      });

      if (!updated_list.includes(code.toUpperCase())) {
        updated_list.push(code.toUpperCase());
        updateInvitationProperty(
          userInvitation[0],
          'joined_speakeasy_list',
          updated_list,
        );
      }
      const speakEasy = getSpeakeasy(code);
      const blindApi = new BlindDateQuery();
      blindApi.speakeasy(user.id, speakEasy._id, code);
      navigation.navigate('SpeakEasy', {
        activeCode: code,
        codeList: userInvitation[0].joined_speakeasy_list,
        isJoin: true,
      });
    } else {
      // console.log('code is wrong or empty');
    }
  };

  const hideModal = () => {
    setTipVisible(false);
  };

  return (
    <View style={styles.bigContain}>
      <View style={styles.contain}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.close}>
            <DeleteIcon color={AppColors.AppBlack} width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.imgBox}>
            <Image
              style={styles.img}
              source={require('../../Assets/Image/tiger_dark.png')}
            />
          </View>
          <Text style={styles.title}>speakeasy</Text>
          <TouchableOpacity
            style={styles.learn}
            onPress={() => setTipVisible(true)}>
            <Text style={styles.link}>Learn more</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.label}>Enter code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter code"
              placeholderTextColor={AppColors.AppBlack + '8C'}
              value={code}
              onChangeText={(text) => setCode(text)}
              returnKeyType="done"
            />
            <TouchableOpacity
              activeOpacity={ready ? 0.4 : 1}
              onPress={() => speakEasyPressed()}
              style={[styles.button, !ready && styles.inActive]}>
              <Text style={styles.buttonText}>Go in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={tipVisible}>
        <SpeakEasyInstructionModal hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bigContain: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  contain: {
    paddingBottom: 43,
    paddingHorizontal: 32,
    backgroundColor: AppColors.white,
    borderRadius: 24,
    shadowColor: AppColors.MainColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    position: 'relative',
    margin: 12,
  },
  header: {
    alignItems: 'flex-end',
    paddingTop: 18,
  },
  imgBox: {
    alignItems: 'center',
  },
  img: {
    width: 62,
    height: 62,
    marginBottom: 9,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'BarBoothAtMatts',
    color: '#123740',
    fontSize: 32,
  },
  learn: {
    alignItems: 'center',
    marginTop: 10,
  },
  link: {
    color: AppColors.MainColor,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 22,
    fontSize: 14,
  },
  footer: {
    paddingVertical: 24,
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 20,
    marginBottom: 13,
  },
  input: {
    borderWidth: 1.5,
    borderColor: AppColors.MainColor,
    paddingHorizontal: 5,
    width: '100%',
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    borderRadius: 23,
    height: 45,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    height: 51,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    flexDirection: 'row',
  },
  inActive: {
    backgroundColor: AppColors.MainColor + '75',
  },
  buttonText: {
    color: AppColors.white,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    marginHorizontal: 7,
  },
});

export default SpeakEasyEnterCode;
