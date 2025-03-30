import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/GeneratorScreen.styles';
import { CustomButton } from '../components/CustomButton';
import { KeyboardAwareView } from '../components/KeyboardAwareView';

export default function GeneratorScreen() {
  const [newWord, setNewWord] = useState('');
  const [wordsList, setWordsList] = useState([]);
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');

  const handleAddWord = () => {
    if (newWord.trim() !== '') {
      setWordsList([...wordsList, newWord.trim()]);
      setNewWord('');
    }
  };

  const generateStory = async () => {
    if (wordsList.length === 0) {
      Alert.alert(
        'No words',
        'Please add at least one word before generating.'
      );
      return;
    }

    setLoading(true);
    setStory('');

    try {
      const response = await fetch('http://localhost:8000/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: wordsList,
          tone: tone,
        }),
      });
      const data = await response.json();
      setStory(data.story);
    } catch (error) {
      console.error('Error generating story:', error);
      setStory('An error occurred while generating your story.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAwareView>
      <View style={styles.container}>
        <Text style={styles.label}>Add words you got stuck on:</Text>
        <View style={styles.stuckWordsSection}>
          <TextInput
            style={styles.stuckWordInput}
            placeholder="Enter a word"
            value={newWord}
            onChangeText={setNewWord}
            onSubmitEditing={handleAddWord} // allow hitting "return" to add
            returnKeyType="done"
          />
          <CustomButton
            title="Add Word"
            onPress={handleAddWord}
            variant="primary"
            size="small"
          />
        </View>

        {wordsList.length > 0 && (
          <View style={styles.stuckWordsList}>
            <Text style={styles.label}>Your Words:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {wordsList.map((word, index) => (
                <View key={index} style={styles.wordBubble}>
                  <Text>{word}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Text style={styles.label}>Select a tone:</Text>
        <Picker
          selectedValue={tone}
          onValueChange={setTone}
          style={styles.picker}
        >
          <Picker.Item label="Neutral" value="neutral" />
          <Picker.Item label="Humorous" value="humorous" />
          <Picker.Item label="Poetic" value="poetic" />
          <Picker.Item label="Adventurous" value="adventurous" />
          <Picker.Item label="Serious" value="serious" />
        </Picker>

        <CustomButton
          title="Generate Story"
          onPress={generateStory}
          variant="primary"
          size="normal"
        />

        {loading && (
          <ActivityIndicator style={{ marginTop: 20 }} size="large" />
        )}

        {story && (
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>{story}</Text>
          </View>
        )}
      </View>
    </KeyboardAwareView>
  );
}
