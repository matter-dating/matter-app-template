import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Toast from '../../Assets/Package/react-native-toast-message';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

import CustomText from '../../Components/Common/Text';

import BackIcon from '../../Assets/Svg/BackIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import CardIcon from '../../Assets/Svg/CardIcon';
import ListIcon from '../../Assets/Svg/ListIcon';

import {useAuth} from '../../Providers/AuthProvider';

import MusicCarousel from '../../Components/Music/MusicCarousel';
import MusicList from '../../Components/Music/MusicList';

import EditSongModal from '../Modals/EditSongModal';
const {width: screenWidth} = Dimensions.get('window');

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
const audioRecorderPlayer = new AudioRecorderPlayer();

function MyMusicScreen({route, navigation}) {
  const insets = useSafeArea();
  const {userCards, deleteCard} = useAuth();

  const [seeCarousel, setSeeCarousel] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [moreVisible, setMoreVisible] = useState(false);
  const [card, setCard] = useState(null);

  const [isPlay, setIsPlay] = useState(false);
  const [currentVoice, setCurrentVoice] = useState(null);
  const [playerLoader, setPlayerLoader] = useState(false);

  useEffect(() => {
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  const toggleView = () => {
    stopIntroPlayer();
    setSeeCarousel(!seeCarousel);
  };

  const deleteSong = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: JSON.parse(card.content).name,
      text2: 'Is deleted your list',
      topOffset: 0,
      visibilityTime: 2000,
    });
    deleteCard(card);
  };

  const hideModal = () => {
    setCard(null);
    setMoreVisible(false);
  };

  const clickEditIcon = (item) => {
    setCard(item);
    setMoreVisible(true);
  };

  const togglePlay = async (item, sec) => {
    setIsPlay(false);
    setPlayerLoader(false);
    audioRecorderPlayer.stopPlayer();
    if (item !== currentVoice) {
      setPlayerLoader(true);
      setCurrentVoice(item);
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.startPlayer(item);
    } else if (item === currentVoice) {
      stopIntroPlayer();
    }
  };

  useEffect(() => {
    audioRecorderPlayer.removePlayBackListener();
    if (currentVoice) {
      audioRecorderPlayer.addPlayBackListener((e) => {
        if (e.currentPosition > 0) {
          setPlayerLoader(false);
          setIsPlay(true);
        }
        if (e.currentPosition === e.duration) {
          setIsPlay(false);
          setCurrentVoice(null);
          audioRecorderPlayer.stopPlayer();
        }
      });
    }
  }, [currentVoice]);

  const stopIntroPlayer = () => {
    if (currentVoice) {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setCurrentVoice(null);
      setIsPlay(false);
      setPlayerLoader(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              stopIntroPlayer();
              navigation.goBack();
            }}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            My playlist
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        <CustomText.RegularText style={styles.description}>
          {userCards.filter((c) => c.type === 'music').length > 0
            ? 'Tap on song to edit'
            : 'You can add up to 15 songs'}
        </CustomText.RegularText>
      </View>
      {userCards.filter((c) => c.type === 'music').length > 0 && (
        <View style={styles.toggleWrap}>
          <View style={styles.emptyToggle} />
          {!seeCarousel && (
            <Text style={styles.rearrange}>Press and hold to rearrange</Text>
          )}
          <TouchableOpacity style={styles.toggle} onPress={toggleView}>
            {seeCarousel ? (
              <ListIcon color={AppColors.MainColor} width={16} height={18} />
            ) : (
              <CardIcon color={AppColors.MainColor} width={16} height={18} />
            )}
          </TouchableOpacity>
        </View>
      )}
      {seeCarousel ? (
        <View style={styles.carousel}>
          <View>
            <MusicCarousel
              firstItem={activeSlide}
              data={userCards
                .filter((c) => c.type === 'music')
                .sort((a, b) => (a.priority < b.priority ? -1 : 1))}
              imgWidth={screenWidth - 230}
              itemWidth={screenWidth - 150}
              setActiveSlide={setActiveSlide}
              clickEditIcon={clickEditIcon}
              togglePlay={togglePlay}
              stopIntroPlayer={stopIntroPlayer}
              currentVoice={currentVoice}
              isPlay={isPlay}
              playerLoader={playerLoader}
            />
          </View>
        </View>
      ) : (
        <View style={styles.list}>
          <MusicList
            clickEditIcon={clickEditIcon}
            data={userCards
              .filter((c) => c.type === 'music')
              .sort((a, b) => (a.priority < b.priority ? -1 : 1))}
            togglePlay={togglePlay}
            currentVoice={currentVoice}
            isPlay={isPlay}
            playerLoader={playerLoader}
          />
        </View>
      )}
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMain]}
          onPress={() => {
            stopIntroPlayer();
            navigation.navigate('CreateMusic');
          }}>
          <AddIcon color={AppColors.white} width={20} height={20} />
          <Text style={[styles.buttonText, styles.whiteText]}>Add a song</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            stopIntroPlayer();
            navigation.goBack();
          }}>
          <Text style={styles.buttonText}>Save & Close</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditSongModal card={card} deleteSong={deleteSong} hide={hideModal} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  title: {
    fontSize: 14,
  },
  emptyToggle: {
    width: 42,
    height: 42,
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 21,
    marginBottom: 10,
  },
  rearrange: {
    fontSize: 12,
    lineHeight: 18,
    color: AppColors.AppBlack + '80',
    fontFamily: 'Poppins-Regular',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    width: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    color: AppColors.AppBlack + 'B8',
  },
  play: {
    marginLeft: 'auto',
    marginRight: 6,
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.22,
  },
  button: {
    backgroundColor: AppColors.button,
    margin: 20,
    marginTop: 0,
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  toggle: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  buttonMain: {
    backgroundColor: AppColors.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
  whiteText: {
    color: AppColors.white,
    marginLeft: 9,
  },
  list: {
    flex: 1,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 56,
    height: 48,
    borderRadius: 4,
    marginRight: 14,
  },
  name: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 4,
  },
  artist: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    lineHeight: 18,
  },
  edit: {
    padding: 7,
    backgroundColor: Colors.white,
    opacity: 0.56,
  },
});

export default MyMusicScreen;
