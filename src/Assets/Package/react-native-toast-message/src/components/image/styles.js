import { StyleSheet } from 'react-native';
import colors from '../../colors';

export const HEIGHT = 97;

export default StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: HEIGHT,
    width: '100%',
    backgroundColor: '#5CC4E3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 5,
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  icon1: {
    width: 46,
    height: 46,
    marginHorizontal: -5,
    marginLeft: -12,
    borderRadius: 23,    
  },
  like: {
    position: 'absolute',
    bottom: 1,
    right: -3,
  },
  matchLike: {
    left: -16,
    right: 'auto',
    zIndex: 100,
  },
  text: {
    fontSize: 14,
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  body: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageBody: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flex: 1
  },
  messageStyle: {
    marginHorizontal: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  bodyText: {
    fontSize: 13,
    color: 'white',
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
  },
});
