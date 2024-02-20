'use strict';

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
  return events;
}

async function addEvent(calendar, event) {
  try {
    const res = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log('New event added %s', res.data.htmlLink);
  } catch (error) {
    console.error('Error adding event', error);
  }
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
  const tasklistObjects = tasklists.map((tasklist, i) => {
    const title = tasklist.title;
    const id = tasklist.id;
    console.log(`${i + 1}. ${title} - ID: ${id}`);
    return {
      id: id,
      title: title,
    };
  });
  return tasklistObjects;
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
  return tasks;
}

async function addTask(service, task) {
  try {
    const res = await service.tasks.insert({
      tasklist: 'MTI4NTk2NzEwNjY0MzQ5NjAzNzg6MDow',
      resource: task,
    });
    console.log('Task added:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error adding task', error);
  }
}

export { listEvents, addEvent, listTasklists, listTasks, addTask };
