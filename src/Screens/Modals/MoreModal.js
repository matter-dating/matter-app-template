import React, {useRef, useEffect, FunctionComponent} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';

import Colors from '../../Utils/Colors';

const MoreModal: FunctionComponent = (props) => {
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
      <TouchableOpacity style={styles.bg} onPress={props.hide} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <Animated.View
          style={[
            styles.innerContainer,
            {
              bottom: slideBottom,
              paddingBottom: insets.bottom,
            },
            props.borderLess && styles.borderLess,
          ]}>
          <View style={styles.wrapper}>{props.children}</View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,9,20,0.32)',
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    bottom: 0,
    width: '100%',
    paddingTop: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 'auto',
    left: 0,
    elevation: 3,
    zIndex: 3,
  },
  borderLess: {
    paddingTop: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default MoreModal;
