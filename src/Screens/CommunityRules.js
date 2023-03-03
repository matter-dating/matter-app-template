import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../Utils/AppColors';
import CheckIcon from '../Assets/Svg/CheckIcon';

const termsURL = 'https://matter.dating/community';
const safeURL = 'https://matter.dating/safety';

function CommunityRules({navigation, route}) {
  const {phoneNumber} = route.params;
  const insets = useSafeArea();
  const {t} = useTranslation();

  const handlePress = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(termsURL);
    if (supported) {
      await Linking.openURL(termsURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${termsURL}`);
    }
  };
  const handlePressSafe = async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(safeURL);
    if (supported) {
      await Linking.openURL(safeURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${safeURL}`);
    }
  };
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <View style={[styles.back, {marginTop: insets.top}]} />
      </View>
      <View style={[styles.contain, {bottom: insets.bottom + 20}]}>
        <View style={styles.body}>
          <Text style={styles.title}>{t('Community.Title')}</Text>
          <Text style={styles.description}>
            {t('Community.Text')}{'\n'}
            {t('Community.TextSub')}
          </Text>
          <Text style={styles.description1}>
            {t('Community.Follow')}
          </Text>
          <View style={styles.box}>
            <ScrollView
              contentContainerStyle={styles.scroll}
              showsVerticalScrollIndicator={false}>
              <View style={styles.item}>
                <View style={styles.icon}>
                  <CheckIcon
                    color={AppColors.MainColor}
                    width={15}
                    height={15}
                  />
                </View>
                <View>
                  <Text style={styles.bold}>{t('Community.Title1')}</Text>
                  <Text style={styles.text}>
                    {t('Community.Text1')}
                  </Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.icon}>
                  <CheckIcon
                    color={AppColors.MainColor}
                    width={15}
                    height={15}
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.bold}>{t('Community.Title2')}</Text>
                  <View style={styles.bottom}>
                    <Text style={styles.text}>
                      {t('Community.Text2')}{' '}
                      <TouchableOpacity
                        style={styles.linkWrap}
                        onPress={() => handlePressSafe()}>
                        <Text style={styles.linkText}>{t('Community.Tips')}</Text>
                      </TouchableOpacity>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.icon}>
                  <CheckIcon
                    color={AppColors.MainColor}
                    width={15}
                    height={15}
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.bold}>{t('Community.Title3')}</Text>
                  <Text style={styles.text}>
                    {t('Community.Text3')}
                  </Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={styles.icon}>
                  <CheckIcon
                    color={AppColors.MainColor}
                    width={15}
                    height={15}
                  />
                </View>
                <View style={styles.right}>
                  <Text style={styles.bold}>{t('Community.Title4')}</Text>
                  <Text style={styles.text}>
                    {t('Community.Text4')}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.full}>
            <Text style={styles.footerText}>{t('Community.Full')} </Text>
            <TouchableOpacity onPress={() => handlePress()}>
              <Text style={styles.link}>{t('Community.Rules')}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('RegisterCreateUser', {phoneNumber});
            }}>
            <Text style={styles.buttonText}>{t('General.Agree')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.MainColor,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  back: {
    height: 40,
  },
  contain: {
    paddingHorizontal: 14,
    flex: 1,
    paddingTop: 60,
  },
  body: {
    flex: 1,
  },
  footer: {
    marginTop: 'auto',
  },
  title: {
    textAlign: 'center',
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    lineHeight: 32,
  },
  description: {
    lineHeight: 18,
    fontSize: 12,
    color: AppColors.white + 'CC',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
  },
  description1: {
    lineHeight: 20,
    fontSize: 14,
    color: AppColors.white + 'CC',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 24,
    marginTop: 24,
    padding: 0,
    borderWidth: 2,
    height: 48,
    borderColor: AppColors.white,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 44,
    color: AppColors.white,
  },
  box: {
    backgroundColor: AppColors.white,
    flex: 1,
    borderRadius: 20,
    paddingRight: 20,
  },
  scroll: {
    flexGrow: 1,
    padding: 25,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  icon: {
    marginRight: 10,
    paddingVertical: 4,
    alignItems: 'center',
  },
  bold: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor,
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Light',
    color: AppColors.IconColor,
  },
  linkWrap: {
    height: 20,
  },
  linkText: {
    fontSize: 13,
    lineHeight: 25,
    fontFamily: 'Poppins-Light',
    color: '#45AECE',
  },
  full: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    color: AppColors.white,
  },
  link: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    color: AppColors.white,
    textDecorationLine: 'underline',
  },
  bottom: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default CommunityRules;
