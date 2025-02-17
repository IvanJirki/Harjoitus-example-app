import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [showMore, setShowMore] = useState(false);
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

    const newWorkout = {
      time: `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`,
      steps,
      distance: distance.toFixed(2),
      calories: calories.toFixed(2),
    };
    setWorkoutHistory([newWorkout, ...workoutHistory]);
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

  const clearHistory = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to clear your workout history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => setWorkoutHistory([]),
        },
      ]
    );
  };

  const renderButton = (title, onPress, icon) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={30} color="#fff" />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={['#3B0B17', '#FE2E2E', '#FFFFFF']}
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

        {workoutHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Workout History</Text>
              <TouchableOpacity style={styles.clearHistoryButton} onPress={clearHistory}>
                <Ionicons name="trash-bin" size={25} color="#fff" />
              </TouchableOpacity>
            </View>
            {workoutHistory.slice(0, showMore ? workoutHistory.length : 4).map((workout, index) => (
              <View key={index} style={styles.historyRow}>
                <Text style={styles.historyText}>
                  {workout.time} | {workout.steps} steps | {workout.distance} km | {workout.calories} kcal
                </Text>
              </View>
            ))}
            {workoutHistory.length > 4 && (
              <TouchableOpacity
                style={styles.showMoreButton}
                onPress={() => setShowMore(!showMore)}
              >
                <Text style={styles.showMoreText}>{showMore ? 'Show Less' : 'Show More'}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 60,
    color: '#fff',
    marginBottom: 20,
    marginTop: 50,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowOpacity: 0.7,
    textShadowRadius: 5,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowOpacity: 0.75,
    textShadowRadius: 3.5,
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
    backgroundColor: 'rgba(80, 80, 80, 0.32)',
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
  historyContainer: {
    padding: 10,
    backgroundColor: 'rgba(252, 252, 252, 0.32)',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.24)',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  historyRow: {
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(88, 86, 86, 0.46)',
    borderRadius: 8,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(104, 103, 103, 0.27)',
  },
  historyText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  clearHistoryButton: {
    backgroundColor: 'rgba(65, 64, 64, 0.36)',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showMoreButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(39, 39, 39, 0.4)',
    borderRadius: 5,
    alignItems: 'center',
  },
  showMoreText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default StepCounter;
