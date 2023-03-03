import React, {useState} from 'react';
import {StyleSheet, View, Modal, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Toast from '../../Assets/Package/react-native-toast-message';
import {useAuth} from '../../Providers/AuthProvider';
import EditPromptModal from '../../Screens/Modals/EditPromptModal';

import SingleVoicePrompt from './SingleVoicePrompt';
import {
  customAnimatedStyles,
  customScrollInterpolator,
} from '../../Assets/Animation/Carousel';

const screenWidth = Math.round(Dimensions.get('window').width);
const VoicePromptCard = ({
  card,
  userInfo,
  likeContent,
  stopIntroPlayer,
  fillValue,
  togglePlay,
  isPlay,
  currentVoice,
  hideLike,
  playerLoader,
  isModal,
  setPass,
}) => {
  const voicePrompts = card.content;
  const {userData, deleteCard} = useAuth();

  const [moreVisible, setMoreVisible] = useState(false);
  const [editPrompt, setEditPrompt] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

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
    deleteCard(voicePrompts[activeSlide]);
  };

  return (
    <View>
      {voicePrompts && (
        <View style={styles.carouselOuter}>
          {voicePrompts.length > 1 ? (
            <>
              <Carousel
                data={voicePrompts}
                useScrollView={true}
                renderItem={({item, index}) => (
                  <SingleVoicePrompt
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
                    currentVoice={currentVoice}
                    fillValue={fillValue}
                    togglePlay={togglePlay}
                    playerLoader={playerLoader}
                    isPlay={isPlay}
                  />
                )}
                firstItem={activeSlide}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 80}
                onSnapToItem={(index) => {
                  stopIntroPlayer();
                  setActiveSlide(index);
                }}
                // contentContainerCustomStyle={{alignItems: 'center'}}
                scrollInterpolator={customScrollInterpolator}
                slideInterpolatedStyle={customAnimatedStyles}
              />
              <Pagination
                dotsLength={voicePrompts.length}
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
              <SingleVoicePrompt
                key={voicePrompts[0]._id}
                item={voicePrompts[0]}
                userInfo={userInfo}
                userData={userData}
                hideLike={hideLike}
                stopIntroPlayer={stopIntroPlayer}
                likeContent={likeContent}
                setPass={setPass}
                isModal={isModal}
                clickEditIcon={clickEditIcon}
                currentVoice={currentVoice}
                fillValue={fillValue}
                togglePlay={togglePlay}
                playerLoader={playerLoader}
                isPlay={isPlay}
              />
            </View>
          )}
        </View>
      )}
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditPromptModal
          card={voicePrompts[activeSlide]}
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
  containerStyle: {
    position: 'absolute',
    bottom: -6,
    left: 32,
    // backgroundColor: 'red',
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

export default VoicePromptCard;
