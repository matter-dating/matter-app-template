import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import NextIcon from '../../Assets/Svg/NextIcon';
import AppColors from '../../Utils/AppColors';
import {useTranslation} from 'react-i18next';

const {height: screenHeight} = Dimensions.get('window');

const SingleIntroTip = ({
  item,
  index,
  isPlay,
  togglePlay,
  page,
  expanded,
  playerLoader,
  stopIntroPlayer,
  setBrowseVisible,
}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.tipBody}>
      <View style={styles.box}>
        <Text style={styles.suggested}>{t('Intro.Prompt')}</Text>
        <Text style={styles.tipText} numberOfLines={3} ellipsizeMode={'tail'}>
          {item.question}
        </Text>
        <View style={styles.player}>
          {!!item.long_long_question && item.long_long_question !== '' ? (
            <View>
              <Text style={styles.example}>{t('Intro.Example')}</Text>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={expanded ? 1 : 0.7}
                onPress={() => {
                  if (!expanded) {
                    togglePlay(
                      item.long_question,
                      parseInt(item.long_long_question, 10),
                    );
                  }
                }}>
                <View style={styles.buttonBorder}>
                  {index === page && playerLoader ? (
                    <LottieView
                      source={require('../../Assets/Animation/player.json')}
                      autoPlay
                      loop
                      style={styles.loader}
                    />
                  ) : isPlay ? (
                    <PauseIcon width={14} height={14} color={AppColors.white} />
                  ) : (
                    <PlayIcon width={14} height={14} color={AppColors.white} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={[styles.example, styles.hide]}>{t('Intro.Example')}</Text>
              <View style={[styles.button, styles.hide]}>
                <View style={styles.buttonBorder}>
                  <PauseIcon width={14} height={14} color={AppColors.white} />
                </View>
              </View>
            </View>
          )}
          <View style={styles.browse}>
            {index === 0 ? (
              <View style={styles.row}>
                <Text style={styles.browseText}>{t('IntroAudio.Swipe')}</Text>
                <View style={styles.icon}>
                  <NextIcon width={12} height={12} color={AppColors.AppBlack} />
                </View>
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={expanded ? 1 : 0.7}
                onPress={() => {
                  if (!expanded) {
                    stopIntroPlayer();
                    setBrowseVisible(true);
                  }
                }}>
                <Text style={[styles.browseText, styles.underLine]}>
                  {t('Intro.Browse')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tipBody: {
    borderRadius: 17,
    margin: 6,
    // flex: 1,
    height: screenHeight > 700 ? 359 : 261,
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
    flex: 1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    paddingHorizontal: 21,
    paddingVertical: screenHeight > 700 ? 34 : 24,
  },
  suggested: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
    marginBottom: screenHeight > 700 ? 26 : 16,
  },
  tipText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: screenHeight > 700 ? 30 : 18,
    lineHeight: screenHeight > 700 ? 46 : 26,
    color: AppColors.IconColor + 'F5',
    height: screenHeight > 700 ? 46 * 3 : 26 * 3,
  },
  example: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 19,
    color: AppColors.AppBlack,
    marginBottom: 6,
  },
  hide: {
    opacity: 0,
  },
  player: {
    paddingTop: 36,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#72D0EA',
    borderRadius: 22,
    width: screenHeight > 700 ? 44 : 36,
    height: screenHeight > 700 ? 44 : 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonBorder: {
    width: screenHeight > 700 ? 38 : 30,
    height: screenHeight > 700 ? 38 : 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
    borderColor: AppColors.white,
    borderWidth: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  browse: {
    marginBottom: -14,
  },
  icon: {
    marginLeft: 6,
  },
  browseText: {
    fontSize: 12,
    lineHeight: 18,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Regular',
  },
  underLine: {
    textDecorationLine: 'underline',
  },
});

export default SingleIntroTip;
