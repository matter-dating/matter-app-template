import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import {useAuth} from '../Providers/AuthProvider';
import AppColors from '../Utils/AppColors';
import BackIcon from '../Assets/Svg/BackIcon';

import EmptyScreen from '../Components/Empty/LikedYou';
import SingleLike from '../Components/LikedYou/SingleLike';
import {usePremium} from '../Providers/PremiumProvider';

function LikedYouScreen({navigation}) {
  const {userLikes} = useAuth();
  const insets = useSafeArea();
  const {isPremium, processPurchases} = usePremium();

  useEffect(() => {
    processPurchases();
  }, []);

  const profiles = userLikes
    .slice()
    .sort((a, b) => b.created_at - a.created_at);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <View style={styles.empty}>
            <TouchableOpacity
              style={styles.setting}
              onPress={() => {
                navigation.goBack();
              }}>
              <BackIcon
                width={24}
                height={24}
                color={AppColors.AppBlack + 'F0'}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Likes you</Text>
          <View style={styles.empty} />
        </View>
        {profiles.length > 0 && !isPremium && (
          <TouchableOpacity
            style={styles.premium}
            onPress={() => navigation.navigate('BenefitsModal', {start: 1})}>
            <View style={styles.premiumButton}>
              <Text style={styles.go}>Go Premium</Text>
            </View>
            <Text numberOfLines={1} style={styles.premiumText}>
              to see your likes all at once
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.main}>
        <FlatList
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
          data={profiles}
          renderItem={({item, index}) => (
            <SingleLike item={item} index={index} isPremium={isPremium} />
          )}
          keyExtractor={(item, index) => item.user_id}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={<EmptyScreen />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: AppColors.backgroundColor,
  },
  flex: {
    flex: 1,
  },
  flatList: {
    paddingVertical: 13,
  },
  main: {
    paddingHorizontal: 21,
    flex: 1,
  },
  header: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    lineHeight: 21,
  },
  empty: {
    width: 88,
  },
  premium: {
    backgroundColor: '#DFF1F7',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 27,
    marginHorizontal: 9,
  },
  premiumButton: {
    backgroundColor: AppColors.MainColor,
    borderRadius: 16,
    height: 28,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  go: {
    fontSize: 13,
    color: AppColors.white,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  premiumText: {
    fontSize: 13,
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    flex: 1,
  },
});

export default LikedYouScreen;
