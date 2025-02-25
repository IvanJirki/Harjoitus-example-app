import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import SportModal from './SportModal';
import { useSports } from './SportContext'; 

const SportsList = () => {
  const { addSport } = useSports(); 
  const [searchInput, setSearchInput] = useState('');
  const [filteredSports, setFilteredSports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  const navigation = useNavigation();

  const sportsCategories = [
    { title: 'Endurance Sports', data: ['Running', 'Cycling', 'Swimming', 'Rowing', 'Triathlon', 'Hiking', 'Walking', 'Jogging'] },
    { title: 'Combat Sports', data: ['Boxing', 'Kickboxing', 'Judo', 'MMA', 'Wrestling', 'Karate', 'Taekwondo', 'Brazilian Jiu-Jitsu', 'Muay Thai', 'Kung Fu', 'Self-defense', 'Fencing'] },
    { title: 'Strength Training', data: ['Weightlifting', 'Gym Workout', 'Deadlift', 'Powerlifting', 'Crossfit', 'Bodybuilding', 'Kettlebell Training', 'Resistance Bands'] },
    { title: 'Fitness & Wellness', data: ['Yoga', 'Pilates', 'HIIT', 'Zumba', 'Aerobics', 'Barre', 'Stretching', 'Core Workouts', 'Bodyweight Exercises', 'Circuit Training', 'Spin Class'] },
    { title: 'Team Sports', data: ['Football', 'Basketball', 'Volleyball', 'Rugby', 'Handball', 'Cricket', 'Baseball', 'Softball'] },
    { title: 'Outdoor & Adventure Sports', data: ['Rock Climbing', 'Hiking', 'Mountain Biking', 'Trail Running', 'Kayaking', 'Stand Up Paddleboarding', 'Geocaching', 'Camping', 'Fishing'] },
    { title: 'Water Sports', data: ['Surfing', 'Kayaking', 'Diving', 'Paddleboarding', 'Sailing', 'Water Polo', 'Snorkeling', 'Wakeboarding'] },
    { title: 'Winter Sports', data: ['Skiing', 'Snowboarding', 'Ice Hockey', 'Bobsleigh', 'Figure Skating', 'Ski Jumping', 'Snowshoeing', 'Snowmobiling'] },
    { title: 'Racquet Sports', data: ['Tennis', 'Badminton', 'Table Tennis', 'Squash', 'Pickleball', 'Racquetball'] },
    { title: 'Motor Sports', data: ['Formula 1', 'MotoGP', 'Rally', 'Go-Karting', 'Motorcross', 'Nascar'] },
    { title: 'Casual Sports', data: ['Frisbee', 'Kickball', 'Dodgeball', 'Tag', 'Capture the Flag', 'Bowling', 'Mini Golf', 'Horseback Riding'] }
  ];

  useEffect(() => {
    setFilteredSports(sportsCategories);
  }, []);

  const searchSports = (input) => {
    setSearchInput(input);
    if (!input.trim()) {
      setFilteredSports(sportsCategories);
      return;
    }

    const filtered = sportsCategories
      .map(category => ({
        title: category.title,
        data: category.data.filter(sport =>
          sport.toLowerCase().includes(input.toLowerCase())
        )
      }))
      .filter(category => category.data.length > 0);

    setFilteredSports(filtered);
  };

  return (
    <LinearGradient
      colors={['#3B0B17', '#FE2E2E', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={[styles.wideButton, { marginBottom: 25 }]} 
          onPress={() => navigation.navigate('Sport Calendar')}
        >
          <Text style={styles.buttonText}>View My Calendar</Text>
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#FF6347" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchInput}
            onChangeText={searchSports}
          />
        </View>

        <SectionList
          sections={filteredSports}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.categoryTitle}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{item}</Text>
              <TouchableOpacity onPress={() => {
                setSelectedSport(item);
                setModalVisible(true);
              }}>
                <Ionicons name="add-circle-outline" size={25} color="#FF6347" />
              </TouchableOpacity>
            </View>
          )}
        />

        <SportModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedSport={selectedSport}
          saveSelection={addSport} 
        />
      </View>
    </LinearGradient>
  );
};

export default SportsList;
