import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import LottieView from 'lottie-react-native';

import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/DrawIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import VoiceIcon from '../../Assets/Svg/VoiceIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';

import AudioMoreModal from '../../Screens/Modals/AudioMoreModal';
const EditAudioIntro = ({
  userCards,
  stopIntroPlayer,
  togglePlay,
  currentVoice,
  isPlay,
  fillValue,
  playerLoader,
}) => {
  const navigation = useNavigation();
  const [editVisible, setEditVisible] = useState(false);
  const [audioCard, setAudioCard] = useState({});

  useEffect(() => {
    setAudioCard(userCards.filter((c) => c.type === 'voice-intro'));
  }, [userCards]);

  const clickEditIcon = (index) => {
    stopIntroPlayer();
    setEditVisible(true);
  };

  const hideModal = (reported) => {
    setEditVisible(false);
  };

  const ReturnVoiceCreateProfile = () => {
    navigation.navigate('EditProfile');
  };

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View>
      {audioCard.length > 0 ? (
        <View style={styles.whiteItem}>
          <View style={styles.whiteButton}>
            <View style={styles.player}>
              <Text style={styles.title}>My voice intro</Text>
              <View style={styles.bar}>
                {currentVoice === JSON.parse(audioCard[0].content).media && (
                  <Animated.View
                    style={[
                      styles.progress,
                      {
                        width: widthAnimation,
                      },
                    ]}
                  />
                )}
              </View>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => {
                  togglePlay(
                    JSON.parse(audioCard[0].content).media,
                    parseInt(JSON.parse(audioCard[0].content).duration, 10) *
                      1000,
                  );
                }}>
                {playerLoader &&
                currentVoice === JSON.parse(audioCard[0].content).media ? (
                  <LottieView
                    source={require('../../Assets/Animation/player.json')}
                    autoPlay
                    loop
                    style={styles.loader}
                  />
                ) : isPlay &&
                  currentVoice === JSON.parse(audioCard[0].content).media ? (
                  <PauseIcon width={17} height={17} color={AppColors.white} />
                ) : (
                  <PlayIcon width={17} height={17} color={AppColors.white} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.edit} onPress={clickEditIcon}>
                <EditIcon width={17} height={17} color={AppColors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.item}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddVoiceIntro', {
                callBack: ReturnVoiceCreateProfile,
              })
            }>
            <VoiceIcon width={20} height={20} color={AppColors.white} />
            <Text style={styles.buttonText}>Get noticed, add Voice intro</Text>
            <AddIcon width={20} height={20} color={AppColors.white} />
          </TouchableOpacity>
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={editVisible}>
        <AudioMoreModal
          card={audioCard[0]}
          hide={hideModal}
          callBack={ReturnVoiceCreateProfile}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 40,
    marginHorizontal: 16,
    backgroundColor: '#51BAD9',
    borderRadius: 8,
  },
  whiteItem: {
    marginBottom: 33,
    marginHorizontal: 16,
    backgroundColor: AppColors.white,
    borderRadius: 8,
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Light',
    color: AppColors.black + 'CC',
    textAlign: 'center',
    marginVertical: 8,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  player: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  whiteButton: {
    paddingVertical: 16,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    marginRight: 'auto',
    marginLeft: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.AppBlack,
    marginBottom: 8,
  },
  edit: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppColors.MainColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  bar: {
    backgroundColor: '#A2E3F5B3',
    borderRadius: 12,
    height: 5,
    width: '100%',
  },
  progress: {
    position: 'absolute',
    backgroundColor: '#72D0EA',
    borderRadius: 12,
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
  },
});

export default EditAudioIntro;
