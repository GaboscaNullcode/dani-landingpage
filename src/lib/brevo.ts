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
): Promise<void> {
  const api = getApi();
  const email = new SendSmtpEmail();
  email.sender = sender;
  email.to = [{ email: to }];
  email.subject = subject;
  email.htmlContent = htmlContent;

  await api.sendTransacEmail(email);
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
): Promise<void> {
  const subject = `Tu sesion de ${planName} esta confirmada`;
  const html = getBookingConfirmationEmailHtml(
    name,
    planName,
    fecha,
    hora,
    duracion,
    timezone,
    zoomUrl,
  );
  await sendEmail(to, subject, html);
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
