import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';

import PagerView from 'react-native-pager-view';

import ItemLike from '../Home/ItemLike';
import CustomImage from '../Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';

import MultiImageModal from '../../Screens/Modals/MultiImageModal';

const {width: screenWidth} = Dimensions.get('window');
const itemSize = (screenWidth - 40) / 3;

function groupBy(collection, property) {
  let group = [];
  for (i = 0; i < collection.length; i = i + 9) {
    var temp = collection.slice(i, i + 9);
    group.push(temp);
  }
  return group;
}

const InstaCard = ({
  likeContent,
  card,
  userInfo,
  token,
  deleteInstaCard,
  stopIntroPlayer,
  hideLike,
  isModal,
  setPass,
}) => {
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  const [posts, setPosts] = useState(null);
  const [noGroup, setNoGroup] = useState(null);
  const [nextApi, setNextApi] = useState(null);
  const {userData} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [passIndex, setPassIndex] = useState(0);

  useEffect(() => {
    fetch(
      'https://graph.instagram.com/me/media?fields=id,media_url,media_type&access_token=' +
        token,
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          setNextApi(json.paging.next);
          setNoGroup(json.data.filter((x) => x.media_type === 'IMAGE'));
          // setPosts(groupBy(json.data.filter(x => x.media_type === 'IMAGE')))
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };

  const hideModal = () => {
    setPassIndex(0);
    setModalVisible(false);
  };

  useEffect(() => {
    if (nextApi && noGroup && noGroup.length > 0 && noGroup.length < 27) {
      fetch(nextApi)
        .then((response) => response.json())
        .then((json) => {
          if (json.data && json.data.length > 0) {
            const tmp = noGroup.concat(
              json.data.filter((x) => x.media_type === 'IMAGE'),
            );
            setNoGroup(tmp);
            // setPosts(groupBy(json.data.filter(x => x.media_type === 'IMAGE')))
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [noGroup, nextApi]);

  useEffect(() => {
    if (noGroup) {
      setPosts(groupBy(noGroup.filter((x) => x.media_type === 'IMAGE')));
    }
  }, [noGroup]);

  const showModal = (i) => {
    setPassIndex(i);
    setModalVisible(true);
  };

  const renderItem = (item, i, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          showModal(index * 9 + i);
        }}
        style={[
          styles.item,
          (index * 9 + i + 1) % 3 === 2 &&
            index * 9 + i + 1 === noGroup.length &&
            styles.lastItem,
        ]}
        key={item.id}>
        <CustomImage source={{uri: item.media_url}} style={styles.img} />
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

  return (
    <View
      style={[
        styles.outer,
        userInfo.user_id === userData.user_id && styles.editOuter,
      ]}>
      <View
        style={[
          styles.wrap,
          userInfo.user_id === userData.user_id && styles.editWrap,
        ]}>
        {posts && (
          <>
            <PagerView
              ref={pagerRef}
              style={[
                styles.safe,
                noGroup.length > 3 && styles.safeTwoRow,
                noGroup.length > 6 && styles.safeFull,
              ]}
              initialPage={0}
              onPageScroll={onPageScroll}>
              {posts
                .slice(0, 3)
                .map((item, index) => renderSingle(item, index))}
            </PagerView>
            <View style={styles.footer}>
              <Text style={styles.itemTitle}>Instagram photos</Text>
              {posts.slice(0, 3).length > 1 && (
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
              {userInfo.user_id === userData.user_id ? (
                <TouchableOpacity
                  style={styles.disconnect}
                  onPress={() => {
                    stopIntroPlayer && stopIntroPlayer();
                    deleteInstaCard();
                  }}>
                  <Text style={styles.disconnectText}>Disconnect</Text>
                </TouchableOpacity>
              ) : (
                userInfo.user_id !== userData.user_id &&
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
                            type: 'instaCard',
                            card: card,
                            isModal: isModal,
                            noGroup: noGroup,
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
                )
              )}
            </View>
          </>
        )}
      </View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <MultiImageModal
          index={passIndex}
          hide={hideModal}
          userInfo={userInfo}
          urls={noGroup}
          likeContent={likeContent}
          userData={userData}
          hideLike={hideLike}
          setPass={setPass}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginVertical: 14,
    marginHorizontal: 12,
    elevation: 100,
  },
  wrap: {
    backgroundColor: AppColors.white,
  },
  editOuter: {
    marginVertical: 0,
    marginHorizontal: 12,
  },
  editWrap: {
    marginVertical: 0,
    marginHorizontal: 0,
  },
  safe: {
    height: itemSize + 12,
    width: screenWidth - 24,
    flex: 1,
  },
  safeTwoRow: {
    height: itemSize * 2 + 20,
  },
  safeFull: {
    height: itemSize * 3 + 30,
  },
  footer: {
    paddingHorizontal: 10,
    paddingTop: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 44,
  },
  disconnect: {
    paddingHorizontal: 7,
  },
  disconnectText: {
    color: AppColors.MainColor,
    fontFamily: 'Poppins-Medium',
  },
  title: {
    fontSize: 16,
  },
  like: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: 12,
    bottom: 12,
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
  img: {
    width: itemSize,
    height: itemSize,
  },
  item: {
    width: itemSize,
    height: itemSize,
    marginTop: 0,
    marginBottom: 8,
    shadowColor: '#3A5777',
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lastItem: {
    marginRight: 'auto',
    marginLeft: 8,
  },
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pagination: {
    marginLeft: 12,
    marginRight: 'auto',
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

export default InstaCard;
