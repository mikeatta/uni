import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

type SliderProps = {
  onValueChange: (value: 'list' | 'calendar') => Promise<void>;
};

function Slider({ onValueChange }: SliderProps) {
  const [active, setActive] = useState<boolean>(false);
  let translation = useRef(new Animated.Value(0)).current;
  const { width: deviceScreenWidth } = useWindowDimensions();

  useEffect(() => {
    if (active) {
      Animated.timing(translation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [active]);

  const translationX = translation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, (deviceScreenWidth / 2) * 0.96 - 5],
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          borderRadius: 10,
          backgroundColor: '#efebf0',
          marginHorizontal: 5,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            height: 50 - 2 * 2,
            top: 2,
            bottom: 2,
            borderRadius: 10,
            width: (deviceScreenWidth / 2) * 0.96 - 7,
            transform: [
              {
                translateX: translationX,
              },
            ],
            backgroundColor: 'white',
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setActive(false);
            onValueChange('list');
          }}
        >
          <Text>List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setActive(true);
            onValueChange('calendar');
          }}
        >
          <Text>Calendar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Slider;
