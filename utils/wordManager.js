import AsyncStorage from '@react-native-async-storage/async-storage';

const GLOBAL_WORDS_KEY = 'globalStuckWords';

export const addToGlobalWords = async (newWords) => {
  try {
    const existingWords = await getGlobalWords();
    const updatedWords = [...new Set([...existingWords, ...newWords])];
    await AsyncStorage.setItem(GLOBAL_WORDS_KEY, JSON.stringify(updatedWords));
  } catch (e) {
    console.error('Failed to add to global words:', e);
  }
};

export const getGlobalWords = async () => {
  try {
    const words = await AsyncStorage.getItem(GLOBAL_WORDS_KEY);
    return words ? JSON.parse(words) : [];
  } catch (e) {
    console.error('Failed to get global words:', e);
    return [];
  }
};
