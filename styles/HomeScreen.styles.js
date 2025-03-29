import { StyleSheet } from 'react-native';
import { globalStyles } from './global.styles';

export const styles = {
  ...globalStyles,
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  entryBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  entryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  entryLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
};
