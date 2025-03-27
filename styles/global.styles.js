import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  entryLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  stuckWordBubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
});
