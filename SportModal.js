import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';  // Varmista, että tämä on asennettu
import { useSports } from './SportContext';  
import styles from './style';

const SportModal = ({ modalVisible, setModalVisible, selectedSport }) => {
  const { addSport } = useSports();  
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date(new Date().setHours(8, 0, 0, 0)));
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
    const formattedDate = selectedDate.toDateString();
    const formattedTime = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (selectedSport && selectedLevel) {
      addSport(selectedSport, selectedLevel, formattedDate, formattedTime);  
    }
    handleClose();
  };

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
              <Text style={styles.modalTitle}>{selectedSport ? selectedSport : "Select Sport"}</Text>

              {step === 1 && (
                <>
                  <Text style={styles.modalLabel}>Select Level:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedLevel || ''}
                      onValueChange={(itemValue) => setSelectedLevel(itemValue)}
                      style={{ width: '100%', height: 50, color: 'black' }}  // Asetettu tyyli
                    >
                      <Picker.Item label="Choose level..." value="" />
                      <Picker.Item label="Beginner" value="beginner" />
                      <Picker.Item label="Intermediate" value="intermediate" />
                      <Picker.Item label="Advanced" value="advanced" />
                    </Picker>
                  </View>
                </>
              )}

              {step === 2 && (
                <>
                  <Text style={styles.modalLabel}>Select Date:</Text>
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    minimumDate={new Date()}
                    onChange={(event, date) => {
                      if (date) setSelectedDate(date);
                    }}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <Text style={styles.modalLabel}>Select Time:</Text>
                  <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="default"
                    onChange={(event, time) => {
                      if (time) setSelectedTime(time);
                    }}
                  />
                </>
              )}

              <View style={styles.modalButtons}>
                {step > 1 && (
                  <TouchableOpacity style={styles.previousButton} onPress={() => setStep(step - 1)}>
                    <Text style={styles.buttonText}>Previous</Text>
                  </TouchableOpacity>
                )}
                {step < 3 ? (
                  <TouchableOpacity
                    style={[
                      styles.nextButton,
                      {
                        opacity:
                          (step === 1 && !selectedLevel) ||
                          (step === 2 && !selectedDate)
                            ? 0.5
                            : 1,
                      },
                    ]}
                    onPress={() => {
                      if (step === 1 && selectedLevel) setStep(2);
                      else if (step === 2 && selectedDate) setStep(3);
                    }}
                    disabled={(step === 1 && !selectedLevel) || (step === 2 && !selectedDate)}
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SportModal;
