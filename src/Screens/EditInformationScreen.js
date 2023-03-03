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
import CustomText from '../Components/Common/Text';
import ListItem from '../Components/Profile/ListItem';

import EditInformationModal from './Modals/EditInformationModal';

function EditInformationScreen({navigation, route}) {
  const insets = useSafeArea();
  const {contents} = useAppContent();
  const {type} = route.params;
  const {userData} = useAuth();

  const [editVisible, setEditVisible] = useState(false);
  const [infos, setInfos] = useState(
    contents.filter((x) => x.type === 'info' && x.category_slug === type),
  );
  const [editInfo, setEditInfo] = useState(null);

  const hideModal = (reported) => {
    setEditInfo(null);
    setEditVisible(false);
  };

  useEffect(() => {
    if (editInfo) {
      setEditVisible(true);
    }
  }, [editInfo]);

  return (
    <View style={styles.wrap}>
      <View style={[styles.header, {paddingTop: insets.top + 8}]}>
        <CustomText.TitleText style={styles.title}>
          Your Information
        </CustomText.TitleText>
      </View>
      <View style={styles.flex}>
        <ScrollView>
          <View style={styles.subHeader}>
            <Text style={styles.subTitle}>{type}</Text>
            <TouchableOpacity
              style={styles.done}
              onPress={() => navigation.goBack()}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemList}>
            {infos.map((item, i) => (
              <ListItem
                userInfo={userData}
                key={i}
                setEditInfo={setEditInfo}
                editable={item.option_type !== 'location'}
                item={item}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <Modal animationType="fade" transparent={true} visible={editVisible}>
        <EditInformationModal editInfo={editInfo} hide={hideModal} />
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
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
  },
  empty: {
    width: 24,
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
  subTitle: {
    lineHeight: 23,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.MainColor1 + '80',
  },
  itemList: {
    marginBottom: 25,
  },
  done: {
    paddingLeft: 20,
  },
  doneText: {
    color: Colors.blue,
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});

export default EditInformationScreen;
