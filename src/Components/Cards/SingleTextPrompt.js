import React, {useState, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';

import ItemLike from '../Home/ItemLike';
import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';

const SingleTextPrompt = ({
  item,
  userInfo,
  userData,
  hideLike,
  stopIntroPlayer,
  likeContent,
  setPass,
  isModal,
  clickEditIcon,
  activeSlide,
  index,
  single,
}) => {
  const prompt = JSON.parse(item.content);
  const [height, setHeight] = useState(null);

  const [expanded, setExpanded] = useState(false);
  const heightValue = useRef(new Animated.Value(80)).current;

  const onLayout = (e) => {
    setHeight(
      e.nativeEvent.layout.height > 75 ? e.nativeEvent.layout.height : 75,
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (activeSlide === index) {
          if (!expanded) {
            Animated.timing(heightValue, {
              toValue: height,
              timing: 150,
              useNativeDriver: false,
            }).start(() => {
              setExpanded(true);
            });
          } else {
            setExpanded(false);
            Animated.timing(heightValue, {
              toValue: 75,
              timing: 150,
              useNativeDriver: false,
            }).start();
          }
        }
      }}
      activeOpacity={1}
      style={styles.wrap}>
      <Text style={[styles.title, single && styles.singleTitle]}>
        {prompt.question}
      </Text>
      <Animated.Text
        numberOfLines={expanded ? 100 : 3}
        style={[
          styles.text,
          single ? styles.singleText : {height: heightValue},
        ]}>
        {prompt.answer}
      </Animated.Text>
      <Text style={[styles.text, styles.hideText]} onLayout={onLayout}>
        {prompt.answer}
      </Text>
      {userInfo.user_id !== userData.user_id &&
        !userInfo.is_liked &&
        !hideLike && (
          <View style={styles.like}>
            <ItemLike
              width={23}
              height={23}
              color={AppColors.AppBlack + 'C2'}
              onPress={() => {
                stopIntroPlayer && stopIntroPlayer();
                if (!likeContent) {
                  setPass({
                    type: 'prompt',
                    isModal: isModal,
                    card: item,
                    target: userInfo,
                  });
                } else {
                  setPass({
                    type: 'likeBack',
                    isModal: isModal,
                    likeContent: likeContent,
                    target: userInfo,
                  });
                }
              }}
            />
          </View>
        )}
      {userInfo.user_id === userData.user_id && (
        <View style={styles.like}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              stopIntroPlayer && stopIntroPlayer();
              clickEditIcon(prompt);
            }}>
            <EditIcon width={20} height={20} color={AppColors.MainColor} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingBottom: 40,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: AppColors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
    minHeight: 40,
  },
  singleTitle: {
    minHeight: 0,
  },
  text: {
    marginTop: 12,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 25,
    minHeight: 75,
    color: AppColors.AppBlack + 'F5',
    fontSize: 16,
  },
  hideText: {
    opacity: 0,
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: '100%',
  },
  singleText: {
    minHeight: 0,
  },
  fullText: {
    height: 'auto',
  },
  like: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: 12,
    bottom: 12,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
  },
});

export default SingleTextPrompt;
