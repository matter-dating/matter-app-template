import React, {useRef, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Image, View} from 'react-native';
import PagerView from 'react-native-pager-view';

import CustomImage from '../../Components/Common/CustomImage';
import AppColors from '../../Utils/AppColors';
import MoreModal from './MoreModal';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import NextIcon from '../../Assets/Svg/NextIcon';

const MatchTipModal = ({hide}) => {
  const [page, setPage] = useState(0);
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 2) {
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
    <MoreModal hide={hide}>
      <View>
        <View style={styles.header}>
          <View style={styles.empty} />
          <Text style={styles.title}>Tips to get more matches</Text>
          <TouchableOpacity onPress={hide}>
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
                  <Text style={styles.contentTitle}>Happy Hour</Text>
                  <Text style={styles.description}>
                    By far, the best way to get matches is to join our Happy
                    Hour audio blind dates.
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox1}>
                <Image
                  style={styles.img1}
                  source={require('../../Assets/Image/tip12.png')}
                />
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.dotContain}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.contentTitle}>Complete your profile</Text>
                  <Text style={styles.description}>
                    Complete profiles get more matches
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox}>
                <View style={styles.center1}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip13.png')}
                  />
                  <Text style={styles.tip2Bold}>Add voice intro</Text>

                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip16.png')}
                  />
                  <Text style={styles.tip2Bold}>Add your interests</Text>
                  <Text style={styles.tip2}>songs, films, etc</Text>
                </View>
                <View style={styles.center1}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip14.png')}
                  />
                  <Text style={styles.tip2Bold}>Add photos</Text>
                  <Text style={styles.tip2}>& connect instagram</Text>
                </View>
                <View style={styles.center1}>
                  <CustomImage
                    style={styles.img}
                    source={require('../../Assets/Image/tip15.png')}
                  />
                  <Text style={styles.tip2Bold}>Add prompt</Text>
                  <Text style={styles.tip2}>
                    it's great for conversation spark
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.row}>
                <View style={styles.dotContain}>
                  <View style={styles.dot} />
                </View>
                <View style={styles.flex}>
                  <Text style={styles.contentTitle}>Be proactive</Text>
                  <Text style={styles.description}>
                    Be proactive and send likes{'\n'}
                    You miss 100% of the chances you don’t take
                  </Text>
                </View>
              </View>
              <View style={styles.imgBox2}>
                <CustomImage
                  style={styles.img2}
                  source={require('../../Assets/Image/tip17.png')}
                />
                <Image
                  style={styles.img3}
                  source={require('../../Assets/Image/tip18.png')}
                />
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
    fontSize: 13,
    color: AppColors.IconColor + 'B8',
  },
  body: {
    // paddingHorizontal: 44,
  },
  contain: {
    // paddingHorizontal: 34,
  },
  contentTitle: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.IconColor + 'E6',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor + 'E6',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    right: 0,
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
    backgroundColor: '#CFA3FF',
  },
  viewPager: {
    paddingVertical: 41,
    paddingHorizontal: 34,
    height: 380,
  },
  imgBox1: {
    marginBottom: 21,
    marginHorizontal: 61,
  },
  imgBox2: {
    marginBottom: 21,
    marginHorizontal: 56,
  },
  imgBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 9,
  },
  center1: {
    alignItems: 'center',
    width: 77,
    marginHorizontal: 12,
  },
  center: {
    alignItems: 'center',
  },
  tip2Bold: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.IconColor + 'E6',
    textAlign: 'center',
  },
  tip2: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor + 'E6',
    textAlign: 'center',
  },
  img: {
    height: 73,
    width: 77,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 13,
  },
  img1: {
    height: 87,
    width: 163,
    marginTop: 68,
  },
  img2: {
    height: 174,
    width: 120,
    marginTop: 8,
    borderRadius: 8,
  },
  img3: {
    position: 'absolute',
    bottom: -41,
    left: 103,
    height: 68,
    width: 35,
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
    backgroundColor: '#C7CDCE',
  },
  activeDot: {
    backgroundColor: '#CFA3FF',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    // flex: 1,
    marginHorizontal: 21,
  },
  dotContain: {
    marginRight: 16,
    marginLeft: 10,
    paddingVertical: 7,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#CFA3FF',
  },
});

export default MatchTipModal;
