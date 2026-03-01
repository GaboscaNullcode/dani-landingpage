import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
  title: 'Newsletter - Remote con Dani | Contenido Gratuito',
  description:
    'Únete a más de 5,000 personas que reciben tips de trabajo remoto. Crea tu cuenta y accede gratis a guías, recursos y contenido exclusivo.',
  keywords: [
    'newsletter trabajo remoto',
    'contenido gratuito freelance',
    'masterclass asistente virtual',
    'tips trabajo desde casa',
    'recursos gratuitos remote',
  ],
  openGraph: {
    title: 'Newsletter - Remote con Dani',
    description:
      'Recibe tips semanales y accede a contenido exclusivo gratuito sobre trabajo remoto desde tu perfil.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function NewsletterPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <NewsletterSection source="newsletter_page" />
      </main>
      <Footer />
    </>
  );
}
