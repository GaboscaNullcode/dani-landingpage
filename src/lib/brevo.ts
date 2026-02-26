import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
  ContactsApi,
  ContactsApiApiKeys,
  CreateContact,
} from '@getbrevo/brevo';
import {
  getPurchaseEmailHtml,
  getWelcomeEmailHtml,
  getCommunityEmailHtml,
  getNewsletterWelcomeEmailHtml,
  getPasswordResetEmailHtml,
  getBookingConfirmationEmailHtml,
  getBookingNotificationEmailHtml,
  getBookingReminderEmailHtml,
  getProgramaIntensivoFullPaymentEmailHtml,
  getProgramaIntensivoPago1EmailHtml,
  getAsesoriaPostPaymentEmailHtml,
} from './email-templates';

let apiInstance: TransactionalEmailsApi | null = null;
let contactsInstance: ContactsApi | null = null;

function getApi(): TransactionalEmailsApi {
  if (!apiInstance) {
    apiInstance = new TransactionalEmailsApi();
    apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY!,
    );
  }
  return apiInstance;
}

function getContactsApi(): ContactsApi {
  if (!contactsInstance) {
    contactsInstance = new ContactsApi();
    contactsInstance.setApiKey(
      ContactsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY!,
    );
  }
  return contactsInstance;
}

const sender = {
  email: process.env.BREVO_SENDER_EMAIL || 'hola@remotivaconnecta.com',
  name: process.env.BREVO_SENDER_NAME || 'Remote con Dani',
};

async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
  attachment?: { content: string; name: string },
): Promise<void> {
  console.log(`[brevo] Sending email to=${to} subject="${subject}" hasAttachment=${!!attachment}`);
  try {
    const api = getApi();
    const email = new SendSmtpEmail();
    email.sender = sender;
    email.to = [{ email: to }];
    email.subject = subject;
    email.htmlContent = htmlContent;

    if (attachment) {
      email.attachment = [
        { content: attachment.content, name: attachment.name },
      ];
    }

    await api.sendTransacEmail(email);
    console.log(`[brevo] Email sent successfully to=${to}`);
  } catch (error) {
    console.error(`[brevo] Failed to send email to=${to}:`, error);
    throw error;
  }
}

