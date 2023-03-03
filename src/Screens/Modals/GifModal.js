import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import {GifSearch, poweredByGiphyLogoGrey} from 'react-native-gif-search';

import AppColors from '../../Utils/AppColors';
import Colors from '../../Utils/Colors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

const {height: screenHeight} = Dimensions.get('window');
const GifModal = ({route, navigation}) => {
  const {selectGif} = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

  const clickItem = (url, object) => {
    selectGif(url, object);
    navigation.goBack();
  };

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

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity style={styles.bg} onPress={() => navigation.goBack()} />
      <Animated.View
        style={[
          {
            bottom: slideBottom,
          },
        ]}>
        <View style={styles.innerWrapper}>
          <View style={styles.header}>
            <View style={styles.close} />
            <Text style={styles.headerText}>GIFs</Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.close}>
              <DeleteIcon width={20} height={20} color={'#45AECE'} />
            </TouchableOpacity>
          </View>
          <GifSearch
            giphyApiKey="VtScX0cLzGf06SL5G78hfhLp7gYNaTkG"
            gifsToLoad={12}
            maxGifsToLoad={24}
            style={styles.innerContainer}
            gifStyle={styles.gifStyle}
            textInputStyle={styles.input}
            gifListStyle={styles.gifListStyle}
            numColumns={3}
            loadingSpinnerColor={AppColors.MainColor}
            placeholderTextColor={'grey'}
            placeholderText={'Search'}
            provider={'giphy'}
            providerLogo={poweredByGiphyLogoGrey}
            darkGiphyLogo={false}
            showScrollBar={false}
            onGifSelected={(gif_url, gif_object) => {
              clickItem(gif_url, gif_object);
            }}
            onError={(error) => {
              // console.log(error);
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  innerWrapper: {
    height: screenHeight * 0.75,
  },
  gifListStyle: {
    height: screenHeight * 0.75,
  },
  title: {
    textAlign: 'center',
    color: Colors.MainColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  gifStyle: {
    borderColor: AppColors.MainColor,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(245, 245, 245, 1)',
    height: 'auto',
    left: 0,
    elevation: 3,
    zIndex: 3,
  },
  input: {
    fontFamily: 'Poppins-Medium',
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: '#0000000D',
    color: '#222',
    fontSize: 16,
    lineHeight: 20,
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    color: '#45AECEE0',
    fontSize: 15,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 17,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#45AECE52',
    backgroundColor: 'rgba(245, 245, 245, 1)',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  close: {
    width: 30,
  },
});

export default GifModal;
