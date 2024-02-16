'use strict';

import express from 'express';
import cors from 'cors';
import { authenticateAndGetClient } from './auth.js';
import { listEvents, listTasklists, listTasks } from './taskManager.js';

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/api/v1/calendar', async (req, res) => {
  try {
    // Perform calendar related operations
    const [calendar, service] = await authenticateAndGetClient();
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
