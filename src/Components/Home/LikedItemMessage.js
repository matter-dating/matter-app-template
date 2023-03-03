import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import CustomImage from '../Common/CustomImage';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import AppColors from '../../Utils/AppColors';
import MusicIcon from '../../Assets/Svg/MusicIcon';
import ImageIcon from '../../Assets/Svg/ImageIcon';
import MovieIcon from '../../Assets/Svg/MovieIcon';

const LikedItemMessage = ({likeContent}) => {
  const renderImage = () => {
    if (likeContent.type === 'image') {
      return (
        <CustomImage style={styles.img} source={{uri: likeContent.card}} />
      );
    }
    if (likeContent.type === 'imageCard') {
      return (
        <CustomImage
          style={styles.img}
          source={{
            uri: S3_PHOTO_URL + likeContent.card.content.image_id + '.jpg',
          }}
        />
      );
    }
    if (likeContent.type === 'insta') {
      return (
        <CustomImage style={styles.img} source={{uri: likeContent.card}} />
      );
    }
    if (likeContent.type === 'movie') {
      return (
        <CustomImage
          style={styles.img1}
          source={{
            uri:
              'https://image.tmdb.org/t/p/w500/' +
              JSON.parse(likeContent.card.content).poster_path,
          }}
        />
      );
    }
    return <></>;
  };
  const renderIcon = () => {
    if (likeContent.type === 'music' || likeContent.type === 'musicCard') {
      return (
        <View style={styles.icon}>
          <MusicIcon color={AppColors.AppBlack} width={16} height={16} />
        </View>
      );
    }
    if (likeContent.type === 'movieCard') {
      return (
        <View style={styles.icon}>
          <MovieIcon color={AppColors.AppBlack} width={16} height={16} />
        </View>
      );
    }
    if (likeContent.type === 'instaCard') {
      return (
        <View style={styles.icon}>
          <ImageIcon color={AppColors.AppBlack} width={16} height={16} />
        </View>
      );
    }
    return <></>;
  };
  const renderText = () => {
    if (likeContent.type === 'image' || likeContent.type === 'imageCard') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your photo
        </Text>
      );
    }
    if (likeContent.type === 'insta') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your instagram photo
        </Text>
      );
    }
    if (likeContent.type === 'instaCard') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your instagram photos
        </Text>
      );
    }
    if (likeContent.type === 'movie') {
      if (JSON.parse(likeContent.card.content).media_type === 'movie') {
        return (
          <Text style={styles.title} numberOfLines={1}>
            {JSON.parse(likeContent.card.content).title}
          </Text>
        );
      } else {
        return (
          <Text style={styles.title} numberOfLines={1}>
            {JSON.parse(likeContent.card.content).name}
          </Text>
        );
      }
    }
    if (likeContent.type === 'movieCard') {
      if (likeContent.card.type === 'movie') {
        return (
          <Text style={styles.title} numberOfLines={1}>
            Your movie list
          </Text>
        );
      } else {
        return (
          <Text style={styles.title} numberOfLines={1}>
            Your Tv shows
          </Text>
        );
      }
    }
    if (likeContent.type === 'music') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          {JSON.parse(likeContent.card.content).artist} -{' '}
          {JSON.parse(likeContent.card.content).name}
        </Text>
      );
    }
    if (likeContent.type === 'musicCard') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your song playlist
        </Text>
      );
    }
    if (likeContent.type === 'prompt') {
      return (
        <Text style={styles.title}>
          " {JSON.parse(likeContent.card.content).question} "
        </Text>
      );
    }
    if (likeContent.type === 'hobbies') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your hobbies
        </Text>
      );
    }
    if (likeContent.type === 'voice-intro') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your voice intro
        </Text>
      );
    }
    return <></>;
  };
  return (
    <View style={styles.zIndex}>
      <View
        style={[
          styles.topWrap,
          likeContent.type === 'prompt' && styles.color1,
          (likeContent.type === 'movie' || likeContent.type === 'movieCard') &&
            styles.color2,
        ]}>
        <View
          style={[
            styles.content,
            (likeContent.type === 'image' ||
              likeContent.type === 'imageCard' ||
              likeContent.type === 'insta' ||
              likeContent.type === 'movie') &&
              styles.imageContent,
          ]}>
          {renderImage()}
          <View style={styles.row}>
            {renderIcon()}
            <Text style={styles.title} numberOfLines={2}>
              {renderText()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.outer}>
        <View style={styles.wrap}>
          {likeContent.message !== '' && (
            <Text style={styles.message}>{likeContent.message}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zIndex: {
    zIndex: 100,
    elevation: 100,
  },
  outer: {
    marginBottom: -42,
  },
  wrap: {
    borderRadius: 12,
    borderBottomStartRadius: 0,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#5C80E3',
    paddingHorizontal: 21,
    paddingVertical: 10,
  },
  topWrap: {
    borderRadius: 8,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#CCECF5',
  },
  color1: {
    backgroundColor: AppColors.white,
  },
  color2: {
    backgroundColor: '#CCD2F5',
  },
  audioWrap: {
    backgroundColor: '#5CA5E3',
    paddingVertical: 17,
  },
  message: {
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 22,
    color: AppColors.white,
    fontSize: 15,
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  imageContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 18,
  },
  img: {
    width: 69,
    height: 69,
    borderRadius: 8,
    marginRight: 12,
  },
  img1: {
    width: 38,
    height: 58,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
  },
});

export default LikedItemMessage;
