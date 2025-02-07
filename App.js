import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import styles from './style';
import SportsList from './SportsList';
import SportCalendar from './SportCalendar';
import DistanceButton from './DistanceButton';
import DurationButton from './DurationButton';

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

// Home-näyttö
const HomeScreen = () => (
  <GradientBackground>
    <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Welcome to Workout Diary</Text>
  </GradientBackground>
);

// Sport Type -näyttö
const SportScreen = () => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  const handleAddSport = (sport) => {
    setSelectedSports((prev) => [...prev, sport]);
    setRecentlyAdded(sport);
    setTimeout(() => setRecentlyAdded(null), 2000);
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
    setDistances((prev) => [...prev, distance]);
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
    setDurations((prev) => [...prev, duration]);
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

// Profile -näyttö
const ProfileScreen = () => (
  <GradientBackground>
    <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Profile</Text>
    <Text style={styles.subtitle}>User details will be shown here.</Text>
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