function generateIcsContent({
  summary,
  description,
  startDateTime,
  endDateTime,
  timezone,
  organizerEmail,
  attendeeEmail,
  location,
}: {
  summary: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  timezone: string;
  organizerEmail: string;
  attendeeEmail: string;
  location?: string;
}): string {
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@remotecondani.com`;
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const formatDt = (iso: string) =>
    new Date(iso)
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Remote con Dani//Booking//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=${timezone}:${formatDt(startDateTime)}`,
    `DTEND;TZID=${timezone}:${formatDt(endDateTime)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `ORGANIZER;CN=Remote con Dani:mailto:${organizerEmail}`,
    `ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT:mailto:${attendeeEmail}`,
    'STATUS:CONFIRMED',
  ];

  if (location) {
    lines.push(`LOCATION:${location}`);
  }

  lines.push(
    'BEGIN:VALARM',
    'TRIGGER:-PT60M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio de sesion',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT15M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Tu sesion comienza en 15 minutos',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  );

  return lines.join('\r\n');
}

export async function sendPurchaseEmail(
  to: string,
  name: string,
  productName: string,
  accessUrl: string,
  isSubscription: boolean,
): Promise<void> {
  const subject = `Tu acceso a ${productName} esta listo`;
  const html = getPurchaseEmailHtml(productName, accessUrl, isSubscription);
  await sendEmail(to, subject, html);
}

export async function sendWelcomeEmail(
  to: string,
  name: string,
  tempPassword: string,
): Promise<void> {
  const subject = 'Bienvenida a Remote con Dani';
  const html = getWelcomeEmailHtml(name, to, tempPassword);
  await sendEmail(to, subject, html);
}

export async function sendCommunityEmail(
  to: string,
  name: string,
  productName: string,
  whatsappLink: string,
  accessUrl: string,
): Promise<void> {
  const subject = `Bienvenida a ${productName}`;
  const html = getCommunityEmailHtml(productName, whatsappLink, accessUrl);
  await sendEmail(to, subject, html);
}

/**
 * Adds or updates a contact in the Brevo newsletter list.
 * Returns the contact id and whether it was already subscribed.
 */
export async function addNewsletterContact(
  email: string,
  name: string,
): Promise<{ contactId: number; alreadySubscribed: boolean }> {
  const api = getContactsApi();
  const listId = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '0', 10);
  if (!listId) {
    throw new Error('BREVO_NEWSLETTER_LIST_ID no esta configurado o es invalido');
  }

  const contact = new CreateContact();
  contact.email = email;
  contact.attributes = { FIRSTNAME: name, NOMBRE: name };
  contact.listIds = [listId];
  contact.emailBlacklisted = false;
  contact.smsBlacklisted = false;
  contact.updateEnabled = true;

  try {
    const result = await api.createContact(contact);
    return {
      contactId: (result.body as { id: number }).id,
      alreadySubscribed: false,
    };
  } catch (error: unknown) {
    const axiosError = error as {
      response?: { status?: number; body?: { message?: string; code?: string } };
    };
    // Brevo returns 400 with "Contact already exist" for duplicates
    if (
      axiosError.response?.status === 400 &&
      (axiosError.response?.body?.message?.includes('Contact already exist') ||
        axiosError.response?.body?.code === 'duplicate_parameter')
    ) {
      return { contactId: 0, alreadySubscribed: true };
    }
    throw error;
  }
}

export async function sendNewsletterWelcomeEmail(
  to: string,
  name: string,
): Promise<void> {
  const guideUrl =
    process.env.NEWSLETTER_GUIDE_URL || 'https://remotecondani.com/newsletter';
  const subject = 'Tu guia gratuita esta aqui';
  const html = getNewsletterWelcomeEmailHtml(name, guideUrl);
  await sendEmail(to, subject, html);
}

// ── Password reset email ──

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
): Promise<void> {
  const subject = 'Restablece tu contrasena';
  const html = getPasswordResetEmailHtml(resetUrl);
  await sendEmail(to, subject, html);
}

// ── Programa Intensivo emails ──

export async function sendProgramaIntensivoFullPaymentEmail(
  to: string,
  name: string,
  accessUrl: string,
): Promise<void> {
  const subject = 'Tu Programa Intensivo ya esta activo';
  const html = getProgramaIntensivoFullPaymentEmailHtml(name, accessUrl);
  await sendEmail(to, subject, html);
}

export async function sendProgramaIntensivoPago1Email(
  to: string,
  name: string,
  accessUrl: string,
): Promise<void> {
  const subject = 'Ya tienes acceso a tus materiales (Pago 1 recibido)';
  const html = getProgramaIntensivoPago1EmailHtml(name, accessUrl);
  await sendEmail(to, subject, html);
}

// ── Asesoria post-payment email ──

export async function sendAsesoriaPostPaymentEmail(
  to: string,
  schedulingUrl: string,
  masterclassUrl: string,
): Promise<void> {
  const subject = 'Ya casi estamos list@s ✨ Agenda tu sesión';
  const html = getAsesoriaPostPaymentEmailHtml(schedulingUrl, masterclassUrl);
  await sendEmail(to, subject, html);
}

// ── Booking emails ──

export async function sendBookingConfirmationEmail(
  to: string,
  name: string,
  planName: string,
  fecha: string,
  hora: string,
  duracion: number,
  timezone: string,
  zoomUrl?: string,
  masterclassUrl?: string,
  fechaIso?: string,
): Promise<void> {
  const subject = 'Tu sesión con Dani está confirmada ✨';
  const html = getBookingConfirmationEmailHtml(
    name,
    planName,
    fecha,
    hora,
    duracion,
    timezone,
    zoomUrl,
    masterclassUrl,
  );

  // Generate .ics calendar invite attachment if raw date is available
  let attachment: { content: string; name: string } | undefined;
  if (fechaIso) {
    try {
      const [h, m] = hora.split(':').map(Number);
      const [year, month, day] = fechaIso.split('-').map(Number);
      const startDt = new Date(year, month - 1, day, h, m);
      const endDt = new Date(startDt.getTime() + duracion * 60000);

      console.log(`[brevo] Generating ICS: fechaIso=${fechaIso} hora=${hora} start=${startDt.toISOString()} end=${endDt.toISOString()}`);

      const icsContent = generateIcsContent({
        summary: `${planName} - Remote con Dani`,
        description: `Sesion de ${planName} con Dani.${zoomUrl ? `\\nZoom: ${zoomUrl}` : ''}`,
        startDateTime: startDt.toISOString(),
        endDateTime: endDt.toISOString(),
        timezone,
        organizerEmail: sender.email,
        attendeeEmail: to,
        location: zoomUrl,
      });

      attachment = {
        content: Buffer.from(icsContent).toString('base64'),
        name: 'sesion-remote-con-dani.ics',
      };
      console.log(`[brevo] ICS generated successfully (${icsContent.length} bytes)`);
    } catch (icsError) {
      console.error('[brevo] Failed to generate ICS:', icsError);
      // Continue without attachment — email is more important
    }
  } else {
    console.log('[brevo] No fechaIso provided, skipping ICS attachment');
  }

  await sendEmail(to, subject, html, attachment);
}

export async function sendBookingNotificationToDani(
  clientName: string,
  clientEmail: string,
  planName: string,
  fecha: string,
  hora: string,
  duracion: number,
  timezone: string,
  zoomStartUrl?: string,
  notas?: string,
): Promise<void> {
  const daniEmail = process.env.DANI_EMAIL || sender.email;
  const subject = `Nueva reserva: ${planName} con ${clientName}`;
  const html = getBookingNotificationEmailHtml(
    clientName,
    clientEmail,
    planName,
    fecha,
    hora,
    duracion,
    timezone,
    zoomStartUrl,
    notas,
  );
  await sendEmail(daniEmail, subject, html);
}

export async function sendBookingReminderEmail(
  to: string,
  name: string,
  planName: string,
  fecha: string,
  hora: string,
  duracion: number,
  timezone: string,
  zoomUrl: string,
  reminderType: '3d' | '24h' | '1h',
): Promise<void> {
  const reminderLabel =
    reminderType === '3d'
      ? 'en 3 dias'
      : reminderType === '24h'
        ? 'manana'
        : 'en 1 hora';
  const subject = `Recordatorio: tu ${planName} es ${reminderLabel}`;
  const html = getBookingReminderEmailHtml(
    name,
    planName,
    fecha,
    hora,
    duracion,
    timezone,
    zoomUrl,
    reminderType,
  );
  await sendEmail(to, subject, html);
}
