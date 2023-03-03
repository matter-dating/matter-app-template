import React from 'react';
import {Text, StyleSheet, View, Image, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../Utils/Colors';
import DateGameMessage from './DateGameMessage';
import WaitingMessage from './WaitingMessage';

const {height: screenHeight} = Dimensions.get('window');
const JustTalk = ({
  joined,
  userData,
  otherUserInfo,
  startGame,
  currentPoint,
  isEnd,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.users}>
        <View style={styles.flex}>
          <View style={styles.imgBox}>
            <Image
              style={[styles.img, !joined && styles.wait]}
              source={require('../../Assets/Image/me.png')}
            />
          </View>
          <Text style={[styles.name, !joined && styles.wait]}>
            {userData.first_name}
          </Text>
        </View>
        <View style={styles.flex}>
          <View style={styles.imgBox}>
            <Image
              style={[styles.img]}
              source={require('../../Assets/Image/other.png')}
            />
            {!otherUserInfo && (
              <View style={styles.loader}>
                <LottieView
                  source={require('../../Assets/Animation/loader_white.json')}
                  autoPlay
                  loop
                  style={styles.disableTouch}
                />
              </View>
            )}
          </View>
          <Text style={styles.name}>
            {otherUserInfo ? otherUserInfo.first_name : 'Loading...'}
          </Text>
        </View>
      </View>
      <View style={styles.absolute}>
        {otherUserInfo ? (
          <DateGameMessage
            startGame={startGame}
            point={currentPoint}
            isEnd={isEnd}
          />
        ) : (
          <WaitingMessage />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight > 700 ? 20 : 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  users: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
  },
  imgBox: {
    backgroundColor: Colors.white,
    padding: 3,
    borderRadius: 42,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 8,
  },
  img: {
    width: screenHeight > 700 ? 74 : 60,
    height: screenHeight > 700 ? 74 : 60,
    borderRadius: 37,
  },
  wait: {
    opacity: 0.4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1,
    fontSize: screenHeight > 700 ? 14 : 12,
  },
  loader: {
    position: 'absolute',
    width: 74,
    height: 74,
    left: 5,
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disableTouch: {
    width: 37,
  },
  absolute: {
    flex: 1,
    marginBottom: 46,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export default JustTalk;
