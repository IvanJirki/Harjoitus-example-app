import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import SportModal from './SportModal';  // Varmista, että modal-komponentti on tuotu

const SportsList = ({ onAddSport }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredSports, setFilteredSports] = useState([]);
  const [addedSports, setAddedSports] = useState({}); // Tilaseuranta lisätyille urheilulajeille
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  const sportsCategories = [
    { title: 'Endurance Sports', data: ['Running', 'Cycling', 'Swimming', 'Rowing', 'Track and Field'] },
    { title: 'Combat Sports', data: ['Boxing', 'Kickboxing', 'Judo', 'Karate', 'Taekwondo', 'Wrestling', 'MMA', 'Archery'] },
    { title: 'Strength Training', data: ['Weightlifting', 'Gym Workout', 'Bench Press', 'Deadlift', 'Squats', 'Pull-ups', 'Push-ups', 'Lunges'] },
    { title: 'Bodyweight Training', data: ['Planks', 'Russian Twists', 'Burpees', 'Kettlebell Swings', 'Battle Ropes'] },
    { title: 'Functional Training', data: ['CrossFit', 'HIIT', 'Fitness'] },
    { title: 'Mobility & Recovery', data: ['Yoga', 'Stretching'] },
    { title: 'Extreme & Outdoor', data: ['Climbing', 'Surfing', 'Dancing', 'Zumba'] }
  ];

  useEffect(() => {
    setFilteredSports(sportsCategories);
  }, []);

  const searchSports = (input) => {
    setSearchInput(input);
    if (input.trim() === '') {
      setFilteredSports(sportsCategories);
      return;
    }

    const filtered = sportsCategories
      .map(category => ({
        title: category.title,
        data: category.data.filter(sport => sport.toLowerCase().includes(input.toLowerCase()))
      }))
      .filter(category => category.data.length > 0);

    setFilteredSports(filtered);
  };

  const handleAddSport = (sport) => {
    onAddSport(sport);
    setAddedSports((prev) => ({ ...prev, [sport]: true }));

    setTimeout(() => {
      setAddedSports((prev) => ({ ...prev, [sport]: false }));
    }, 2000);
  };

  const openModal = (sport) => {
    setSelectedSport(sport);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSport(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#FF6347" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search sports..."
          value={searchInput}
          onChangeText={searchSports}
        />
      </View>

      <Text style={styles.subTitle}>Available Sports</Text>

      {/* Urheilukategorioiden listaus */}
      <SectionList
        sections={filteredSports}
        keyExtractor={(item, index) => item + index}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity onPress={() => console.log(`Clicked on ${title}`)}>
            <Text style={styles.categoryTitle}>{title}</Text>
          </TouchableOpacity>
        )}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.exerciseText}>{item}</Text>
            <TouchableOpacity onPress={() => openModal(item)}>
              <Ionicons 
                name={addedSports[item] ? "checkmark-circle-outline" : "add-circle-outline"} 
                size={24} 
                color={addedSports[item] ? "#32CD32" : "#FF6347"} 
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noResultsText}>No sports found. Try a different search.</Text>}
        style={styles.flatListContainer}
      />

      {/* SportModal, joka avautuu painettaessa urheilulajia */}
      <SportModal 
        modalVisible={modalVisible}
        setModalVisible={closeModal}
        selectedSport={selectedSport}
        saveSelection={handleAddSport}
      />
    </View>
  );
};

export default SportsList;
