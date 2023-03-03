import { StyleSheet } from 'react-native';
import colors from '../../colors';

export const HEIGHT = 97;

export default StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: HEIGHT,
    width: '100%',
    backgroundColor: '#5CE3A5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alert: {
    backgroundColor: colors.alert,
  },
  error: {
    backgroundColor: colors.error,
  },
  borderLeft: {
    borderLeftWidth: 5,
    borderLeftColor: colors.alto
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
  text1: {
    fontSize: 14,
    lineHeight: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  text2: {
    fontSize: 13,
    lineHeight: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  empty: {
    width: 30,
  },
  touch: {
    // flex: 1,
  }
});
