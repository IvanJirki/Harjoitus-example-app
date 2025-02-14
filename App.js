import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import SportCalendar from './SportCalendar';
import SportsList from './SportsList';
import styles from './style';
import { SportProvider } from './SportContext'; // Lisää tämä importti


// Drawer Navigator
const Drawer = createDrawerNavigator();

// Gradient Background Component
const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#FF4000', '#FE2E2E', '#FFFFFF']} // Vaaleammat värit
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container}
  >
    {children}
  </LinearGradient>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    'Bangers-Regular': require('./assets/Bangers/Bangers-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#FF4500" />;
  }

  return (
    // Käytetään SportProvideria ympäröimään sovelluksen komponentit
    <SportProvider>
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
            name="Profile"
            component={ProfileScreen}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Sport Calendar"
            component={SportCalendar}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Sports List"
            component={SportsList}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SportProvider>
  );
}

// Home Screen
const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');

  const saveUserData = async () => {
    if (!name || !age || !gender || !weight || !height || !goal) {
      Alert.alert('Error', 'Please fill in all fields before saving!');
      return;
    }

    try {
      const userData = { name, age, gender, weight, height, goal };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Saved!', 'Your details have been saved.');
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  return (
    <GradientBackground>
      <KeyboardAvoidingView
        style={styles.inputContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={[styles.title, { fontFamily: 'Bangers-Regular' }]}>Welcome to Workout Diary</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            returnKeyType="next"
          />
          <Text style={styles.label}>Select Gender:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setGender('Male')} style={styles.button}><Text>Male</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('Female')} style={styles.button}><Text>Female</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setGender('Other')} style={styles.button}><Text>Other</Text></TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            returnKeyType="next"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            returnKeyType="next"
          />
          <Text style={styles.label}>Select Training Goal:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => setGoal('Lose weight')} style={styles.button}><Text>Lose weight</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setGoal('Build muscle')} style={styles.button}><Text>Build muscle</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setGoal('Improve endurance')} style={styles.button}><Text>Improve endurance</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setGoal('General fitness')} style={styles.button}><Text>General fitness</Text></TouchableOpacity>
          </View>

          <TouchableOpacity onPress={saveUserData} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

// Profile Screen
const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
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
        <Text style={[styles.title, { fontFamily: 'Bangers-Regular' }]}>Profile</Text>
        <Text style={styles.profileText}>Loading...</Text>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <Text style={[styles.title, { fontFamily: 'Bangers-Regular' }]}>Profile</Text>
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
