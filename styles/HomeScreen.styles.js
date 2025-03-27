import { StyleSheet } from 'react-native';
import { globalStyles } from './global.styles';

export const styles = {
  ...globalStyles,
  heading: {
    ...globalStyles.heading,
    textAlign: 'center',
  },
  entryBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  entryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  entryLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'flex-start',
  },
};
