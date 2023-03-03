import React, {useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import AppColors from '../../Utils/AppColors';
import CustomImage from '../Common/CustomImage';
import {useAppFlag} from '../../Providers/AppFlagProvider';

const SelectStickers = ({
  setShowSticker,
  showSticker,
  suggestions,
  cats,
  category,
  setCategory,
  clickSendSticker,
}) => {
  const insets = useSafeArea();
  const scrollRef = useRef(null);
  const {checkFlag, setFlag} = useAppFlag();
  const renderSingle = ({item}) => {
    var aspectRatio = item.long_long_question.split(':');
    return (
      <TouchableOpacity
        style={styles.img}
        onPress={() => clickSendSticker(item)}>
        <CustomImage
          style={[
            styles.item,
            {
              height: (154 / aspectRatio[0]) * aspectRatio[1],
            },
          ]}
          source={{uri: item.question}}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (scrollRef && checkFlag('sticker_scroll_animation') === null) {
      scrollRef.current.scrollToIndex({
        animated: true,
        index: 1,
      });
      setTimeout(() => {
        scrollRef.current.scrollToIndex({
          animated: true,
          index: 0,
        });
      }, 300);
      setFlag('sticker_scroll_animation', 'true');
    }
  }, []);

  const renderCategory = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.catItem}
        onPress={() =>
          category === item ? setCategory(null) : setCategory(item)
        }>
        <Text style={[styles.catName, category === item && styles.activeItem]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrap}>
      <TouchableOpacity
        onPress={() => setShowSticker(false)}
        style={styles.bg}
      />
      <View style={[styles.absolute, {marginBottom: insets.bottom + 100}]}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Expressions</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cats && cats.map((item, i) => renderCategory(item, i))}
        </ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={suggestions}
          ref={scrollRef}
          renderItem={renderSingle}
          keyExtractor={(item) => item._id.toString()}
          getItemLayout={(data, index) => ({
            index,
            length: 154,
            offset: 154 * index,
          })}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  absolute: {
    backgroundColor: AppColors.white,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    marginTop: 'auto',
    zIndex: 12,
    height: 266,
    marginHorizontal: 20,
  },
  catItem: {
    marginHorizontal: 12,
    padding: 12,
  },
  activeItem: {
    color: AppColors.MainColor1,
  },
  catName: {
    lineHeight: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: AppColors.MainColor1 + '82',
    textTransform: 'capitalize',
  },
  titleWrap: {
    borderBottomWidth: 0.3,
    borderColor: '#45AECE',
    paddingVertical: 11,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#45AECEE0',
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 21,
  },
  item: {
    width: 154,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: 10,
  },
  img: {
    marginHorizontal: 10,
  },
});

export default SelectStickers;
