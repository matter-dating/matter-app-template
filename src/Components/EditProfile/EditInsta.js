import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import InstagramLogin from 'react-native-instagram-login';

import AppColors from '../../Utils/AppColors';
import InstaCard from '../Cards/InstaCard';

import InstagramIcon from '../../Assets/Svg/New/InstagramIcon';
import Toast from '../../Assets/Package/react-native-toast-message';
import {insta_id, insta_secret} from '../../Utils/EnvironmentVariables';

const EditInsta = ({
  userCards,
  stopIntroPlayer,
  user,
  deleteCard,
  createCard,
}) => {
  const [instagramCard, setInstagramCard] = useState(
    userCards.filter((c) => c.type === 'instagram'),
  );
  const [insta, setInsta] = useState();

  useEffect(() => {
    setInstagramCard(userCards.filter((c) => c.type === 'instagram'));
  }, [userCards]);

  const setIgToken = (data) => {
    fetch(
      'https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=' +
        insta_secret +
        '&access_token=' +
        data.access_token +
        '',
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.access_token) {
          Toast.show({
            position: 'top',
            type: 'notif',
            text1: 'Your instagram account has been linked ',
            topOffset: 0,
            visibilityTime: 2000,
          });
          createCard(
            'instagram',
            'image',
            {igm_token: json.access_token},
            false,
          );
        }
      })
      .catch((error) => {
        Toast.show({
          position: 'top',
          type: 'notif',
          text1: 'Oops! Something went wrong.',
          topOffset: 0,
          visibilityTime: 2000,
        });
      });
  };

  const deleteInstaCard = () => {
    deleteCard(instagramCard[0]);
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'Your instagram account has been unlinked ',
      topOffset: 0,
      visibilityTime: 2000,
    });
  };

  return (
    <View style={styles.item}>
      {instagramCard.length === 0 && (
        <View style={styles.itemHeader}>
          <InstagramIcon width={19} height={19} />
          <Text style={styles.itemTitle}>Instagram photos</Text>
        </View>
      )}
      {instagramCard.length > 0 ? (
        <InstaCard
          deleteInstaCard={deleteInstaCard}
          userInfo={user.customData}
          token={JSON.parse(instagramCard[0].content).igm_token}
          content={instagramCard[0].content}
        />
      ) : (
        <View style={styles.box}>
          <View style={styles.center}>
            <Image
              style={styles.bg}
              source={require('../../Assets/Image/photo.png')}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>Nothing to show :(</Text>
            <Text style={styles.text}>
              You are more likely to receive{'\n'}a like if you share your
              recent{'\n'}
              instagram photos
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              stopIntroPlayer();
              insta.show();
            }}>
            <Text style={styles.buttonText}>Connect instagram</Text>
          </TouchableOpacity>
        </View>
      )}

      <InstagramLogin
        ref={(ref) => setInsta(ref)}
        appId={insta_id}
        appSecret={insta_secret}
        redirectUrl="https://www.google.com/"
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={setIgToken}
        onLoginFailure={(data) => console.error(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
    marginLeft: 9,
  },
  box: {
    backgroundColor: AppColors.backgroundColor5,
    paddingVertical: 23,
    paddingHorizontal: 20,
  },
  center: {
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Light',
    color: AppColors.black + 'CC',
    textAlign: 'center',
    marginVertical: 8,
  },
  title: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.black + 'CC',
  },
  bg: {
    width: 76,
    height: 75,
    marginTop: 9,
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: AppColors.MainColor,
    borderRadius: 8,
    padding: 14,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
  },
});

export default EditInsta;
