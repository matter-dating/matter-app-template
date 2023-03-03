import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
  Easing,
  Animated,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ImageZoom from '../../Assets/Package/react-native-image-zoom/src';

import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';
import CustomImage from '../../Components/Common/CustomImage';

const {width: screenWidth} = Dimensions.get('window');

const ImageModal = ({source, itemWidth, itemHeight, hideModal}) => {
  const insets = useSafeArea();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

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
        </View>
        <View style={styles.body}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={screenWidth - 24}
            imageHeight={itemHeight * ((screenWidth - 24) / itemWidth)}>
            <CustomImage
              source={{uri: source}}
              defaultSource={require('../../Assets/Image/blurred.png')}
              style={[
                styles.img,
                itemHeight !== 0 && {
                  height: itemHeight * ((screenWidth - 24) / itemWidth),
                },
              ]}
              resizeMode="contain"
            />
          </ImageZoom>
        </View>
        <View style={[styles.footer, {paddingBottom: insets.bottom + 20}]}>
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={styles.linear}
          />
          <TouchableOpacity style={styles.button} onPress={hideModal}>
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
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 80,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
    marginTop: 0,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  close: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 20,
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
    alignItems: 'center',
  },
  img: {
    width: screenWidth - 24,
    height: screenWidth - 24,
    borderRadius: 6,
  },
});

export default ImageModal;
