import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import LinearGradient from 'react-native-linear-gradient';

import {useAuth} from '../../Providers/AuthProvider';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomImage from '../../Components/Common/CustomImage';
import MoreModal from './MoreModal';
import NextIcon from '../../Assets/Svg/NextIcon';
import BackIcon from '../../Assets/Svg/BackIcon';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';

const {height: screenHeight} = Dimensions.get('window');

const BlindTipModal = ({profile, peerId, hide}) => {
  const {userData} = useAuth();

  const [page, setPage] = useState(0);
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
    setPage(pageNumber);
  };

  return (
    <MoreModal hide={() => hide(false)}>
      <View style={styles.header}>
        <View style={styles.close} />
        <Text style={styles.headerText}>What's Happy hour?</Text>
        <TouchableOpacity onPress={hide} style={styles.close}>
          <DeleteIcon width={20} height={20} color={Colors.MainColor + 'CC'} />
        </TouchableOpacity>
      </View>
      <View style={{height: screenHeight * 0.7}}>
        <PagerView
          style={styles.viewPager}
          initialPage={0}
          ref={pagerRef}
          scrollEnabled={false}>
          <View style={styles.contain} key="0">
            <View>
              <View style={styles.back} />
              <Text style={styles.title}>Happy Hour 🎉</Text>
              <Text style={styles.description}>
                We will set you up on blind dates which are 3 min long{' '}
                <Text style={styles.bold}>audio-only</Text> conversations
              </Text>
            </View>
            <View style={styles.imgBox}>
              <CustomImage
                style={styles.img1}
                source={require('../../Assets/Image/Blind1.png')}
              />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.axana}
                onPress={() => handlePageChange(page + 1)}>
                <LinearGradient
                  start={{x: 0.25, y: 0.75}}
                  end={{x: 1, y: 0.5}}
                  colors={['#EDCC54', '#F889F9', '#B47DFF', '#5BD0FB']}
                  style={styles.next}>
                  <NextIcon width={14} height={14} color={Colors.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contain} key="3">
            <View>
              <View style={styles.back}>
                <TouchableOpacity onPress={() => handlePageChange(page - 1)}>
                  <BackIcon
                    width={20}
                    height={20}
                    color={Colors.MainColor + 'CC'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Don’t worry,</Text>
              <Text style={styles.description}>
                If you feel uncomfortable, you can leave at any time and can
                report offensive behavior.
              </Text>
            </View>
            <View style={styles.imgBox}>
              <CustomImage
                style={styles.img2}
                source={require('../../Assets/Image/Blind2.png')}
              />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.axana}
                onPress={() => handlePageChange(page + 1)}>
                <LinearGradient
                  start={{x: 0.25, y: 0.75}}
                  end={{x: 1, y: 0.5}}
                  colors={['#EDCC54', '#F889F9', '#B47DFF', '#5BD0FB']}
                  style={styles.next}>
                  <NextIcon width={14} height={14} color={Colors.white} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contain} key="4">
            <View>
              <View style={styles.back}>
                <TouchableOpacity onPress={() => handlePageChange(page - 1)}>
                  <BackIcon
                    width={20}
                    height={20}
                    color={Colors.MainColor + 'CC'}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>After the date,</Text>
              <Text style={styles.description}>
                You will see your date’s photos.{'\n'}
                Then you decide if you want to match or not.
              </Text>
            </View>
            <View style={styles.imgBox}>
              <CustomImage
                style={styles.img3}
                source={
                  !!userData && userData.gender === 'male'
                    ? require('../../Assets/Image/Blind4.png')
                    : require('../../Assets/Image/Blind3.png')
                }
              />
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={hide}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#EDCC54', '#F889F9', '#B47DFF', '#5BD0FB']}
                  style={styles.linear}>
                  <Text style={styles.buttonText}>Done</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </PagerView>
      </View>
    </MoreModal>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  contain: {
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  title: {
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 12,
  },
  topMargin: {
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 17,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: AppColors.MainColor1 + '52',
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
  },
  close: {
    width: 30,
  },
  back: {
    height: 60,
    justifyContent: 'center',
  },
  description: {
    color: Colors.black,
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 10,
    marginRight: 30,
  },
  bold: {
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  axana: {
    width: 56,
  },
  next: {
    backgroundColor: AppColors.MainColor,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  button: {
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
  },
  linear: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.white,
  },
  whiteText: {
    color: AppColors.AppBlack,
  },
  imgBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img1: {
    width: 210,
    height: 130,
  },
  img2: {
    width: 268,
    height: 119,
  },
  img3: {
    width: 160,
    height: 222,
  },
});

export default BlindTipModal;
