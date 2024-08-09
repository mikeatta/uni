import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { CalendarTask, FormData } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';
import ConfirmationBox from '../overlays/ConfirmationBox';
import EditBox from '../overlays/EditBox';
import DetailsBox from '../overlays/DetailsBox';

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
  const [visibility, setVisibility] = useState<{
    [key: string]: { edit: boolean; confirm: boolean; details: boolean };
  }>({});

  const toggleVisibility = (
    taskId: string,
    type: 'edit' | 'confirm' | 'details',
  ) => {
    setVisibility((prevState) => ({
      ...prevState,
      [taskId]: {
        ...prevState[taskId],
        [type]: !prevState[taskId]?.[type],
      },
    }));
  };

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
    toggleVisibility(task.id, 'edit');
  };

  const handleTaskRemoval = (taskId: string) => {
    functions.onRemove(taskId, 'task');
    toggleVisibility(taskId, 'confirm');
  };

  return (
    <View>
      <Text style={styles?.textHeader}>Tasks:</Text>
      {tasks.map((task, index) => {
        const { id, title, due } = task;
        return (
          <View key={index} style={styles?.contentContainer}>
            <TouchableOpacity
              style={styles?.content}
              activeOpacity={0.6}
              onLongPress={() => toggleVisibility(id, 'details')}
            >
              <Text>
                {new Date(due).toLocaleDateString()} |{' '}
                {title ? title : 'No title found'}
              </Text>
            </TouchableOpacity>
            <Icon
              name={
                task.status === 'completed'
                  ? 'checkbox-outline'
                  : 'square-outline'
              }
              style={styles?.icon}
              size={24}
              color={'green'}
              onPress={() => functions.onStatusChange(task)}
            />
            <Icon
              name={'create-outline'}
              style={styles?.icon}
              size={24}
              color={'blue'}
              onPress={() => toggleVisibility(id, 'edit')}
            />
            <Icon
              name={'trash-outline'}
              style={styles?.icon}
              size={24}
              color={'red'}
              onPress={() => toggleVisibility(id, 'confirm')}
            />
            {visibility[id]?.edit && (
              <EditBox
                entry={convertToFormData(task)}
                isVisible={visibility[id]?.edit}
                onPressFunctions={{
                  submit: handleTaskEdit,
                  cancel: () => toggleVisibility(id, 'edit'),
                }}
              />
            )}
            {visibility[id]?.confirm && (
              <ConfirmationBox
                isVisible={visibility[id]?.confirm}
                alertMessage={'delete the task'}
                onPressFunctions={{
                  confirm: () => handleTaskRemoval(id),
                  cancel: () => toggleVisibility(id, 'confirm'),
                }}
              />
            )}
            {visibility[id]?.details && (
              <DetailsBox
                entry={convertToFormData(task)}
                isVisible={visibility[id]?.details}
                onPressFunctions={{
                  close: () => toggleVisibility(id, 'details'),
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

export default Tasks;
