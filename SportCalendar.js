import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './style';

const SportCalendar = ({ selectedSports }) => {
  console.log("Selected Sports:", selectedSports); // Log to check the data

  return (
    <View style={[styles.calendarContainer, { flex: 1 }]}>
      <Text style={styles.subTitle}>Weekly Workout Plan</Text>
      {selectedSports && selectedSports.length > 0 ? (
        <FlatList
          data={selectedSports}
          renderItem={({ item }) => (
            <View style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }} // Lisää tilaa listan loppuun
        />
      ) : (
        <Text style={styles.noResultsText}>No sports added yet.</Text>
      )}
    </View>
  );
};

export default SportCalendar;
