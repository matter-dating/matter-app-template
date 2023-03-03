import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {AutoDragSortableView} from 'react-native-drag-sort';
import Toast from '../../Assets/Package/react-native-toast-message';
import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';
import CustomText from '../../Components/Common/Text';
import CustomImage from '../../Components/Common/CustomImage';

import BackIcon from '../../Assets/Svg/BackIcon';
import AddIcon from '../../Assets/Svg/AddIcon';
import CardIcon from '../../Assets/Svg/CardIcon';
import ListIcon from '../../Assets/Svg/ListIcon';
import DotIcon from '../../Assets/Svg/DotIcon';
import {useAuth} from '../../Providers/AuthProvider';

import MovieCarousel from '../../Components/Movie/MovieCarousel';
import EditMovieModal from '../Modals/EditMovieModal';
const {width: screenWidth} = Dimensions.get('window');

function MyMovieScreen({route, navigation}) {
  const {type} = route.params;
  const insets = useSafeArea();
  const {userCards, deleteCard, userData, updateCardPriority} = useAuth();

  const [seeCarousel, setSeeCarousel] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const [moreVisible, setMoreVisible] = useState(false);
  const [card, setCard] = useState(null);

  const toggleView = () => {
    setSeeCarousel(!seeCarousel);
  };

  const deleteMovie = () => {
    Toast.show({
      position: 'top',
      type: 'notif',
      text1:
        type === 'movie'
          ? JSON.parse(card.content).title
          : JSON.parse(card.content).name,
      text2: 'Is deleted your list',
      topOffset: 0,
      visibilityTime: 2000,
    });
    deleteCard(card);
  };
  const hideModal = () => {
    setCard(null);
    setMoreVisible(false);
  };

  const clickEditIcon = (item) => {
    setCard(item);
    setMoreVisible(true);
  };

  const changePriority = (data) => {
    let priority_idx = 0;
    data.forEach((d) => {
      updateCardPriority(d._id, priority_idx);
      priority_idx = priority_idx + 1;
    });
  };

  const renderItem = (item, index) => {
    const movie = JSON.parse(item.content);
    return (
      <View key={index} style={styles.itemWrap}>
        <Text style={styles.itemNumber}>{index + 1}</Text>
        <View style={styles.item}>
          <CustomImage
            source={{
              uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
            }}
            style={styles.img}
          />
          <View style={styles.flex}>
            <CustomText.TitleText numberOfLines={1} style={styles.name}>
              {type === 'movie' ? movie.title : movie.name}
            </CustomText.TitleText>
            <CustomText.RegularText numberOfLines={1} style={styles.movieText}>
              Director: {movie.director}
            </CustomText.RegularText>
            <CustomText.RegularText numberOfLines={1} style={styles.movieText}>
              Starring: {movie.cast}
            </CustomText.RegularText>
          </View>
          <TouchableOpacity
            onPress={() => clickEditIcon(item)}
            style={styles.edit}>
            <DotIcon color={AppColors.black} width={12} height={12} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <CustomText.TitleText style={styles.title}>
            My favorite {type === 'movie' ? 'films' : 'TV shows'}
          </CustomText.TitleText>
          <View style={styles.empty} />
        </View>
        <CustomText.RegularText style={styles.description}>
          {userCards.filter((c) => c.type === type).length > 0
            ? 'Tap on cards to edit'
            : type === 'movie'
            ? 'You can add up to 15 films'
            : 'You can add up to 15 TV shows'}
        </CustomText.RegularText>
      </View>
      {userCards.filter((c) => c.type === type).length > 0 && (
        <View style={styles.toggleWrap}>
          <View style={styles.emptyToggle} />
          {!seeCarousel && (
            <Text style={styles.rearrange}>Press and hold to rearrange</Text>
          )}
          <TouchableOpacity style={styles.toggle} onPress={toggleView}>
            {seeCarousel ? (
              <ListIcon color={AppColors.MainColor} width={16} height={18} />
            ) : (
              <CardIcon color={AppColors.MainColor} width={16} height={18} />
            )}
          </TouchableOpacity>
        </View>
      )}
      {seeCarousel ? (
        <View style={styles.carousel}>
          <View>
            <MovieCarousel
              firstItem={activeSlide}
              data={userCards
                .filter((c) => c.type === type)
                .sort((a, b) => (a.priority < b.priority ? -1 : 1))}
              itemWidth={screenWidth - 150}
              setActiveSlide={setActiveSlide}
              clickEditIcon={clickEditIcon}
              userData={userData}
              userInfo={userData}
            />
          </View>
        </View>
      ) : (
        <AutoDragSortableView
          childrenHeight={143}
          showsVerticalScrollIndicator={false}
          childrenWidth={screenWidth - 24}
          parentWidth={screenWidth}
          onDataChange={(data) => changePriority(data)}
          dataSource={userCards
            .filter((c) => c.type === type)
            .sort((a, b) => (a.priority < b.priority ? -1 : 1))}
          keyExtractor={(item, index) => 'key' + index.toString()}
          renderItem={(item, index) => {
            return renderItem(item, index);
          }}
        />
      )}

      <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMain]}
          onPress={() => navigation.navigate('CreateMovie', {type: type})}>
          <AddIcon color={AppColors.white} width={20} height={20} />
          <Text style={[styles.buttonText, styles.whiteText]}>
            Add a {type === 'movie' ? 'films' : 'show'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Save & Close</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={moreVisible}>
        <EditMovieModal
          card={card}
          deleteMovie={deleteMovie}
          hide={hideModal}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.colorF56,
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
    marginRight: 31,
  },
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  title: {
    fontSize: 14,
  },
  emptyToggle: {
    width: 42,
    height: 42,
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 21,
    marginBottom: 10,
  },
  rearrange: {
    fontSize: 12,
    lineHeight: 18,
    color: AppColors.AppBlack + '80',
    fontFamily: 'Poppins-Regular',
  },
  toggle: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21,
    backgroundColor: AppColors.white,
    shadowColor: '#02346F',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
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
    fontSize: 12,
    color: AppColors.AppBlack + 'B8',
  },
  button: {
    backgroundColor: AppColors.button,
    margin: 20,
    marginTop: 0,
    padding: 14,
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonMain: {
    backgroundColor: AppColors.MainColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: AppColors.AppBlack,
  },
  whiteText: {
    color: AppColors.white,
    marginLeft: 9,
  },
  carousel: {
    flex: 1,
    justifyContent: 'center',
  },
  itemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 18,
    paddingRight: 20,
    width: screenWidth,
  },
  itemNumber: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: AppColors.AppBlack + '94',
    width: 20,
  },
  item: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 105,
    borderRadius: 4,
    marginRight: 20,
  },
  name: {
    lineHeight: 23,
    marginRight: 24,
  },
  movieText: {
    marginTop: 6,
    fontFamily: 'Poppins-Light',
    lineHeight: 21,
    fontSize: 14,
  },
  edit: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingTop: 14,
    padding: 16,
  },
});

export default MyMovieScreen;
