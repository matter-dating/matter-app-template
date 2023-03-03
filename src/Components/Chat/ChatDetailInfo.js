import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import dayjs from 'dayjs';

import AppColors from '../../Utils/AppColors';
import LikeIcon from '../../Assets/Svg/LikeIcon';
import CustomImage from '../Common/CustomImage';
import {useAuth} from '../../Providers/AuthProvider';
import {S3_MAIN_URL} from '../../Utils/Constants';

import LikedItem from './LikedItem';

const ChatDetailInfo = ({header, match, profile}) => {
  const [note, setNotes] = useState(null);
  const [content, setContent] = useState(null);
  const {user} = useAuth();

  useEffect(() => {
    if (match) {
      setNotes(match.note);
      if (match.content) {
        setContent(JSON.parse(match.content));
      }
    }
  }, [match]);
  return (
    <View>
      <View style={styles.wrap}>
        {header && (
          <>
            <Text style={styles.matchTime}>
              {dayjs(match.created_at).format('MMM D, h:ma')}
            </Text>
            <View>
              <CustomImage
                style={styles.image}
                source={{uri: S3_MAIN_URL + match.other_user_id + '.jpg'}}
              />
              <View style={styles.icon}>
                <LikeIcon color="#FF4B7B" width={14} height={14} />
              </View>
            </View>
            <Text style={styles.text}>
              You matched with{' '}
              <Text style={styles.bold}>{match.other_user_fname + ''}</Text>
            </Text>
            {!!note && note !== '' && (
              <Text style={styles.audio}>
                Hint: You talked about {match.note}
              </Text>
            )}
          </>
        )}

        {profile && header && (
          <Text style={styles.last}>
            Last interacted on{' '}
            {dayjs(profile.user_info.last_active_timestamp['$date']).calendar()}
          </Text>
        )}
      </View>

      {!!content && content.message !== '' && (
        <View style={styles.messageContainer}>
          {content.user_id !== user.id && (
            <Image
              style={styles.userImage}
              defaultSource={require('../../Assets/Image/default.png')}
              source={{uri: S3_MAIN_URL + match.other_user_id + '.jpg'}}
            />
          )}
          <LikedItem
            likeContent={content}
            user={user}
            matchCreatedAt={match.created_at}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingHorizontal: 38,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 38,
    marginBottom: 8,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 1,
  },
  matchTime: {
    color: AppColors.IconColor + 'B8',
    fontSize: 13,
    marginVertical: 18,
  },
  text: {
    color: AppColors.MainColor1,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 21,
  },
  textBig: {
    color: AppColors.AppBlack,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  audio: {
    color: AppColors.IconColor + '75',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  last: {
    color: AppColors.IconColor + '85',
    fontSize: 13,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    marginBottom: 24,
  },
  bold: {
    fontFamily: 'Poppins-Medium',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 16,
  },
  userImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
  },
});

export default ChatDetailInfo;
