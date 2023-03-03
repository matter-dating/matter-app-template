import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import InstagramLogin from 'react-native-instagram-login';
import Toast from '../../Assets/Package/react-native-toast-message';

import Colors from '../../Utils/Colors';
import CustomText from '../../Components/Common/Text';
import InstaCard from '../../Components/Cards/InstaCard';

import BackIcon from '../../Assets/Svg/BackIcon';

import {useAuth} from '../../Providers/AuthProvider';
import {insta_id, insta_secret} from '../../Utils/EnvironmentVariables';

const {width: screenWidth} = Dimensions.get('window');
const imgSize = (screenWidth - 40) / 3;

function MyInstaScreen({navigation}) {
  const insets = useSafeArea();
  const [insta, setInsta] = useState();
  const {userCards, createCard, deleteCard, user} = useAuth();

  const [posts, setPosts] = useState(null);
  const [instagramCard, setInstagramCard] = useState(
    userCards.filter((c) => c.type === 'instagram'),
  );

  const [linked, setLinked] = useState(
    userCards.filter((c) => c.type === 'instagram').length > 0,
  );

  useEffect(() => {
    setLinked(userCards.filter((c) => c.type === 'instagram').length > 0);
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
        console.error(error);
        Toast.show({
          position: 'top',
          type: 'notif',
          text1: 'Oops! Something went wrong.',
          topOffset: 0,
          visibilityTime: 2000,
        });
      });
  };

  const deleteInsta = () => {
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
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            My instagram photos
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        <CustomText.RegularText style={styles.description}>
          {linked ? '27 photos' : 'Not linked'}
        </CustomText.RegularText>
      </View>

      <View style={[styles.body, !posts && styles.bodyPosts]}>
        {linked ? (
          <View style={styles.linked}>
            <InstaCard
              userInfo={user.customData}
              token={JSON.parse(instagramCard[0].content).igm_token}
              content={instagramCard[0].content}
            />
            <CustomText.RegularText style={styles.show}>
              We show your recent 27 uploads
            </CustomText.RegularText>
          </View>
        ) : (
          <>
            {/* <CustomImage
              source={require('../../Assets/Image/linkInsta.png')}
              style={styles.link}
            /> */}
            <CustomText.RegularText style={styles.impress}>
              Impress your potential matches!
            </CustomText.RegularText>
            <CustomText.RegularText style={styles.case}>
              Showcase your instagram photos
            </CustomText.RegularText>
            <CustomText.RegularText style={styles.show}>
              We show your recent 27 uploads
            </CustomText.RegularText>
          </>
        )}
      </View>

      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        {linked ? (
          <TouchableOpacity onPress={deleteInsta}>
            <CustomText.TitleText style={styles.unLink}>
              Unlink instagram
            </CustomText.TitleText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => insta.show()}>
            <Text style={styles.buttonText}>Link instagram</Text>
          </TouchableOpacity>
        )}
      </View>

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
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  title: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    width: 24,
  },
  description: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.MainColor,
    margin: 20,
    padding: 13,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    color: Colors.white,
  },
  link: {
    width: 197,
    height: 197,
    marginVertical: 17,
  },
  unLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    color: Colors.MainColor,
    padding: 13,
  },
  body: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  bodyPosts: {
    justifyContent: 'center',
  },
  impress: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 5,
  },
  case: {
    marginBottom: 5,
  },
  show: {
    marginBottom: 5,
    color: Colors.MainColor + 'A3',
  },
  linked: {
    alignItems: 'center',
    height: imgSize * 3 + 120,
  },
});

export default MyInstaScreen;
