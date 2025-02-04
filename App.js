import 'react-native-gesture-handler'; 
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import styles from './style';
import SportsList from './SportsList'; 
import SportCalendar from './SportCalendar'; 

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [selectedSports, setSelectedSports] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState(null); // Pitää kirjaa viimeksi lisätystä lajista

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'bangers-regular': require('./assets/Bangers/Bangers-Regular.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  // Urheilulajin lisääminen listaan ja ikonivaihto
  const handleAddSport = (sport) => {
    setSelectedSports((prevSports) => [...prevSports, sport]);
    setRecentlyAdded(sport); 

    // Vaihda takaisin lisäysikoniin 2 sekunnin jälkeen
    setTimeout(() => setRecentlyAdded(null), 2000);
  };

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FF8C90', '#FF6347', '#FF4500']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={[styles.title, { fontFamily: 'bangers-regular' }]}>Workout Diary</Text>

      {/* Nappirivi pysyy aina näkyvissä */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.iconButton, activeButton === 'sport' && styles.activeButton]}
          onPress={() => handleButtonPress('sport')}
        >
          <Ionicons name="fitness" size={40} color="#fff" />
          <Text style={styles.iconButtonText}>Sport Type</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, activeButton === 'distance' && styles.activeButton]}
          onPress={() => handleButtonPress('distance')}
        >
          <Ionicons name="ribbon" size={40} color="#fff" />
          <Text style={styles.iconButtonText}>Distance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, activeButton === 'duration' && styles.activeButton]}
          onPress={() => handleButtonPress('duration')}
        >
          <Ionicons name="time" size={40} color="#fff" />
          <Text style={styles.iconButtonText}>Duration</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, activeButton === 'plan' && styles.activeButton]}
          onPress={() => handleButtonPress('plan')}
        >
          <Ionicons name="clipboard" size={40} color="#fff" />
          <Text style={styles.iconButtonText}>Workout Plan</Text>
        </TouchableOpacity>
      </View>

      {/* Näytetään SportsList, jos painetaan "Sport Type" */}
      {activeButton === 'sport' && <SportsList onAddSport={handleAddSport} recentlyAdded={recentlyAdded} />}
      
      {/* Näytetään SportCalendar, jos painetaan "Workout Plan" */}
      {activeButton === 'plan' && <SportCalendar selectedSports={selectedSports} />}
    </LinearGradient>
  );
}
