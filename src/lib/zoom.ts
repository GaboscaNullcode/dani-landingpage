/**
 * Zoom Server-to-Server OAuth integration.
 * Uses Account-level app credentials (no user interaction required).
 *
 * Env vars: ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET
 */

interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ZoomMeetingResult {
  meetingId: string;
  joinUrl: string;
  startUrl: string;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getZoomAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5-min margin)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 5 * 60 * 1000) {
    return cachedToken.token;
  }

  const accountId = process.env.ZOOM_ACCOUNT_ID!;
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    'base64',
  );

  const response = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom OAuth failed: ${error}`);
  }

  const data: ZoomTokenResponse = await response.json();

  cachedToken = {
    token: data.access_token,
    // Zoom tokens last 1 hour; cache for 55 minutes
    expiresAt: Date.now() + 55 * 60 * 1000,
  };

  return data.access_token;
}

export async function createZoomMeeting({
  topic,
  startTime,
  durationMinutes,
  timezone,
}: {
  topic: string;
  startTime: string;
  durationMinutes: number;
  timezone: string;
}): Promise<ZoomMeetingResult> {
  const token = await getZoomAccessToken();

  const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic,
      type: 2, // Scheduled meeting
      start_time: startTime,
      duration: durationMinutes,
      timezone,
      settings: {
        join_before_host: false,
        waiting_room: true,
        auto_recording: 'none',
        meeting_authentication: false,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Zoom create meeting failed: ${error}`);
  }

  const data = await response.json();

  return {
    meetingId: String(data.id),
    joinUrl: data.join_url,
    startUrl: data.start_url,
  };
}

export async function deleteZoomMeeting(meetingId: string): Promise<void> {
  const token = await getZoomAccessToken();

  const response = await fetch(
    `https://api.zoom.us/v2/meetings/${meetingId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  // 204 = success, 404 = already deleted (both are fine)
  if (!response.ok && response.status !== 404) {
    const error = await response.text();
    throw new Error(`Zoom delete meeting failed: ${error}`);
  }
}
