import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { scale, verticalScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.blue.light,
    borderRadius: scale(12),
    padding: scale(16),
    minHeight: verticalScale(70),
  },
  iconContainer: {
    width: scale(48),
    height: scale(48),
    backgroundColor: colors.blue.medium,
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(16),
  },
  icon: {
    fontSize: 24,
  },
  chapterTitle: {
    fontSize: 18,
    color: colors.black,
    flex: 1,
  },
});

