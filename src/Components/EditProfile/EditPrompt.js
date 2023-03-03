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
import Toast from '../../Assets/Package/react-native-toast-message';

import {useAppContent} from '../../Providers/AppContentProvider';
import {useAuth} from '../../Providers/AuthProvider';
import CustomImage from '../Common/CustomImage';
import {S3_PROMPT_URL} from '../../Utils/Constants';

import AppColors from '../../Utils/AppColors';
import EditIcon from '../../Assets/Svg/EditIcon';
import PlayIcon from '../../Assets/Svg/PlayBigIcon';
import PauseIcon from '../../Assets/Svg/PauseIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import EditPromptModal from '../../Screens/Modals/EditPromptModal';
import {S3_PROMPT_VOICE_URL} from '../../Utils/Constants';

const EditPrompt = ({
  userCards,
  stopIntroPlayer,
  fillValue,
  togglePlay,
  isPlay,
  currentVoice,
  playerLoader,
}) => {
  const navigation = useNavigation();
  const [promptCards, setPromptCards] = useState(
    userCards.filter(
      (c) =>
        c.type === 'prompt' ||
        c.type === 'image_prompt' ||
        c.type === 'voice_prompt',
    ),
  );
  const {contents} = useAppContent();
  const {deleteCard} = useAuth();

  const [questions, setQuestions] = useState(null);
  const [question, setQuestion] = useState(null);

  const [moreVisible, setMoreVisible] = useState(false);
  const [card, setCard] = useState(null);
  const [editPrompt, setEditPrompt] = useState(null);

  useEffect(() => {
    setPromptCards(
      userCards.filter(
        (c) =>
          c.type === 'prompt' ||
          c.type === 'image_prompt' ||
          c.type === 'voice_prompt',
      ),
    );
  }, [userCards]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setQuestion(questions[0]);
    }
  }, [questions]);

  useEffect(() => {
    if (promptCards.length === 0) {
      setQuestions(contents.filter((c) => c.type === 'prompt'));
    }
  }, [promptCards]);

  const hideModal = () => {
    setCard(null);
    setEditPrompt(null);
    setMoreVisible(false);
  };
  const clickEditIcon = (prompt, item) => {
    setCard(item);
    setEditPrompt(prompt);
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
    deleteCard(card);
  };
  const widthAnimation = fillValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const renderItem = (item, index) => {
    if (item) {
      const prompt = JSON.parse(item.content);
      return (
        <View
          style={[styles.item, !!prompt.voice && styles.voiceItem]}
          key={item._id}>
          <Text style={styles.itemTitle}>{prompt.question}</Text>
          <Text
            style={[promptCards.length > 0 ? styles.text : styles.emptyText]}>
            {prompt.answer}
          </Text>
          {prompt.image && (
            <CustomImage
              style={styles.img}
              source={{uri: S3_PROMPT_URL + prompt.image + '.jpg'}}
            />
          )}
          {prompt.voice && (
            <View style={styles.row}>
              <View style={styles.bar}>
                {currentVoice ===
                  S3_PROMPT_VOICE_URL + prompt.voice + '.m4a' && (
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
                    S3_PROMPT_VOICE_URL + prompt.voice + '.m4a',
                    parseInt(prompt.duration, 10) * 1000,
                  );
                }}>
                {playerLoader &&
                currentVoice === S3_PROMPT_VOICE_URL + prompt.voice + '.m4a' ? (
                  <LottieView
                    source={require('../../Assets/Animation/player.json')}
                    autoPlay
                    loop
                    style={styles.loader}
                  />
                ) : isPlay &&
                  currentVoice ===
                    S3_PROMPT_VOICE_URL + prompt.voice + '.m4a' ? (
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
              <TouchableOpacity
                style={styles.play}
                onPress={() => {
                  stopIntroPlayer();
                  clickEditIcon(prompt, item);
                }}>
                <EditIcon width={17} height={17} color={AppColors.MainColor} />
              </TouchableOpacity>
            </View>
          )}
          {!prompt.voice && (
            <TouchableOpacity
              style={styles.edit}
              onPress={() => {
                stopIntroPlayer();
                clickEditIcon(prompt, item);
              }}>
              <EditIcon
                width={17}
                height={17}
                color={AppColors.AppBlack + 'CC'}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return <></>;
  };
  return (
    <View>
      {promptCards.length > 0 ? (
        promptCards.map((item, i) => renderItem(item, i))
      ) : (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>
            {!!question && question.question}
          </Text>
          <Text
            style={[promptCards.length > 0 ? styles.text : styles.emptyText]}>
            Answer this prompt!
          </Text>
          <TouchableOpacity
            style={styles.edit}
            onPress={() => {
              stopIntroPlayer();
              navigation.navigate('CreatePrompt', {
                item: question,
                card: null,
                edit: false,
              });
            }}>
            <AddIcon color={AppColors.AppBlack + 'B3'} width={17} height={17} />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          stopIntroPlayer();
          navigation.navigate('SelectPrompt');
        }}>
        <AddIcon width={20} height={20} color={AppColors.white} />
        <Text style={styles.buttonText}>Add more prompts!</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditPromptModal
          card={card}
          editPrompt={editPrompt}
          deletePrompt={deletePrompt}
          hide={hideModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    paddingBottom: 50,
    paddingTop: 25,
    paddingHorizontal: 16,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  voiceItem: {
    paddingBottom: 0,
  },
  button: {
    marginTop: 20,
    marginBottom: 28,
    marginHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColors.MainColor,
    borderRadius: 8,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Medium',
    color: AppColors.white,
    marginLeft: 10,
  },
  img: {
    width: 122,
    height: 142,
    borderRadius: 8,
    marginTop: 15,
  },
  itemTitle: {
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
  emptyText: {
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 25,
    color: AppColors.AppBlack + 'CC',
    fontSize: 14,
  },
  edit: {
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
    marginBottom: 30,
    alignItems: 'center',
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

export default EditPrompt;
