'use strict';

import { authenticateAndGetClient } from './auth.js';

async function listEvents(calendar) {
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming events:');
  events.map((event, i) => {
    const start = event.start.dateTime || event.start.date;
    console.log(`${start} - ${event.summary}`);
  });
}

async function listTasklists(tasks) {
  const res = await tasks.tasklists.list({
    maxResults: 10,
  });
  const taskEntries = res.data.items;
  if (!taskEntries || taskEntries.length === 0) {
    console.log('No tasks found.');
    return;
  }
  console.log('Available tasklists:');
  taskEntries.map((task, i) => {
    console.log(task);
  });
}

async function main() {
  try {
    const [calendar, tasks] = await authenticateAndGetClient();
    await listEvents(calendar);
    await listTasklists(tasks);
  } catch (err) {
    console.error('Error getting events:', err);
  }
}

main();
