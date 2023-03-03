import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {useSafeArea} from 'react-native-safe-area-context';
import UpArrowIcon from '../../Assets/Svg/UpArrowIcon';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

import SynopsisModal from './SynopsisModal';
import MovieCarousel from '../../Components/Movie/MovieCarousel';

const {width: screenWidth} = Dimensions.get('window');

const MultiMovieModal = ({
  userInfo,
  items,
  index,
  likeContent,
  userData,
  hide,
  hideLike,
  setPass,
}) => {
  const navigation = useNavigation();
  const insets = useSafeArea();
  const [activeSlide, setActiveSlide] = useState(index);

  const [moreVisible, setMoreVisible] = useState(false);
  const [detail, setDetail] = useState(null);

  const showSynopsis = (item) => {
    const movie = JSON.parse(item.content);
    setDetail(movie);
    setMoreVisible(true);
  };

  const hideSynopsis = () => {
    setDetail(null);
    setMoreVisible(false);
  };

  const clickEditIcon = (card) => {
    navigation.navigate('MyMovie', {type: items[0].type});
  };

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        style={[styles.flex, {paddingTop: insets.top + 10}]}
        source={require('../../Assets/Image/modal1.png')}
        resizeMode="contain">
        <View style={styles.header}>
          <Text style={styles.name}>{userInfo.first_name}’s</Text>
          <Text style={styles.title}>
            Favorite {items[0].type === 'movie' ? 'movies' : 'TV shows'}
          </Text>
          <Text style={styles.count}>
            {items.length} {items[0].type === 'movie' ? 'movies' : 'TV shows'}
          </Text>
        </View>
        <View style={styles.body}>
          <MovieCarousel
            firstItem={index}
            data={items}
            clickEditIcon={clickEditIcon}
            itemWidth={screenWidth - 60}
            setActiveSlide={setActiveSlide}
            likeContent={likeContent}
            userData={userData}
            userInfo={userInfo}
            hideLike={hideLike}
            hide={hide}
            setPass={setPass}
          />
        </View>
        <View style={[styles.footer, {paddingBottom: insets.bottom + 20}]}>
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={styles.linear}
          />
          <TouchableOpacity
            style={styles.more}
            onPress={() => showSynopsis(items[activeSlide])}>
            <View style={styles.rotate}>
              <UpArrowIcon color={Colors.white} width={44} height={44} />
            </View>
            <Text style={styles.moreText}>See film summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={hide}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <SynopsisModal
          detail={detail}
          hide={hideSynopsis}
          type={items[0].type}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.AppBlack,
    flex: 1,
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  name: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  count: {
    color: Colors.white + 'CC',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  title: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginVertical: 8,
  },
  more: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 16,
  },
  rotate: {
    transform: [{rotate: '180deg'}],
  },
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
    marginVertical: 16,
    marginTop: 0,
  },
  moreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.white,
  },
  close: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  linear: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MultiMovieModal;
