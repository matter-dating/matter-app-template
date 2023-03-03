import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Toast from '../../Assets/Package/react-native-toast-message';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';

import BackIcon from '../../Assets/Svg/BackIcon';
import {useAuth} from '../../Providers/AuthProvider';
import {useAppContent} from '../../Providers/AppContentProvider';

const maxLength = 150;

function CreateHobbiesScreen({navigation}) {
  const insets = useSafeArea();
  const {userCards, updateCard, createCard} = useAuth();
  const [content, setContent] = useState({});
  const [category, setCategory] = useState(null);
  const {miscs, contents} = useAppContent();
  const [cats, setCats] = useState(null);
  const [suggestions, setSuggestions] = useState(
    contents.filter((c) => c.type === 'hobby'),
  );
  const [item, setItem] = useState(userCards.filter((c) => c.type === 'hobby'));
  const [answer, setAnswer] = useState(item.length > 0 ? item[0].content : '');
  const [answerLength, setAnswerLength] = useState(
    answer ? maxLength - answer.length : 150,
  );

  useEffect(() => {
    if (category) {
      var q = contents.filter((c) => c.type === 'hobby');
      setSuggestions(q.filter((c) => c.category_slug === category));
    } else {
      setSuggestions(contents.filter((c) => c.type === 'hobby'));
    }
  }, [category]);

  useEffect(() => {
    if (answer) {
      setAnswerLength(maxLength - answer.length);
    }
    setContent({
      answer: answer,
    });
  }, [answer]);

  useEffect(() => {
    if (miscs && miscs.length > 0) {
      setCats(miscs.filter((c) => c.type === 'hobby')[0].slug_list);
    }
  }, [miscs]);

  const saveAnswer = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1:
        item.length > 0
          ? 'Your hobbies has been changed'
          : 'Your hobbies has been added',
      topOffset: 0,
      visibilityTime: 2000,
    });
    // ADD TO DB MARA
    if (item.length > 0) {
      updateCard(item[0], answer);
    } else {
      createCard('hobby', 'text', answer, false);
    }
    navigation.goBack();
  };

  const onChangeText = (text) => {
    setAnswer(text);
  };

  const clickSuggest = (text) => {
    if (text.length < answerLength) {
      if (answer.length > 0) {
        var ans = answer.concat(', ' + text);
      } else {
        var ans = answer.concat(text);
      }
    } else {
      var ans = answer;
    }
    setAnswer(ans);
  };

  // const renderCategory = (item, index) => {
  //   return (
  //     <TouchableOpacity key={index} style={[styles.catItem, category === item && styles.activeItem]} onPress={() => category === item ? setCategory(null) : setCategory(item)}>
  //       <CustomText.TitleText style={[styles.catName, { textTransform: 'capitalize'}]}>{item}</CustomText.TitleText>
  //     </TouchableOpacity>
  //   )
  // }

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            My hobbies
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        <CustomText.RegularText style={styles.description}>
          Please have
          <CustomText.RegularText style={styles.bold}>
            {' '}
            at least 2 hobbies
          </CustomText.RegularText>
        </CustomText.RegularText>
      </View>

      <View style={styles.list}>
        <View style={styles.item}>
          <CustomText.TitleText style={styles.question}>
            Hobbies
          </CustomText.TitleText>
          <View style={styles.answer}>
            <TextInput
              style={styles.input}
              value={answer}
              onChangeText={(text) => onChangeText(text)}
              multiline={true}
              numberOfLines={4}
              placeholderTextColor={Colors.MainColor + 'A3'}
              placeholder="Enter answer..."
              returnKeyType="done"
              blurOnSubmit={true}
              maxLength={maxLength}
            />
            <View style={styles.row}>
              <Text
                style={[styles.character, answerLength === 0 && styles.red]}>
                {answerLength} characters
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.subTitle}>Suggestions</Text>
        {/* <View style={styles.carousel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cats && cats.map((item, i) => renderCategory(item, i))}
          </ScrollView>
        </View> */}
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.suggestions}>
            {suggestions.map((suggestionitem) => (
              <TouchableOpacity
                style={styles.sugItem}
                key={suggestionitem._id}
                onPress={() => clickSuggest(suggestionitem.question)}>
                <CustomText.RegularText style={styles.sugText}>
                  {suggestionitem.question}
                </CustomText.RegularText>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity style={styles.button} onPress={saveAnswer}>
          <Text style={styles.buttonText}>Save & close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  title: {
    fontSize: 14,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor + 'D8',
    marginBottom: 16,
    marginHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    width: 24,
  },
  description: {
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: AppColors.button,
    margin: 20,
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
  list: {
    flex: 1,
  },
  item: {
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 18,
    paddingVertical: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 30,
    marginBottom: 52,
  },
  question: {
    lineHeight: 20,
    marginRight: 24,
    fontSize: 14,
  },
  answer: {
    backgroundColor: Colors.white,
    marginTop: 14,
  },
  character: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    color: AppColors.IconColor + '8C',
  },
  red: {
    color: Colors.red,
  },
  input: {
    height: 100,
    fontFamily: 'Poppins-LightItalic',
    lineHeight: 21,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    color: AppColors.IconColor + 'F2',
    textAlignVertical: 'top',
  },
  sugItem: {
    borderBottomColor: Colors.MainColor + '7A',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    marginHorizontal: 4,
    marginVertical: 10,
  },
  // catItem: {
  //   backgroundColor: AppColors.MainColor + '3D',
  //   marginHorizontal: 8,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   minWidth: 128,
  // },
  // activeItem: {
  //   backgroundColor: AppColors.backgroundColor1,
  // },
  // catName: {
  //   fontSize: 14,
  //   lineHeight: 20,
  // },
  scroll: {
    // marginTop: 10,
  },
  sugText: {
    color: AppColors.IconColor + 'D8',
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 6,
    // marginTop: 20,
  },
});

export default CreateHobbiesScreen;
