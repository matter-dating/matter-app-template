import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Platform,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';
import dayjs from 'dayjs';
import {Picker} from '@react-native-community/picker';
import {useSafeArea} from 'react-native-safe-area-context';

import Toast from '../../Assets/Package/react-native-toast-message';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {dateToString} from '../../Utils/Functions';
import DownIcon from '../../Assets/Svg/DownIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import EducationIcon from '../../Assets/Svg/EducationIcon';
import JobIcon from '../../Assets/Svg/JobIcon';
import EmailIcon from '../../Assets/Svg/EmailIcon';
import DateModal from '../Modals/DateModal';
import SexModal from '../Modals/SexModal';
import genders from '../../Utils/Gender';
import {useAuth} from '../../Providers/AuthProvider';
import {logProfileSetup} from '../../Utils/Analytics';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeSpace(value) {
  return value.replace(/\s/g, '');
}
const RegisterCreateUser = ({route, navigation}) => {
  const {phoneNumber} = route.params;

  const [loader, setLoader] = useState(false);
  const {t} = useTranslation();
  var now = new Date();
  const [abTest, setAbTest] = useState('simple');
  const [userBio, setUserBio] = useState({
    phone: phoneNumber,
    gender: '',
    interest: '',
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: now,
    ab_test: 'simple',
    profile_hd_images: [],
    invited_user_id: null,
    invited_user_name: null,
    status: 2,
  });
  const [birthDate, setBirthDate] = useState(now);
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState('');
  const [interest, setInterest] = useState('');
  const [modalTitle, setModalTitle] = useState(`${'CreateUser.Looking'}`);
  const [modalType, setModalType] = useState('all');
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const {signUpWithNumber} = useAuth();
  const insets = useSafeArea();
  const [errors, setErrors] = useState([]);
  const [withError, setWithError] = useState(0);
  const [errorMessage, setErrorMessages] = useState([]);
  const [dateModalVisible, setDateModalVisible] = useState(false);

  useEffect(() => {
    setUserBio({...userBio, ab_test: abTest});
  }, [abTest]);

  useEffect(() => {
    setUserBio({
      ...userBio,
      date_of_birth: birthDate,
    });
  }, [birthDate]);

  useEffect(() => {
    setUserBio({
      ...userBio,
      gender: gender,
    });
    if (Platform.OS !== 'ios') {
      setGenderModalVisible(false);
    }
  }, [gender]);

  useEffect(() => {
    setUserBio({
      ...userBio,
      interest: interest,
    });
    if (Platform.OS !== 'ios') {
      setGenderModalVisible(false);
    }
  }, [interest]);

  useEffect(() => {
    if (withError === 2) {
      runNextStep();
    }
    if (withError === 1) {
      setLoader(true);
      if (errors.length === 1) {
        Toast.show({
          position: 'top',
          type: 'error',
          text1: errorMessage[0],
          topOffset: 0,
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          position: 'top',
          type: 'error',
          text1: `${t('CreateUser.Error1')}`,
          topOffset: 0,
          visibilityTime: 2000,
        });
      }
      setLoader(false);
    }
  }, [errors]);

  const openSexModal = (type) => {
    Keyboard.dismiss();
    if (type === 'looking') {
      setModalTitle('Looking for');
      setModalType('looking');
    } else {
      setModalTitle('I am');
      setModalType('all');
    }
    if (Platform.OS === 'ios') {
      setGenderModalVisible(true);
    }
  };

  const openDateModal = () => {
    Keyboard.dismiss();
    if (Platform.OS === 'ios') {
      setDateModalVisible(true);
    } else {
      setShow(true);
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    const currentDate = selectedDate || birthDate;
    setBirthDate(currentDate);
  };

  const validateEmail = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  };

  const runNextStep = async () => {
    setLoader(true);
    await signUpWithNumber(userBio);
    setLoader(false);
    logProfileSetup();
    navigation.navigate('RegisterLocation');
  };

  const checkReady = () => {
    var err = [];
    var mss = [];
    var status = 2;
    if (userBio.date_of_birth === 18) {
      status = 1;
      err = [...err, 'date_of_birth'];
      mss = [...mss, `${t('CreateUser.Error2')}`];
    }
    if (dayjs().diff(dayjs(userBio.date_of_birth), 'year') < 18) {
      status = 1;
      err = [...err, 'date_of_birth'];
      mss = [...mss, `${t('CreateUser.Error3')}`];
    }
    if (userBio.first_name.trim().length < 3) {
      status = 1;
      err = [...err, 'first_name'];
      mss = [...mss, `${t('CreateUser.Error4')}`];
    }
    if (userBio.gender.trim().length === 0) {
      status = 1;
      err = [...err, 'gender'];
      mss = [...mss, `${t('CreateUser.Error5')}`];
    }
    if (userBio.interest.trim().length === 0) {
      status = 1;
      err = [...err, 'interest'];
      mss = [...mss, `${t('CreateUser.Error6')}`];
    }
    if (userBio.email.trim().length === 0) {
      status = 1;
      err = [...err, 'email'];
      mss = [...mss, `${t('CreateUser.Error7')}`];
    } else if (!validateEmail(userBio.email)) {
      status = 1;
      err = [...err, 'email'];
      mss = [...mss, `${t('CreateUser.Error8')}`];
    }
    setErrors(err);
    setErrorMessages(mss);
    setWithError(status);
  };

  const offset = new Date().getTimezoneOffset() * -1;

  return (
    <View style={styles.flex}>
      {loader && <FullScreenLoader />}
      <View style={[styles.header, {marginTop: insets.top}]}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('RegisterPhone')}>
          <BackIcon width={20} height={20} color={Colors.MainColor + 'CC'} />
        </TouchableOpacity>
        <Text style={styles.title}>{t('CreateUser.Title')}</Text>
        <View style={styles.dot} />
      </View>
      <View style={styles.contain}>
        <KeyboardAvoidingView
          style={styles.avoid}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* First name */}
            <View style={styles.first}>
              <Text
                style={[
                  styles.question,
                  !!errors.find((x) => x === 'first_name') &&
                    styles.errorQuestion,
                ]}>
                {t('CreateUser.Name')}{' '}
                <Text
                  style={[
                    styles.optional,
                    !!errors.find((x) => x === 'first_name') &&
                      styles.errorQuestion,
                  ]}>
                  ({t('General.Required')})
                </Text>
              </Text>
              <TextInput
                style={[
                  styles.input,
                  !!errors.find((x) => x === 'first_name') && styles.errorInput,
                ]}
                placeholder="First Name"
                keyboardType={
                  Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'
                }
                placeholderTextColor={
                  errors.find((x) => x === 'first_name')
                    ? AppColors.error
                    : '#001833A3'
                }
                value={userBio.firstName}
                onChangeText={(text) =>
                  setUserBio({...userBio, first_name: text})
                }
                returnKeyType="done"
              />
            </View>

            {/* Birthday */}
            <View>
              <Text
                style={[
                  styles.question,
                  !!errors.find((x) => x === 'date_of_birth') &&
                    styles.errorQuestion,
                ]}>
                {t('CreateUser.Birthday')}{' '}
                <Text
                  style={[
                    styles.optional,
                    !!errors.find((x) => x === 'date_of_birth') &&
                      styles.errorQuestion,
                  ]}>
                  ({t('General.Required')})
                </Text>
              </Text>
              <TouchableOpacity
                onPress={openDateModal}
                style={[
                  styles.innerContainer,
                  !!errors.find((x) => x === 'date_of_birth') &&
                    styles.errorContainer,
                ]}>
                <View style={styles.empty} />
                <Text
                  style={[
                    styles.text,
                    !!errors.find((x) => x === 'date_of_birth') &&
                      styles.errorText,
                  ]}>
                  {dateToString(userBio.date_of_birth)}
                </Text>
                <DownIcon
                  width={20}
                  height={20}
                  color={
                    errors.find((x) => x === 'date_of_birth')
                      ? AppColors.error
                      : Colors.MainColor
                  }
                />
              </TouchableOpacity>
            </View>

            {/* Gender identity */}
            <View>
              <Text
                style={[
                  styles.question,
                  !!errors.find((x) => x === 'gender') && styles.errorQuestion,
                ]}>
                {t('CreateUser.Gender')}{' '}
                <Text
                  style={[
                    styles.optional,
                    !!errors.find((x) => x === 'gender') &&
                      styles.errorQuestion,
                  ]}>
                  ({t('General.Required')})
                </Text>
              </Text>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity
                  onPress={() => openSexModal()}
                  style={[
                    styles.innerContainer,
                    !!errors.find((x) => x === 'gender') &&
                      styles.errorContainer,
                  ]}>
                  <View style={styles.empty} />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.text,
                      !!errors.find((x) => x === 'gender') && styles.errorText,
                    ]}>
                    {userBio.gender === ''
                      ? 'Select'
                      : capitalizeFirstLetter(userBio.gender)}
                  </Text>
                  <DownIcon
                    width={20}
                    height={20}
                    color={
                      errors.find((x) => x === 'gender')
                        ? AppColors.error
                        : Colors.MainColor
                    }
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.androidContainer}>
                  <Picker
                    selectedValue={gender}
                    style={[
                      styles.picker,
                      !!errors.find((x) => x === 'gender') &&
                        styles.errorPicker,
                    ]}
                    onValueChange={(itemValue, itemIndex) =>
                      setGender(itemValue)
                    }>
                    <Picker.Item label="Select" value="" />
                    {genders.map((g, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={g}
                          value={g.toLowerCase()}
                        />
                      );
                    })}
                  </Picker>
                </View>
              )}
            </View>

            {/* Looking for */}
            <View>
              <Text
                style={[
                  styles.question,
                  !!errors.find((x) => x === 'interest') &&
                    styles.errorQuestion,
                ]}>
                {t('CreateUser.Looking')}{' '}
                <Text
                  style={[
                    styles.optional,
                    !!errors.find((x) => x === 'interest') &&
                      styles.errorQuestion,
                  ]}>
                  ({t('General.Required')})
                </Text>
              </Text>
              {Platform.OS === 'ios' ? (
                <TouchableOpacity
                  onPress={() => openSexModal('looking')}
                  style={[
                    styles.innerContainer,
                    !!errors.find((x) => x === 'interest') &&
                      styles.errorContainer,
                  ]}>
                  <View style={styles.empty} />
                  <Text
                    style={[
                      styles.text,
                      !!errors.find((x) => x === 'interest') &&
                        styles.errorText,
                    ]}>
                    {userBio.interest === ''
                      ? 'Select'
                      : capitalizeFirstLetter(userBio.interest)}
                  </Text>
                  <DownIcon
                    width={20}
                    height={20}
                    color={
                      errors.find((x) => x === 'interest')
                        ? AppColors.error
                        : Colors.MainColor
                    }
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.androidContainer}>
                  <Picker
                    selectedValue={interest}
                    style={[
                      styles.picker,
                      !!errors.find((x) => x === 'interest') &&
                        styles.errorPicker,
                    ]}
                    onValueChange={(itemValue, itemIndex) =>
                      setInterest(itemValue)
                    }>
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Everyone" value="everyone" />
                  </Picker>
                </View>
              )}
            </View>

            {/* Email */}
            <View>
              <Text
                style={[
                  styles.question,
                  !!errors.find((x) => x === 'email') && styles.errorQuestion,
                ]}>
                {t('CreateUser.Email')}{' '}
                <Text
                  style={[
                    styles.optional,
                    !!errors.find((x) => x === 'email') && styles.errorQuestion,
                  ]}>
                  ({t('General.Required')})
                </Text>
              </Text>
              <View
                style={[
                  styles.inputRow,
                  !!errors.find((x) => x === 'email') && styles.errorRow,
                ]}>
                <EmailIcon color={Colors.MainColor} width={26} height={21} />
                <TextInput
                  style={[
                    styles.inputIcon,
                    !!errors.find((x) => x === 'email') && styles.errorInput,
                  ]}
                  value={userBio.email}
                  placeholderTextColor={
                    errors.find((x) => x === 'email')
                      ? AppColors.error
                      : '#001833A3'
                  }
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  placeholder="e.g., claire@email.com"
                  autoCompleteType="email"
                  autoCapitalize="none"
                  autoCorrect
                  returnKeyType="done"
                  onChangeText={(text) =>
                    setUserBio({...userBio, email: removeSpace(text)})
                  }
                />
              </View>
            </View>

            {/* Job */}
            <View>
              <Text style={styles.question}>
                {t('CreateUser.Job')} <Text style={styles.optional}>({t('General.Optional')})</Text>
              </Text>
              <View style={styles.inputRow}>
                <JobIcon color={Colors.MainColor} width={26} height={21} />
                <TextInput
                  style={styles.inputIcon}
                  placeholder="e.g., Manager at StartUp"
                  placeholderTextColor={'#001833A3'}
                  value={userBio.occupation}
                  onChangeText={(text) =>
                    setUserBio({...userBio, occupation: text})
                  }
                  returnKeyType="done"
                />
              </View>
            </View>

            {/* Education */}
            <View>
              <Text style={styles.question}>
                {t('CreateUser.Education')} <Text style={styles.optional}>({t('General.Optional')})</Text>
              </Text>
              <View style={styles.inputRow}>
                <EducationIcon
                  color={Colors.MainColor}
                  width={26}
                  height={21}
                />
                <TextInput
                  style={styles.inputIcon}
                  placeholder="e.g., UCLA"
                  placeholderTextColor={'#001833A3'}
                  value={userBio.education}
                  onChangeText={(text) =>
                    setUserBio({...userBio, education: text})
                  }
                  returnKeyType="done"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {show && (
        <DateTimePicker
          testID="dateOfBirth"
          value={birthDate}
          mode={'date'}
          timeZoneOffsetInMinutes={offset}
          textColor={Colors.MainColor}
          minimumDate={
            new Date(new Date().setFullYear(now.getFullYear() - 100))
          }
          maximumDate={now}
          // maximumDate={new Date(new Date().setFullYear(now.getFullYear() - 18))}
          display="spinner"
          onChange={onChange}
        />
      )}
      <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
        <Text style={styles.footerText}>
          {t('CreateUser.Text')}
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => checkReady()}>
          <View style={styles.linear}>
            <Text style={[styles.buttonText, styles.whiteText]}>{t('General.Continue')}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={dateModalVisible}>
        <DateModal
          setDateModalVisible={setDateModalVisible}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={genderModalVisible}>
        <SexModal
          setGenderModalVisible={setGenderModalVisible}
          interest={interest}
          gender={gender}
          setGender={setGender}
          setInterest={setInterest}
          modalTitle={modalTitle}
          modalType={modalType}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    justifyContent: 'space-between',
    flex: 1,
  },
  contain: {
    flex: 1,
    paddingHorizontal: 26,
  },
  avoid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  first: {
    paddingTop: 20,
  },
  question: {
    color: AppColors.IconColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  errorQuestion: {
    color: AppColors.error,
  },
  optional: {
    color: AppColors.IconColor + '8A',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.IconColor,
    marginBottom: 36,
  },
  inputIcon: {
    paddingHorizontal: 10,
    fontSize: 14,
    color: Colors.IconColor,
    paddingVertical: 12,
    width: '100%',
  },
  input: {
    borderBottomWidth: 0.5,
    borderColor: Colors.IconColor,
    paddingVertical: 6,
    paddingHorizontal: 13,
    fontSize: 14,
    color: Colors.IconColor,
    marginBottom: 36,
  },
  errorInput: {
    borderColor: AppColors.error,
    color: AppColors.error,
  },
  androidContainer: {
    borderColor: AppColors.IconColor,
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 36,
    marginRight: 76,
  },
  innerContainer: {
    flexDirection: 'row',
    borderColor: AppColors.IconColor,
    borderWidth: 0.5,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    marginRight: 76,
  },
  errorContainer: {
    borderColor: AppColors.error,
  },
  empty: {
    width: 16,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    fontSize: 14,
    color: AppColors.IconColor + 'B3',
  },
  errorText: {
    color: AppColors.error,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    padding: 10,
  },
  title: {
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor,
  },
  dot: {
    width: 40,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    paddingTop: 16,
    paddingBottom: 26,
    color: AppColors.IconColor + 'B8',
    paddingHorizontal: 31,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 25,
    paddingHorizontal: 31,
  },
  linear: {
    width: '100%',
    height: 48,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.white,
  },
});

export default RegisterCreateUser;
