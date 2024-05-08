'use strict';

const PRIMARY_TASKLIST = {
  id: null,
  title: null,
};

export async function getCalendarEvents(calendar) {
  try {
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
  } catch (error) {
    console.error('Error getting events.', error);
  }
}

export async function addCalendarEvent(calendar, event) {
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

export async function editCalendarEvent(calendar, event) {
  try {
    const res = await calendar.events.patch({
      calendarId: 'primary',
      eventId: event.eventId,
      resource: event,
    });

    console.log('Event modified successfully. Status: ', res.status);
  } catch (error) {
    console.error('Error modifying event', error);
  }
}

export async function removeCalendarEvent(calendar, { eventId }) {
  try {
    const res = await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    console.log('Event removed successfully. Status: ', res.status);
  } catch (error) {
    console.error('Error removing event', error);
  }
}

export async function getCalendarTasklists(service) {
  try {
    const res = await service.tasklists.list({
      maxResults: 10,
    });

    const tasklists = res.data.items;
    if (!tasklists || tasklists.length === 0) {
      console.log('No tasklists found.');
      return;
    }

    // Assign first found tasklist as the default
    let defaultTasklist = tasklists[0];
    if (tasklists.length > 1) {
      // Find the default tasklist with the title of 'My Tasks'
      for (const tasklist of tasklists) {
        if (tasklist.title === 'My Tasks') {
          defaultTasklist = tasklist;
          break;
        }
      }
    }

    // Update the primary tasklist properties
    PRIMARY_TASKLIST.id = defaultTasklist.id;
    PRIMARY_TASKLIST.title = defaultTasklist.title;

    // Return the first found tasklist as a fallback primary tasklist
    return defaultTasklist;
  } catch (error) {
    console.log('Error getting tasklists.', error);
  }
}

export async function getCalendarTasks(service) {
  try {
    if (!PRIMARY_TASKLIST) {
      throw new Error('Primary tasklist not found.');
    }

    const res = await service.tasks.list({
      tasklist: PRIMARY_TASKLIST.id,
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
  } catch (error) {
    console.log('Error getting tasks:', error);
  }
}

export async function addCalendarTask(service, task) {
  try {
    if (!PRIMARY_TASKLIST) {
      throw new Error('Primary tasklist not found.');
    }

    const res = await service.tasks.insert({
      tasklist: PRIMARY_TASKLIST.id,
      resource: task,
    });

    console.log('New task added %s:', res.data.htmlLink);
  } catch (error) {
    console.error('Error adding task', error);
  }
}

export async function editCalendarTask(service, task) {
  try {
    if (!PRIMARY_TASKLIST) {
      throw new Error('Primary tasklist not found.');
    }

    const res = await service.tasks.patch({
      tasklist: PRIMARY_TASKLIST.id,
      task: task.id,
      resource: task,
    });

    console.log('Task modified successfully. Status: ', res.status);
  } catch (error) {
    console.error('Error modifying task', error);
  }
}

export async function removeCalendarTask(service, { task }) {
  try {
    if (!PRIMARY_TASKLIST) {
      throw new Error('Primary tasklist not found.');
    }

    const res = await service.tasks.delete({
      tasklist: PRIMARY_TASKLIST.id,
      task: task,
    });

    console.log('Task removed successfully. Status: ', res.status);
  } catch (error) {
    console.error('Error removing task', error);
  }
}

export async function updateCalendarTaskStatus(service, task) {
  try {
    if (!PRIMARY_TASKLIST) {
      throw new Error('Primary tasklist not found.');
    }

    const res = await service.tasks.patch({
      tasklist: PRIMARY_TASKLIST.id,
      task: task.id,
      resource: task,
    });

    console.log('Task status changed successfully. Status: ', res.status);
  } catch (error) {
    console.error('Error completing task', error);
  }
}
