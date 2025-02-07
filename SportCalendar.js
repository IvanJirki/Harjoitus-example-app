import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';

const SportCalendar = ({ selectedSports = [] }) => {
  console.log("Selected Sports:", selectedSports); // Debugging

  return (
    <View style={[styles.calendarContainer, { flex: 1, padding: 20 }]}>
      <Text style={styles.subTitle}>📆 Weekly Workout Plan</Text>
      {selectedSports.length > 0 ? (
        <FlatList
          data={selectedSports}
          renderItem={({ item }) => (
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>
                🏋️ {item.sport || 'Unknown Sport'} ({item.level || 'Unknown Level'})
              </Text>
              <Text style={styles.dateText}>
                📅 {item.date || 'Unknown Date'} 🕒 {item.time || 'Unknown Time'}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => `${item.sport}-${index}`}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text style={styles.noResultsText}>No sports added yet.</Text>
      )}
    </View>
  );
};

export default SportCalendar;
