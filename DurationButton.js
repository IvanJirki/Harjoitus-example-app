import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DurationButton = () => {
  const [seconds, setSeconds] = useState(0);  // Ajastimen sekunnit
  const [steps, setSteps] = useState(0);     // Askelmäärä
  const [stepLength, setStepLength] = useState(0.8);  // Askellength (metreissä)
  const [isActive, setIsActive] = useState(false);  // Onko ajastin käynnissä
  const [distance, setDistance] = useState(0);  // Matka kilometreinä
  const [calories, setCalories] = useState(0);  // Kalorit
  const [timer, setTimer] = useState(null);  // Ajastin

  useEffect(() => {
    if (isActive) {
      setTimer(setInterval(() => {
        setSeconds(prev => prev + 1);  // Lisää sekunti joka sekunti
        setSteps(prev => prev + 1);    // Lisää askel joka sekunti
      }, 1000));
    } else if (!isActive && seconds !== 0) {
      clearInterval(timer);  // Pysäytetään ajastin
    }

    return () => clearInterval(timer);  // Siivoaa ajastimen
  }, [isActive, seconds]);

  useEffect(() => {
    const km = (steps * stepLength) / 1000;  // Laske matka kilometreinä
    setDistance(km);
    setCalories(km * 60);  // Arvioi kulutetut kalorit
  }, [steps, stepLength]);  // Kun askelmäärä tai askelpituus muuttuu

  const startTraining = () => {
    setIsActive(true);  // Käynnistetään ajastin
    setSteps(0);  // Nollataan askelmäärä
    setDistance(0);  // Nollataan matka
    setCalories(0);  // Nollataan kalorit
    setSeconds(0);  // Nollataan aika
  };

  const stopTraining = () => {
    setIsActive(false);  // Pysäytetään ajastin
  };

  const resetTraining = () => {
    setIsActive(false);
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setSeconds(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Training Timer</Text>
      <Text style={styles.subTitle}>Start Your Workout!</Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</Text>
        <Text style={styles.stepsText}>Steps: {steps}</Text>
        <Text style={styles.distanceText}>Distance: {distance.toFixed(2)} km</Text>
        <Text style={styles.caloriesText}>Calories: {calories.toFixed(2)} kcal</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Start Training" onPress={startTraining} />
        <Button title="Stop Training" onPress={stopTraining} />
        <Button title="Reset" onPress={resetTraining} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#888',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  stepsText: {
    fontSize: 18,
  },
  distanceText: {
    fontSize: 18,
  },
  caloriesText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default DurationButton;
