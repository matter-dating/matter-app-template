import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import InAppReview from 'react-native-in-app-review';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';
import LikeIcon from '../../Assets/Svg/LikeIcon';
import HearthIcon from '../../Assets/Svg/HearthIcon';
import {S3_MAIN_URL} from '../../Utils/Constants';

const screenWidth = Math.round(Dimensions.get('window').width);

function MatchModal({route}) {
  const navigation = useNavigation();
  const {target} = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // InAppReview.RequestInAppReview()
    // .then((hasFlowFinishedSuccessfully) => {
    //   console.log('InAppReview in android', hasFlowFinishedSuccessfully);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }, []);

  const clickGotIt = () => {
    navigation.pop();
  };

  const clickGoToChat = () => {
    navigation.navigate('Chat');
  };

  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, bottom: slideBottom}]}>
      <View style={styles.flex}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.body}>
            <View style={styles.imgBox}>
              <CustomImage
                style={styles.img}
                source={{
                  uri: S3_MAIN_URL + target.user_id + '.jpg',
                }}
              />
            </View>
            <Text numberOfLines={1} style={styles.name}>
              {target.first_name}
            </Text>
            <View style={styles.row}>
              <LikeIcon width={20} height={20} color={AppColors.white} />
              <Text style={styles.title}>It’s a match!</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={clickGoToChat} style={styles.button}>
              <HearthIcon width={20} height={20} color={Colors.white} />
              <CustomText.TitleText style={styles.buttonText}>
                Go to chat
              </CustomText.TitleText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={clickGotIt}>
              <CustomText.TitleText style={styles.cancelText}>
                Okay, got it
              </CustomText.TitleText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52B8D6',
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  flex: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  imgBox: {
    width: 176,
    height: 176,
    borderRadius: 88,
    marginBottom: 11,
    backgroundColor: AppColors.white + 'D1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  name: {
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 25,
  },
  safe: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    lineHeight: 33,
    marginLeft: 6,
    color: AppColors.white,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    marginBottom: 8,
    width: screenWidth - 86,
    marginHorizontal: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
    height: 48,
    borderColor: AppColors.white,
    borderWidth: 2,
  },
  buttonText: {
    color: Colors.white,
    lineHeight: 20,
    marginHorizontal: 8,
    fontFamily: 'Poppins-Medium',
  },
  cancelButton: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - 64,
    marginVertical: 24,
  },
  cancelText: {
    color: AppColors.white,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MatchModal;
