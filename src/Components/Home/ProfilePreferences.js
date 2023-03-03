import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

import Colors from '../../Utils/Colors';
import AppColors from '../../Utils/AppColors';

import EditIcon from '../../Assets/Svg/EditIcon';
import JobIcon from '../../Assets/Svg/JobIcon';
import EducationIcon from '../../Assets/Svg/EducationIcon';
import Education from '../../Assets/Svg/New/Education';
import HomeTown from '../../Assets/Svg/New/HomeTown';
import Cake from '../../Assets/Svg/New/Cake';
import PreferenceRender from './PreferenceRender';
import {useAppContent} from '../../Providers/AppContentProvider';
import {useAuth} from '../../Providers/AuthProvider';

const ProfilePreferences = ({userInfo, stopIntroPlayer}) => {
  const navigation = useNavigation();
  const {contents} = useAppContent();
  const {userData} = useAuth();

  const occupation =
    userInfo.user_info['Credentials'] &&
    userInfo.user_info['Credentials']['Occupation'];
  const school =
    userInfo.user_info['Credentials'] &&
    userInfo.user_info['Credentials']['School'];
  const city =
    userInfo.user_info['Credentials'] &&
    userInfo.user_info['Credentials']['Hometown'];
  const educationLevel =
    userInfo.user_info['Credentials'] &&
    userInfo.user_info['Credentials']['Education level'];

  const multiItem = (item, text) => {
    const obj = JSON.parse(item.value);
    let val = '';
    let first = true;
    Object.entries(obj).forEach(([key, value]) => {
      let sep = first ? '' : ', ';
      if (value !== '') {
        val += sep + value;
      }
      first = false;
    });
    if (val !== '') {
      return val;
    }
    return text;
  };
  return (
    <>
      {userInfo.user_id === userData.user_id ? (
        <View style={styles.wrap}>
          <View style={styles.innerWrap}>
            <View style={styles.item}>
              <JobIcon width={20} height={15} color={Colors.MainColor + 'CC'} />
              <Text style={styles.value}>
                {occupation && !!occupation.value
                  ? multiItem(occupation, 'No occupation...')
                  : 'No occupation...'}
              </Text>
            </View>
            <View style={styles.item}>
              <EducationIcon
                width={20}
                height={15}
                color={Colors.MainColor + 'CC'}
              />
              <Text style={styles.value}>
                {school && !!school.value
                  ? multiItem(school, 'No school...')
                  : 'No school...'}
              </Text>
            </View>
            <View style={styles.item}>
              <Education
                width={20}
                height={15}
                color={Colors.MainColor + 'CC'}
              />
              <Text style={styles.value}>
                {educationLevel && !!educationLevel.value
                  ? educationLevel.value
                  : 'No education level...'}
              </Text>
            </View>
            <View style={styles.item}>
              <HomeTown
                width={20}
                height={16}
                color={Colors.MainColor + 'CC'}
              />
              <Text style={styles.value}>
                {city && !!city.value
                  ? multiItem(city, 'No hometown...')
                  : 'No hometown...'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => {
                stopIntroPlayer && stopIntroPlayer();
                navigation.navigate('Information');
              }}>
              <EditIcon
                width={17}
                height={17}
                color={AppColors.AppBlack + 'CC'}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ((!!occupation && occupation.visible) ||
          (!!school && school.visible) ||
          (!!educationLevel &&
            educationLevel.visible &&
            !!educationLevel.value) ||
          (!!city && city.visible)) && (
          <View style={styles.wrap}>
            <View style={styles.innerWrap}>
              {occupation && occupation.visible && (
                <View style={styles.item}>
                  <JobIcon
                    width={20}
                    height={15}
                    color={Colors.MainColor + 'CC'}
                  />
                  <Text style={styles.value}>{multiItem(occupation)}</Text>
                </View>
              )}
              {school && !!school.value && school.visible && (
                <View style={styles.item}>
                  <EducationIcon
                    width={20}
                    height={15}
                    color={Colors.MainColor + 'CC'}
                  />
                  <Text style={styles.value}>{multiItem(school)}</Text>
                </View>
              )}
              {educationLevel &&
                !!educationLevel.value &&
                educationLevel.visible && (
                  <View style={styles.item}>
                    <Education
                      width={20}
                      height={15}
                      color={Colors.MainColor + 'CC'}
                    />
                    <Text style={styles.value}>{educationLevel.value}</Text>
                  </View>
                )}
              {city && city.visible && (
                <View style={styles.item}>
                  <HomeTown
                    width={20}
                    height={18}
                    color={Colors.MainColor + 'CC'}
                  />
                  <Text style={styles.value}>{multiItem(city)}</Text>
                </View>
              )}
            </View>
          </View>
        )
      )}
      <View style={styles.wrap}>
        <ScrollView
          contentContainerStyle={styles.containerStyle}
          style={styles.scroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.horizontalItem}>
            <Cake width={16} height={16} color={Colors.black} />
            <Text numberOfLines={1} style={styles.itemValue}>
              {userInfo.date_of_birth instanceof Date
                ? dayjs().diff(dayjs(userInfo.date_of_birth), 'year')
                : dayjs().diff(dayjs(userInfo.date_of_birth['$date']), 'year')}
            </Text>
          </View>
          {contents
            .filter(
              (x) => x.type === 'info' && x.category_slug === 'Credentials',
            )
            .sort((a, b) => (a.priority < b.priority ? 1 : -1))
            .map((item, i) => (
              <PreferenceRender userInfo={userInfo} key={i} item={item} />
            ))}
          {contents
            .filter((x) => x.type === 'info' && x.category_slug === 'Primary')
            .sort((a, b) => (a.priority < b.priority ? 1 : -1))
            .map((item, i) => (
              <PreferenceRender userInfo={userInfo} key={i} item={item} />
            ))}
          {contents
            .filter((x) => x.type === 'info' && x.category_slug === 'Lifestyle')
            .sort((a, b) => (a.priority < b.priority ? 1 : -1))
            .map((item, i) => (
              <PreferenceRender userInfo={userInfo} key={i} item={item} />
            ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 14,
    marginBottom: 16,
    marginHorizontal: 12,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: '#797979',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.22,
    elevation: 3,
  },
  innerWrap: {
    paddingTop: 15,
  },
  edit: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    right: 12,
    bottom: 0,
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
  containerStyle: {
    paddingLeft: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 21,
  },
  value: {
    lineHeight: 23,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: AppColors.IconColor,
    marginLeft: 10,
  },
  scroll: {
    paddingTop: 15,
    paddingBottom: 2,
  },
  contentContainer: {
    paddingHorizontal: 21,
  },
  horizontalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    marginRight: 18,
  },
  itemValue: {
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginLeft: 8,
    marginRight: 10,
    color: AppColors.IconColor,
  },
});

export default ProfilePreferences;
