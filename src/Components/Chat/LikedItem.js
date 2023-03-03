import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';

import CustomImage from '../Common/CustomImage';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import AppColors from '../../Utils/AppColors';
import MusicIcon from '../../Assets/Svg/MusicIcon';
import ImageIcon from '../../Assets/Svg/ImageIcon';
import MovieIcon from '../../Assets/Svg/MovieIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';

var dayjs = require('dayjs');
var duration = require('dayjs/plugin/duration');
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);
dayjs.extend(duration);

const screenWidth = Math.round(Dimensions.get('window').width);

const LikedItem = ({likeContent, user, matchCreatedAt}) => {
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
          style={styles.img}
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
    if (likeContent.type === 'voice-intro') {
      return (
        <View style={styles.icon}>
          <PlayIcon color={AppColors.AppBlack} width={12} height={12} />
        </View>
      );
    }
    return <></>;
  };
  const renderText = () => {
    if (likeContent.type === 'instaCard') {
      return (
        <Text style={styles.title} numberOfLines={1}>
          Your instagram album
        </Text>
      );
    }
    if (likeContent.type === 'movieCard') {
      if (likeContent.card.type === 'movie') {
        return (
          <Text style={styles.title} numberOfLines={1}>
            Your favorite movies
          </Text>
        );
      } else {
        return (
          <Text style={styles.title} numberOfLines={1}>
            Your favorite TV shows
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
          Your music playlist
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
    <View
      style={[
        styles.zIndex,
        likeContent.user_id === user.id && styles.messageWrapMine,
      ]}>
      <View style={styles.topWrap}>
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
        <View
          style={[
            styles.wrap,
            (likeContent.type === 'image' ||
              likeContent.type === 'imageCard' ||
              likeContent.type === 'insta' ||
              likeContent.type === 'movie') &&
              styles.imageWrap,
          ]}>
          {likeContent.message !== '' && (
            <Text style={styles.message}>{likeContent.message}</Text>
          )}
          <View style={styles.audioRow}>
            <Text style={styles.timeText}>
              {dayjs(matchCreatedAt / 10000).isToday()
                ? dayjs(matchCreatedAt / 10000).format('HH:mm a')
                : dayjs(matchCreatedAt / 10000).format('MMM DD, HH:mm a')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zIndex: {
    width: screenWidth - 104,
  },
  wrap: {
    borderRadius: 8,
    backgroundColor: AppColors.backgroundColor1,
    paddingHorizontal: 13,
    paddingVertical: 14,
    paddingBottom: 9,
    marginTop: -5,
  },
  imageWrap: {
    marginTop: 0,
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
  },
  topWrap: {
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    backgroundColor: '#CFF0FA',
  },
  message: {
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 17,
    paddingRight: 23,
    color: AppColors.IconColor,
    fontSize: 14,
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
    width: screenWidth - 104,
    height: screenWidth - 104,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    color: AppColors.AppBlack,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
  },
  messageWrapMine: {
    marginLeft: 'auto',
  },
  audioRow: {
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    marginLeft: 'auto',
    fontSize: 10,
    color: '#45AECE',
  },
});

export default LikedItem;
