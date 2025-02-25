import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSports } from './SportContext';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './style'; 
import { LinearGradient } from 'expo-linear-gradient';

const SportCalendar = () => {
  const { selectedSports, removeSport } = useSports();
  const navigation = useNavigation();

  const handleRemoveSport = (sport) => {
    removeSport(sport);
  };

  const handleMarkAsCompleted = (sport) => {
    alert(`${sport.sport} has been marked as completed.`);
  };

  const [selectedSportIndex, setSelectedSportIndex] = useState(null);

  const handleSportPress = (index) => {
    setSelectedSportIndex(selectedSportIndex === index ? null : index);
  };

  return (
    <LinearGradient
      colors={['#3B0B17', '#FE2E2E', '#FFFFFF']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container} 
    >
      <View style={styles.calendarContainer}>
        <TouchableOpacity style={styles.wideButton} onPress={() => navigation.navigate('Sports List')}>
          <Text style={styles.buttonText}>➕ Add More Sports</Text>
        </TouchableOpacity>

        {selectedSports && selectedSports.length > 0 ? (
          <FlatList
            data={selectedSports
              .sort((a, b) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateA - dateB;
              })
            }
            renderItem={({ item, index }) =>
              item && item.sport && item.level && item.date && item.time ? (
                <View style={styles.listItem}>
                  <TouchableOpacity onPress={() => handleSportPress(index)}>
                    <Text style={styles.sportText}>
                      {item.sport} <Text style={styles.level}>({item.level})</Text>
                    </Text>
                    <Text style={styles.dateTime}>📅 {item.date}  |  🕒 {item.time}</Text>
                  </TouchableOpacity>

                  {/* Näyttää napit vain, jos urheilutapahtuma on valittu */}
                  {selectedSportIndex === index && (
              <View style={styles.buttonContainer}>
              {/* Remove Button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveSport(item)}
              >
                <MaterialIcons name="delete" size={15} color="white" />
                <Text style={styles.buttonText}> Remove</Text>
              </TouchableOpacity>
            
              <TouchableOpacity
                style={[styles.removeButton, styles.completedButton]}
                onPress={() => handleMarkAsCompleted(item)}
              >
                <MaterialIcons name="check-circle" size={15} color="white" />
                <Text style={styles.buttonText}> Completed</Text>
              </TouchableOpacity>
            </View>
            

                  )}
                </View>
              ) : null
            }
            keyExtractor={(item, index) => `${item?.sport || 'unknown'}-${index}`}
          />
        ) : (
          <Text style={styles.noDataText}>No sports selected 🏀</Text>
        )}
      </View>
    </LinearGradient>
  );
};

export default SportCalendar;
