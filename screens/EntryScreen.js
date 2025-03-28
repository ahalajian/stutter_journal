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
import { styles } from '../styles/EntryScreen.styles';

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
              <Text style={styles.label}>Stuck Words:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {stuckWordsList.map((word, index) => (
                  <View key={index} style={styles.wordBubble}>
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
