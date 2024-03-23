import { StyleProp, Text, TextStyle, View } from 'react-native';
import React, { useState } from 'react';
import { CalendarTask } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmationBox from '../overlays/ConfirmationBox';

type CalendarTaskProps = {
  tasks: CalendarTask[];
  styles?: {
    textHeader: StyleProp<TextStyle>;
    contentContainer: StyleProp<TextStyle>;
    content: StyleProp<TextStyle>;
    icon: StyleProp<TextStyle>;
  };
  functions: {
    onStatusChange: (task: CalendarTask) => Promise<void>;
    onEdit: (formData: CalendarTask) => Promise<void>;
    onRemove: (id: string, type: 'task') => Promise<void>;
  };
};

function Tasks({ tasks, styles, functions }: CalendarTaskProps) {
  const [isBoxVisible, setIsBoxVisible] = useState<boolean>(false);

  const handleConfirmationBox = () => setIsBoxVisible(!isBoxVisible);

  const handleTaskRemoval = (taskId: string) => {
    functions.onRemove(taskId, 'task');
    handleConfirmationBox(); // Close ConfirmationBox
  };

  return (
    <View>
      <Text style={styles?.textHeader}>Tasks:</Text>
      {tasks.map((task, index) => {
        const { title, notes, due } = task;
        return (
          <View key={index} style={styles?.contentContainer}>
            <Text style={styles?.content}>
              {new Date(due).toLocaleDateString()} | {title}{' '}
              {notes && `- ${notes}`}
            </Text>
            <Icon
              name={
                task.status === 'completed'
                  ? 'checkbox-outline'
                  : 'square-outline'
              }
              style={styles?.icon}
              size={24}
              color='green'
              onPress={() => functions.onStatusChange(task)}
            />
            <Icon
              name='create-outline'
              style={styles?.icon}
              size={24}
              color='blue'
            />
            <Icon
              name='trash-outline'
              style={styles?.icon}
              size={24}
              color='red'
              onPress={handleConfirmationBox}
            />
            <ConfirmationBox
              isVisible={isBoxVisible}
              alertMessage='delete the task'
              onPressFunctions={{
                confirm: () => handleTaskRemoval(task.id),
                cancel: handleConfirmationBox,
              }}
            />
          </View>
        );
      })}
    </View>
  );
}

export default Tasks;
