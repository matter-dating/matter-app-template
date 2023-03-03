import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AppColors from '../../Utils/AppColors';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import ForwardIcon from '../../Assets/Svg/ForwardIcon';
import ItemLikeIcon from '../../Assets/Svg/ItemLikeIcon';
import CheckIcon from '../../Assets/Svg/CheckBIcon';

const PlayerControl = ({
  user,
  userData,
  isPlay,
  togglePlay,
  previousUser,
  nextUser,
  isPause,
  stopPlayer,
  hidePrev,
  hideNext,
  disabled,
  setPass,
}) => {
  const [audioCard, setAudioCard] = useState({});
  var [isPress1, setIsPress1] = useState(false);
  var [isPress2, setIsPress2] = useState(false);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(user.user_info.is_liked);
    setAudioCard(user.user_cards.filter((c) => c.type === 'voice-intro'));
  }, [user]);

  const renderLike = () => {
    if (isLike) {
      return (
        <View style={styles.button}>
          <CheckIcon width={20} height={20} color={AppColors.MainColor} />
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          stopPlayer();
          setPass({
            type: 'voice-intro',
            card: audioCard,
            isModal: false,
            target: user.user_info,
            callBack: () => {
              setIsLike(true);
            },
          });
        }}>
        <ItemLikeIcon width={23} height={23} color={AppColors.MainColor} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.row}>
      <TouchableHighlight
        disabled={disabled}
        activeOpacity={hidePrev ? 1 : 0.85}
        underlayColor={'transparent'}
        onHideUnderlay={() => !hidePrev && setIsPress1(false)}
        onShowUnderlay={() => !hidePrev && !disabled && setIsPress1(true)}
        onPress={() => {
          !hidePrev && previousUser();
        }}
        style={[
          styles.forward,
          {transform: [{rotate: '180deg'}]},
          isPress1 && styles.pressBtn,
          hidePrev && styles.hideBUtton,
        ]}>
        <ForwardIcon color={AppColors.white} width={19} height={16} />
      </TouchableHighlight>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          togglePlay();
        }}>
        {isPlay && isPause === false ? (
          <PauseIcon width={15} height={15} color={AppColors.MainColor} />
        ) : (
          <PlayIcon width={15} height={15} color={AppColors.MainColor} />
        )}
      </TouchableOpacity>
      {renderLike()}
      <TouchableHighlight
        disabled={disabled}
        activeOpacity={hideNext ? 1 : 0.85}
        underlayColor={'transparent'}
        onHideUnderlay={() => !hideNext && setIsPress2(false)}
        onShowUnderlay={() => !hideNext && !disabled && setIsPress2(true)}
        style={[
          styles.forward,
          isPress2 && styles.pressBtn,
          hideNext && styles.hideBUtton,
        ]}
        onPress={() => {
          !hideNext && nextUser();
        }}>
        <ForwardIcon color={AppColors.white} width={19} height={16} />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: AppColors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  forward: {
    width: 40,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppColors.white + '00',
    borderWidth: 1,
  },
  pressBtn: {
    backgroundColor: 'transparent',
    borderColor: AppColors.white + '66',
  },
  hideBUtton: {
    opacity: 0.4,
  },
});

export default PlayerControl;
