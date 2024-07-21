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
import { useUserTimeInfoContext } from '../../hooks/useUserTimeInfoContext';

type EditBoxProps = {
  entry: FormData;
  isVisible: boolean;
  onPressFunctions: {
    submit: (entry: FormData) => void;
    cancel: () => void;
  };
};

function EditBox({ entry, isVisible, onPressFunctions }: EditBoxProps) {
  const { currentTime, timeZone } = useUserTimeInfoContext();

  const selectValidInterval = (timestamp: Date) => {
    const timestampHours = timestamp.getHours();
    const timestampMinutes = timestamp.getMinutes();

    const minuteIntervals = [0, 15, 30, 45];

    const validInterval =
      minuteIntervals.find((interval) => interval > timestampMinutes) || 0;

    if (validInterval === undefined) {
      throw Error('Error setting valid timestamp interval');
    }

    const validDateTime = new Date(timestamp);

    // For intervals above 45, set the hour to next hour
    if (validInterval === 0 && timestampMinutes >= 45) {
      validDateTime.setHours(timestampHours + 1, validInterval, 0, 0);
    } else {
      validDateTime.setMinutes(validInterval, 0, 0);
    }

    return validDateTime;
  };

  const selectNextInterval = (timestamp: Date) => {
    const timestampHours = timestamp.getHours();
    const timestampMinutes = timestamp.getMinutes();

    const nextTimestamp = new Date(timestamp);

    // Set the time to the next interval past the 'start' timestamp interval
    if (timestampMinutes >= 45) {
      nextTimestamp.setHours(timestampHours + 1, 0, 0, 0);
    } else {
      nextTimestamp.setMinutes(timestampMinutes + 15, 0, 0);
    }

    const validNextDateTime = selectValidInterval(nextTimestamp);

    return validNextDateTime;
  };

  /*
   * Setting time to midnight due to Google API limitations and to properly
   * handle task syncing.
   *
   * Google API does not allow time-setting for task entries. The entries
   * pulled from the Google Calendar are automatically set to midnight on the
   * given date. To account for that during entry-syncing, we set the task time
   * to 'T00:00:00.000Z'.
   */
  const setTimeToMidnight = (date: Date) =>
    new Date(date.setUTCHours(0, 0, 0, 0));

  /*
   * Setting the 'dateTime' milliseconds to '000' to prevent from time value
   * mismatches during event entry comparison.
   */
  const resetMilliseconds = (date: Date) => new Date(date.setMilliseconds(0));

  const normalizeFormDataTimes = (formData: FormData) => {
    const submittedEntryType = formData.type;

    if (submittedEntryType === 'event') {
      resetMilliseconds(formData.start.dateTime);
      resetMilliseconds(formData.end.dateTime);
    } else if (submittedEntryType === 'task') {
      setTimeToMidnight(formData.start.dateTime);
    } else {
      throw Error('Unknown entry type while normalizing FormData times');
    }

    return formData;
  };

  const minimumStartingTime = selectValidInterval(currentTime);
  const minimumEndingTime = selectNextInterval(currentTime);

  const [editFormData, setEditFormData] = useState<FormData>(entry);

  const handleInput = async (name: string, value: string | Date) => {
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const normalizedEditFormData = normalizeFormDataTimes(editFormData);
    onPressFunctions.submit(normalizedEditFormData);
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
                  minimumDateTime={minimumStartingTime}
                  setDateTime={setEditFormData}
                />
                <DateTimePicker
                  title={'Change end time'}
                  dateTime={editFormData.end.dateTime}
                  dateTimeType={'end'}
                  minimumDateTime={minimumEndingTime}
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
                  minimumDateTime={minimumStartingTime}
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
