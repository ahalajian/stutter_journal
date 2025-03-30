import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Layout styles
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },

  // Text styles
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  label: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },

  // Input styles
  conversationInput: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    textAlignVertical: 'top',
    marginRight: 8,
  },
  stuckWordInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    marginRight: 8,
  },

  //stuck word styles
  wordBubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  wordsRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  stuckWordsSection: {
    marginBottom: 12,
  },
  stuckWordsScrollView: {
    maxHeight: 67,
    marginBottom: 12,
  },
});
