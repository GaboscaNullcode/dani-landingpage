/**
 * Google Calendar integration via Service Account.
 *
 * Env vars: GOOGLE_SERVICE_ACCOUNT_JSON (base64-encoded), GOOGLE_CALENDAR_ID
 */

import { google } from 'googleapis';

function getCalendarClient() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!;
  const credentials = JSON.parse(
    Buffer.from(serviceAccountJson, 'base64').toString('utf-8'),
  );

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

export async function createCalendarEvent({
  summary,
  description,
  startDateTime,
  endDateTime,
  timezone,
  attendeeEmail,
  zoomJoinUrl,
}: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  attendeeEmail: string;
  zoomJoinUrl?: string;
}): Promise<string> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const fullDescription = zoomJoinUrl
    ? `${description}\n\nZoom: ${zoomJoinUrl}`
    : description;

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary,
      description: fullDescription,
      start: { dateTime: startDateTime, timeZone: timezone },
      end: { dateTime: endDateTime, timeZone: timezone },
      attendees: [{ email: attendeeEmail }],
      conferenceData: undefined,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 15 },
        ],
      },
    },
    sendUpdates: 'all',
  });

  return event.data.id!;
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  try {
    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all',
    });
  } catch (error: unknown) {
    const gError = error as { code?: number };
    // 404/410 = already deleted
    if (gError.code !== 404 && gError.code !== 410) {
      throw error;
    }
  }
}
