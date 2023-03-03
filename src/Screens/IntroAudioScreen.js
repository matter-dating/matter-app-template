import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import {useTranslation} from 'react-i18next';

import NextIcon from '../Assets/Svg/NextIcon';
import VoiceIcon from '../Assets/Svg/VoiceIcon';

import AppColors from '../Utils/AppColors';
import FullScreenLoader from '../Components/Common/FullScreenLoader';
import {logOnboardEnded, logOnboardVoiceIntro} from '../Utils/Analytics';

const {width: screenWidth} = Dimensions.get('window');
function IntroAudioScreen({navigation}) {
  const {t} = useTranslation();
  const insets = useSafeArea();

  const [TIPS] = useState([
    {
      text: `${t('IntroAudio.Tip1')}`,
    },
    {
      text: `${t('IntroAudio.Tip2')}`,
    },
    {
      text: `${t('IntroAudio.Tip3')}`,
    },
    {
      text: `${t('IntroAudio.Tip4')}`,
    },
  ]);
  const [loader, setLoader] = useState(false);

  const renderItem = ({item}) => {
    return (
      <View style={styles.tipBody}>
        <View style={styles.box}>
          <Text style={styles.suggested}>{t('IntroAudio.Tip')}</Text>
          <Text style={styles.tipText} numberOfLines={3} ellipsizeMode={'tail'}>
            {item.text}
          </Text>
          <View style={styles.row}>
            <Text style={styles.browseText}>{t('IntroAudio.Swipe')}</Text>
            <View style={styles.icon}>
              <NextIcon width={12} height={12} color={AppColors.AppBlack} />
            </View>
          </View>
        </View>
      </View>
    );
  };
  const ReturnOnBoardEnd = () => {
    logOnboardEnded();
    navigation.navigate('Intro');
  };
  return (
    <View style={styles.wrap}>
      {loader && <FullScreenLoader />}
      <ImageBackground
        defaultSource={require('../Assets/Image/voiceIntro.png')}
        source={require('../Assets/Image/voiceIntro.png')}
        style={styles.flex}
        resizeMode="cover">
        <View style={[styles.header, {paddingTop: insets.top + 20}]}>
          <Text style={styles.title}>{t('IntroAudio.Title')}</Text>
          <Text style={styles.description}>
            {t('IntroAudio.Text1')}{'\n'}
            {t('IntroAudio.Text2')}
          </Text>
        </View>
        <View>
          {!!TIPS && TIPS.length > 1 && (
            <Carousel
              data={TIPS}
              loop={false}
              firstItem={0}
              renderItem={renderItem}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 52}
              removeClippedSubviews={false}
              inactiveSlideOpacity={0.6}
              inactiveSlideScale={1}
            />
          )}
        </View>
        <View style={[styles.footer, {marginBottom: insets.bottom + 20}]}>
          <TouchableOpacity
            style={styles.reRecord}
            onPress={() =>
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnOnBoardEnd,
              })
            }>
            <VoiceIcon width={20} height={20} color={AppColors.white} />
            <Text style={styles.record}>{t('General.AddVoiceIntro')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.later}
            onPress={() => {
              logOnboardVoiceIntro('do_it_later');
              logOnboardEnded();
              navigation.navigate('Intro');
            }}>
            <Text style={styles.laterText}>{t('General.Later')}</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  flex: {
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 25,
    color: AppColors.AppBlack,
    marginBottom: 21,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: AppColors.AppColors,
  },
  tipBody: {
    borderRadius: 17,
    margin: 6,
    height: 218,
    backgroundColor: AppColors.white,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  box: {
    paddingHorizontal: 18,
    paddingVertical: 17,
  },
  suggested: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
    marginBottom: 28,
  },
  tipText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    lineHeight: 28,
    color: AppColors.AppBlack,
    height: 84,
  },
  row: {
    paddingTop: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 6,
  },
  browseText: {
    fontSize: 13,
    lineHeight: 19,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Regular',
  },
  footer: {
    marginHorizontal: 26,
  },
  reRecord: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    height: 53,
    backgroundColor: AppColors.MainColor,
  },
  record: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: AppColors.white,
    marginHorizontal: 8,
  },
  later: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    height: 53,
  },
  laterText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: AppColors.AppBlack,
  },
});

export default IntroAudioScreen;
