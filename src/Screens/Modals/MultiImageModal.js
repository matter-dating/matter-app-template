import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  Easing,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import CustomImage from '../../Components/Common/CustomImage';

import LinearGradient from 'react-native-linear-gradient';

import {useSafeArea} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import Animated from 'react-native-reanimated';

import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';
import HearthIcon from '../../Assets/Svg/HearthIcon';
import Colors from '../../Utils/Colors';

const {width: screenWidth} = Dimensions.get('window');

const MultiImageModal = ({
  hide,
  userInfo,
  urls,
  index,
  likeContent,
  userData,
  hideLike,
  setPass,
}) => {
  const insets = useSafeArea();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const renderSingle = ({item}) => {
    return (
      <View style={styles.item} key={item.id}>
        {userInfo.user_id !== userData.user_id &&
          !userInfo.is_liked &&
          !hideLike && (
            <TouchableOpacity
              style={styles.like}
              onPress={() => {
                if (!likeContent) {
                  hide();
                  setPass({
                    type: 'insta',
                    card: item.media_url,
                    target: userInfo,
                  });
                } else {
                  hide();
                  setPass({
                    type: 'likeBack',
                    likeContent: likeContent,
                    target: userInfo,
                  });
                }
              }}>
              <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={100}
                reducedTransparencyFallbackColor="white"
              />
              <HearthIcon width={28} height={28} color={Colors.white} />
            </TouchableOpacity>
          )}
        <CustomImage source={{uri: item.media_url}} style={styles.img} />
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={styles.flex}
        source={require('../../Assets/Image/modal.png')}>
        <View style={[styles.header, {paddingTop: insets.top + 80}]}>
          <LinearGradient
            colors={['#000000', '#00000000']}
            style={styles.linear}
          />
          <Text style={styles.name}>{userInfo.first_name}’s</Text>
          <Text style={styles.title}>Instagram photos</Text>
          <Text style={styles.name}>{urls.length} photos</Text>
        </View>
        <View style={styles.body}>
          <Carousel
            data={urls}
            useScrollView={true}
            renderItem={(item) => renderSingle(item)}
            firstItem={index}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 60}
            scrollInterpolator={customScrollInterpolator}
            slideInterpolatedStyle={customAnimatedStyles}
          />
        </View>
        <View style={[styles.footer, {paddingBottom: insets.bottom + 20}]}>
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={styles.linear}
          />
          <TouchableOpacity style={styles.button} onPress={hide}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.modalBg + 'D1',
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 80,
  },
  name: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Light',
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginVertical: 4,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
    marginTop: 0,
  },
  close: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  linear: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: screenWidth,
  },
  img: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    borderRadius: 6,
  },
  like: {
    borderRadius: 30,
    zIndex: 1,
    right: 10,
    top: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.8,
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.8,
  },
});

export default MultiImageModal;
