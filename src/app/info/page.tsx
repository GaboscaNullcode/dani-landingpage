import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { InfoHero, ContactoSection, FAQSection } from '@/components/info';
import { StageTransitionCTA } from '@/components/stages';

export const metadata: Metadata = {
  title: 'Info - Remote con Dani | Preguntas Frecuentes y Contacto',
  description:
    'Encuentra respuestas a tus preguntas sobre trabajo remoto, asesorías y productos. Contacta con Dani para resolver tus dudas.',
  keywords: [
    'preguntas frecuentes trabajo remoto',
    'contacto remote con dani',
    'FAQ asistente virtual',
    'información trabajo remoto',
  ],
  openGraph: {
    title: 'Info - Remote con Dani',
    description:
      'Centro de información con FAQ y formas de contacto.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function InfoPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <InfoHero />
        <FAQSection />
        <ContactoSection />
        <StageTransitionCTA
          text="¿Necesitas acompañamiento más personalizado?"
          primaryText="Ver servicios personalizados"
          primaryHref="/asesorias"
        />
      </main>
      <Footer />
    </>
  );
}
