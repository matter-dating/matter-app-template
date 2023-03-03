import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Animated,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';

import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import FilterIcon from '../../Assets/Svg/FilterIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import ModalBackground from '../../Components/Common/ModalBackground';

const data = [{}, {}, {}, {}];
const {width: screenWidth} = Dimensions.get('window');
const HomeTutorialModal = ({hide}) => {
  const navigation = useNavigation();
  const [carouselRef, setCarouselRef] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const {userCards} = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const [audioCard, setAudioCard] = useState({});

  useEffect(() => {
    setAudioCard(userCards.filter((c) => c.type === 'voice-intro'));
  }, [userCards]);

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

  const clickNext = () => {
    if (carouselRef.currentIndex === 3) {
      carouselRef.snapToItem(0, true);
    } else {
      carouselRef.snapToNext();
    }
  };

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('NewProfile');
  };

  const renderItem = ({index}) => {
    if (index === 0) {
      return (
        <View style={styles.contain}>
          <View>
            <View style={styles.imgBox}>
              <Image
                style={styles.img1}
                source={require('../../Assets/Image/work1.png')}
              />
            </View>
            <Text style={styles.blueText}>Everyday</Text>
            <Text style={styles.blackText}>We will show you 20 profiles</Text>
            <Text style={styles.text} numberOfLines={4}>
              Endlessly swiping left and right is not the way to find a serious
              relationship. Instead, we will suggest you carefully curated 20
              profiles based on our cutting-edge algorithm
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (index === 1) {
      return (
        <View style={styles.contain}>
          <View>
            <View style={styles.imgBox}>
              <Image
                style={styles.img2}
                source={require('../../Assets/Image/work2.png')}
              />
            </View>
            <Text style={styles.blueText}>Listen to Voice Intro </Text>
            <Text style={styles.blackText}>to reveal the pictures</Text>
            <Text style={styles.text}>
              Voice intros are a great way to get to know others. To see how
              your suggested person looks, simply listen to their Voice Intro
              first
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (index === 2) {
      return (
        <View style={styles.contain}>
          <View>
            <View style={styles.filter}>
              <FilterIcon color={AppColors.AppBlack} width={20} height={20} />
            </View>
            <Text style={styles.blueText}>Set your preferences</Text>
            <Text style={styles.blackText}>to see people you will like</Text>
            <Text style={styles.text}>
              If you don’t like our suggested profiles, you can always change
              your preferences by clicking on icon on the top right corner
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                hide();
                navigation.navigate('Preferences');
              }}>
              <AddIcon width={17} height={17} color={AppColors.white} />
              <Text style={styles.add}>Add my preferences now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={clickNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (audioCard.length === 0) {
      return (
        <View style={styles.contain}>
          <View>
            <View style={styles.imgBox}>
              <Image
                style={styles.img3}
                source={require('../../Assets/Image/work3.png')}
              />
            </View>
            <Text style={styles.blueText}>Add your Voice Intro</Text>
            <Text style={styles.blackText}>to be seen on the Explore tab</Text>
            <Text style={styles.text}>
              To be seen by other users on the Explore tab, please include your
              Voice Intro
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                hide();
                navigation.navigate('AddVoiceIntro', {
                  callBack: ReturnVoiceCreateProfile,
                });
              }}>
              <VoiceIcon width={17} height={17} color={AppColors.white} />
              <Text style={styles.add}>Add Voice Intro</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={hide}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.contain}>
        <View>
          <View style={styles.imgBox}>
            <Image
              style={styles.img3}
              source={require('../../Assets/Image/work3.png')}
            />
          </View>
          <Text style={styles.blueText}>Have a genuine Voice Intro</Text>
          <Text style={styles.blackText}>to standout on Explore Page</Text>
          <Text style={styles.text}>
            People with authentic and interesting Voice Intro get 3x more
            engagement on our app
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              hide();
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnVoiceCreateProfile,
              });
            }}>
            <VoiceIcon width={17} height={17} color={AppColors.white} />
            <Text style={styles.add}>Edit Voice Intro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={hide}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <ModalBackground />
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.box}>
          <View style={styles.header}>
            <Text style={styles.title}>How does it work</Text>
            <TouchableOpacity style={styles.delete} onPress={hide}>
              <DeleteIcon color={AppColors.AppBlack} width={24} height={24} />
            </TouchableOpacity>
          </View>
          <Carousel
            ref={(c) => setCarouselRef(c)}
            data={data}
            containerCustomStyle={styles.viewPager}
            firstItem={activeSlide}
            renderItem={(index) => renderItem(index)}
            sliderWidth={screenWidth - 70}
            itemWidth={screenWidth - 70}
            removeClippedSubviews={false}
            onSnapToItem={(index) => setActiveSlide(index)}
            // scrollEnabled={false}
          />
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.containerStyle}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.48}
            inactiveDotScale={1}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 8,
    margin: 12,
  },
  box: {
    padding: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 7,
  },
  footer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  delete: {
    position: 'absolute',
    top: -20,
    right: -20,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + '7A',
    lineHeight: 23,
    marginTop: 13,
  },
  blueText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.MainColor,
    lineHeight: 21,
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 7,
  },
  blackText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack,
    lineHeight: 28,
    paddingHorizontal: 7,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginTop: 7,
    marginBottom: 30,
    paddingHorizontal: 7,
  },
  button: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#52B8D6',
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 45,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.MainColor,
    fontFamily: 'Poppins-Medium',
  },
  addButton: {
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 28,
    marginLeft: 'auto',
    backgroundColor: AppColors.MainColor,
    flexDirection: 'row',
    marginVertical: 32,
    alignItems: 'center',
  },
  add: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    marginLeft: 8,
  },
  dotStyle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: -100,
    backgroundColor: '#89C9DE',
  },
  contain: {
    // marginTop: 'auto',
  },
  containerStyle: {
    position: 'absolute',
    bottom: -10,
    left: 10,
  },
  imgBox: {
    // height: 209,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img1: {
    width: 230,
    height: 194,
  },
  img2: {
    width: 160,
    height: 209,
  },
  img3: {
    width: 203,
    height: 88,
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 20,
  },
  filter: {
    marginTop: 40,
    backgroundColor: '#DEEFF4',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default HomeTutorialModal;
