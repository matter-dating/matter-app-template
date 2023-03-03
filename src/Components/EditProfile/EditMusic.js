import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  Text,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import Toast from '../../Assets/Package/react-native-toast-message';

import MusicCarousel from '../Music/MusicCarousel';
import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';
import {useAuth} from '../../Providers/AuthProvider';
import EditSongModal from '../../Screens/Modals/EditSongModal';

const {width: screenWidth} = Dimensions.get('window');

const EditMusic = ({
  userCards,
  stopIntroPlayer,
  togglePlay,
  currentVoice,
  isPlay,
  playerLoader,
}) => {
  const navigation = useNavigation();
  const [musicCards, setMusicCards] = useState(
    userCards
      .filter((c) => c.type === 'music')
      .sort((a, b) => (a.priority < b.priority ? -1 : 1)),
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const {deleteCard} = useAuth();

  const [moreVisible, setMoreVisible] = useState(false);
  const [card, setCard] = useState(null);

  useEffect(() => {
    setMusicCards(
      userCards
        .filter((c) => c.type === 'music')
        .sort((a, b) => (a.priority < b.priority ? -1 : 1)),
    );
  }, [userCards]);

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

  return (
    <View style={styles.item}>
      {musicCards.length === 0 && (
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>Song playlist</Text>
        </View>
      )}
      {musicCards.length > 0 ? (
        <View style={styles.carousel}>
          <MusicCarousel
            firstItem={activeSlide}
            data={musicCards}
            imgWidth={screenWidth - 230}
            itemWidth={screenWidth - 150}
            setActiveSlide={setActiveSlide}
            clickEditIcon={clickEditIcon}
            stopIntroPlayer={stopIntroPlayer}
            togglePlay={togglePlay}
            currentVoice={currentVoice}
            isPlay={isPlay}
            playerLoader={playerLoader}
          />
        </View>
      ) : (
        <View style={styles.box}>
          <View style={styles.center}>
            <Image
              style={styles.bg}
              source={require('../../Assets/Image/music.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>You don’t have any songs :(</Text>
            <Text style={styles.text}>
              Showcase your music taste!{'\n'}
              Let others enjoy your favorite songs…
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              stopIntroPlayer();
              navigation.navigate('CreateMusic');
            }}>
            <Text style={styles.buttonText}>Add your music</Text>
          </TouchableOpacity>
        </View>
      )}
      {musicCards.length > 0 && (
        <View style={styles.itemFooter}>
          <Text style={styles.itemTitle}>Song playlist</Text>
          {musicCards.length > 0 && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('MyMusic');
              }}>
              <EditIcon
                width={17}
                height={17}
                color={AppColors.AppBlack + 'CC'}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditSongModal card={card} deleteSong={deleteSong} hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  itemFooter: {
    paddingHorizontal: 10,
    paddingTop: 9,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  edit: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
  },
  box: {
    backgroundColor: AppColors.backgroundColor5,
    paddingVertical: 23,
    paddingHorizontal: 20,
  },
  center: {
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Light',
    color: AppColors.black + 'CC',
    textAlign: 'center',
    marginVertical: 8,
  },
  title: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.black + 'CC',
  },
  bg: {
    width: 126,
    height: 47,
    marginTop: 30,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: AppColors.MainColor,
    borderRadius: 8,
    padding: 14,
    marginTop: 70,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
});

export default EditMusic;
