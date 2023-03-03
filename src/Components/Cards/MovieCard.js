import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import PagerView from 'react-native-pager-view';

import ItemLike from '../Home/ItemLike';
import CustomImage from '../Common/CustomImage';
import EditIcon from '../../Assets/Svg/EditIcon';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';
import {groupBy} from '../../Utils/Functions';

import MultiMovieModal from '../../Screens/Modals/MultiMovieModal';

const screenWidth = Math.round(Dimensions.get('window').width);
const imgWidth = screenWidth - 24;
const miniImgWidth = (imgWidth - 6) / 2;
const imgHeight = (imgWidth / 2) * 3;

const MovieCard = ({
  card,
  userInfo,
  likeContent,
  stopIntroPlayer,
  hideLike,
  isModal,
  setPass,
}) => {
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [noGroup, setNoGroup] = useState(null);
  const [posts, setPosts] = useState(null);
  const {userData} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [passIndex, setPassIndex] = useState(0);
  const [passItem, setPassItem] = useState(null);

  useEffect(() => {
    if (card.content.length > 1) {
      setNoGroup(card.content);
      setPosts(
        groupBy(
          card.content.sort((a, b) => (a.priority < b.priority ? -1 : 1)),
        ),
      );
    }
  }, [card]);

  const hideModal = () => {
    setPassIndex(0);
    setPassItem(null);
    setModalVisible(false);
  };
  const showModal = (i, u) => {
    setPassIndex(i);
    setPassItem(u);
    setModalVisible(true);
  };

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };

  const renderItem = (item, i, index) => {
    const parseData = JSON.parse(item.content);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          showModal(index * 2 + i, noGroup);
        }}
        style={styles.item}
        key={item._id}>
        <CustomImage
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/' + parseData.poster_path,
          }}
          style={styles.miniImg}
        />
      </TouchableOpacity>
    );
  };

  const renderSingle = (item, index) => {
    return (
      <View style={styles.itemWrap} key={index}>
        {item.map((singleItem, i) => renderItem(singleItem, i, index))}
      </View>
    );
  };

  const renderMultiItem = () => {
    if (posts) {
      return (
        <PagerView
          style={styles.safe}
          initialPage={0}
          onPageScroll={onPageScroll}>
          {posts.map((item, index) => renderSingle(item, index))}
        </PagerView>
      );
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.wrap}>
        {card.content.length > 1 ? (
          renderMultiItem()
        ) : (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              showModal(0, card.content);
            }}>
            <CustomImage
              key={JSON.parse(card.content[0].content).poster_path}
              style={[styles.img]}
              source={{
                uri:
                  'https://image.tmdb.org/t/p/w500/' +
                  JSON.parse(card.content[0].content).poster_path,
              }}
            />
          </TouchableOpacity>
        )}
        <View style={styles.row}>
          <Text style={styles.title}>
            Favorite {card.content[0].type === 'movie' ? 'movies' : 'TV shows'}
          </Text>
          {posts && posts.length > 1 && (
            <View style={styles.pagination}>
              {posts.slice(0, 3).map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      page === index && styles.activeDot,
                    ]}
                  />
                );
              })}
            </View>
          )}
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
                        type: 'movieCard',
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
                  navigation.navigate('MyMovie', {type: card.content[0].type});
                }}>
                <EditIcon width={20} height={20} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <MultiMovieModal
          userInfo={userInfo}
          hideLike={hideLike}
          userData={userData}
          likeContent={likeContent}
          items={passItem}
          index={passIndex}
          hide={hideModal}
          setPass={setPass}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  wrap: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack + 'CC',
    lineHeight: 44,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
    flex: 1,
  },
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  safe: {
    height: miniImgWidth * 1.5,
  },
  miniImg: {
    // borderRadius: 4,
    width: miniImgWidth,
    height: miniImgWidth * 1.5,
  },

  pagination: {
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 5,
    marginHorizontal: 2,
    height: 5,
    borderRadius: 3,
    backgroundColor: AppColors.dot,
  },
  activeDot: {
    backgroundColor: AppColors.MainColor,
  },
});

export default MovieCard;
