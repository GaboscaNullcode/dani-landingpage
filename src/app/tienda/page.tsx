import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  TiendaHero,
  SeccionRecursosGratuitos,
  SeccionProductos,
  SeccionServicios,
} from '@/components/tienda';

export const metadata: Metadata = {
  title: 'Recursos Probados para Trabajo Remoto | Remote con Dani',
  description:
    'Guías, cursos y herramientas que te dan claridad y te ahorran meses de prueba y error. +500 personas ya dieron el salto.',
  keywords: [
    'cursos trabajo remoto',
    'ebook asistente virtual',
    'masterclass freelance',
    'recursos trabajo desde casa',
    'guía carrera digital',
    'comunidad trabajo remoto',
  ],
  openGraph: {
    title: 'Tienda - Remote con Dani',
    description:
      'Cursos, eBooks y recursos para construir tu carrera remota con confianza.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function TiendaPage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <TiendaHero />
        <SeccionRecursosGratuitos />
        <SeccionProductos />
        <SeccionServicios />
      </main>
      <Footer />
    </>
  );
}
