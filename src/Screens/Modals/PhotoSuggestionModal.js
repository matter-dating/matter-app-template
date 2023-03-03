import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';

import CustomImage from '../../Components/Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import MoreModal from './MoreModal';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import CheckIcon from '../../Assets/Svg/CheckIcon';
import NextIcon from '../../Assets/Svg/NextIcon';

const PhotoSuggestionModal = (props) => {
  const {t} = useTranslation();
  const [page, setPage] = useState(0);
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 3) {
      pagerRef.current.setPage(0);
      setPage(0);
    } else {
      pagerRef.current.setPage(pageNumber);
      setPage(pageNumber);
    }
  };
  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      if (position >= 0 && position <= 4) {
        setPage(position);
      }
    }
  };

  return (
    <MoreModal hide={props.hide}>
      <View>
        <View style={styles.header}>
          <View style={styles.empty} />
          <Text style={styles.title}>{t('SuggestionModal.Title')}</Text>
          <TouchableOpacity onPress={props.hide}>
            <DeleteIcon
              width={20}
              height={20}
              color={AppColors.MainColor1 + '8F'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.pagination}>
          <View
            style={[styles.paginationDot, page === 0 && styles.activeDot]}
          />
          <View
            style={[styles.paginationDot, page === 1 && styles.activeDot]}
          />
          <View
            style={[styles.paginationDot, page === 2 && styles.activeDot]}
          />
          <View
            style={[styles.paginationDot, page === 3 && styles.activeDot]}
          />
        </View>
        <View style={styles.contain}>
          <PagerView
            style={styles.viewPager}
            initialPage={0}
            ref={pagerRef}
            onPageScroll={onPageScroll}>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.dotContain}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.contentTitle}>{t('SuggestionModal.Mix')}</Text>
                  <Text style={styles.description}>
                    {t('SuggestionModal.MixText')}
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox}>
                <View style={styles.center}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip1.png')}
                  />
                  <Text style={styles.tip1}>{t('SuggestionModal.Full')}</Text>
                </View>
                <View style={styles.center}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip2.png')}
                  />
                  <Text style={styles.tip1}>{t('SuggestionModal.Close')}</Text>
                </View>
                <View style={styles.center}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip3.png')}
                  />
                  <Text style={styles.tip1}>{t('SuggestionModal.Candid')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.dotContain}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.contentTitle}>{t('SuggestionModal.Hide')}</Text>
                  <Text style={styles.description}>
                    {t('SuggestionModal.HideText')}
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox}>
                <View style={styles.center}>
                  <View style={styles.error}>
                    <DeleteIcon
                      width={14}
                      height={14}
                      color={AppColors.white}
                    />
                  </View>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip4.png')}
                  />
                  <Text style={styles.tip2}>{t('SuggestionModal.Looking')}</Text>
                </View>
                <View style={styles.center}>
                  <View style={styles.error}>
                    <DeleteIcon
                      width={14}
                      height={14}
                      color={AppColors.white}
                    />
                  </View>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip5.png')}
                  />
                  <Text style={styles.tip2}>{t('SuggestionModal.Frame')}</Text>
                </View>
                <View style={styles.center}>
                  <View style={styles.error}>
                    <DeleteIcon
                      width={14}
                      height={14}
                      color={AppColors.white}
                    />
                  </View>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip6.png')}
                  />
                  <Text style={styles.tip2}>{t('SuggestionModal.Hiding')}</Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.dotContain}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.contentTitle}>{t('SuggestionModal.Star')}</Text>
                  <Text style={styles.description}>
                    {t('SuggestionModal.StarText')}{'\n'}
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox}>
                <View style={styles.center}>
                  <View style={styles.check}>
                    <CheckIcon width={19} height={19} color={'#7FE35C'} />
                  </View>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip7.png')}
                  />
                </View>
                <View style={styles.center}>
                  <View style={styles.error}>
                    <DeleteIcon
                      width={14}
                      height={14}
                      color={AppColors.white}
                    />
                  </View>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip8.png')}
                  />
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.dotContain}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.contentTitle}>
                    {t('SuggestionModal.Show')}
                  </Text>
                  <Text style={styles.description}>
                    {t('SuggestionModal.ShowText')}
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox}>
                <View style={styles.center}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip9.png')}
                  />
                </View>
                <View style={styles.center}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip10.png')}
                  />
                </View>
                <View style={styles.center}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip11.png')}
                  />
                </View>
              </View>
            </View>
          </PagerView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePageChange(page + 1)}>
              <NextIcon width={16} height={16} color={AppColors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 17,
    justifyContent: 'space-between',
  },
  empty: {
    width: 20,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'E6',
  },
  body: {
    // paddingHorizontal: 44,
  },
  contain: {
    // paddingHorizontal: 34,
  },
  contentTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.IconColor + 'E6',
  },
  description: {
    fontSize: 13,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor + 'E6',
    marginBottom: 20,
  },
  footer: {
    marginTop: 21,
    alignItems: 'flex-end',
    paddingHorizontal: 37,
  },
  button: {
    height: 38,
    width: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
    marginBottom: 20,
  },
  viewPager: {
    paddingVertical: 41,
    paddingHorizontal: 34,
    height: 212,
  },
  imgBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 21,
  },
  center: {
    alignItems: 'center',
  },
  tip1: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: AppColors.MainColor + 'E6',
  },
  tip2: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: AppColors.error + 'E6',
  },
  error: {
    position: 'absolute',
    top: -3,
    right: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: AppColors.error,
    width: 19,
    height: 19,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    position: 'absolute',
    top: -3,
    right: 0,
    zIndex: 10,
    elevation: 10,
    backgroundColor: AppColors.white,
    width: 19,
    height: 19,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 104,
    width: 78,
    borderRadius: 8,
    marginHorizontal: 6,
    marginBottom: 7,
  },
  pagination: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 25,
  },
  paginationDot: {
    width: 4,
    height: 4,
    marginHorizontal: 2,
    borderRadius: 2,
    backgroundColor: '#B8BFC1C7',
  },
  activeDot: {
    backgroundColor: '#89C9DE',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    // flex: 1,
    marginHorizontal: 44,
  },
  dotContain: {
    marginRight: 20,
    paddingVertical: 7,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: AppColors.MainColor,
  },
});

export default PhotoSuggestionModal;
