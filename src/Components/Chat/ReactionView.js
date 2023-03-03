import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import Reactions from '../../Assets/Reaction';
import AppColors from '../../Utils/AppColors';
import {useMessages} from '../../Providers/MessagesProvider';

const iconNames = [
  'Reaction1',
  'Reaction2',
  'Reaction3',
  'Reaction4',
  'Reaction5',
];

const ReactionView = ({reactionTop, isMine, reactionItem, setReactionItem}) => {
  const insets = useSafeArea();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const {addMessageReaction, removeMessageReaction} = useMessages();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const clickReaction = (item) => {
    addMessageReaction(reactionItem, item);
    setReactionItem(null);
  };

  const [dummyData] = useState(Array(5).fill({}));
  return (
    <Animated.View
      style={[
        isMine ? styles.mineContainer : styles.notMine,
        {
          transform: [
            {
              scaleX: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
            {
              scaleY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
          top:
            reactionTop > insets.top + 114
              ? reactionTop - 46
              : reactionTop + 10,
        },
      ]}>
      <View style={styles.wrap}>
        {dummyData.map((item, index) => {
          let reactionValue =
            reactionItem.reaction &&
            reactionItem.reaction !== null &&
            reactionItem.reaction !== ''
              ? JSON.parse(reactionItem.reaction).value
              : null;
          const Icon = Reactions[iconNames[index]];
          return (
            <TouchableOpacity
              onPress={() => {
                if (reactionValue === iconNames[index]) {
                  removeMessageReaction(
                    reactionItem,
                    JSON.parse(reactionItem.reaction),
                  );
                } else {
                  clickReaction(iconNames[index]);
                }
              }}
              style={[
                styles.item,
                reactionValue === iconNames[index] && styles.activeItem,
              ]}
              key={'reaction' + index}>
              <Icon width={20} height={20} />
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mineContainer: {
    position: 'absolute',
    right: 20,
    borderRadius: 19,
  },
  notMine: {
    position: 'absolute',
    left: 74,
    borderRadius: 19,
  },
  wrap: {
    flexDirection: 'row',
    backgroundColor: AppColors.backgroundColor1,
    borderRadius: 19,
    padding: 8,
    height: 46,
  },
  item: {
    padding: 5,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  activeItem: {
    backgroundColor: AppColors.backgroundColor2,
  },
  reactionWrap: {
    position: 'absolute',
    top: -7,
    right: 0,
    backgroundColor: AppColors.white,
    width: 21,
    height: 21,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ReactionView;
