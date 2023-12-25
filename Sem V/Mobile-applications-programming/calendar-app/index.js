'use strict';

import { authenticateAndGetCalendar } from './auth.js';

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

async function main() {
  try {
    const calendar = await authenticateAndGetCalendar();
    await listEvents(calendar);
  } catch (err) {
    console.error('Error getting events:', err);
  }
}

main();
