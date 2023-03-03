import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CustomText from '../Common/Text';
import ItemLike from '../Home/ItemLike';
import EditIcon from '../../Assets/Svg/EditIcon';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';

const HobbyCard = ({
  card,
  userInfo,
  likeContent,
  stopIntroPlayer,
  hideLike,
  isModal,
  setPass,
}) => {
  const navigation = useNavigation();
  const {userData} = useAuth();
  if (card.content.length > 0) {
    return (
      <View style={styles.outer}>
        <View style={styles.wrap}>
          <CustomText.TitleText style={styles.title}>
            Hobbies
          </CustomText.TitleText>
          <CustomText.RegularText style={styles.text}>
            {card.content}
          </CustomText.RegularText>
          {userInfo.user_id !== userData.user_id &&
            !userInfo.is_liked &&
            !hideLike && (
              <View style={styles.like}>
                <ItemLike
                  width={23}
                  height={23}
                  color={AppColors.AppBlack + 'C2'}
                  onPress={() => {
                    stopIntroPlayer && stopIntroPlayer();
                    if (!likeContent) {
                      setPass({
                        type: 'hobbies',
                        card: card,
                        isModal: isModal,
                        target: userInfo,
                      });
                    } else {
                      setPass({
                        type: 'likeBack',
                        isModal: isModal,
                        likeContent: likeContent,
                        target: userInfo,
                      });
                    }
                  }}
                />
              </View>
            )}
          {userInfo.user_id === userData.user_id && (
            <View style={styles.like}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  stopIntroPlayer && stopIntroPlayer();
                  navigation.navigate('CreateHobbies');
                }}>
                <EditIcon width={20} height={20} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  outer: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
  },
  wrap: {
    paddingBottom: 60,
    paddingTop: 25,
    paddingHorizontal: 16,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    // elevation: 3,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
  },
  text: {
    marginTop: 12,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 25,
    color: AppColors.AppBlack + 'F5',
    fontSize: 16,
  },
  like: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: 12,
    bottom: 12,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    elevation: 3,
    shadowRadius: 4.22,
  },
});

export default HobbyCard;
