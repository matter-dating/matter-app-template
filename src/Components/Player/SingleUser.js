import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import AppColors from '../../Utils/AppColors';
import VerificationIcon from '../../Assets/Svg/VerificationIcon';
import MoreIcon from '../../Assets/Svg/MoreIcon';
import ProfileMoreModal from '../../Screens/Modals/ProfileMoreModal';

import PlayerImage from '../Profile/PlayerImage';

const screenWidth = Math.round(Dimensions.get('window').width);
const SingleUser = ({user, userData, stopPlayer, isPlay}) => {
  const [page, setPage] = useState(0);
  const [moreVisible, setMoreVisible] = useState(false);

  useEffect(() => {
    setPage(0);
    return setPage(0);
  }, [user]);

  const renderVerificationBadge = () => {
    if (user.user_info.is_photo_verified) {
      return (
        <VerificationIcon width={16} height={16} color={AppColors.MainColor} />
      );
    }
    return <></>;
  };
  const clickMoreIcon = () => {
    stopPlayer();
    setMoreVisible(true);
  };
  const hideModal = () => {
    setMoreVisible(false);
  };
  return (
    <View>
      <PlayerImage
        profile={user.user_info}
        page={page}
        setPage={setPage}
        userData={userData}
        isPlay={isPlay}
      />
      <View style={styles.info}>
        <View>
          <View style={styles.who}>
            <Text style={styles.toWho} numberOfLines={1}>
              {user.user_info.first_name}
            </Text>
            {renderVerificationBadge()}
          </View>
          <Text style={styles.intro}>Voice intro</Text>
        </View>
        <TouchableOpacity style={styles.more} onPress={clickMoreIcon}>
          <MoreIcon color={AppColors.white} width={20} height={10} />
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <ProfileMoreModal profile={user.user_info} hide={hideModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  who: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: screenWidth - 120,
  },
  info: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 18,
  },
  toWho: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    marginRight: 8,
    lineHeight: 23,
  },
  intro: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    lineHeight: 20,
    marginTop: 4,
  },
});

export default SingleUser;
