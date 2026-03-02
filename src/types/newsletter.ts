// All valid newsletter subscription origins
export type NewsletterSource =
  | 'home'
  | 'newsletter_page'
  | 'blog'
  | 'quiz'
  | 'recursos_gratuitos'
  | 'guia_gratuita';

export interface NewsletterSubscribeRequest {
  email: string;
  name: string;
  source: NewsletterSource;
}

export interface NewsletterSubscribeResponse {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

// Supabase record structure for suscriptores_newsletter table
export interface SuscriptorRecord {
  id: string;
  email: string;
  nombre: string;
  brevo_contact_id: number;
  origen: NewsletterSource;
  activo: boolean;
  created: string;
  updated: string;
}
