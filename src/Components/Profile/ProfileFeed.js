import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FeedCard from './FeedCard';

const ProfileFeed = ({
  profile,
  isPlay,
  togglePlay,
  fillValue,
  stopIntroPlayer,
  activeUser,
  currentVoice,
  playerLoader,
  blockAndRemove,
  widthAnimation,
  seeMoreProfile,
  setPass,
  noBlur,
}) => {
  const [audioCard, setAudioCard] = useState([]);

  useEffect(() => {
    setAudioCard(profile.user_cards.filter((c) => c.type === 'voice-intro'));
  }, [profile.user_cards]);
  return (
    <View style={styles.item}>
      <FeedCard
        isPlay={isPlay}
        profile={profile}
        togglePlay={togglePlay}
        audioCard={audioCard}
        widthAnimation={widthAnimation}
        stopIntroPlayer={stopIntroPlayer}
        activeUser={activeUser}
        currentVoice={currentVoice}
        playerLoader={playerLoader}
        blockAndRemove={blockAndRemove}
        seeMoreProfile={seeMoreProfile}
        setPass={setPass}
        noBlur={noBlur}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProfileFeed;
