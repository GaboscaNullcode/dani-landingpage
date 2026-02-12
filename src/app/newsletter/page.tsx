import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
  title: 'Newsletter - Remote con Dani | Guía Gratuita y Masterclass',
  description:
    'Únete a más de 5,000 personas que reciben tips de trabajo remoto. Descarga gratis la Fórmula para un Título Optimizado y accede a la masterclass de 2 horas.',
  keywords: [
    'newsletter trabajo remoto',
    'guía gratuita freelance',
    'masterclass asistente virtual',
    'tips trabajo desde casa',
    'recursos gratuitos remote',
  ],
  openGraph: {
    title: 'Newsletter - Remote con Dani',
    description:
      'Recibe tips semanales, guías gratuitas y acceso a contenido exclusivo sobre trabajo remoto.',
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
