import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FormData } from '../types';

type DetailsBoxProps = {
  entry: FormData;
  isVisible: boolean;
  onPressFunctions: {
    close: () => void;
  };
};

function DetailsBox({ entry, isVisible, onPressFunctions }: DetailsBoxProps) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='fade'
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onPressFunctions.close}>
        <View style={styles.overlay}>
          <View style={styles.popupContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.popupHeader}>Entry Details</Text>
              <Icon
                name='close-outline'
                style={styles.closeIcon}
                size={24}
                color='grey'
                onPress={onPressFunctions.close}
              />
            </View>
            {entry.type === 'event' ? (
              // Event entry details
              <View>
                <Text style={styles.popupContent}>
                  Date & Time: {entry.start.dateTime.toLocaleDateString()}{' '}
                  {entry.start.dateTime.toLocaleTimeString()} -{' '}
                  {entry.end.dateTime.toLocaleDateString()}{' '}
                  {entry.end.dateTime.toLocaleTimeString()}
                </Text>
                <Text style={styles.popupContent}>
                  Summary: {entry.title ? entry.title : 'No summary found'}
                </Text>
                <Text style={styles.popupContent}>
                  Description:{' '}
                  {entry.description
                    ? entry.description
                    : 'No description found'}
                </Text>
              </View>
            ) : (
              // Task entry details
              <View>
                <Text style={styles.popupContent}>
                  Due: {entry.start.dateTime.toDateString()}
                </Text>
                <Text style={styles.popupContent}>
                  Title: {entry.title ? entry.title : 'No title found'}
                </Text>
                <Text style={styles.popupContent}>
                  Description:{' '}
                  {entry.description ? entry.description : 'No notes found'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default DetailsBox;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popupHeader: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeIcon: {
    flexShrink: 0,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  popupContent: {
    marginBottom: 20,
  },
});
