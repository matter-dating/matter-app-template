import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import HttpQuery from '../../Api/HttpQuery';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import CustomImage from '../Common/CustomImage';

import {S3_MAIN_URL} from '../../Utils/Constants';

import AppColors from '../../Utils/AppColors';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import NextIcon from '../../Assets/Svg/NextIcon';

const SingleLike = ({item, index, isPremium}) => {
  const navigation = useNavigation();
  const api = new HttpQuery();
  const [profile, setProfile] = useState(null);
  const likeContent = JSON.parse(item.content);

  const renderVerificationBadge = () => {
    if (profile.user_info.is_photo_verified) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };

  useEffect(() => {
    api.getSingle(item.user_id, setProfile);
  }, []);

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
        return (
          <Text style={styles.subTitle} numberOfLines={1}>
            movie:{' '}
            <Text style={styles.light}>
              {JSON.parse(likeContent.card.content).title}
            </Text>
          </Text>
        );
      } else {
        return (
          <Text style={styles.subTitle} numberOfLines={1}>
            Tv show:{' '}
            <Text style={styles.light}>
              {JSON.parse(likeContent.card.content).name}
            </Text>
          </Text>
        );
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
      return (
        <Text style={styles.subTitle} numberOfLines={1}>
          song:{' '}
          <Text style={styles.light}>
            {JSON.parse(likeContent.card.content).name}
          </Text>
        </Text>
      );
    }
    if (likeContent.type === 'musicCard') {
      return 'song playlist';
    }
    if (likeContent.type === 'prompt') {
      return (
        <Text style={styles.subTitle} numberOfLines={1}>
          prompt:{' '}
          <Text style={styles.italic}>
            {JSON.parse(likeContent.card.content).question}
          </Text>
        </Text>
      );
    }
    if (likeContent.type === 'hobbies') {
      return 'hobbies';
    }
    if (likeContent.type === 'voice-intro') {
      return 'voice intro';
    }
    return <></>;
  };
  const renderTitle = () => {
    if (!!likeContent.audio && likeContent.audio !== '') {
      return (
        <Text style={styles.text} numberOfLines={1}>
          Sent a voice note
        </Text>
      );
    } else if (likeContent.message !== '') {
      return (
        <View style={styles.messageBox}>
          <Text style={styles.message} numberOfLines={1}>
            {likeContent.message}
          </Text>
        </View>
      );
    } else {
      return (
        <Text style={styles.text} numberOfLines={1}>
          Liked your {renderText()}
        </Text>
      );
    }
  };

  if (profile) {
    return (
      <>
        {index === 1 && <Text style={styles.upNext}>Up next</Text>}
        <TouchableOpacity
          onPress={() => {
            if (index === 0 || isPremium) {
              navigation.navigate('SeeMoreProfile', {
                profile,
                likeContent,
              });
            } else {
              navigation.navigate('BenefitsModal', {start: 1});
            }
          }}
          style={styles.item}>
          {index === 0 || isPremium ? (
            <CustomImage
              style={styles.img}
              source={{uri: S3_MAIN_URL + item.user_id + '.jpg'}}
            />
          ) : (
            <Image
              style={styles.img}
              blurRadius={20}
              defaultSource={require('../../Assets/Image/blurred.png')}
              source={{uri: S3_MAIN_URL + item.user_id + '.jpg'}}
            />
          )}
          <View style={styles.main}>
            <View style={styles.nameWrap}>
              <Text style={styles.name} numberOfLines={1}>
                {profile.user_info.first_name}
              </Text>
              {renderVerificationBadge()}
            </View>
            {renderTitle()}
          </View>
          <View style={styles.next}>
            <NextIcon color={AppColors.MainColor} width={13} height={13} />
          </View>
        </TouchableOpacity>
      </>
    );
  }
  return (
    <>
      {index === 1 && <Text style={styles.upNext}>Up next</Text>}
      <View style={styles.emptyItem}>
        <LottieView
          source={require('../../Assets/Animation/loader.json')}
          autoPlay
          loop
          style={styles.disableTouch}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  item: {
    marginTop: 15,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyItem: {
    marginTop: 15,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 107,
  },
  disableTouch: {
    zIndex: 20,
    width: 48,
  },
  main: {
    marginRight: 'auto',
    flex: 1,
  },
  img: {
    width: 107,
    height: 107,
    borderRadius: 8,
    marginRight: 19,
  },
  next: {
    padding: 14,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  name: {
    fontSize: 17,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    marginRight: 8,
  },
  text: {
    color: AppColors.AppBlack + 'CC',
    fontFamily: 'Poppins-LightItalic',
    fontSize: 14,
  },
  messageBox: {
    backgroundColor: '#DCF2F8',
    borderRadius: 11,
    borderBottomStartRadius: 0,
    marginRight: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 13,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
  },
  upNext: {
    fontSize: 17,
    lineHeight: 24,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 1,
    marginTop: 21,
  },
});

export default SingleLike;
