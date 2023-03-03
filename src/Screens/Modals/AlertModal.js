import React, {useState, useEffect, FunctionComponent} from 'react';

import {TouchableOpacity, StyleSheet, View, Animated} from 'react-native';

import Colors from '../../Utils/Colors';

const AlertModal: FunctionComponent = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideBottom] = useState(new Animated.Value(-100));

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
      <TouchableOpacity
        style={styles.bg}
        onPress={() => {
          if (!props.disableDismiss) {
            props.hide();
          }
        }}
      />
      <Animated.View
        style={[
          styles.innerContainer,
          {
            bottom: slideBottom,
          },
        ]}>
        <View>{props.children}</View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,9,20,0.32)',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    margin: 27,
  },
});

export default AlertModal;
