export interface NewsletterSubscribeRequest {
  email: string;
  name: string;
  source: 'home' | 'newsletter_page' | 'blog' | 'quiz';
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
  origen: 'home' | 'newsletter_page' | 'blog' | 'quiz';
  activo: boolean;
  created: string;
  updated: string;
}
