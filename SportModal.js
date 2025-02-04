import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import DatePicker from '@react-native-community/datetimepicker'; // Päivitetty DatePicker
import { Picker } from '@react-native-picker/picker';  // Uusi Picker-kirjasto
import styles from './style'; // Tyylit, jos käytät samoja tyylejä

const SportModal = ({ modalVisible, setModalVisible, selectedSport, saveSelection }) => {
  const [selectedLevel, setSelectedLevel] = useState('');  // Taso
  const [selectedDate, setSelectedDate] = useState(new Date());  // Päivämäärä
  const [levelSelected, setLevelSelected] = useState(false);  // Tason valinta valmis?
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);  // Milloin näyttää päivämäärän valitsimen?

  const handleClose = () => {
    setModalVisible(false);
    setLevelSelected(false); // Resetointi sulkiessa
    setDatePickerVisible(false); // Resetointi sulkiessa
  };

  const handleSave = () => {
    saveSelection(selectedSport, selectedLevel, selectedDate);
    setModalVisible(false);
    setLevelSelected(false); // Resetointi tallennuksen jälkeen
    setDatePickerVisible(false); // Resetointi tallennuksen jälkeen
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setLevelSelected(true);  // Tason valinta valmis
    setDatePickerVisible(true);  // Näytetään päivämäärän valitsin
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Set Details for {selectedSport}</Text>

          {/* Tason valinta */}
          {!levelSelected ? (
            <>
              <Text>Select Level:</Text>
              <Picker
                selectedValue={selectedLevel}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedLevel(itemValue)}  // Tason valinta tapahtuu tässä
              >
                <Picker.Item label="Beginner" value="beginner" />
                <Picker.Item label="Intermediate" value="intermediate" />
                <Picker.Item label="Advanced" value="advanced" />
              </Picker>

              <Button 
                title="OK" 
                onPress={() => {
                  if (selectedLevel) {
                    setLevelSelected(true);  // Taso on valittu
                    setDatePickerVisible(true);  // Näytetään päivämäärän valitsin
                  }
                }} 
                disabled={!selectedLevel}  // Estetään OK-napin painaminen ilman tason valintaa
              />
            </>
          ) : (
            <>
              {/* Päivämäärän valinta */}
              {isDatePickerVisible && (
                <>
                  <Text>Select Day:</Text>
                  <DatePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => setSelectedDate(selectedDate || new Date())}
                    style={styles.picker}
                  />
                </>
              )}

              <View style={styles.modalButtons}>
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={handleClose} color="red" />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SportModal;
