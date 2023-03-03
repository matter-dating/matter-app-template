import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, Modal} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import AppColors from '../../Utils/AppColors';
import Toast from '../../Assets/Package/react-native-toast-message';
import {useAuth} from '../../Providers/AuthProvider';
import EditPromptModal from '../../Screens/Modals/EditPromptModal';

import SingleTextPrompt from './SingleTextPrompt';
import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const imgWidth = screenWidth - 24;
const imgHeight = (imgWidth / 3) * 4;

const TextPromptCard = ({
  card,
  userInfo,
  likeContent,
  stopIntroPlayer,
  hideLike,
  isModal,
  setPass,
}) => {
  const {userData, deleteCard} = useAuth();
  const [moreVisible, setMoreVisible] = useState(false);
  const [editPrompt, setEditPrompt] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const textPrompts = card.content;

  const hideModal = () => {
    setEditPrompt(null);
    setMoreVisible(false);
  };

  const clickEditIcon = (item) => {
    setEditPrompt(item);
    setMoreVisible(true);
  };

  const deletePrompt = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1: 'Your prompt has been deleted',
      topOffset: 0,
      visibilityTime: 2000,
    });
    deleteCard(textPrompts[activeSlide]);
  };
  return (
    <View>
      {textPrompts && (
        <View style={styles.carouselOuter}>
          {textPrompts.length > 1 ? (
            <>
              <Carousel
                data={textPrompts}
                useScrollView={true}
                renderItem={({item, index}) => (
                  <SingleTextPrompt
                    key={item._id}
                    item={item}
                    userInfo={userInfo}
                    userData={userData}
                    hideLike={hideLike}
                    stopIntroPlayer={stopIntroPlayer}
                    likeContent={likeContent}
                    setPass={setPass}
                    isModal={isModal}
                    clickEditIcon={clickEditIcon}
                    activeSlide={activeSlide}
                    index={index}
                  />
                )}
                firstItem={activeSlide}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 60}
                onSnapToItem={(index) => {
                  stopIntroPlayer();
                  setActiveSlide(index);
                }}
                // contentContainerCustomStyle={{alignItems: 'center'}}
                scrollInterpolator={customScrollInterpolator}
                slideInterpolatedStyle={customAnimatedStyles}
              />
              <Pagination
                dotsLength={textPrompts.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.containerStyle}
                dotStyle={styles.dotStyle}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
                inactiveDotStyle={styles.inactiveDot}
              />
            </>
          ) : (
            <View style={styles.outer}>
              <SingleTextPrompt
                key={textPrompts[0]._id}
                item={textPrompts[0]}
                userInfo={userInfo}
                userData={userData}
                hideLike={hideLike}
                stopIntroPlayer={stopIntroPlayer}
                likeContent={likeContent}
                setPass={setPass}
                isModal={isModal}
                clickEditIcon={clickEditIcon}
                activeSlide={0}
                index={0}
                single={true}
              />
            </View>
          )}
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditPromptModal
          card={textPrompts[activeSlide]}
          editPrompt={editPrompt}
          deletePrompt={deletePrompt}
          hide={hideModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselOuter: {
    marginTop: 10,
    marginBottom: 18,
  },
  outer: {
    marginHorizontal: 12,
  },
  wrap: {
    paddingBottom: 50,
    paddingTop: 25,
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
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: AppColors.IconColor + 'CC',
    lineHeight: 20,
  },
  text: {
    marginTop: 12,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 25,
    color: AppColors.AppBlack + 'F5',
    fontSize: 16,
  },
  img: {
    width: imgWidth,
    height: imgHeight,
    marginLeft: -17,
    marginVertical: 17,
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

  containerStyle: {
    position: 'absolute',
    top: 0,
    left: 22,
    marginTop: 'auto',
  },
  dotStyle: {
    width: 6,
    height: 6,
    paddingHorizontal: 0,
    borderRadius: 5,
    marginHorizontal: -10,
    backgroundColor: '#64DCFF',
  },
  inactiveDot: {
    backgroundColor: '#D8F2FA',
  },
});

export default TextPromptCard;
