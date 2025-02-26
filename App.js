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
import { SportProvider } from './SportContext';
import DurationButton from './DurationButton';

const Drawer = createDrawerNavigator();

const GradientBackground = ({ children }) => (
  <LinearGradient
    colors={['#3B0B17', '#FE2E2E', '#FFFFFF']}
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
          <Drawer.Screen
            name="Duration & Distance"
            component={DurationButton}
            options={{
              drawerIcon: ({ color, size }) => <Ionicons name="timer" size={size} color={color} />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SportProvider>
  );
}

// Home Screen
const HomeScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');
  const [formSaved, setFormSaved] = useState(false);

  useEffect(() => {
    if (route.params?.userData) {
      const { userData } = route.params;
      setName(userData.name);
      setAge(userData.age);
      setGender(userData.gender);
      setWeight(userData.weight);
      setHeight(userData.height);
      setGoal(userData.goal);
    }
  }, [route.params?.userData]);

  const saveUserData = async () => {
    if (!name || !age || !gender || !weight || !height || !goal) {
      Alert.alert('Error', 'Please fill in all fields before saving!');
      return;
    }

    try {
      const userData = { name, age, gender, weight, height, goal };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Saved!', 'Your details have been saved.');
      setFormSaved(true);
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

          {formSaved ? (
            <View style={styles.centeredContainer}>
              <Text style={[styles.title, { fontFamily: 'Bangers-Regular' }]}>Success!</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Sports List')} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Start Training</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
              <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                placeholder="Enter your age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
                returnKeyType="next"
              />
              <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                placeholder="Enter your height (cm)"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                returnKeyType="next"
              />
              <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                placeholder="Enter your weight (kg)"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                returnKeyType="next"
              />

              <Text style={styles.label}>Select Gender:</Text>
              <View style={styles.goalsContainer}>
                {['Male', 'Female', 'Other'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setGender(option)}
                    style={[styles.goalButton, gender === option && styles.selectedGoalButton]}
                  >
                    <Text style={[styles.goalButtonText, gender === option && styles.selectedGoalButtonText]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Select Training Goal:</Text>
              <View style={styles.goalsContainer}>
                {['Lose weight', 'Build muscle', 'Improve endurance', 'General fitness'].map((goalOption) => (
                  <TouchableOpacity
                    key={goalOption}
                    onPress={() => setGoal(goalOption)}
                    style={[styles.goalButton, goal === goalOption && styles.selectedGoalButton]}
                  >
                    <Text style={[styles.goalButtonText, goal === goalOption && styles.selectedGoalButtonText]}>
                      {goalOption}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity onPress={saveUserData} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

// Profile Screen
const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          const parsedData = JSON.parse(data);
          setUserData(parsedData);
          setName(parsedData.name);
          setAge(parsedData.age);
          setGender(parsedData.gender);
          setWeight(parsedData.weight);
          setHeight(parsedData.height);
          setGoal(parsedData.goal);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to load your profile. Please try again later.');
      }
    };
    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!name || !age || !gender || !weight || !height || !goal) {
      Alert.alert('Error', 'Please fill in all fields before saving!');
      return;
    }

    try {
      const updatedUserData = { name, age, gender, weight, height, goal };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      setIsEditing(false); 
      Alert.alert('Saved!', 'Your profile has been updated.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); 
  };

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
      <ScrollView contentContainerStyle={styles.profileContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={[styles.input, { backgroundColor: 'white' }]}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={[styles.input, { backgroundColor: 'white' }]}
              placeholder="Enter your age"
              keyboardType="numeric"
              value={age}
              onChangeText={setAge}
            />
            <TextInput
              style={[styles.input, { backgroundColor: 'white' }]}
              placeholder="Enter your height (cm)"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              style={[styles.input, { backgroundColor: 'white' }]}
              placeholder="Enter your weight (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />

            <Text style={styles.label}>Select Gender:</Text>
            <View style={styles.goalsContainer}>
              {['Male', 'Female', 'Other'].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setGender(option)}
                  style={[styles.goalButton, gender === option && styles.selectedGoalButton]}
                >
                  <Text style={[styles.goalButtonText, gender === option && styles.selectedGoalButtonText]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Select Training Goal:</Text>
            <View style={styles.goalsContainer}>
              {['Lose weight', 'Build muscle', 'Improve endurance', 'General fitness'].map((goalOption) => (
                <TouchableOpacity
                  key={goalOption}
                  onPress={() => setGoal(goalOption)}
                  style={[styles.goalButton, goal === goalOption && styles.selectedGoalButton]}
                >
                  <Text style={[styles.goalButtonText, goal === goalOption && styles.selectedGoalButtonText]}>
                    {goalOption}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.profileText}>Name: <Text style={styles.profileDetail}>{userData.name}</Text></Text>
            <Text style={styles.profileText}>Age: <Text style={styles.profileDetail}>{userData.age}</Text></Text>
            <Text style={styles.profileText}>Gender: <Text style={styles.profileDetail}>{userData.gender}</Text></Text>
            <Text style={styles.profileText}>Weight: <Text style={styles.profileDetail}>{userData.weight} kg</Text></Text>
            <Text style={styles.profileText}>Height: <Text style={styles.profileDetail}>{userData.height} cm</Text></Text>
            <Text style={styles.profileText}>Training Goal: <Text style={styles.profileDetail}>{userData.goal}</Text></Text>

            <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </GradientBackground>
  );
};

