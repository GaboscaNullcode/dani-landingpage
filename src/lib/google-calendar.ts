/**
 * Google Calendar integration via Service Account.
 *
 * Env vars:
 *  - GOOGLE_SERVICE_ACCOUNT_JSON (base64-encoded)
 *  - GOOGLE_CALENDAR_ID (calendar for creating events)
 *  - GOOGLE_CALENDAR_IDS_BUSY (comma-separated calendar IDs for FreeBusy checks)
 */

import { google } from 'googleapis';
import type { BusyPeriod } from '@/types/reservas';

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

/**
 * Query FreeBusy availability across multiple Google Calendars.
 *
 * Reads calendar IDs from GOOGLE_CALENDAR_IDS_BUSY env var (comma-separated).
 * Returns a flat, merged array of busy periods across all calendars.
 */
export async function getFreeBusySlots(
  startDate: string,
  endDate: string,
): Promise<BusyPeriod[]> {
  const rawIds = process.env.GOOGLE_CALENDAR_IDS_BUSY;
  if (!rawIds) return [];

  const calendarIds = rawIds
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  if (calendarIds.length === 0) return [];

  const calendar = getCalendarClient();

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: startDate,
      timeMax: endDate,
      items: calendarIds.map((id) => ({ id })),
    },
  });

  const calendars = response.data.calendars ?? {};
  const busyPeriods: BusyPeriod[] = [];

  for (const calId of calendarIds) {
    const entries = calendars[calId]?.busy ?? [];
    for (const entry of entries) {
      if (entry.start && entry.end) {
        busyPeriods.push({ start: entry.start, end: entry.end });
      }
    }
  }

  return busyPeriods;
}
