import { StyleProp, Text, TextStyle, View } from 'react-native';
import React, { useState } from 'react';
import { CalendarTask, FormData } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmationBox from '../overlays/ConfirmationBox';
import EditBox from '../overlays/EditBox';

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
    onEdit: (formData: FormData) => Promise<void>;
    onRemove: (id: string, type: 'task') => Promise<void>;
  };
};

function Tasks({ tasks, styles, functions }: CalendarTaskProps) {
  const [isEditVisible, setIsEditVisible] = useState<{
    [key: string]: boolean;
  }>({});

  const [isBoxVisible, setIsBoxVisible] = useState<boolean>(false);

  const handleEditBox = (taskId: string) => {
    setIsEditVisible((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleConfirmationBox = () => setIsBoxVisible(!isBoxVisible);

  const convertToFormData = (task: CalendarTask): FormData => {
    // Convert the task due date to a Date object to align with the type requirements
    const startPropertyFromDue = {
      dateTime: new Date(task.due),
      timeZone: new Date().getTimezoneOffset().toString(),
    };

    return {
      id: task.id,
      title: task.title,
      description: task.notes,
      start: startPropertyFromDue,
      end: startPropertyFromDue,
      type: 'task',
    };
  };

  const handleTaskEdit = (task: FormData) => {
    functions.onEdit(task);
    handleEditBox(task.id); // Close specified EditBox
  };

  const handleTaskRemoval = (taskId: string) => {
    functions.onRemove(taskId, 'task');
    handleConfirmationBox(); // Close ConfirmationBox
  };

  return (
    <View>
      <Text style={styles?.textHeader}>Tasks:</Text>
      {tasks.map((task, index) => {
        const { id, title, notes, due } = task;
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
              onPress={() => handleEditBox(id)}
            />
            <Icon
              name='trash-outline'
              style={styles?.icon}
              size={24}
              color='red'
              onPress={handleConfirmationBox}
            />
            {isEditVisible[id] && (
              <EditBox
                entry={convertToFormData(task)}
                isVisible={isEditVisible[id]}
                onPressFunctions={{
                  submit: handleTaskEdit,
                  cancel: () => handleEditBox(id),
                }}
              />
            )}
            <ConfirmationBox
              isVisible={isBoxVisible}
              alertMessage='delete the task'
              onPressFunctions={{
                confirm: () => handleTaskRemoval(id),
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
