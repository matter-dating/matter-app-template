import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import {groupBy} from '../../Utils/Functions';

import {
  S3_PHOTO_URL,
  S3_MAIN_URL,
  S3_PROMPT_URL,
  S3_PROMPT_VOICE_URL,
} from '../../Utils/Constants';

import CustomImage from '../Common/CustomImage';
import CustomText from '../Common/Text';
import ProfileImage from '../Profile/ProfileImage';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import {useAuth} from '../../Providers/AuthProvider';

const screenWidth = Math.round(Dimensions.get('window').width);

const LikedItem = ({
  card,
  type,
  noGroup,
  target,
  likeContent,
  fillValue,
  isPlay,
  currentVoice,
  audioRecorderPlayer,
  togglePlay,
  playerLoader,
  noBlur,
}) => {
  const imgWidth = screenWidth - 76;
  const cardWidth = (screenWidth - 85) / 2;
  const movieWidth = screenWidth - 160;
  const {userData} = useAuth();

  // const imgHeight = (imgWidth / 3) * 4;
  const movieHeight = (movieWidth / 2) * 3;

  const pagerRef = useRef(null);
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (type === 'musicCard') {
      if (card.content.length > 0) {
        setPosts(groupBy(card.content));
      }
    }
    if (type === 'movieCard') {
      if (card.content.length > 0) {
        setPosts(groupBy(card.content));
      }
    }
  }, []);

  useEffect(() => {
    if (noGroup) {
      setPosts(groupBy(noGroup));
    }
  }, [noGroup]);

  const onPageScroll = (event) => {
    const {position} = event.nativeEvent;
    if (position !== page) {
      setPage(position);
    }
  };

  const renderText = () => {
    if (likeContent.type === 'image') {
      return 'your photo';
    }
    if (likeContent.type === 'imageCard') {
      return 'your photo';
    }
    if (likeContent.type === 'movie') {
      return JSON.parse(likeContent.card.content).media_type === 'movie'
        ? 'your movie'
        : 'your TV show';
    }
    if (likeContent.type === 'movieCard') {
      return likeContent.card.type === 'movie'
        ? 'your favorite movies'
        : 'your favorite TV shows';
    }
    if (likeContent.type === 'music') {
      return 'your song';
    }
    if (likeContent.type === 'prompt') {
      return 'your prompt';
    }
    if (likeContent.type === 'hobbies') {
      return 'your hobbies';
    }
    if (likeContent.type === 'musicCard') {
      return 'your song playlist';
    }
    if (likeContent.type === 'insta') {
      return 'your instagram photo';
    }
    if (likeContent.type === 'instaCard') {
      return 'your instagram';
    }
    if (likeContent.type === 'voice-intro') {
      return 'your voice intro';
    }
    return <></>;
  };

  const renderItem = (singleItem, i, index) => {
    if (type === 'instaCard') {
      return (
        <View
          style={[
            styles.singleItem,
            (index * 2 + i + 1) % 2 === 1 &&
              index * 2 + i + 1 === noGroup.length &&
              styles.lastItem,
          ]}
          key={singleItem.id}>
          <CustomImage
            source={{uri: singleItem.media_url}}
            style={[
              styles.cardImg,
              {
                width: cardWidth,
                height: cardWidth,
              },
            ]}
          />
        </View>
      );
    }
    if (type === 'movieCard') {
      const parseData = JSON.parse(singleItem.content);
      return (
        <View style={styles.item} key={singleItem._id}>
          <CustomImage
            source={{
              uri: 'https://image.tmdb.org/t/p/w500/' + parseData.poster_path,
            }}
            style={[
              styles.img,
              {
                width: cardWidth,
                height: (cardWidth / 25) * 36,
              },
            ]}
          />
        </View>
      );
    }
    const music = JSON.parse(singleItem.content);
    return (
      <View style={styles.item} key={singleItem._id}>
        <ImageBackground
          defaultSource={require('../../Assets/Image/default.png')}
          source={{uri: music.image}}
          style={[
            styles.bg,
            {
              width: cardWidth,
              height: (cardWidth / 25) * 36,
            },
          ]}
          resizeMode="cover">
          <View style={styles.transparent} />
          <CustomImage
            source={{uri: music.image}}
            style={[
              styles.img,
              {
                width: cardWidth - 52,
                height: cardWidth - 52,
                borderRadius: (cardWidth - 52) / 2,
              },
            ]}
          />
          <CustomText.TitleText style={[styles.name, styles.font11]}>
            {music.name}
          </CustomText.TitleText>
          <CustomText.TitleText style={[styles.artist, styles.font11]}>
            {music.artist}
          </CustomText.TitleText>
        </ImageBackground>
      </View>
    );
  };

  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  return (
    <View style={styles.wrap}>
      {type === 'likeBack' && (
        <>
          <CustomImage
            style={[
              styles.img,
              {
                width: imgWidth,
                height: imgWidth,
              },
            ]}
            source={{uri: S3_MAIN_URL + target.user_id + '.jpg'}}
          />
          <View style={styles.linear}>
            <View>
              <Text numberOfLines={1} style={styles.linearName}>
                {target.first_name}
              </Text>
              <Text numberOfLines={1} style={styles.linearLocation}>
                {likeContent.message !== '' ? 'Commented' : 'Liked'}{' '}
                {renderText()}
              </Text>
            </View>
          </View>
        </>
      )}
      {type === 'image' && (
        <>
          <CustomImage
            style={[
              styles.img,
              {
                width: imgWidth,
                height: imgWidth,
              },
            ]}
            source={{uri: card}}
          />
        </>
      )}
      {type === 'insta' && (
        <>
          <CustomImage
            style={[
              styles.img,
              {
                width: imgWidth,
                height: imgWidth,
              },
            ]}
            source={{uri: card}}
          />
        </>
      )}
      {type === 'instaCard' && posts && (
        <>
          <PagerView
            ref={pagerRef}
            style={[
              {
                width: screenWidth - 80,
                height: cardWidth,
              },
            ]}
            initialPage={0}
            onPageScroll={onPageScroll}>
            {posts.map((item, index) => (
              <View style={styles.itemWrap} key={index}>
                {item.map((singleItem, i) => renderItem(singleItem, i, index))}
              </View>
            ))}
          </PagerView>
        </>
      )}
      {type === 'imageCard' && (
        <>
          <CustomImage
            style={[
              styles.img,
              {
                width: imgWidth,
                height: imgWidth,
              },
            ]}
            source={{uri: S3_PHOTO_URL + card.content.image_id + '.jpg'}}
          />
        </>
      )}
      {type === 'movie' && (
        <View style={styles.movie}>
          <CustomImage
            style={[
              styles.movieImg,
              {
                width: movieWidth,
                height: movieHeight,
              },
            ]}
            source={{
              uri:
                'https://image.tmdb.org/t/p/w500/' +
                JSON.parse(card.content).poster_path,
            }}
          />
        </View>
      )}
      {type === 'movieCard' && posts && (
        <>
          <PagerView
            ref={pagerRef}
            style={[
              {
                width: screenWidth - 80,
                height: (cardWidth / 25) * 36,
              },
            ]}
            initialPage={0}
            onPageScroll={onPageScroll}>
            {posts.map((item, index) => (
              <View style={styles.itemWrap} key={index}>
                {item.map((singleItem, i) => renderItem(singleItem, i, index))}
              </View>
            ))}
          </PagerView>
        </>
      )}
      {type === 'hobbies' && (
        <View style={[styles.footer, {width: imgWidth}]}>
          <View style={styles.content}>
            <CustomText.TitleText style={[styles.title, styles.promptText]}>
              Hobbies
            </CustomText.TitleText>
            <CustomText.RegularText style={[styles.text, styles.promptText]}>
              {card.content}
            </CustomText.RegularText>
          </View>
        </View>
      )}
      {type === 'prompt' && (
        <View style={[styles.footer, {width: imgWidth}]}>
          <View style={styles.content}>
            <CustomText.TitleText style={[styles.title, styles.promptText]}>
              {JSON.parse(card.content).question}
            </CustomText.TitleText>
            {JSON.parse(card.content).image && (
              <CustomImage
                style={[styles.img, styles.miniImg]}
                source={{
                  uri: S3_PROMPT_URL + JSON.parse(card.content).image + '.jpg',
                }}
              />
            )}
            {JSON.parse(card.content).voice && (
              <View style={styles.row}>
                <View style={styles.bar}>
                  {currentVoice ===
                    S3_PROMPT_VOICE_URL +
                      JSON.parse(card.content).voice +
                      '.m4a' && (
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
                <TouchableOpacity
                  style={styles.play}
                  onPress={() => {
                    togglePlay(
                      S3_PROMPT_VOICE_URL +
                        JSON.parse(card.content).voice +
                        '.m4a',
                      parseInt(JSON.parse(card.content).duration, 10) * 1000,
                    );
                  }}>
                  {playerLoader &&
                  currentVoice ===
                    S3_PROMPT_VOICE_URL +
                      JSON.parse(card.content).voice +
                      '.m4a' ? (
                    <LottieView
                      source={require('../../Assets/Animation/player.json')}
                      autoPlay
                      loop
                      style={styles.loader}
                    />
                  ) : isPlay &&
                    currentVoice ===
                      S3_PROMPT_VOICE_URL +
                        JSON.parse(card.content).voice +
                        '.m4a' ? (
                    <PauseIcon
                      width={17}
                      height={17}
                      color={AppColors.MainColor}
                    />
                  ) : (
                    <PlayIcon
                      width={17}
                      height={17}
                      color={AppColors.MainColor}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <CustomText.RegularText style={[styles.text, styles.promptText]}>
              {JSON.parse(card.content).answer}
            </CustomText.RegularText>
          </View>
        </View>
      )}
      {type === 'music' && (
        <View style={styles.movie}>
          <ImageBackground
            defaultSource={require('../../Assets/Image/default.png')}
            source={{uri: JSON.parse(card.content).image}}
            style={[
              styles.bg,
              {
                width: movieWidth,
                height: (movieWidth / 25) * 36,
              },
            ]}
            resizeMode="cover">
            <View style={styles.transparent} />
            <CustomImage
              source={{uri: JSON.parse(card.content).image}}
              style={[
                styles.musicImg,
                {
                  width: movieWidth - 70,
                  height: movieWidth - 70,
                  borderRadius: (movieWidth - 70) / 2,
                },
              ]}
            />
            <CustomText.TitleText style={styles.name}>
              {JSON.parse(card.content).name}
            </CustomText.TitleText>
            <CustomText.TitleText style={styles.artist}>
              {JSON.parse(card.content).artist}
            </CustomText.TitleText>
          </ImageBackground>
        </View>
      )}
      {type === 'musicCard' && posts && (
        <>
          <PagerView
            ref={pagerRef}
            style={[
              {
                width: screenWidth - 80,
                height: (cardWidth / 25) * 36,
              },
            ]}
            initialPage={0}
            onPageScroll={onPageScroll}>
            {posts.map((item, index) => (
              <View style={styles.itemWrap} key={index}>
                {item.map((singleItem, i) => renderItem(singleItem, i, index))}
              </View>
            ))}
          </PagerView>
        </>
      )}
      {type === 'voice-intro' && (
        <ProfileImage
          likeModal={true}
          noBlur={noBlur}
          profile={target}
          page={page}
          setPage={setPage}
          userData={userData}
          audioCard={card}
          togglePlay={togglePlay}
          isPlay={isPlay}
          currentVoice={currentVoice}
          playerLoader={playerLoader}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    borderRadius: 8,
  },
  miniImg: {
    marginHorizontal: 12,
    marginBottom: 12,
    width: 120,
    height: 160,
  },
  itemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cardImg: {
    borderRadius: 4,
    marginBottom: 24,
  },
  footer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  promptText: {
    marginHorizontal: 14,
    marginBottom: 14,
  },
  content: {
    paddingVertical: 26,
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  movieImg: {
    borderRadius: 8,
  },
  movie: {
    alignItems: 'center',
  },
  bg: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  name: {
    fontSize: 15,
    color: Colors.white,
    lineHeight: 27,
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: Colors.white,
    lineHeight: 25,
    fontFamily: 'Poppins-Light',
    marginBottom: 18,
  },
  transparent: {
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.black + 'AD',
  },
  linear: {
    backgroundColor: AppColors.white,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    paddingHorizontal: 22,
    paddingBottom: 15,
    paddingTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  linearName: {
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    marginBottom: 1,
    fontSize: 16,
    lineHeight: 23,
  },
  linearLocation: {
    color: AppColors.AppBlack + 'CC',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  font11: {
    fontSize: 11,
  },
  bar: {
    backgroundColor: '#A2E3F5B3',
    borderRadius: 12,
    height: 5,
    width: '100%',
    flex: 1,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    paddingHorizontal: 10,
  },
  play: {
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4.22,
    elevation: 3,
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
});

export default LikedItem;
