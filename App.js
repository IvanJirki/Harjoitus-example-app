import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native'; // Added TextInput here
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

// Drawer Navigator luonti
const Drawer = createDrawerNavigator();

// Kustomoitu taustakomponentti
const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#FF8C90', '#FF6347', '#FF4500']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >
    {children}
  </LinearGradient>
);

// Home-näyttö (käyttäjän tietojen täyttämispaikka)
const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');

  const saveUserData = async () => {
    // Tarkistetaan, että kaikki kentät on täytetty
    if (!name || !age || !gender || !weight || !height || !goal) {
      Alert.alert('Error', 'Please fill in all fields before saving!');
      return;
    }

    try {
      // Luodaan käyttäjän tiedot objekti
      const userData = { name, age, gender, weight, height, goal };

      // Tallennetaan tiedot AsyncStorageiin
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Saved!', 'Your details have been saved.');

      // Siirretään käyttäjä Profile-näyttöön
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <GradientBackground>
      <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Welcome to Workout Diary</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <Text style={styles.label}>Select Gender:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Male" onPress={() => setGender('Male')} />
          <Button title="Female" onPress={() => setGender('Female')} />
          <Button title="Other" onPress={() => setGender('Other')} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Enter your weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <Text style={styles.label}>Select Training Goal:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Lose weight" onPress={() => setGoal('Lose weight')} />
          <Button title="Build muscle" onPress={() => setGoal('Build muscle')} />
          <Button title="Improve endurance" onPress={() => setGoal('Improve endurance')} />
          <Button title="General fitness" onPress={() => setGoal('General fitness')} />
        </View>

        <Button title="Save" onPress={saveUserData} color="#ffff" />
      </View>
    </GradientBackground>
  );
};

// Profile-näyttö (käyttäjän tietojen näyttäminen)
const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <GradientBackground>
        <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Profile</Text>
        <Text style={styles.profileText}>Loading...</Text>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Profile</Text>
      <View>
        <Text style={styles.profileText}>Name: {userData.name}</Text>
        <Text style={styles.profileText}>Age: {userData.age}</Text>
        <Text style={styles.profileText}>Gender: {userData.gender}</Text>
        <Text style={styles.profileText}>Weight: {userData.weight} kg</Text>
        <Text style={styles.profileText}>Height: {userData.height} cm</Text>
        <Text style={styles.profileText}>Training Goal: {userData.goal}</Text>
      </View>
    </GradientBackground>
  );
};

// Sport Type -näyttö
const SportScreen = () => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  const handleAddSport = (sport) => {
    if (sport) {
      setSelectedSports((prev) => [...prev, sport]);
      setRecentlyAdded(sport);
      setTimeout(() => setRecentlyAdded(null), 2000);
    }
  };

  return (
    <GradientBackground>
      <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Sport Type</Text>
      <SportsList onAddSport={handleAddSport} recentlyAdded={recentlyAdded} />
    </GradientBackground>
  );
};

// Distance -näyttö
const DistanceScreen = () => {
  const [distances, setDistances] = useState([]);

  const handleAddDistance = (distance) => {
    if (distance) {
      setDistances((prev) => [...prev, distance]);
    }
  };

  return (
    <GradientBackground>
      <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Distance</Text>
      <DistanceButton onAddDistance={handleAddDistance} />
    </GradientBackground>
  );
};

// Duration -näyttö
const DurationScreen = () => {
  const [durations, setDurations] = useState([]);

  const handleAddDuration = (duration) => {
    if (duration) {
      setDurations((prev) => [...prev, duration]);
    }
  };

  return (
    <GradientBackground>
      <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Duration</Text>
      <DurationButton onAddDuration={handleAddDuration} />
    </GradientBackground>
  );
};

// Workout Plan -näyttö
const WorkoutPlanScreen = () => (
  <GradientBackground>
    <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Workout Plan</Text>
    <SportCalendar />
  </GradientBackground>
);

// Pääsovellus, joka sisältää Drawer Navigationin
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'bangers-regular': require('./assets/Bangers/Bangers-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: '#fff',
          drawerStyle: { backgroundColor: '#FF6347' },
          headerStyle: { backgroundColor: '#FF4500' },
          headerTintColor: '#fff',
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Sport Type"
          component={SportScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="fitness" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Distance"
          component={DistanceScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="ribbon" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Duration"
          component={DurationScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="time" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Workout Plan"
          component={WorkoutPlanScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="clipboard" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
