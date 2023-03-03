import React, {useState, useEffect, useRef} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Image,
  // Modal,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import EyeIcon from '../../Assets/Svg/EyeIcon';
import PodLockIcon from '../../Assets/Svg/PodLockIcon';
import AppColors from '../../Utils/AppColors';
import ModalBackground from '../../Components/Common/ModalBackground';
import {useAppContent} from '../../Providers/AppContentProvider';
import {useAuth} from '../../Providers/AuthProvider';

// import ContactsModal from './ContactsModal';

import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';
import SpeakEasyWelcomeModal from './SpeakEasyWelcomeModal';
import SpeakEasyStartModal from './SpeakEasyStartModal';
import SpeakEasyEnterCode from './SpeakEasyEnterCode';

const {width: screenWidth} = Dimensions.get('window');
const imgWidth = screenWidth - 100;
const imgHeight = (imgWidth / 260) * 205;

const SpeakEasyModal = ({navigation}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const {getSpeakeasy} = useAppContent();
  const {userInvitation} = useAuth();
  // const [sharedEvent, setSharedEvent] = useState(null);
  // const [contactsVisible, setContactsVisible] = useState(false);
  const [data, setData] = useState(
    userInvitation[0].joined_speakeasy_list
      .map((x) => {
        // console.log(x);
        return getSpeakeasy(x);
      })
      .reverse()
      .concat(['join']),
  );
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  // useEffect(() => {
  //   if (sharedEvent) {
  //     setContactsVisible(true);
  //   } else {
  //     setContactsVisible(false);
  //   }
  // }, [sharedEvent]);

  const renderItem = ({item, index}) => {
    if (item !== 'join' && item !== 'old') {
      const speakeasy = item;
      if (speakeasy) {
        if (speakeasy.status === 'scheduled' || speakeasy.status === 'ended') {
          return (
            <SpeakEasyWelcomeModal
              speakEasy={speakeasy}
              // setContactsVisible={setContactsVisible}
              hide={() => navigation.goBack()}
              navigation={navigation}
              modalBg={false}
              // setSharedEvent={setSharedEvent}
            />
          );
        } else if (speakeasy.status === 'happening') {
          return (
            <SpeakEasyStartModal
              speakEasy={speakeasy}
              navigation={navigation}
              modalBg={false}
              hide={() => navigation.goBack()}
            />
          );
        } else {
          return <></>;
        }
      }
    }
    if (item === 'join') {
      return <SpeakEasyEnterCode navigation={navigation} />;
    }
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
            <Text style={styles.title}>Your Speakeasy community</Text>
            <Text style={styles.description}>
              See people who attended{'\n'}same events as you
            </Text>
            <View style={styles.imgBox}>
              <Image
                style={styles.img}
                source={require('../../Assets/Image/speakeasy.png')}
              />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('SpeakEasy', {
                    codeList: userInvitation[0].joined_speakeasy_list,
                    isJoin: false,
                  })
                }>
                <Text style={styles.buttonText}>Show me</Text>
                <EyeIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>
          {(!userInvitation ||
            userInvitation.length === 0 ||
            userInvitation[0].joined_speakeasy_list.length == null ||
            userInvitation[0].joined_speakeasy_list.length === 0) && (
            <View style={styles.blur}>
              <PodLockIcon color={'#40ADCE'} width={36} height={47} />
              <Text style={styles.notReady}>
                You haven’t attended{'\n'}Speakeasy event yet
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ModalBackground />
      <Animated.View style={[styles.wrapper, {bottom: slideBottom}]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          enabled>
          <View style={styles.box}>
            <Carousel
              ref={carouselRef}
              data={data}
              containerCustomStyle={styles.viewPager}
              firstItem={activeSlide}
              renderItem={(item, index) => renderItem(item, index)}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 40}
              removeClippedSubviews={false}
              scrollInterpolator={customScrollInterpolator}
              slideInterpolatedStyle={customAnimatedStyles}
              onSnapToItem={(index) => {
                setActiveSlide(index);
              }}
              keyboardShouldPersistTaps={'handled'}
            />
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
      {/* <Modal animationType="fade" transparent={true} visible={contactsVisible}>
        <ContactsModal
          hide={() => {
            setSharedEvent(null);
            setContactsVisible(false);
          }}
          speakEasy={sharedEvent}
        />
      </Modal> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    justifyContent: 'center',
    flex: 1,
  },
  box: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigContain: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  contain: {
    paddingBottom: 43,
    paddingHorizontal: 17,
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
  title: {
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    lineHeight: 24,
    color: AppColors.AppBlack,
    fontSize: 17,
    marginBottom: 3,
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    lineHeight: 15,
    color: AppColors.AppBlack,
    fontSize: 12,
  },
  footer: {
    paddingHorizontal: 15,
    paddingTop: 33,
  },
  button: {
    backgroundColor: AppColors.MainColor,
    height: 51,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 31,
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
  imgBox: {
    marginTop: 25,
    alignItems: 'center',
    marginBottom: -20,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
  },
  blur: {
    position: 'absolute',
    backgroundColor: AppColors.white + 'B8',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notReady: {
    fontSize: 15,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    marginVertical: 8,
  },
});

export default SpeakEasyModal;
