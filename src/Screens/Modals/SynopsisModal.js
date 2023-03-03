import React, {useState, useRef, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import StarIcon from '../../Assets/Svg/StarIcon';

const SynopsisModal = ({detail, type, hide}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeArea();
  const slideBottom = useRef(new Animated.Value(-100)).current;

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
  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TouchableOpacity style={styles.bg} onPress={hide} />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
            paddingBottom: insets.bottom,
          },
        ]}>
        <View>
          <View style={styles.header}>
            <View style={styles.row}>
              <Text style={styles.title}>
                {type === 'movie' ? detail.title : detail.name}
              </Text>
              {detail.vote_average > 0 && (
                <View style={styles.rate}>
                  <StarIcon width={15} height={15} color={Colors.yellow} />
                  <Text style={styles.vote}>{detail.vote_average * 10}%</Text>
                </View>
              )}
              <TouchableOpacity style={styles.close} onPress={hide}>
                <DeleteIcon
                  color={Colors.white + 'CC'}
                  width={30}
                  height={30}
                />
              </TouchableOpacity>
            </View>
            {detail.director && (
              <Text style={styles.director}>Directed by {detail.director}</Text>
            )}
            {detail.cast && (
              <Text style={styles.director}>Starring: {detail.cast}</Text>
            )}
          </View>
          <View style={styles.body}>
            <Text style={styles.synopsis}>Summary</Text>
            <Text style={styles.text}>{detail.overview}</Text>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.MainColor1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: 'auto',
    left: 0,
    elevation: 3,
    zIndex: 3,
  },
  header: {
    padding: 18,
    borderBottomWidth: 0.5,
    borderColor: Colors.white,
  },
  row: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rate: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  close: {
    marginLeft: 'auto',
  },
  body: {
    padding: 18,
    paddingTop: 14,
  },
  synopsis: {
    color: Colors.white + '7A',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 25,
  },
  text: {
    color: Colors.white,
    fontFamily: 'Poppins-Light',
    fontSize: 15,
    lineHeight: 23,
    marginVertical: 6,
  },
  title: {
    flex: 1,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    lineHeight: 25,
    marginRight: 12,
    flexGrow: 3,
  },
  director: {
    color: Colors.white + 'B8',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  vote: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginHorizontal: 10,
  },
});

export default SynopsisModal;
