import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from '../../Assets/Package/react-native-toast-message';

import ItemLike from '../Home/ItemLike';
import Colors from '../../Utils/Colors';
import EditIcon from '../../Assets/Svg/EditIcon';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import EditSongModal from '../../Screens/Modals/EditSongModal';

import MusicCarousel from '../Music/MusicCarousel';

const {width: screenWidth} = Dimensions.get('window');

const MusicCard = ({
  card,
  userInfo,
  likeContent,
  stopIntroPlayer,
  hideLike,
  isModal,
  togglePlay,
  currentVoice,
  isPlay,
  playerLoader,
  setPass,
}) => {
  const navigation = useNavigation();

  const [posts, setPosts] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const {userData, deleteCard} = useAuth();

  const [moreVisible, setMoreVisible] = useState(false);
  const [editMusic, setEditMusic] = useState(null);
  useEffect(() => {
    if (card.content.length > 0) {
      setPosts(card.content.sort((a, b) => (a.priority < b.priority ? -1 : 1)));
    }
  }, [card]);

  const deleteSong = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: JSON.parse(editMusic.content).name,
      text2: 'Is deleted your list',
      topOffset: 0,
      visibilityTime: 2000,
    });
    deleteCard(editMusic);
  };
  const hideModal = () => {
    setEditMusic(null);
    setMoreVisible(false);
  };
  const clickEditIcon = (item) => {
    stopIntroPlayer && stopIntroPlayer();
    setEditMusic(item);
    setMoreVisible(true);
  };

  return (
    <View style={styles.outer}>
      <View style={styles.wrap}>
        <View style={styles.box}>
          {posts && (
            <MusicCarousel
              firstItem={activeSlide}
              likeContent={likeContent}
              clickEditIcon={clickEditIcon}
              userInfo={userInfo}
              data={posts}
              imgWidth={screenWidth - 168}
              itemWidth={screenWidth - 100}
              setActiveSlide={setActiveSlide}
              stopIntroPlayer={stopIntroPlayer}
              hideLike={hideLike}
              isModal={isModal}
              togglePlay={togglePlay}
              currentVoice={currentVoice}
              isPlay={isPlay}
              playerLoader={playerLoader}
              setPass={setPass}
            />
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Song playlist</Text>
          {userInfo.user_id !== userData.user_id &&
            !userInfo.is_liked &&
            !hideLike && (
              <View style={styles.like}>
                <ItemLike
                  width={23}
                  height={23}
                  color={AppColors.AppBlack + 'C2'}
                  onPress={() => {
                    stopIntroPlayer && stopIntroPlayer();
                    if (!likeContent) {
                      setPass({
                        type: 'musicCard',
                        card: card,
                        isModal: isModal,
                        target: userInfo,
                      });
                    } else {
                      setPass({
                        type: 'likeBack',
                        isModal: isModal,
                        likeContent: likeContent,
                        target: userInfo,
                      });
                    }
                  }}
                />
              </View>
            )}
          {userInfo.user_id === userData.user_id && (
            <View style={styles.like}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopIntroPlayer && stopIntroPlayer();
                  navigation.navigate('MyMusic');
                }}>
                <EditIcon width={20} height={20} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditSongModal card={card} deleteSong={deleteSong} hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginVertical: 14,
    marginHorizontal: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    borderRadius: 8,
  },
  wrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'CC',
    lineHeight: 44,
  },
  like: {
    marginLeft: 'auto',
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
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    width: screenWidth - 100,
    height: ((screenWidth - 100) / 25) * 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  transparent: {
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.black + 'AD',
  },
  img: {
    borderWidth: 6,
    borderColor: AppColors.MainColor,
    width: screenWidth - 168,
    height: screenWidth - 168,
    borderRadius: (screenWidth - 168) / 2,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    color: Colors.white,
    lineHeight: 27,
    marginBottom: 4,
  },
});

export default MusicCard;
