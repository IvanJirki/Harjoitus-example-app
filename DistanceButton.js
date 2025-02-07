// DistanceButton.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './style';

const DistanceButton = ({ onAddDistance }) => {
  const [distance, setDistance] = useState('');

  const handleDistanceChange = (input) => {
    setDistance(input);
  };

  const handleAddDistance = () => {
    if (distance.trim()) {
      onAddDistance(parseFloat(distance)); // Lähetetään distance takaisin App-komponenttiin
      setDistance(''); // Tyhjennetään kenttä lisäyksen jälkeen
    }
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Add Distance</Text>
      <Text style={styles.inputLabel}>Enter Distance (km):</Text>
      <TextInput
        style={styles.input}
        value={distance}
        onChangeText={handleDistanceChange}
        keyboardType="numeric"
        placeholder="Enter distance"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddDistance}>
        <Text style={styles.addButtonText}>Add Distance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DistanceButton;
