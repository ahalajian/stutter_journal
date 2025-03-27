import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useEffect } from 'react';

export default function EntryScreen({ route, navigation }) {
  const { entryId } = route.params || {};
  const [entry, setEntry] = useState('');
  const [stuckWordsList, setStuckWordsList] = useState([]);
  const [newStuckWord, setNewStuckWord] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // load entry when the screen is focused, gets called when entryId changes
  useEffect(() => {
    if (entryId) {
      loadEntryForEditing();
    }
  }, [entryId]);

  const loadEntryForEditing = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('journalEntries');
      const entries = jsonValue ? JSON.parse(jsonValue) : [];
      const entryToEdit = entries.find((e) => e.id === entryId);
      if (entryToEdit) {
        setEntry(entryToEdit.text);
        setStuckWordsList(entryToEdit.stuckWords || []);
        setIsEditing(true);
      }
    } catch (e) {
      console.error('Failed to load entry for editing:', e);
    }
  };

  const handleAddStuckWord = () => {
    if (newStuckWord.trim() !== '') {
      setStuckWordsList([...stuckWordsList, newStuckWord.trim()]);
      setNewStuckWord('');
    }
  };

  const handleSave = async () => {
    if (entry.trim() === '') {
      Alert.alert('Empty entry', 'Please write something before saving.');
      return;
    }

    try {
      const existing = await AsyncStorage.getItem('journalEntries');
      const entries = existing ? JSON.parse(existing) : [];

      let updatedEntries;

      if (isEditing && entryId) {
        updatedEntries = entries.map((e) =>
          e.id === entryId
            ? {
                ...e,
                text: entry,
                stuckWords: stuckWordsList,
                date: new Date().toLocaleString(),
              }
            : e
        );
      } else {
        const newEntry = {
          id: uuid.v4(),
          text: entry,
          stuckWords: stuckWordsList,
          date: new Date().toLocaleString(),
        };
        updatedEntries = [newEntry, ...entries];
      }

      await AsyncStorage.setItem(
        'journalEntries',
        JSON.stringify(updatedEntries)
      );

      setEntry('');
      setStuckWordsList([]);
      setIsEditing(false);
      navigation.goBack();
    } catch (e) {
      console.error('Failed to save entry:', e);
      Alert.alert('Error', 'Something went wrong while saving.');
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>New Journal Entry</Text>

          <TextInput
            style={styles.input}
            multiline
            placeholder="Write about your conversation..."
            value={entry}
            onChangeText={setEntry}
          />

          <View style={styles.stuckWordsSection}>
            <TextInput
              style={styles.stuckWordInput}
              placeholder="Enter a word you got stuck on"
              value={newStuckWord}
              onChangeText={setNewStuckWord}
            />
            <Button title="Add Word" onPress={handleAddStuckWord} />
          </View>

          {stuckWordsList.length > 0 && (
            <View style={styles.stuckWordsList}>
              <Text style={styles.entryLabel}>Stuck Words:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {stuckWordsList.map((word, index) => (
                  <View key={index} style={styles.stuckWordBubble}>
                    <Text>{word}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <Button title="Save Entry" onPress={handleSave} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
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
  stuckWordBubble: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  entryLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
});
