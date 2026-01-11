import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import PopularArticles from '@/components/blog/PopularArticles';
import LatestArticles from '@/components/blog/LatestArticles';

export const metadata: Metadata = {
  title: 'Blog - Remote con Dani | Consejos para Trabajo Remoto',
  description:
    'Descubre consejos, herramientas y experiencias reales sobre trabajo remoto, freelancing y cómo construir una carrera digital exitosa.',
  keywords: [
    'blog trabajo remoto',
    'consejos freelance',
    'asistente virtual tips',
    'trabajar desde casa',
    'carrera digital',
  ],
  openGraph: {
    title: 'Blog - Remote con Dani',
    description:
      'Consejos, herramientas y experiencias reales para construir tu carrera remota.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main>
        <BlogHero />
        <PopularArticles />
        <LatestArticles />
      </main>
      <Footer />
    </>
  );
}
