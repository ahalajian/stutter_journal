import { StyleSheet } from 'react-native';
import { globalStyles } from './global.styles';

export const styles = {
  ...globalStyles,
  wordInputSection: {
    marginBottom: 12,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  wordsList: {
    marginBottom: 12,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  picker: {
    marginBottom: 20,
  },
  storyBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  storyText: {
    lineHeight: 24,
  },
};
