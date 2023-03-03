import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {AutoDragSortableView} from 'react-native-drag-sort';
import LottieView from 'lottie-react-native';
import CustomText from '../Common/Text';
import CustomImage from '../Common/CustomImage';

import PlayIcon from '../../Assets/Svg/PlayIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import DotIcon from '../../Assets/Svg/DotIcon';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {useAuth} from '../../Providers/AuthProvider';

const {width: screenWidth} = Dimensions.get('window');

const MusicList = ({
  data,
  clickEditIcon,
  togglePlay,
  currentVoice,
  isPlay,
  playerLoader,
}) => {
  const {updateCardPriority} = useAuth();

  const changePriority = (data) => {
    let priority_idx = 0;
    data.forEach((d) => {
      updateCardPriority(d._id, priority_idx);
      priority_idx = priority_idx + 1;
    });
  };

  const renderItem = (item, index) => {
    const music = JSON.parse(item.content);
    return (
      <View key={index} style={styles.itemWrap}>
        <Text style={styles.itemNumber}>{index + 1}</Text>
        <View style={styles.item}>
          <CustomImage source={{uri: music.image}} style={styles.img} />
          <View style={styles.flex}>
            <CustomText.TitleText numberOfLines={1} style={styles.name}>
              {music.name}
            </CustomText.TitleText>
            <CustomText.RegularText numberOfLines={1} style={styles.artist}>
              {music.artist}
            </CustomText.RegularText>
          </View>
          {music.preview_url && (
            <TouchableOpacity
              style={styles.play}
              onPress={() => togglePlay(music.preview_url, 10)}>
              {playerLoader && currentVoice === music.preview_url ? (
                <LottieView
                  source={require('../../Assets/Animation/player.json')}
                  autoPlay
                  loop
                  style={styles.load}
                />
              ) : isPlay && currentVoice === music.preview_url ? (
                <PauseIcon width={40} height={20} color={AppColors.MainColor} />
              ) : (
                <PlayIcon width={40} height={40} color={AppColors.MainColor} />
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => clickEditIcon(item)}
            style={styles.edit}>
            <DotIcon color={AppColors.black} width={12} height={12} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <AutoDragSortableView
      dataSource={data}
      keyExtractor={(item, index) => 'key' + index.toString()}
      childrenHeight={82}
      onDataChange={(data) => changePriority(data)}
      showsVerticalScrollIndicator={false}
      childrenWidth={screenWidth - 24}
      parentWidth={screenWidth}
      renderItem={(item, index) => {
        return renderItem(item, index);
      }}
    />
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 18,
    paddingRight: 20,
    marginVertical: 8,
    width: screenWidth,
  },
  item: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 6,
    paddingVertical: 9,
    paddingLeft: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  load: {
    width: 30,
  },
  img: {
    width: 56,
    height: 48,
    borderRadius: 4,
    marginRight: 14,
  },
  name: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    marginBottom: 2,
    color: AppColors.MainColor1 + 'CC',
  },
  artist: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: AppColors.MainColor1,
    lineHeight: 18,
  },
  play: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  itemNumber: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack + '94',
    width: 20,
  },
  edit: {
    paddingTop: 14,
    padding: 16,
    width: 45,
  },
});

export default MusicList;
