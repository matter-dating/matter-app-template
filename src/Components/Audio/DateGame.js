import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import AppColors from '../../Utils/AppColors';
import GameIcon from '../../Assets/Svg/GameIcon';
import CountDown from './CountDown';

const {width: screenWidth} = Dimensions.get('window');
const data = [
  {
    color: '#15A695',
    text: 'You will go on 3-min audio blind dates with other students',
  },
  {
    color: '#DA3869',
    text: 'After each date, profiles will be revealed, and you get to decide to match or not',
  },
  {
    color: '#DAB538',
    text: 'Players with the highest number of matches at the end of the game will win',
  },
  {
    color: '#8F38DA',
    text: 'This game is a fun and easy way to meet your awesome peers',
  },
];

const DateGame = ({blindDateStatus, userData, user}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <View style={[styles.numberWrap, {backgroundColor: item.color}]}>
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onShare = async () => {
    Share.share({
      title: 'Matter invite link',
      message: 'https://www.dategame.io/',
      url: 'https://www.dategame.io/',
    });
  };

  return (
    <View style={styles.flex}>
      <View style={styles.box}>
        <GameIcon width={154} height={88} />
        <Image
          style={styles.title}
          source={require('../../Assets/Image/title.png')}
        />

        <CountDown blindDateStatus={blindDateStatus} />
        <View style={styles.countdown}>
          <TouchableOpacity style={styles.invite} onPress={onShare}>
            <Text style={styles.inviteText}>Invite a friend</Text>
          </TouchableOpacity>
          {/* <Text style={styles.help}>
            * The more people join the game, {'\n'}
            the bigger the prize pot will become
          </Text> */}
        </View>
      </View>
      <View style={styles.carousel}>
        <Text style={styles.into}>INSTRUCTIONS:</Text>
        <Carousel
          data={data}
          loop={false}
          firstItem={0}
          renderItem={(item, index) => renderItem(item, index)}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 42}
          removeClippedSubviews={false}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F5FBFF',
    justifyContent: 'space-between',
  },
  box: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  into: {
    fontSize: 14,
    marginLeft: 28,
    marginBottom: 8,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
  },
  title: {
    height: 27,
    width: 174,
    marginBottom: 23,
    marginTop: -6,
  },
  item: {
    display: 'flex',
    borderRadius: 8,
    backgroundColor: AppColors.white,
    marginHorizontal: 7,
    paddingVertical: 11,
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  numberWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 6,
    alignItems: 'center',
  },
  number: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Poppins-Bold',
    color: AppColors.white,
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    height: 72,
    marginLeft: 13,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.AppBlack + 'D9',
  },
  help: {
    marginVertical: 12,
    fontSize: 12,
    color: AppColors.AppBlack + '9E',
  },
  countdown: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 60,
  },
  invite: {
    padding: 11,
    borderRadius: 21,
    backgroundColor: AppColors.MainColor + 'CC',
    width: '100%',
    alignItems: 'center',
  },
  inviteText: {
    color: AppColors.white,
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
});

export default DateGame;
