import React, {useRef, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';
import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import RoomIcon from '../../Assets/Svg/RoomIcon';
import StickerIcon from '../../Assets/Svg/StickerIcon';
import NextIcon from '../../Assets/Svg/NextIcon';

const AudioConversationTips = ({showTip, setShowTip}) => {
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  const clickNext = (pageNumber) => {
    if (pageNumber === 3) {
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
      setPage(position);
    }
  };

  if (showTip) {
    return (
      <View style={styles.absolute}>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            setShowTip(false);
          }}>
          <DeleteIcon
            color={AppColors.AppBlack + '80'}
            width={20}
            height={20}
          />
        </TouchableOpacity>
        <PagerView
          ref={pagerRef}
          style={styles.safe}
          initialPage={0}
          onPageScroll={onPageScroll}>
          <View>
            <Text style={styles.tipTitle}>Why voice notes</Text>
            <View style={styles.tipRow}>
              <View style={styles.voice}>
                <View style={styles.button}>
                  <VoiceIcon width={14} height={20} color={AppColors.white} />
                </View>
              </View>
              <View style={styles.flex}>
                <Text style={styles.tipsTitle}>Voice notes</Text>
                <Text style={styles.tipBody}>
                  There is no texting because voice Conveys personality and
                  emotions.
                </Text>
                <Text style={styles.tipBody}>
                  Voice notes warm you up for an audio date.
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.tipTitle}>Why create a room</Text>
            <View style={styles.tipRow}>
              <View style={styles.room}>
                <View style={styles.button}>
                  <RoomIcon width={20} height={20} color={AppColors.white} />
                </View>
              </View>
              <View style={styles.flex}>
                <Text style={styles.tipsTitle}>Go on an audio date</Text>
                <Text style={styles.tipBody}>
                  Use voice notes to coordinate a time For an audio date.
                </Text>
                <Text style={styles.tipBody}>
                  Create a room to go on an audio date (With ultra HD voice
                  quality)
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.tipTitle}>Why use expressions</Text>
            <View style={styles.tipRow}>
              <View style={styles.expressions}>
                <View style={styles.sticker}>
                  <StickerIcon width={20} height={20} color={AppColors.white} />
                </View>
              </View>
              <View style={styles.flex}>
                <Text style={styles.tipsTitle}>Expressions</Text>
                <Text style={styles.tipBody}>
                  Break the ice and spark a conversation.
                </Text>
                <Text style={styles.tipBody}>
                  Easily invite your match to an audio datewith expressions.
                </Text>
              </View>
            </View>
          </View>
        </PagerView>
        <TouchableOpacity
          style={styles.next}
          onPress={() => clickNext(page + 1)}>
          <NextIcon color={AppColors.AppBlack} width={16} height={16} />
        </TouchableOpacity>
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  absolute: {
    // position: 'absolute',
    marginHorizontal: 20,
    paddingTop: 40,
    marginTop: 20,
    // width: '100%',
    backgroundColor: '#F2F6F7',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    // marginHorizontal: 21,
    // top: -250,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
  },
  next: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 20,
    paddingVertical: 20,
  },
  safe: {
    height: 165,
  },
  delete: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    width: 45,
    height: 45,
    zIndex: 100,
  },
  tipTitle: {
    color: AppColors.IconColor + '75',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  tipsTitle: {
    color: AppColors.IconColor + 'CC',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: 'Poppins-SemiBold',
  },
  tipBody: {
    color: AppColors.IconColor + 'CC',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    fontFamily: 'Poppins-Regular',
  },
  voice: {
    backgroundColor: AppColors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  room: {
    backgroundColor: AppColors.MainColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  expressions: {
    backgroundColor: '#C78EF7',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tipRow: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.MainColor,
    borderRadius: 18,
  },
  sticker: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C78EF7',
    borderRadius: 18,
  },
});

export default AudioConversationTips;
