import {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
  SendSmtpEmail,
} from '@getbrevo/brevo';
import {
  getPurchaseEmailHtml,
  getWelcomeEmailHtml,
  getCommunityEmailHtml,
} from './email-templates';

let apiInstance: TransactionalEmailsApi | null = null;

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
