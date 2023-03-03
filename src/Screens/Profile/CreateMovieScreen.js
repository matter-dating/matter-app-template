import React, {useEffect, useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  Modal,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import {useSafeArea} from 'react-native-safe-area-context';
import {TmdbAPI} from '../../Api/TmdbAPI';

import SearchIcon from '../../Assets/Svg/SearchIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import EmptyIcon from '../../Assets/Svg/EmptyIcon';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import SuccessMovieModal from '../Modals/SuccessMovieModal';

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = (screenWidth - 68) / 2;
const itemHeight = itemWidth * 1.5;

const CreateMovieScreen = ({navigation, route}) => {
  const {type} = route.params;
  const insets = useSafeArea();
  const [keyword, setKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [result, setResult] = useState(null);
  const {createCard, userCards} = useAuth();
  const api = new TmdbAPI();
  const listRef = useRef(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (type === 'movie') {
      api.getTopRated(setResult);
    } else if (type === 'tv-show') {
      api.getTopRatedTvShow(setResult);
    }
    setKeyword('');
  }, []);

  const itemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const selectChoice = async () => {
    let credits;
    let cast;
    let director;
    try {
      if (type === 'movie') {
        const awaitResult = await api.getMovieCredits(selectedItem.id);
        credits = await awaitResult.json();
        cast = credits.cast[0].name;
        director = credits.crew.filter((x) => x.job === 'Director')[0].name;
      } else if (type === 'tv-show') {
        const awaitResult = await api.getTvCredits(selectedItem.id);
        credits = await awaitResult.json();
        cast = credits.cast[0].name;
        director = credits.crew.filter(
          (x) => x.job === 'Executive Producer' || x.job === 'Director',
        )[0].name;
      }
    } catch (e) {
      console.error(e);
    }
    createCard(
      type,
      'image',
      {...selectedItem, cast, director},
      true,
      userCards.filter((c) => c.type === type).length,
    );
    setModalVisible(true);
  };

  useEffect(() => {
    if (selectedItem) {
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
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(slideBottom, {
        toValue: -100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedItem]);

  const renderSingle = (item) => {
    return (
      <TouchableOpacity
        key={item.item.title}
        style={styles.singleBook}
        onPress={() => itemClick(item.item)}>
        <View
          style={[
            styles.imgWrap,
            selectedItem === item.item && styles.activeItem,
          ]}>
          <CustomImage
            style={styles.img}
            source={{
              uri: 'https://image.tmdb.org/t/p/w500/' + item.item.poster_path,
            }}
          />
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {type === 'movie' ? item.item.title : item.item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const hideModal = () => {
    setShowLoader(false);
    setSelectedItem(null);
    setModalVisible(false);
  };

  const doneModal = () => {
    setShowLoader(false);
    setModalVisible(false);
    setSelectedItem(null);
    navigation.goBack();
  };
  return (
    <View style={styles.wrap}>
      {showLoader && <FullScreenLoader />}
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon width={24} height={24} color={Colors.MainColor} />
        </TouchableOpacity>
        <CustomText.TitleText style={styles.pageTitle}>
          What’s your favorite {type === 'movie' ? 'movie' : 'TV show'}?
        </CustomText.TitleText>
        <View style={styles.searchWrap}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
            placeholder="Search by name, director, actor, etc"
            returnKeyType="search"
            placeholderTextColor={Colors.MainColor1 + '7A'}
            textAlignVertical="top"
            onSubmitEditing={() => {
              if (keyword !== '') {
                if (listRef) {
                  listRef.current.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                }
                if (type === 'movie') {
                  api.searchMovie(keyword, (res) => {
                    setResult(res);
                  });
                } else if (type === 'tv-show') {
                  api.searchTV(keyword, (res) => {
                    setResult(res);
                  });
                }
              }
            }}
          />
          <View style={styles.search}>
            <SearchIcon
              width={21}
              height={21}
              color={Colors.MainColor1 + '7A'}
            />
          </View>
        </View>
      </View>
      {result && result.length === 0 && (
        <View style={styles.wrapper}>
          <EmptyIcon width={71} height={71} color={AppColors.MainColor} />
          <Text style={styles.noResult}>No result found</Text>
          <Text style={styles.different}>Please try different spelling</Text>
        </View>
      )}
      <FlatList
        ref={listRef}
        style={[
          styles.list,
          (result === null || (result && result.length === 0)) && styles.hide,
        ]}
        data={result}
        contentContainerStyle={[
          styles.containerStyle,
          {paddingBottom: insets.bottom + 8},
        ]}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.wrapperStyle}
        keyExtractor={(item, index) => index}
        renderItem={renderSingle}
      />
      {result === null && (
        <View style={styles.wrapper}>
          <LottieView
            source={require('../../Assets/Animation/loader.json')}
            autoPlay
            loop
            style={styles.disableTouch}
          />
        </View>
      )}
      <Animated.View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + 8,
            opacity: fadeAnim,
            bottom: slideBottom,
          },
        ]}>
        <LinearGradient
          colors={['#FFFFFF00', '#FFFFFF']}
          style={styles.linear}
        />
        <View style={styles.box}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowLoader(true);
              selectChoice();
            }}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <SuccessMovieModal
          selectedItem={selectedItem}
          clickHide={hideModal}
          clickDone={doneModal}
          type={type}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  header: {
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '66',
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 16,
    color: AppColors.MainColor1,
    marginTop: 10,
    marginBottom: 20,
  },
  empty: {
    width: 24,
  },
  searchWrap: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.22,
    elevation: 3,
    paddingLeft: 46,
    paddingRight: 10,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    paddingVertical: 12,
    color: Colors.MainColor1,
    height: 44,
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 16,
  },
  hide: {
    display: 'none',
  },
  search: {
    position: 'absolute',
    top: 0,
    left: 16,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgWrap: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.22,
  },
  activeItem: {
    borderWidth: 2,
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: AppColors.MainColor,
  },
  img: {
    width: itemWidth,
    height: itemHeight,
    borderRadius: 3,
  },
  title: {
    flex: 1,
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 12,
    minHeight: 32,
    color: AppColors.MainColor1,
  },
  list: {
    paddingHorizontal: 22,
  },
  singleBook: {
    width: itemWidth + 4,
    marginTop: 13,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  linear: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  box: {
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    width: '100%',
    backgroundColor: AppColors.MainColor,
  },
  save: {
    backgroundColor: AppColors.button,
  },
  button: {
    width: '100%',
    padding: 13,
    textAlign: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    color: Colors.white,
  },
  blackText: {
    color: AppColors.AppBlack,
  },
  containerStyle: {
    paddingTop: 15,
  },
  wrapperStyle: {
    justifyContent: 'space-between',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 101,
    elevation: 101,
    flex: 1,
    paddingBottom: '15%',
  },
  disableTouch: {
    zIndex: 20,
    width: 61,
  },
  different: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.MainColor,
    lineHeight: 18,
    marginTop: 4,
  },
  noResult: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.MainColor,
    lineHeight: 23,
    marginTop: 13,
  },
});

export default CreateMovieScreen;
