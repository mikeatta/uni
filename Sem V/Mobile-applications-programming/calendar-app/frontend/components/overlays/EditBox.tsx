import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { FormData } from '../types';
import DateTimePicker from '../common/DateTimePicker';
import DateOnlyPicker from '../common/DateOnlyPicker';

type EditBoxProps = {
  entry: FormData;
  isVisible: boolean;
  onPressFunctions: {
    submit: (entry: FormData) => void;
    cancel: () => void;
  };
};

function EditBox({ entry, isVisible, onPressFunctions }: EditBoxProps) {
  const [editFormData, setEditFormData] = useState<FormData>(entry);

  const handleInput = async (name: string, value: string | Date) => {
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onPressFunctions.submit(editFormData);
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={'fade'}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onPressFunctions.cancel}>
        <View style={styles.overlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupHeader}>Edit entry</Text>
            <TextInput
              placeholder={'Title'}
              style={styles.input}
              value={editFormData.title}
              onChangeText={(text) => handleInput('title', text)}
            />
            <TextInput
              placeholder={'Description'}
              style={styles.input}
              value={editFormData.description}
              onChangeText={(text) => handleInput('description', text)}
            />
            {editFormData.type === 'event' ? (
              // Date and time picker for changing event entry time
              <View style={styles.picker}>
                <DateTimePicker
                  title={'Change start time'}
                  dateTime={editFormData.start.dateTime}
                  dateTimeType={'start'}
                  setDateTime={setEditFormData}
                />
                <DateTimePicker
                  title={'Change end time'}
                  dateTime={editFormData.end.dateTime}
                  dateTimeType={'end'}
                  setDateTime={setEditFormData}
                />
              </View>
            ) : (
              // Date only picker for changing task entry due date
              <View style={styles.picker}>
                <DateOnlyPicker
                  title={'Change due date'}
                  dateTime={editFormData.start.dateTime}
                  dateTimeType={'start'}
                  setDateTime={setEditFormData}
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              <Button title={'cancel'} onPress={onPressFunctions.cancel} />
              <Button title={'confirm'} onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default EditBox;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '70%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  popupHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
    paddingLeft: 22,
    borderColor: '#808080',
    borderRadius: 10,
    borderWidth: 1,
  },
  picker: {
    marginTop: 16,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    color: 'red',
  },
  confirmButton: {
    color: 'green',
  },
});
