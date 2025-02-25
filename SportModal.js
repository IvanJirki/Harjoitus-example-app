import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useSports } from './SportContext';

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

  useEffect(() => {
    console.log("Selected Level:", selectedLevel); // Debuggaus
  }, [selectedLevel]);

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
        <View style={styles.ModalOverlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.ModalContent, { opacity: fadeAnim, paddingBottom: 30 }]}>
              <Text style={styles.ModalTitle}>{selectedSport ? selectedSport : "Select Sport"}</Text>

              {step === 1 && (
                <>
                  <Text style={styles.ModalLabel}>Select Level:</Text>
                  <View style={styles.ModalPickerContainer}>
                    <Picker
                      selectedValue={selectedLevel}
                      onValueChange={(itemValue) => setSelectedLevel(itemValue)}
                      style={[styles.ModalPicker, { height: 150, color: "#000" }]}
                      itemStyle={{ fontSize: 18, color: "#000" }}
                    >
                      <Picker.Item label="Choose level..." value="" color="#888" />
                      <Picker.Item label="Beginner" value="beginner" />
                      <Picker.Item label="Intermediate" value="intermediate" />
                      <Picker.Item label="Advanced" value="advanced" />
                    </Picker>
                  </View>
                </>
              )}

              {step === 2 && (
                <>
                  <Text style={styles.ModalLabel}>Select Date:</Text>
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
                  <Text style={styles.ModalLabel}>Select Time:</Text>
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

              <View style={styles.ModalButtons}>
                {step > 1 && (
                  <TouchableOpacity style={styles.ModalPreviousButton} onPress={() => setStep(step - 1)}>
                    <Text style={styles.ModalButtonText}>Previous</Text>
                  </TouchableOpacity>
                )}
                {step < 3 ? (
                  <TouchableOpacity
                    style={[
                      styles.ModalNextButton,
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
                    <Text style={styles.ModalButtonText}>Next</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.ModalSaveButton} onPress={handleSave}>
                    <Text style={styles.ModalButtonText}>Save</Text>
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

const styles = StyleSheet.create({
  ModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 35,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 12,
  },
  ModalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500',
    textAlign: 'center',
  },
  ModalLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 15,
    color: '#333',
  },
  ModalPickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 20,
    overflow: 'hidden',
    padding: 10,
  },
  ModalPicker: {
    width: '100%',
    height: 150,
    color: '#000', // Asetetaan Pickerin fontin väri
    backgroundColor: '#f9f9f9',
  },
  ModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  ModalPreviousButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  ModalNextButton: {
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  ModalSaveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  ModalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SportModal;
