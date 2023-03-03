import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';

import BackIcon from '../../Assets/Svg/BackIcon';

import {useAppContent} from '../../Providers/AppContentProvider';

function SelectPromptScreen({navigation}) {
  const insets = useSafeArea();
  const [category, setCategory] = useState(null);
  const {miscs, contents} = useAppContent();
  const [cats, setCats] = useState(null);
  const [questions, setQuestions] = useState(
    contents.filter((c) => c.type === 'prompt'),
  );

  useEffect(() => {
    if (miscs && miscs.length > 0) {
      setCats(miscs.filter((c) => c.type === 'prompt')[0].slug_list);
    }
  }, [miscs]);

  useEffect(() => {
    if (category) {
      var q = contents.filter((c) => c.type === 'prompt');
      setQuestions(q.filter((c) => c.category_slug === category));
    } else {
      setQuestions(contents.filter((c) => c.type === 'prompt'));
    }
  }, [category]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() =>
          navigation.navigate('CreatePrompt', {
            item: item,
            card: null,
            edit: false,
          })
        }>
        <CustomText.RegularText style={styles.question}>
          {item.question}
        </CustomText.RegularText>
      </TouchableOpacity>
    );
  };

  const renderCategory = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.catItem, category === item && styles.activeItem]}
        onPress={() =>
          category === item ? setCategory(null) : setCategory(item)
        }>
        <CustomText.TitleText style={styles.catName}>
          {item}
        </CustomText.TitleText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.wrap, {paddingBottom: insets.bottom}]}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            Select a prompt
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        <View style={styles.carousel}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {cats && cats.map((item, i) => renderCategory(item, i))}
          </ScrollView>
        </View>
      </View>
      <FlatList
        data={questions}
        style={styles.list}
        keyExtractor={(item, index) => 'key' + index.toString()}
        renderItem={(item, index) => {
          return renderItem(item, index);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    paddingBottom: 8,
  },
  title: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  empty: {
    width: 24,
  },
  list: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.AppBlack + '4D',
    paddingVertical: 26,
    paddingHorizontal: 22,
  },
  question: {
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: AppColors.IconColor + 'F2',
  },
  catItem: {
    backgroundColor: '#F2F5FA',
    marginHorizontal: 8,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: Colors.white,
  },
  catName: {
    lineHeight: 20,
    fontSize: 14,
    textTransform: 'capitalize',
    color: AppColors.black,
  },
});

export default SelectPromptScreen;
