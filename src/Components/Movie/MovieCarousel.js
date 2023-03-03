import React from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import HearthIcon from '../../Assets/Svg/HearthIcon';
import CustomImage from '../Common/CustomImage';
import EditIcon from '../../Assets/Svg/EditIcon';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';
const {width: screenWidth} = Dimensions.get('window');

const MovieCarousel = ({
  firstItem,
  data,
  userInfo,
  itemWidth,
  setActiveSlide,
  clickEditIcon,
  likeContent,
  userData,
  hideLike,
  hide,
  setPass,
}) => {
  const renderSingle = (item) => {
    const movie = JSON.parse(item.content);
    return (
      <View key={item.id}>
        {userInfo.user_id === userData.user_id && (
          <TouchableOpacity
            style={styles.like}
            onPress={() => clickEditIcon(item)}>
            <EditIcon width={24} height={24} color={AppColors.MainColor} />
          </TouchableOpacity>
        )}
        {userInfo.user_id !== userData.user_id &&
          !userInfo.is_liked &&
          !hideLike && (
            <TouchableOpacity
              style={styles.like}
              onPress={() => {
                if (!likeContent) {
                  hide();
                  setPass({
                    type: 'movie',
                    card: item,
                    target: userInfo,
                  });
                } else {
                  hide();
                  setPass({
                    type: 'likeBack',
                    likeContent: likeContent,
                    target: userInfo,
                  });
                }
              }}>
              <HearthIcon width={19} height={16} color={Colors.white} />
            </TouchableOpacity>
          )}
        <CustomImage
          source={{uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path}}
          style={[styles.img, {width: itemWidth, height: (itemWidth / 2) * 3}]}
        />
      </View>
    );
  };

  return (
    <Carousel
      data={data}
      useScrollView={true}
      renderItem={({item, index}) => renderSingle(item)}
      firstItem={firstItem}
      sliderWidth={screenWidth}
      itemWidth={itemWidth}
      onSnapToItem={(index) => setActiveSlide(index)}
      scrollInterpolator={customScrollInterpolator}
      slideInterpolatedStyle={customAnimatedStyles}
    />
  );
};

const styles = StyleSheet.create({
  like: {
    borderRadius: 22,
    zIndex: 100,
    right: 10,
    top: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0.8,
    backgroundColor: AppColors.AppBlack + 'B8',
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.8,
  },
  img: {
    borderRadius: 6,
  },
});

export default MovieCarousel;
