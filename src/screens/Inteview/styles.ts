import { colors } from '../../utils/colors';
import { StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    backgroundColor: colors.background,
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    marginBottom: scale(10),
  },
  description: {
    fontSize: scale(16),
    marginBottom: scale(20),
    textAlign: 'center',
  },
});
