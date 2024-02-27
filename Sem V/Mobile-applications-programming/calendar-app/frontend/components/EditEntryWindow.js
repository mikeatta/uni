import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import CustomDatePicker from './CustomDatePicker';

export default function EditEntryWindow({ entryData, onClose, onSubmit }) {
  const [editedData, setEditedData] = useState({
    title: '',
    description: '',
    dateTime: entryData.dateTime,
    type: entryData.type,
  });

  useEffect(() => {
    // Set initial values when the component mounts
    setEditedData({
      title: entryData.title || entryData.summary || '',
      description: entryData.notes || entryData.description || '',
      dateTime: entryData.dateTime || entryData.due || new Date(),
      type: entryData.type,
    });
  }, [entryData]);

  const handleInputChange = (name, value) => {
    setEditedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setEditedData((prevState) => ({
      ...prevState,
      dateTime: date,
    }));
  };

  const handleEditSubmit = () => {
    const { title, description, dateTime } = editedData;
    const { type, id } = entryData;
    const updatedEntryData = {
      id,
      title,
      description,
      dateTime,
      type,
    };
    onSubmit(updatedEntryData);
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Edit Entry</Text>
          <TextInput
            style={styles.input}
            placeholder='Title'
            value={editedData.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Description'
            value={editedData.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <CustomDatePicker
            selected={editedData.dateTime}
            onChange={handleDateChange}
          />
          <Pressable
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={handleEditSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Exit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
