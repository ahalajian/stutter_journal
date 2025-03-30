import React from 'react';
import { globalStyles } from '../styles/global.styles';
import { View, Text, ScrollView } from 'react-native';

export function StuckWordsDisplay({ stuckWords, text }) {
  return (
    <>
      <Text style={globalStyles.label}>{text}:</Text>
      <ScrollView style={globalStyles.stuckWordsScrollView}>
        <View style={globalStyles.wordsRowContainer}>
          {stuckWords.length > 0 ? (
            stuckWords.map((word, index) => (
              <View key={index} style={globalStyles.wordBubble}>
                <Text>{word}</Text>
              </View>
            ))
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </>
  );
}
