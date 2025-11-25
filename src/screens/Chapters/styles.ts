import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { scale, verticalScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  header: {
    marginBottom: verticalScale(30),
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(16),
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.black,
  },
  highlightedTextContainer: {
    borderBottomWidth: 4,
    borderBottomColor: colors.blue.highlight,
    paddingBottom: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  chaptersContainer: {
    gap: scale(16),
  },
});
