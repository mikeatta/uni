import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

type ConfirmationBoxProps = {
  alertMessage: string;
  isVisible: boolean;
  onPressFunctions: {
    confirm: () => void;
    cancel: () => void;
  };
};

function ConfirmationBox({
  alertMessage,
  isVisible,
  onPressFunctions,
}: ConfirmationBoxProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='fade'
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onPressFunctions.cancel}>
        <View style={styles.overlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupHeader}>Confirm action</Text>
            <Text style={styles.popupMessage}>
              Are you sure you want to {alertMessage}?
            </Text>
            <View style={styles.buttonContainer}>
              <Button title='cancel' onPress={onPressFunctions.cancel} />
              <Button title='confirm' onPress={onPressFunctions.confirm} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default ConfirmationBox;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
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
  popupMessage: {
    marginBottom: 20,
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
