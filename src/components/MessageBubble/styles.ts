import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    marginVertical: scale(8),
    paddingHorizontal: scale(16),
  },
  questionContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  answerContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
  },
  questionBubble: {
    backgroundColor: colors.background,
  },
  answerBubble: {
    backgroundColor: colors.blue.highlight,
  },
  text: {
    fontSize: scale(16),
    lineHeight: scale(22),
  },
  questionText: {
    color: colors.black,
  },
  answerText: {
    color: colors.white,
  },
  iconButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(8),
  },
  audioButton: {
    backgroundColor: colors.background,
  },
  editButton: {
    backgroundColor: colors.background,
  },
  iconText: {
    fontSize: scale(16),
  },
});

