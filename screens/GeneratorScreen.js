import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../styles/GeneratorScreen.styles';

export default function GeneratorScreen() {
  const [words, setWords] = useState('');
  const [tone, setTone] = useState('neutral');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');

  const generateStory = async () => {
    setLoading(true);
    setStory('');

    try {
      const response = await fetch('http://localhost:8000/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          words: words.split(',').map((w) => w.trim()),
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Enter stuck words (comma-separated):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. apple, breeze, library"
        value={words}
        onChangeText={setWords}
      />

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

      <Button title="Generate Story" onPress={generateStory} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}

      {story && (
        <View style={styles.storyBox}>
          <Text style={styles.storyText}>{story}</Text>
        </View>
      )}
    </ScrollView>
  );
}
