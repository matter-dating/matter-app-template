import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Image} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {S3_MAIN_URL} from '../../Utils/Constants';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import BackIcon from '../../Assets/Svg/BackIcon';
import RoomIcon from '../../Assets/Svg/RoomIcon';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import DotIcon from '../../Assets/Svg/DotIcon';
import {logViewProfile} from '../../Utils/Analytics';

const ChatDetailHeader = ({
  item,
  setMoreVisible,
  startAudioRoom,
  isClick,
  showConfirmDialog,
  setReactionItem,
}) => {
  const navigation = useNavigation();
  const insets = useSafeArea();

  const clickMoreIcon = () => {
    setReactionItem(null);
    setMoreVisible(true);
  };
  const clickBack = () => {
    navigation.navigate('Chat');
  };
  const clickImage = () => {
    logViewProfile(item.other_user_id);
    navigation.navigate('ShowSingle', {
      profile_id: item.other_user_id,
    });
  };

  return (
    <View style={[styles.header, {paddingTop: insets.top + 8}]}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => (isClick ? showConfirmDialog(clickBack) : clickBack())}>
        <BackIcon width={24} height={24} color={Colors.MainColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.user}
        onPress={() => {
          setReactionItem(null);
          isClick ? showConfirmDialog(clickImage) : clickImage();
        }}>
        <Image
          style={styles.image}
          source={{uri: S3_MAIN_URL + item.other_user_id + '.jpg'}}
        />
        <View style={styles.nameWrap}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode={'tail'}>
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          isClick ? showConfirmDialog(startAudioRoom) : startAudioRoom()
        }>
        <View style={styles.room}>
          <Text style={styles.roomText}>Create a room</Text>
          <RoomIcon color={AppColors.white} width={17} height={14} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.more}
        onPress={() =>
          isClick ? showConfirmDialog(clickMoreIcon) : clickMoreIcon()
        }>
        <DotIcon color="#030F1DB8" width={3} height={17} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 12,
    backgroundColor: '#EFF0F2',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginRight: 6,
  },
  nameWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    flex: 1,
  },
  back: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  more: {
    marginRight: 16,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 'auto',
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 9,
  },
  room: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 17,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: AppColors.MainColor,
  },
  roomText: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    marginRight: 4,
  },
});

export default ChatDetailHeader;
