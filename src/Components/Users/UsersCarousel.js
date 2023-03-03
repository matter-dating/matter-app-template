import React from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {S3_MAIN_URL} from '../../Utils/Constants';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';

import CustomImage from '../Common/CustomImage';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import LikeIcon from '../../Assets/Svg/Like1Icon';
import HearthIcon from '../../Assets/Svg/HearthIcon';

import Match from '../../Assets/Svg/New/Match';
import {logLikeCount} from '../../Utils/Analytics';

const UsersCarousel = ({users, userLikes}) => {
  const navigation = useNavigation();

  const renderLikes = () => {
    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={userLikes.length > 0 ? 0.8 : 1}
        onPress={() => {
          if (userLikes.length > 0) {
            logLikeCount(userLikes.length);
            navigation.navigate('LikedYou');
          }
        }}>
        <View style={styles.singleTop}>
          {userLikes.length > 0 ? (
            <>
              <CustomImage
                style={styles.img}
                source={{
                  uri:
                    S3_MAIN_URL +
                    userLikes.sort((a, b) => b.created_at - a.created_at)[0]
                      .user_id +
                    '.jpg',
                }}
              />
              <BlurView
                style={styles.blur}
                blurType="light"
                blurAmount={4}
                reducedTransparencyFallbackColor="#5CC4E3">
                <View style={styles.absolute}>
                  <Text style={styles.likes}>{userLikes.length} Likes</Text>
                  <View style={styles.likeIcon}>
                    <LikeIcon color={AppColors.white} width={20} height={16} />
                  </View>
                </View>
              </BlurView>
            </>
          ) : (
            <View style={styles.blurEmpty}>
              <View style={styles.absolute}>
                <Text style={styles.likes}>No likes{'\n'}yet</Text>
                <View style={styles.likeIcon}>
                  <HearthIcon color={AppColors.white} width={20} height={16} />
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const userList = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('ChatDetail', {
            pubnub_room_id: item.pubnub_room_id,
          });
        }}>
        <View style={styles.singleTop}>
          <CustomImage
            style={styles.img}
            source={{uri: S3_MAIN_URL + item.other_user_id + '.jpg'}}
          />
          {item.source.startsWith('BLIND') && (
            <View style={styles.source}>
              <Text numberOfLines={1} style={styles.fromHappy}>
                Happy Hour
              </Text>
            </View>
          )}
          {item.source.startsWith('Speakeasy') && (
            <View style={styles.sourceSpeak}>
              <Text numberOfLines={1} style={styles.fromHappy}>
                Speakeasy
              </Text>
            </View>
          )}
          <View style={styles.nameWrap}>
            <Text numberOfLines={1} style={styles.username}>
              {item.other_user_fname}
            </Text>
            {item.other_user_verified && (
              <VerificationIcon
                width={14}
                height={14}
                color={AppColors.MainColor}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const EmptyListMessage = ({item}) => {
    return (
      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.img}>
            <Match height={117} width={91} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.title}>Your matches</Text>
      <View style={styles.flex}>
        <FlatList
          horizontal
          // style={styles.list}
          contentContainerStyle={styles.list}
          data={users}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => userList({item, index})}
          ListEmptyComponent={EmptyListMessage}
          keyExtractor={(item) => item._id.toString()}
          ListHeaderComponent={renderLikes}
          // removeClippedSubviews={true}
          // initialNumToRender={10}
          getItemLayout={(data, index) => ({
            index,
            length: 101,
            offset: 101 * (index + 1),
          })}
        />
        <Text style={styles.title}>Conversations</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    borderBottomWidth: 0.5,
    borderColor: Colors.MainColor + '47',
  },
  list: {
    paddingHorizontal: 7,
  },
  title: {
    marginHorizontal: 12,
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 16,
    fontSize: 14,
    color: AppColors.IconColor + 'E6',
  },
  row: {
    flexDirection: 'row',
  },
  img: {
    height: 117,
    width: 91,
    marginBottom: 8,
    borderRadius: 8,
  },
  blurEmpty: {
    backgroundColor: '#A4D5EF',
    borderRadius: 8,
  },
  active: {
    position: 'absolute',
    top: 2,
    right: 14,
    width: 16,
    borderRadius: 8,
    height: 16,
    backgroundColor: '#84C857',
    borderWidth: 2,
    borderColor: 'white',
  },
  username: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: AppColors.IconColor + 'CC',
    textAlign: 'center',
    marginRight: 4,
  },
  absolute: {
    flex: 1,
    height: 117,
    width: 91,
    backgroundColor: '#81CBF280',
    borderRadius: 8,
    justifyContent: 'center',
  },
  blur: {
    position: 'absolute',
    height: 117,
    width: 91,
    borderRadius: 8,
  },
  likes: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textAlign: 'center',
    color: AppColors.white,
  },
  likeIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  source: {
    backgroundColor: '#37A8C9',
    borderRadius: 8,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 6,
    position: 'absolute',
    width: '100%',
    top: 91,
  },
  sourceSpeak: {
    backgroundColor: '#376FC9CC',
    borderRadius: 8,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 6,
    position: 'absolute',
    width: '100%',
    top: 91,
  },
  fromHappy: {
    color: AppColors.white + 'EB',
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    lineHeight: 16,
  },
  item: {
    marginHorizontal: 5,
    paddingBottom: 16,
    width: 91,
  },
});

export default UsersCarousel;
