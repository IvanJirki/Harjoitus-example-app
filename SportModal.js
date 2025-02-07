import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import styles from './style';

const SportModal = ({ modalVisible, setModalVisible, selectedSport, saveSelection }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [step, setStep] = useState(1);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  const handleClose = () => {
    setModalVisible(false);
    setSelectedLevel('');
    setStep(1);
  };

  const handleSave = () => {
    const formattedDate = selectedDate ? selectedDate.toDateString() : '';
    const formattedTime = selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

    if (selectedSport && selectedLevel && formattedDate && formattedTime) {
      saveSelection(selectedSport, selectedLevel, formattedDate, formattedTime);
    }
    handleClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          {/* 🔹 Varmistetaan, että `selectedSport` ei ole tyhjä */}
          <Text style={styles.modalTitle}>{selectedSport ? selectedSport : "Select Sport"}</Text>
          {/* 🔹 Tason valinta */}
          {step === 1 && (
            <>
              <Text style={styles.modalLabel}>Select Level:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedLevel || ''} // ✅ Jos null, asetetaan tyhjä merkkijono
                  onValueChange={(itemValue) => setSelectedLevel(itemValue)}
                  style={{ color: 'black' }}
                  itemStyle={{ color: 'black' }}
                >
                  <Picker.Item label="Choose level..." value="" />
                  <Picker.Item label="Beginner" value="beginner" />
                  <Picker.Item label="Intermediate" value="intermediate" />
                  <Picker.Item label="Advanced" value="advanced" />
                </Picker>
              </View>
            </>
          )}

          {/* 🔹 Päivämäärän valinta */}
          {step === 2 && (
            <>
              <Text style={styles.modalLabel}>Select Date:</Text>
              <DateTimePicker
                value={selectedDate || new Date()} // ✅ Jos null, käytetään oletusarvoa
                mode="date"
                display="default"
                onChange={(event, date) => {
                  if (date) setSelectedDate(date); // ✅ Tarkistetaan, ettei `date` ole undefined
                }}
              />

            </>
          )}

          {/* 🔹 Kellonajan valinta */}
          {step === 3 && (
            <>
              <Text style={styles.modalLabel}>Select Time:</Text>
              <DateTimePicker
                style={{ color: 'black' }}
                itemStyle={{ color: 'black' }}
                value={selectedTime || new Date()} // ✅ Oletusarvo
                mode="time"
                display="default"
                onChange={(event, time) => {
                  if (time) setSelectedTime(time); // ✅ Estetään undefined-virhe
                }}
              />

            </>
          )}

          {/* 🔹 Navigointipainikkeet */}
          <View style={styles.modalButtons}>
            {step > 1 && (
              <TouchableOpacity style={styles.previousButton} onPress={() => setStep(step - 1)}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
            )}
            {step < 3 ? (
              <TouchableOpacity
                style={[styles.nextButton, { opacity: step === 1 && !selectedLevel ? 0.5 : 1 }]}
                onPress={() => {
                  if (step === 1 && selectedLevel) setStep(2);
                  else if (step === 2) setStep(3);
                }}
                disabled={step === 1 && !selectedLevel}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SportModal;
