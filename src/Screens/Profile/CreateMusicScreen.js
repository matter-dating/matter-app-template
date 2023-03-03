/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal,
  Animated,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import {useSafeArea} from 'react-native-safe-area-context';

import SearchIcon from '../../Assets/Svg/SearchIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import PlayIcon from '../../Assets/Svg/PlayIcon';
import EmptyIcon from '../../Assets/Svg/EmptyIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';
import FullScreenLoader from '../../Components/Common/FullScreenLoader';
import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {SpotifyAPI} from '../../Api/SpotifyAPI';
import SuccessMusicModal from '../Modals/SuccessMusicModal';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

const CreateMusicScreen = ({navigation, route}) => {
  const insets = useSafeArea();
  const [keyword, setKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [result, setResult] = useState(null);
  const {user, createCard, userCards} = useAuth();

  const token = useRef(null);
  const listRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(null);
  const api = new SpotifyAPI();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideBottom = useRef(new Animated.Value(-100)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const load_playlist = async () => {
      const spotifyToken = await user.callFunction('generateSpotifyToken', []);
      token.current = spotifyToken.result.access_token;
      setKeyword('');
      api.recommendedPlaylist(token.current, setResult);
    };

    audioRecorderPlayer.removePlayBackListener();
    audioRecorderPlayer.addPlayBackListener((e) => {
      var totalDuration = Math.round(e.duration / 1000) * 1000;
      if (Math.round(e.currentPosition / 1000) * 1000 === totalDuration) {
        setCurrentSong(null);
        audioRecorderPlayer.stopPlayer();
      }
    });

    load_playlist();
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const itemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const selectChoice = () => {
    setShowLoader(true);
    createCard(
      'music',
      'image',
      {
        name: selectedItem.name,
        image: selectedItem.album.images[0].url,
        artist: selectedItem.artists[0].name,
        preview_url: selectedItem.preview_url,
      },
      true,
      userCards.filter((c) => c.type === 'music').length,
    );
    // setSelectedItem(null);
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

  const searchMusic = async () => {
    if (keyword !== '') {
      if (listRef) {
        listRef.current.scrollToOffset({animated: true, offset: 0});
      }
      if (token.current) {
        api.searchMusic(keyword, token.current, setResult);
      } else {
        const spotifyToken = await user.callFunction(
          'generateSpotifyToken',
          [],
        );
        token.current = spotifyToken.result.access_token;
        api.searchMusic(keyword, token.current, setResult);
      }
    }
  };

  const playMusic = async (song) => {
    if (song.preview_url && song.preview_url !== currentSong) {
      setCurrentSong(song.preview_url);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(song.preview_url);
    } else if (song.preview_url === currentSong) {
      setCurrentSong(null);
      audioRecorderPlayer.stopPlayer();
    }
  };

  const renderSingle = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.singleMusic, selectedItem === item && styles.activeItem]}
        onPress={() => itemClick(item)}>
        <View style={styles.imgWrap}>
          <CustomImage
            style={styles.img}
            source={{uri: item.album.images[0].url}}
          />
        </View>
        <View style={styles.flex}>
          <Text numberOfLines={1} style={styles.title}>
            {item.artists[0].name}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {item.name}
          </Text>
        </View>
        {item.preview_url && (
          <TouchableOpacity style={styles.play} onPress={() => playMusic(item)}>
            {!!currentSong && currentSong === item.preview_url ? (
              <PauseIcon width={40} height={20} color={AppColors.MainColor} />
            ) : (
              <PlayIcon width={40} height={40} color={AppColors.MainColor} />
            )}
          </TouchableOpacity>
        )}
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
          What’s your favorite song?
        </CustomText.TitleText>
        <View style={styles.searchWrap}>
          <View style={styles.search}>
            <SearchIcon
              width={21}
              height={21}
              color={Colors.MainColor1 + '7A'}
            />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setKeyword(text)}
            value={keyword}
            placeholder="Search by name, artist, genre, etc"
            returnKeyType="search"
            placeholderTextColor={Colors.MainColor1 + '7A'}
            textAlignVertical="top"
            onSubmitEditing={searchMusic}
          />
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
        showsVerticalScrollIndicator={false}
        data={result}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: insets.bottom + 8,
          },
        ]}
        keyExtractor={(item, index) => item.id}
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
          <TouchableOpacity style={styles.button} onPress={selectChoice}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <SuccessMusicModal
          selectedItem={selectedItem}
          clickHide={hideModal}
          clickDone={doneModal}
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
  flex: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 20,
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
    zIndex: 1000,
  },
  imgWrap: {
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
    width: 56,
    height: 48,
    borderRadius: 4,
    marginRight: 14,
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    marginBottom: 2,
    color: AppColors.MainColor1 + 'CC',
  },
  artist: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: AppColors.MainColor1,
    lineHeight: 18,
  },
  list: {
    // paddingHorizontal: 12,
  },
  container: {
    paddingTop: 15,
  },
  singleMusic: {
    borderWidth: 2,
    borderColor: 'transparent',
    // overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 10,
    marginHorizontal: 12,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  play: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    width: 40,
    height: 40,
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

export default CreateMusicScreen;
