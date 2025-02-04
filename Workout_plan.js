import 'react-native-gesture-handler'; 
import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function App() {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseInput, setExerciseInput] = useState('');
  const [activeButton, setActiveButton] = useState('');
  
  // Askel-laskuri
  const [steps, setSteps] = useState(0); 

  // Kalorilaskuri
  const [calories, setCalories] = useState(0);
  const [weight, setWeight] = useState(70); // Käyttäjän paino kg
  const [duration, setDuration] = useState(30); // Cadio treenin kesto minuuteissa

  // Fitness ehdotukset
  const workoutSuggestions = [
    'Juoksu', 'Pyöräily', 'Uinti', 'Kävely', 'Jooga', 'HIIT harjoitukset',
    'Kestävyystreeni', 'Pumppi', 'Pilates', 'Vesijumppa'
  ];

  // Lisää askelia
  const addSteps = () => {
    setSteps(steps + 100); // Lisää 100 askelta (tämä voi olla dynaaminen käyttäjän liikunnasta)
  };

  // Kalorien laskeminen (esim. juoksu)
  const calculateCalories = () => {
    // Yksinkertainen kaava: Kalorit = (kesto (minuuteissa) * paino (kg) * 0.05)
    const calculatedCalories = duration * weight * 0.05;
    setCalories(calculatedCalories);
  };

  // Ehdotukset fitness-urheilusta
  const getFitnessSuggestions = () => {
    const randomIndex = Math.floor(Math.random() * workoutSuggestions.length);
    return workoutSuggestions[randomIndex];
  };

  return (
    <LinearGradient
      colors={['#FF8C00', '#FF6347', '#FF4500']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.title}>Workout Diary</Text>

      {/* Buttons for Sport Type, Distance, Duration, and Workout Plan */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.iconButton, activeButton === 'Workout Plan' && styles.activeButton]} 
          onPress={() => setActiveButton('Workout Plan')}
        >
          <Ionicons name="clipboard" size={40} color="#fff" />
          <Text style={styles.iconButtonText}>Workout Plan</Text>
        </TouchableOpacity>
      </View>

      {activeButton === 'Workout Plan' && (
        <View style={styles.workoutPlanContainer}>
          {/* Askel Laskuri */}
          <Text style={styles.subTitle}>Askel Laskuri</Text>
          <Text style={styles.workoutText}>Askeleet: {steps}</Text>
          <TouchableOpacity onPress={addSteps} style={styles.addButton}>
            <Text style={styles.addButtonText}>Lisää 100 askelta</Text>
          </TouchableOpacity>

          {/* Kalorilaskuri */}
          <Text style={styles.subTitle}>Kalorilaskuri</Text>
          <Text style={styles.workoutText}>Kalorit: {calories} kcal</Text>
          <TextInput
            style={styles.input}
            placeholder="Syötä kesto (min)"
            value={duration.toString()}
            onChangeText={(text) => setDuration(Number(text))}
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={calculateCalories} style={styles.addButton}>
            <Text style={styles.addButtonText}>Laske Kalorit</Text>
          </TouchableOpacity>

          {/* Fitness Ehdotukset */}
          <Text style={styles.subTitle}>Fitness Ehdotuksia</Text>
          <Text style={styles.workoutText}>{getFitnessSuggestions()}</Text>
        </View>
      )}
    </LinearGradient>
  );
}
