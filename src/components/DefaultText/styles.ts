import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  text: {
    color: colors.text.black,
    letterSpacing: 0,
  },
  regular: {},
  bold: {
    fontWeight: 'bold',
  },
  semiBold: {
    fontWeight: '600',
  },
  extraBold: {
    fontWeight: '800',
  },
  italic: {
    fontStyle: 'italic',
  },
  medium: {
    fontWeight: '500',
  },
  mediumItalic: {
    fontWeight: '500',
    fontStyle: 'italic',
  },
  semiBoldItalic: {
    fontWeight: '600',
    fontStyle: 'italic',
  },
  boldItalic: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  default: {},
});
