import { StyleSheet } from 'react-native';
import { globalStyles } from './global.styles';

export const styles = {
  ...globalStyles,
  input: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    textAlignVertical: 'top',
  },
  stuckWordsSection: {
    marginBottom: 12,
  },
  stuckWordInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  stuckWordsList: {
    marginBottom: 12,
  },
};
