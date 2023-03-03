import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import SearchIcon from '../../Assets/Svg/SearchIcon';
import DeleteIcon from '../../Assets/Svg/DeleteIcon';
import Colors from '../../Utils/Colors';

const SearchBar = ({onChangeText}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current.focus();
  };

  const clear = () => {
    inputRef.current.clear();
    onChangeText('');
    onBlur();
    setIsEmpty(true);
  };

  const onFocus = () => {
    inputRef.current.focus();
    setHasFocus(true);
  };

  const onBlur = () => {
    setHasFocus(false);
  };

  const onChange = (text) => {
    onChangeText(text);
    setIsEmpty(text === '');
  };

  return (
    <TouchableWithoutFeedback onPress={focus}>
      <Animated.View style={styles.container}>
        <View style={styles.leftIconStyle}>
          <SearchIcon width={21} height={21} color={Colors.MainColor1 + '7A'} />
        </View>
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder="Search"
          style={styles.inputStyle}
          placeholderTextColor="#515151"
          autoCorrect={false}
          ref={inputRef}
        />
        <View style={styles.rightContainer}>
          {!isEmpty ? (
            <TouchableOpacity onPress={clear}>
              <View style={styles.rightIconStyle}>
                <DeleteIcon
                  width={21}
                  height={21}
                  color={Colors.MainColor1 + '7A'}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    marginBottom: 16,
  },
  inputStyle: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 12,
    color: Colors.MainColor1,
    height: 44,
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 16,
  },
  leftIconStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  rightIconStyle: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activityIndicator: {
    marginRight: 5,
  },
});

export default SearchBar;
