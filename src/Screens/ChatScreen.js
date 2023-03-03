import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useScrollToTop} from '@react-navigation/native';

import {useAuth} from '../Providers/AuthProvider';
import {useMessages} from '../Providers/MessagesProvider';
import {useAppFlag} from '../Providers/AppFlagProvider';

import AppColors from '../Utils/AppColors';
import {calculateUserStatus} from '../Utils/Functions';

import SingleChat from '../Components/Chat/SingleChat';
import UsersCarousel from '../Components/Users/UsersCarousel';
import AnimatedView from '../Components/Common/AnimatedView';
import EmptyScreen from '../Components/Empty/MessagesList';

import ZeroLikeTutorial from '../Components/Tutorial/ZeroLikeTutorial';
import ZeroMatchTutorial from '../Components/Tutorial/ZeroMatchTutorial';
import FirstLikeTutorial from '../Components/Tutorial/FirstLikeTutorial';
import FirstMatchTutorial from '../Components/Tutorial/FirstMatchTutorial';

const ChatScreen = () => {
  const navigation = useNavigation();
  const ref = useRef(null);
  const {
    userMatches,
    user,
    userData,
    updateUserData,
    userInvitation,
    userLikes,
  } = useAuth();
  const {roomMessages, lastRecieved} = useMessages();
  const insets = useSafeArea();
  const [currentlyOpenSwipeable, setCurrentlyOpenSwipeable] = useState(null);
  const isFocused = useIsFocused();
  const {checkFlag, setFlag} = useAppFlag();

  // LikeTutorial
  const [showZeroLikeTutorial, setShowZeroLikeTutorial] = useState(false);
  const [showFirstLikeTutorial, setShowFirstLikeTutorial] = useState(false);
  // MatchTutorial
  const [showZeroMatchTutorial, setShowZeroMatchTutorial] = useState(false);
  const [showFirstMatchTutorial, setShowFirstMatchTutorial] = useState(false);
  const [matchCount, setMatchCount] = useState(false);

  useEffect(() => {
    if (userInvitation.length > 0 && isFocused) {
      (async () => {
        let userNewStatus = calculateUserStatus(userData, userInvitation[0]);
        if (userNewStatus !== userData.status) {
          await user.callFunction('updateUserField', [
            userData.user_id,
            'status',
            userNewStatus,
          ]);
          await updateUserData();
          if (userNewStatus === 7) {
            navigation.navigate('WaitList', {waitList: 'WaitList'});
          } else if (userNewStatus === 6) {
            navigation.navigate('WaitList', {waitList: 'BlackList'});
          } else if (userNewStatus === 5) {
            navigation.navigate('UnderAge');
          } else if (userNewStatus === 4) {
            navigation.navigate('BannedModal');
          } else if (userNewStatus === 3) {
            navigation.navigate('StrikeModal');
          }
        }
      })();
    }
  }, [userInvitation]);

  useEffect(() => {
    // Like
    if (userLikes.length === 0) {
      if (checkFlag('zero_like_tutorial') === null) {
        setShowZeroLikeTutorial(true);
      }
    } else {
      if (checkFlag('first_like_tutorial') === null) {
        setShowFirstLikeTutorial(true);
      }
    }
  }, [userLikes]);

  useEffect(() => {
    // Match
    var count = userMatches.filter(
      (match) => roomMessages(match.pubnub_room_id).length === 0,
    ).length;
    setMatchCount(count);
    if (count === 0) {
      if (checkFlag('zero_match_tutorial') === null) {
        setShowZeroMatchTutorial(true);
      }
    } else {
      if (checkFlag('first_match_tutorial') === null) {
        setShowFirstMatchTutorial(true);
      }
    }
  }, [userMatches]);

  const handleScroll = () => {
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  const onOpen = (event, gestureState, swipeable) => {
    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
      currentlyOpenSwipeable.recenter();
    }
    setCurrentlyOpenSwipeable(swipeable);
  };

  const onClose = () => {
    setCurrentlyOpenSwipeable(null);
  };

  const deleteItem = (name) => {
    let letRooms = [...rooms];
    let index = letRooms.findIndex((el) => el.name === name);
    letRooms[index] = {...letRooms[index], deleted: true};
    // setRooms(letRooms);
  };

  const endSate = (index) => {
    let letRooms = [...rooms];
    letRooms[index] = {...letRooms[index], deleted: false};
    // setRooms(letRooms);
  };

  const clickZeroTutorial = () => {
    setFlag('zero_like_tutorial', 'true');
    setShowZeroLikeTutorial(false);
  };

  const clickFirstTutorial = () => {
    setFlag('first_like_tutorial', 'true');
    setShowFirstLikeTutorial(false);
  };

  const clickZeroMatchTutorial = () => {
    setFlag('zero_match_tutorial', 'true');
    setShowZeroMatchTutorial(false);
  };

  const clickFirstMatchTutorial = () => {
    setFlag('first_match_tutorial', 'true');
    setShowFirstMatchTutorial(false);
  };

  useScrollToTop(ref);

  const paddingValue = Platform.OS === 'android' ? insets.top : 0;
  return (
    <View style={styles.wrap}>
      {showZeroLikeTutorial && (
        <ZeroLikeTutorial
          color={'#79C9E1'}
          hide={clickZeroTutorial}
          matchCount={matchCount}
        />
      )}
      {showFirstLikeTutorial && (
        <FirstLikeTutorial
          userLikes={userLikes}
          color={'#79C9E1'}
          matchCount={matchCount}
          hide={clickFirstTutorial}
        />
      )}
      {showZeroMatchTutorial &&
        !showZeroLikeTutorial &&
        !showFirstLikeTutorial && (
          <ZeroMatchTutorial color={'#79C9E1'} hide={clickZeroMatchTutorial} />
        )}
      {showFirstMatchTutorial &&
        !showZeroLikeTutorial &&
        !showFirstLikeTutorial && (
          <FirstMatchTutorial
            color={'#5CC4E3'}
            hide={clickFirstMatchTutorial}
            users={userMatches
              .filter(
                (match) => roomMessages(match.pubnub_room_id).length === 0,
              )
              .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))}
          />
        )}

      <SafeAreaView style={styles.safe}>
        <View style={[styles.list, {paddingTop: paddingValue}]}>
          <FlatList
            ref={ref}
            onScroll={handleScroll}
            keyExtractor={(item, index) => item.pubnub_room_id}
            data={userMatches
              .filter((match) => roomMessages(match.pubnub_room_id).length > 0)
              .sort((a, b) => {
                return (
                  roomMessages(b.pubnub_room_id)[0].timetoken -
                  roomMessages(a.pubnub_room_id)[0].timetoken
                );
              })}
            extraData={lastRecieved}
            getItemLayout={(data, index) => ({
              length: 80,
              offset: 80 * index,
              index,
            })}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            ListHeaderComponent={
              <UsersCarousel
                userLikes={userLikes}
                // users={userMatches}
                users={userMatches
                  .filter(
                    (match) => roomMessages(match.pubnub_room_id).length === 0,
                  )
                  .sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1))}
              />
            }
            renderItem={({item, index}) => (
              <AnimatedView
                deleted={item.deleted}
                index={index}
                endSate={endSate}>
                <SingleChat
                  item={item}
                  index={index}
                  onOpen={onOpen}
                  onClose={onClose}
                  deleteItem={deleteItem}
                />
              </AnimatedView>
            )}
            ListEmptyComponent={
              <EmptyScreen
                users={userMatches.filter(
                  (match) => roomMessages(match.pubnub_room_id).length === 0,
                )}
              />
            }
            contentContainerStyle={styles.containerStyle}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.backgroundColor,
  },
  safe: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
  },
  containerStyle: {
    flexGrow: 1,
  },
});

export default ChatScreen;
