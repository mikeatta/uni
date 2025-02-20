import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type AlertBoxProps = {
  title: string;
  message?: string;
};

function AlertBox({ title, message }: AlertBoxProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  let translation = useRef(new Animated.Value(-65)).current;

  const translationY = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [-65, 0],
  });

  const messagePresent = title && message;

  const titleStyle = messagePresent ? styles.titleWithMessage : styles.title;
  const messageStyle = styles.message;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(translation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: translationY }] }]}
    >
      <TouchableOpacity onPress={() => setIsVisible(false)}>
        <View style={styles.content}>
          <Icon name={'wifi'} style={styles.icon} size={24} color={'white'} />
          <Text style={titleStyle}>{title}</Text>
          {message && <Text style={messageStyle}>{message}</Text>}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default AlertBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(127, 127, 127, 0.91)',
    position: 'absolute',
    bottom: -50,
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
