import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export default function App() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [stuckWordsList, setStuckWordsList] = useState([]);
  const [newStuckWord, setNewStuckWord] = useState('');

  // Load saved entries when app starts
  useEffect(() => {
    const loadEntries = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('journalEntries');
        if (jsonValue != null) {
          setEntries(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load entries:', e);
      }
    };
    loadEntries();
  }, []);

  const handleSave = async () => {
    if (entry.trim() === '') {
      Alert.alert('Empty entry', 'Please write something before saving.');
      return;
    }

    let updatedEntries;

    if (editingEntryId) {
      // Edit mode: update existing entry
      updatedEntries = entries.map((e) =>
        e.id === editingEntryId
          ? {
              ...e,
              text: entry,
              stuckWords: stuckWordsList,
              date: new Date().toLocaleString(),
            }
          : e
      );
    } else {
      // New entry
      const newEntry = {
        id: uuid.v4(),
        text: entry,
        stuckWords: stuckWordsList,
        date: new Date().toLocaleString(),
      };
      updatedEntries = [newEntry, ...entries];
    }

    try {
      await AsyncStorage.setItem(
        'journalEntries',
        JSON.stringify(updatedEntries)
      );
      setEntries(updatedEntries);
      setEntry('');
      setStuckWordsList([]);
      setEditingEntryId(null); // reset edit mode
      Alert.alert('Saved!', 'Your journal entry was saved.');
    } catch (e) {
      console.error('Failed to save entry:', e);
      Alert.alert('Error', 'Something went wrong while saving.');
    }
  };

  // event function for when the user clicks the edit button
  const startEditing = (entry) => {
    setEntry(entry.text);
    setEditingEntryId(entry.id);
    setStuckWordsList(entry.stuckWords || []);
  };

  // event function for when the user clicks the delete button
  const confirmDelete = (id) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => handleDelete(id) },
    ]);
  };

  // event function for when the user clicks the delete button after confirmation
  const handleDelete = async (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);

    try {
      await AsyncStorage.setItem(
        'journalEntries',
        JSON.stringify(updatedEntries)
      );
      setEntries(updatedEntries);
    } catch (e) {
      console.error('Failed to delete entry:', e);
      Alert.alert('Error', 'Could not delete entry.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
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
              <Button
                title="Add Word"
                onPress={() => {
                  if (newStuckWord.trim() !== '') {
                    setStuckWordsList([...stuckWordsList, newStuckWord.trim()]);
                    setNewStuckWord('');
                  }
                }}
              />
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

            <Text style={styles.heading}>Previous Entries:</Text>
            {entries.map((e) => (
              <View key={e.id} style={styles.entryBox}>
                <Text style={styles.entryDate}>{e.date}</Text>
                <Text>{e.text}</Text>
                {e.stuckWords && e.stuckWords.length > 0 ? (
                  <>
                    <Text style={styles.entryLabel}>Stuck Words:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                      {e.stuckWords.map((word, i) => (
                        <View key={i} style={styles.stuckWordBubble}>
                          <Text>{word}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : (
                  <Text style={styles.entryLabel}>Stuck Words: None</Text>
                )}
                <Button title="Edit" onPress={() => startEditing(e)} />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => confirmDelete(e.id)}
                />
              </View>
            ))}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
    color: '#000000',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#000000',
  },
  entryBox: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
  },
  entryDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  entryLabel: {
    fontWeight: 'bold',
    marginTop: 8,
    color: '#000000',
  },
  stuckWordInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    color: '#000000',
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
