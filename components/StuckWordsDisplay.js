import React from 'react';
import { styles } from '../styles/global.styles';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export function StuckWordsDisplay({ stuckWords, text }) {
  return (
    <>
      <Text style={styles.label}>{text}:</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.wordsContainer}>
          {stuckWords.length > 0 ? (
            stuckWords.map((word, index) => (
              <View key={index} style={styles.wordBubble}>
                <Text>{word}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noWordsText}>None</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}
