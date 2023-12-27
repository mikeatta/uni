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

async function listTasklists(service) {
  const res = await service.tasklists.list({
    maxResults: 10,
  });
  const tasklists = res.data.items;
  if (!tasklists || tasklists.length === 0) {
    console.log('No tasks found.');
    return;
  }
  console.log('Available tasklists:');
  tasklists.map((tasklist, i) => {
    console.log(tasklist);
  });
}

async function listTasks(service) {
  const res = await service.tasks.list({
    tasklist: 'MTI4NTk2NzEwNjY0MzQ5NjAzNzg6MDow',
  });
  const tasks = res.data.items;
  if (!tasks || tasks.length === 0) {
    console.log('No tasks found.');
    return;
  }
  console.log('Found tasks:');
  tasks.map((task, i) => {
    // Extract just the due date from the string
    const due = new Date(task.due).toISOString().split('T')[0];
    const title = task.title;
    const notes = task.notes !== undefined ? task.notes : '';
    // Print notes if available, else print just the date and title
    console.log(notes ? `${due} - ${title}: ${notes}` : `${due} - ${title}`);
  });
}

async function main() {
  try {
    const [calendar, service] = await authenticateAndGetClient();
    await listEvents(calendar);
    await listTasklists(service);
    await listTasks(service);
  } catch (err) {
    console.error('Error getting events:', err);
  }
}

main();
