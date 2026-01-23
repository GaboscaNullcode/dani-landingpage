import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  TiendaHero,
  ProductosDestacados,
  ProductosAdicionales,
  RecursosGratuitos,
} from '@/components/tienda';

export const metadata: Metadata = {
  title: 'Tienda - Remote con Dani | Cursos y Recursos para Trabajo Remoto',
  description:
    'Descubre cursos, eBooks y recursos diseñados para ayudarte a construir tu carrera remota. Desde guías gratuitas hasta programas completos.',
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
        <ProductosDestacados />
        <ProductosAdicionales />
        <RecursosGratuitos />
      </main>
      <Footer />
    </>
  );
}
