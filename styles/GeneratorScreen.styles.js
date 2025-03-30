import { StyleSheet } from 'react-native';
import { globalStyles } from './global.styles';

export const styles = {
  ...globalStyles,
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
