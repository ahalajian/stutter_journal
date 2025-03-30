import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/HomeScreen.styles';
import { CustomButton } from '../components/CustomButton';
import { StuckWordsDisplay } from '../components/StuckWordsDisplay';

export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([]);

  // load entries when the screen is focused, gets called when navigation changes
  useEffect(() => {
    // when screen is focused, runs load entries
    const unsubscribe = navigation.addListener('focus', loadEntries);
    return unsubscribe;
  }, [navigation]);

  // load entries from async storage
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

  // delete entry from async storage when user confirms delete
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
    }
  };

  // confirm delete when user clicks delete button
  const confirmDelete = (id) => {
    Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => handleDelete(id) },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerButtons}>
        <CustomButton
          title="Generate a Story"
          onPress={() => navigation.navigate('Generator')}
          variant="primary"
        />
        <CustomButton
          title="New Entry"
          onPress={() => navigation.navigate('New Entry')}
          variant="primary"
        />
      </View>

      <Text style={styles.heading}>Your Journal Entries</Text>

      {entries.length === 0 && (
        <Text style={styles.emptyText}>No entries yet. Start journaling!</Text>
      )}

      {entries.map((entry) => (
        <View key={entry.id} style={styles.entryBox}>
          <Text style={styles.entryDate}>{entry.date}</Text>
          <Text>{entry.text}</Text>

          <StuckWordsDisplay
            stuckWords={entry.stuckWords || []}
            text="Stuck Words"
          />

          <View style={styles.buttonRow}>
            <CustomButton
              title="Edit"
              onPress={() =>
                navigation.navigate('New Entry', { entryId: entry.id })
              }
              variant="secondary"
              size="small"
            />
            <CustomButton
              title="Delete"
              onPress={() => confirmDelete(entry.id)}
              variant="danger"
              size="small"
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
