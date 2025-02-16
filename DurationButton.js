import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Accelerometer } from 'expo-sensors';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const StepCounter = () => {
  const [seconds, setSeconds] = useState(0);
  const [steps, setSteps] = useState(0);
  const [stepLength, setStepLength] = useState(0.8);
  const [isActive, setIsActive] = useState(false);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [lastAcceleration, setLastAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [motionDetected, setMotionDetected] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const updateInterval = 100;

  const [fontsLoaded] = useFonts({
    'Bangers-Regular': require('./assets/Bangers/Bangers-Regular.ttf'),
  });

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);

      return () => clearInterval(id);
    }
    return undefined;
  }, [isActive]);

  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      setAcceleration(data);
      detectSteps(data);
    });

    return () => subscription.remove();
  }, []);

  const detectSteps = (data) => {
    const { x, y, z } = data;
    const { x: lastX, y: lastY, z: lastZ } = lastAcceleration;

    const deltaZ = Math.abs(z - lastZ);

    const currentTime = Date.now();
    const timeDifference = currentTime - lastUpdateTime;

    if (timeDifference > updateInterval) {
      const sensitivityThreshold = 1.5;
      if (deltaZ > sensitivityThreshold) {
        if (!motionDetected) {
          setSteps((prevSteps) => prevSteps + 1);
          setMotionDetected(true);
        }
      } else {
        setMotionDetected(false);
      }

      setLastAcceleration({ x, y, z });
      setLastUpdateTime(currentTime);
    }
  };

  useEffect(() => {
    const km = (steps * stepLength) / 1000;
    setDistance(km);
    setCalories(km * 60);
  }, [steps, stepLength]);

  const startTraining = () => {
    setIsActive(true);
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setSeconds(0);
  };

  const stopTraining = () => {
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const resetTraining = () => {
    setIsActive(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setSteps(0);
    setDistance(0);
    setCalories(0);
    setSeconds(0);
  };

  const renderButton = (title, onPress, icon) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={30} color="#fff" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return null; // Wait for font to load
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={['#3B0B17', '#FE2E2E', '#FFFFFF']} // Updated gradient background
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontFamily: 'Bangers-Regular' }]}>Training Timer</Text>
        </View>
        <Text style={styles.subTitle}>Start Your Workout!</Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
          </Text>
          <Text style={styles.stepsText}>Steps: {steps}</Text>
          <Text style={styles.distanceText}>Distance: {distance.toFixed(2)} km</Text>
          <Text style={styles.caloriesText}>Calories: {calories.toFixed(2)} kcal</Text>
        </View>

        <View style={styles.buttonContainer}>
          {renderButton('Start Training', startTraining, 'play')}
          {renderButton('Stop Training', stopTraining, 'pause')}
          {renderButton('Reset', resetTraining, 'refresh')}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Allows scrolling when content is too long
    paddingBottom: 20, // Added padding at the bottom to ensure the content has space when scrolling
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingVertical: 20, // Added only vertical padding to center the title vertically
  },
  title: {
    textAlign: 'center',
    fontSize: 60, // Increased font size for more emphasis
    color: '#fff',
    marginBottom: 20,
    marginTop: 50,
    fontWeight: 'bold',
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowOpacity: 0.7, // Shadow opacity
    textShadowRadius: 5, // Shadow blur radius
  },
  subTitle: {
    fontSize: 22, // Increased font size for more emphasis
    fontWeight: '600', // Slightly bolder text
    color: '#fff',
    marginTop: 10, // Adjusted top margin for spacing
    marginBottom: 20, // Bottom margin stays to separate from the next section
    textAlign: 'center', // Center the subtitle text horizontally
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowOpacity: 0.75,
    textShadowRadius: 3.5, // Added text shadow to make it pop
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  stepsText: {
    fontSize: 24,
    color: '#fff',
  },
  distanceText: {
    fontSize: 24,
    color: '#fff',
  },
  caloriesText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '30%',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 18,
  },
});

export default StepCounter;
