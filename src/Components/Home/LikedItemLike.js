import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import CustomImage from '../Common/CustomImage';
import {S3_PHOTO_URL} from '../../Utils/Constants';
import AppColors from '../../Utils/AppColors';

const LikedItemLike = ({userInfo, likeContent}) => {
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
    return <></>;
  };
  const renderText = () => {
    if (likeContent.type === 'image' || likeContent.type === 'imageCard') {
      return 'photo';
    }
    if (likeContent.type === 'insta') {
      return 'instagram photo';
    }
    if (likeContent.type === 'instaCard') {
      return 'instagram photos';
    }
    if (likeContent.type === 'movie') {
      if (JSON.parse(likeContent.card.content).media_type === 'movie') {
        return 'movie';
      } else {
        return 'Tv show';
      }
    }
    if (likeContent.type === 'movieCard') {
      if (likeContent.card.type === 'movie') {
        return 'movies';
      } else {
        return 'Tv shows';
      }
    }
    if (likeContent.type === 'music') {
      return 'song';
    }
    if (likeContent.type === 'musicCard') {
      return 'song playlist';
    }
    if (likeContent.type === 'prompt') {
      return 'prompt';
    }
    if (likeContent.type === 'hobbies') {
      return 'hobbies';
    }
    if (likeContent.type === 'voice-intro') {
      return 'voice intro';
    }
    return <></>;
  };
  const renderTextSub = () => {
    if (likeContent.type === 'movie') {
      if (JSON.parse(likeContent.card.content).media_type === 'movie') {
        return JSON.parse(likeContent.card.content).title;
      } else {
        return JSON.parse(likeContent.card.content).name;
      }
    }
    if (likeContent.type === 'music') {
      return (
        JSON.parse(likeContent.card.content).artist +
        '-' +
        JSON.parse(likeContent.card.content).name
      );
    }
    if (likeContent.type === 'prompt') {
      return '"' + JSON.parse(likeContent.card.content).question + '"';
    }
    return <></>;
  };

  return (
    <View style={styles.outer}>
      <View style={styles.wrap}>
        <View
          style={[
            styles.content,
            (likeContent.type === 'image' ||
              likeContent.type === 'imageCard' ||
              likeContent.type === 'insta') &&
              styles.imageContent,
          ]}>
          {renderImage()}
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {userInfo.first_name} liked your {renderText()}
            </Text>
            <Text
              style={[
                styles.subTitle,
                likeContent.type === 'prompt' && styles.italic,
              ]}
              numberOfLines={1}>
              {likeContent.type === 'prompt' && '" '}
              {renderTextSub()}
              {likeContent.type === 'prompt' && ' "'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    zIndex: 100,
    elevation: 100,
    marginBottom: -42,
  },
  wrap: {
    borderRadius: 12,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: AppColors.MainColor,
  },
  content: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    height: 69,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContent: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 18,
  },
  img: {
    width: 69,
    height: 69,
    borderRadius: 12,
    marginRight: 15,
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 19,
    marginBottom: 2,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.white,
    lineHeight: 18,
  },
  italic: {
    fontFamily: 'Poppins-LightItalic',
  },
});

export default LikedItemLike;
