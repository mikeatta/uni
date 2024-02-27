'use strict';

import express from 'express';
import cors from 'cors';
import { authenticateAndGetClient } from './auth.js';
import {
  listEvents,
  addEvent,
  editEvent,
  removeEvent,
  listTasklists,
  listTasks,
  addTask,
  editTask,
  removeTask,
  updateTaskStatus,
} from './taskManager.js';

const app = express();
const port = 3001;

let calendar;
let service;

// Enable CORS for all routes
app.use(cors());

// Parse JSON
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Authenticate the client upon server startup
(async () => {
  try {
    [calendar, service] = await authenticateAndGetClient();
    console.log('User authenticated.');
  } catch (err) {
    console.error('User authentication error:', err);
    process.exit(1);
  }
})();

app.get('/api/v1/calendar', async (req, res) => {
  try {
    // Perform calendar related operations
    const events = (await listEvents(calendar)) || [];
    const tasklists = (await listTasklists(service)) || [];
    const tasks = (await listTasks(service)) || [];

    // Send the response back to the frontend
    res.json({ events, tasklists, tasks });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/v1/calendar/new-entry', async (req, res) => {
  try {
    const { title, description, dateTime, type } = req.body;

    if (type === 'event') {
      const event = {
        summary: title,
        description: description,
        start: {
          dateTime: dateTime,
          timeZone: 'CET',
        },
        end: {
          dateTime: dateTime,
          timeZone: 'CET',
        },
      };

      await addEvent(calendar, event);
    } else {
      const task = {
        title: title,
        notes: description,
        due: dateTime,
      };

      await addTask(service, task);
    }

    res.status(200).json({ message: 'Entry added successfully!' });
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/v1/calendar/modify-entry', async (req, res) => {
  try {
    const { id, title, description, dateTime, type } = req.body;

    if (type === 'event') {
      const event = {
        eventId: id,
        summary: title,
        description: description,
        start: {
          dateTime: dateTime,
          timeZone: 'CET',
        },
        end: {
          dateTime: dateTime,
          timeZone: 'CET',
        },
      };

      await editEvent(calendar, event);
    } else {
      const task = {
        id: id,
        title: title,
        notes: description,
        due: dateTime,
      };

      await editTask(service, task);
    }

    res.status(200).json({ message: 'Entry modified successfully!' });
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/v1/calendar/update-task-status', async (req, res) => {
  try {
    let task = req.body;

    // Toggle the task status
    if (task.status === 'completed') {
      task = { ...task, status: 'needsAction' };
    } else {
      task = { ...task, status: 'completed' };
    }

    await updateTaskStatus(service, task);

    res.status(200).json({ message: 'Task status updated successfully!' });
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/v1/calendar/remove-entry', async (req, res) => {
  try {
    const { id, type } = req.body;

    if (type === 'event') {
      const event = {
        eventId: id,
      };

      await removeEvent(calendar, event);
    } else {
      const task = {
        task: id,
      };

      await removeTask(service, task);
    }

    res.status(200).json({ message: 'Entry removed successfully!' });
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
