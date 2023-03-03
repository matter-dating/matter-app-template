import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import PagerView from 'react-native-pager-view';

import CustomImage from '../Common/CustomImage';

import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';
import AddIcon from '../../Assets/Svg/AddIcon';

import MovieIcon from '../../Assets/Svg/New/MovieIcon';
import TvShowIcon from '../../Assets/Svg/New/TvShowIcon';
import {groupBy} from '../../Utils/Functions';

const screenWidth = Math.round(Dimensions.get('window').width);
const imgWidth = screenWidth - 24;
const miniImgWidth = (imgWidth - 6) / 2;

const EditMovie = ({userCards, type, stopIntroPlayer}) => {
  const navigation = useNavigation();
  const [movieCards, setMovieCards] = useState(
    userCards
      .filter((c) => c.type === type)
      .sort((a, b) => (a.priority < b.priority ? -1 : 1)),
  );

  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(null);

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };

  const renderItem = (singleItem, i, index) => {
    const parseData = JSON.parse(singleItem.content);
    return (
      <View key={singleItem._id}>
        <CustomImage
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/' + parseData.poster_path,
          }}
          style={styles.miniImg}
        />
      </View>
    );
  };

  const renderSingle = (item, index) => {
    return (
      <View style={styles.itemWrap} key={index}>
        {item.map((singleItem, i) => renderItem(singleItem, i, index))}
        {item.length % 2 === 1 && (
          <TouchableOpacity
            onPress={() => {
              stopIntroPlayer();
              navigation.navigate('CreateMovie', {type: type});
            }}
            style={styles.center}>
            <AddIcon color={AppColors.AppBlack + 'B3'} width={17} height={17} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  useEffect(() => {
    if (movieCards.length > 0) {
      setPosts(groupBy(movieCards));
    }
  }, [movieCards]);

  useEffect(() => {
    setMovieCards(
      userCards
        .filter((c) => c.type === type)
        .sort((a, b) => (a.priority < b.priority ? -1 : 1)),
    );
  }, [userCards, type]);

  return (
    <View style={styles.outer}>
      <View style={styles.item}>
        {posts ? (
          <View style={styles.box}>
            <PagerView
              ref={pagerRef}
              style={styles.safe}
              initialPage={0}
              onPageScroll={onPageScroll}>
              {posts.map((item, index) => renderSingle(item, index))}
            </PagerView>
          </View>
        ) : (
          <View style={styles.box}>
            <TouchableOpacity
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('CreateMovie', {type: type});
              }}
              style={styles.center}>
              <AddIcon
                color={AppColors.AppBlack + 'B3'}
                width={17}
                height={17}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('CreateMovie', {type: type});
              }}
              style={styles.center}>
              <AddIcon
                color={AppColors.AppBlack + 'B3'}
                width={17}
                height={17}
              />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.itemFooter}>
          {movieCards.length > 0 ? (
            <Text style={styles.itemTitle}>
              My favorite {type === 'movie' ? 'movies' : 'TV shows'}
            </Text>
          ) : (
            <View style={styles.row}>
              {type === 'movie' ? (
                <MovieIcon width={19} height={19} />
              ) : (
                <TvShowIcon width={19} height={19} />
              )}
              <Text style={[styles.itemTitle, styles.rowItemTitle]}>
                Add your favorite {type === 'movie' ? 'movies' : 'TV shows'}
              </Text>
            </View>
          )}
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
          {movieCards.length > 0 && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() => {
                stopIntroPlayer();
                navigation.navigate('MyMovie', {type: type});
              }}>
              <EditIcon
                width={17}
                height={17}
                color={AppColors.AppBlack + 'CC'}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    elevation: 100,
  },
  item: {
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
    lineHeight: 44,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowItemTitle: {
    marginLeft: 9,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safe: {
    flex: 1,
    height: miniImgWidth * 1.5,
  },
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  miniImg: {
    width: miniImgWidth,
    height: miniImgWidth * 1.5,
    borderRadius: 4,
  },
  center: {
    width: miniImgWidth,
    height: miniImgWidth * 1.5,
    backgroundColor: AppColors.backgroundColor5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
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
export default EditMovie;
