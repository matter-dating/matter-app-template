import React, {useState, useEffect} from 'react';

import {
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  View,
  Animated,
  ScrollView,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import {useAppContent} from '../../Providers/AppContentProvider';

function BrowseTipsModal({showedTips, hide, addItem}) {
  const {t} = useTranslation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));
  const insets = useSafeArea();
  const [category, setCategory] = useState(null);
  const [textTIPS, setTextTIPS] = useState([{}]);
  const [cats, setCats] = useState(null);
  const {miscs, contents} = useAppContent();
  const shuffle = (tips) => {
    return tips.sort(() => 0.5 - Math.random());
  };
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(slideBottom, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (contents && contents.length > 0) {
      let audioIntroTextTips = contents.filter((c) => c.type === 'tips_text');
      setTextTIPS(shuffle(audioIntroTextTips));
    }
  }, [contents]);
  useEffect(() => {
    if (miscs && miscs.length > 0) {
      // setCats(miscs.filter((c) => c.type === 'prompt')[0].slug_list);
      setCats(miscs.filter((c) => c.type === 'voice_intro')[0].slug_list);
    }
  }, [miscs]);

  useEffect(() => {
    if (category) {
      var q = contents.filter((c) => c.type === 'tips_text');
      setTextTIPS(q.filter((c) => c.category_slug === category));
    } else {
      setTextTIPS(contents.filter((c) => c.type === 'tips_text'));
    }
  }, [category]);

  const renderCategory = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.catItem, category === item && styles.activeItem]}
        onPress={() =>
          category === item ? setCategory(null) : setCategory(item)
        }>
        <Text style={styles.catName}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => {
    let elIndex = showedTips.findIndex((el) => el === item);
    if (elIndex < 0) {
      return (
        <TouchableOpacity
          onPress={() => {
            addItem(item);
          }}
          style={styles.item}
          key={index}>
          <Text style={styles.question}>{item.question}</Text>
        </TouchableOpacity>
      );
    }
  };
  return (
    <Animated.View
      style={[styles.container, {opacity: fadeAnim, bottom: slideBottom}]}>
      <View style={[styles.wrap, {paddingBottom: insets.bottom}]}>
        <View style={[styles.header, {paddingTop: insets.top + 16}]}>
          <View style={styles.empty} />
          <View>
            <Text style={styles.title}>{t('BrowsePrompt.Title')}</Text>
          </View>
          <TouchableOpacity style={styles.back} onPress={hide}>
            <DeleteIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.carousel}>
          <ScrollView
            horizontal
            contentContainerStyle={styles.contentContainer}
            showsHorizontalScrollIndicator={false}>
            {cats && cats.map((item, i) => renderCategory(item, i))}
          </ScrollView>
        </View>
        <FlatList
          data={textTIPS}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          keyExtractor={(item, index) => 'key' + index.toString()}
          renderItem={(item, index) => {
            return renderItem(item, index);
          }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 15,
    flex: 1,
  },
  empty: {
    width: 45,
  },
  back: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    backgroundColor: AppColors.white,
    flex: 1,
  },
  question: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
    textAlign: 'center',
    color: AppColors.black,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    borderBottomWidth: 0.4,
    borderColor: AppColors.AppBlack + '40',
    paddingVertical: 20,
    paddingHorizontal: 38,
  },
  catItem: {
    backgroundColor: '#C4EAF5',
    marginHorizontal: 6,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: '#E9F2F5',
  },
  carousel: {
    marginTop: 20,
  },
  catName: {
    lineHeight: 20,
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize',
    color: AppColors.black,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default BrowseTipsModal;
