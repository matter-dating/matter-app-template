import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import {useAppContent} from '../Providers/AppContentProvider';
import {useAuth} from '../Providers/AuthProvider';

import Colors from '../Utils/Colors';
import AppColors from '../Utils/AppColors';
import CustomText from '../Components/Common/Text';
import PreferenceItem from '../Components/Profile/PreferenceItem';
import FullScreenLoader from '../Components/Common/FullScreenLoader';

import EditPreferenceModal from './Modals/EditPreferenceModal';
import ComingSoonModal from './Modals/ComingSoonModal';
import BackIcon from '../Assets/Svg/BackIcon';
import PadLockIcon from '../Assets/Svg/PadlockIcon';

function PreferencesScreen({navigation}) {
  const insets = useSafeArea();
  const {contents, miscs} = useAppContent();
  const {userData} = useAuth();
  const [onOff, setOnOff] = useState(null);
  const [loader, setLoader] = useState(true);

  //  miscs.filter(type === 'switch_flag')
  // miscs[0].slug_list[0] === ['preference_on', 'preference_off']

  const [editVisible, setEditVisible] = useState(false);
  const [comingVisible, setComingVisible] = useState(false);
  const [editInfo, setEditInfo] = useState(null);

  const hideModal = async (reported) => {
    setEditVisible(false);
    setComingVisible(false);
    setEditInfo(null);
  };

  useEffect(() => {
    if (
      miscs &&
      miscs.length > 0 &&
      miscs.filter((c) => c.type === 'switch_flag').length > 0
    ) {
      setOnOff(miscs.filter((c) => c.type === 'switch_flag')[0].slug_list[0]);
    }
  }, [miscs]);

  useEffect(() => {
    if (!!onOff) {
      setLoader(false);
    }
  }, [onOff]);

  useEffect(() => {
    if (editInfo) {
      setEditVisible(true);
    }
  }, [editInfo]);
  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <BackIcon width={24} height={24} color={Colors.MainColor} />
          </TouchableOpacity>
          <View>
            <CustomText.TitleText style={styles.title}>
              Your preferences
            </CustomText.TitleText>
            <Text style={styles.edit}>Tap to edit</Text>
          </View>
          <View style={styles.back} />
        </View>
      </View>
      <View style={styles.flex}>
        {loader ? (
          <FullScreenLoader />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.subHeader}>
              <Text style={styles.subTitle}>Primary</Text>
            </View>
            <View style={styles.itemList}>
              {contents
                .filter(
                  (x) =>
                    x.type === 'preference' && x.category_slug === 'Primary',
                )
                .sort((a, b) => (a.priority < b.priority ? 1 : -1))
                .map((item, i) => (
                  <PreferenceItem
                    onOff={'preference_on'}
                    setComingVisible={setComingVisible}
                    userInfo={userData}
                    key={i}
                    setEditInfo={setEditInfo}
                    editable={item.option_type !== 'location'}
                    item={item}
                    isEmpty={true}
                  />
                ))}
            </View>
            <View
              style={[
                styles.subHeader,
                onOff === 'preference_off' && styles.inActive,
              ]}>
              <Text style={styles.subTitle}>Secondary</Text>
              {onOff === 'preference_off' && (
                <View style={styles.lock}>
                  <PadLockIcon
                    width={14}
                    height={15}
                    color={AppColors.AppBlack + '52'}
                  />
                </View>
              )}
            </View>
            <View style={styles.itemList}>
              {contents
                .filter(
                  (x) =>
                    x.type === 'preference' &&
                    x.category_slug === 'SecondaryNew',
                )
                .sort((a, b) => (a.priority < b.priority ? 1 : -1))
                .map((item, i) => (
                  <PreferenceItem
                    onOff={onOff}
                    setComingVisible={setComingVisible}
                    userInfo={userData}
                    key={i}
                    setEditInfo={setEditInfo}
                    editable={item.option_type !== 'location'}
                    item={item}
                    isEmpty={true}
                  />
                ))}
            </View>
            <View
              style={[
                styles.subHeader,
                onOff === 'preference_off' && styles.inActive,
              ]}>
              <Text style={styles.subTitle}>Lifestyle</Text>
              {onOff === 'preference_off' && (
                <View style={styles.lock}>
                  <PadLockIcon
                    width={14}
                    height={15}
                    color={AppColors.AppBlack + '52'}
                  />
                </View>
              )}
            </View>
            <View style={[styles.itemList, {marginBottom: insets.bottom + 25}]}>
              {contents
                .filter(
                  (x) =>
                    x.type === 'preference' &&
                    x.category_slug === 'LifestyleNew',
                )
                .sort((a, b) => (a.priority < b.priority ? 1 : -1))
                .map((item, i) => (
                  <PreferenceItem
                    setComingVisible={setComingVisible}
                    onOff={onOff}
                    userInfo={userData}
                    key={i}
                    setEditInfo={setEditInfo}
                    editable={item.option_type !== 'location'}
                    item={item}
                    isEmpty={true}
                  />
                ))}
            </View>
          </ScrollView>
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={editVisible}>
        <EditPreferenceModal editInfo={editInfo} hide={hideModal} />
      </Modal>

      <Modal animationType="fade" transparent={true} visible={comingVisible}>
        <ComingSoonModal hide={hideModal} />
      </Modal>
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
    backgroundColor: Colors.colorF56,
    paddingHorizontal: 12,
    paddingBottom: 19,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  edit: {
    textAlign: 'center',
    color: AppColors.AppBlack,
    fontFamily: 'Poppins-Medium',
    marginTop: 7,
  },
  back: {
    width: 45,
    height: 45,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.MainColor1 + '29',
  },
  lock: {
    marginRight: 'auto',
    marginLeft: 7,
  },
  inActive: {
    opacity: 0.5,
  },
  subTitle: {
    lineHeight: 23,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1 + '80',
  },
  itemList: {
    marginBottom: 25,
  },
});

export default PreferencesScreen;
