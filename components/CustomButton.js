import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const CustomButton = ({
  onPress,
  title,
  variant = 'primary', // primary, secondary, danger
  size = 'normal', // normal, small
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, styles[variant], styles[size]]}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#007AFF',
  },
  dangerText: {
    color: '#ffffff',
  },
});
