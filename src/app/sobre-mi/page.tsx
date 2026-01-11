import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  SobreMiHeroSection,
  IntroSection,
  SobreMiHistorySection,
  SobreMiExperienceSection,
  SobreMiMissionSection,
  SobreMiCTASection,
} from '@/components/sobre-mi';

export const metadata: Metadata = {
  title: 'Sobre Mi - Dani Zilbert | Coach de Trabajo Remoto',
  description:
    'Conoce mi historia: de $3.25/hora como interprete a coach de trabajo remoto. Te ayudo a encontrar trabajo remoto y construir tu carrera digital con libertad.',
  keywords: [
    'Dani Zilbert',
    'coach trabajo remoto',
    'asistente virtual',
    'trabajo remoto',
    'freelance',
    'carrera digital',
  ],
  openGraph: {
    title: 'Sobre Mi - Dani Zilbert | Coach de Trabajo Remoto',
    description:
      'Conoce mi historia: de $3.25/hora como interprete a coach de trabajo remoto.',
    type: 'profile',
  },
};

export default function SobreMiPage() {
  return (
    <>
      <Navigation />
      <main>
        <SobreMiHeroSection />
        <IntroSection />
        <SobreMiHistorySection />
        <SobreMiExperienceSection />
        <SobreMiMissionSection />
        <SobreMiCTASection />
      </main>
      <Footer />
    </>
  );
}
