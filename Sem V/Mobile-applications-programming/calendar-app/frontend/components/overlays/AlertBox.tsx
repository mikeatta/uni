import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type AlertBoxProps = {
  title: string;
  message?: string;
};

function AlertBox({ title, message }: AlertBoxProps) {
  const messagePresent = title && message;

  const titleStyle = messagePresent ? styles.titleWithMessage : styles.title;
  const messageStyle = styles.message;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name={'wifi'} style={styles.icon} size={24} color={'white'} />
        <Text style={titleStyle}>{title}</Text>
        {message && <Text style={messageStyle}>{message}</Text>}
      </View>
    </SafeAreaView>
  );
}

export default AlertBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(127, 127, 127, 0.91)',
    position: 'absolute',
    bottom: 15,
    width: '98%',
    borderRadius: 8,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  icon: {
    flex: 1,
  },
  title: {
    flex: 10,
    color: 'white',
    textAlignVertical: 'center',
  },
  titleWithMessage: {
    flex: 5,
    textAlignVertical: 'center',
    color: 'white',
  },
  message: {
    flex: 5,
    textAlignVertical: 'center',
    color: 'white',
  },
});
