import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import BlogCategories from '@/components/blog/BlogCategories';
import PopularArticles from '@/components/blog/PopularArticles';
import LatestArticles from '@/components/blog/LatestArticles';
import {
  getLatestArticles,
  getFeaturedArticle,
  getAllCategories,
} from '@/lib/blog-service';

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

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function BlogPage() {
  const [featuredArticle, latestArticles, categories] = await Promise.all([
    getFeaturedArticle(),
    getLatestArticles(7),
    getAllCategories(),
  ]);

  // Skip the first article in latest if it's the same as featured
  const filteredLatestArticles = latestArticles.filter(
    (article) => article.id !== featuredArticle?.id
  ).slice(0, 6);

  return (
    <>
      <Navigation />
      <main id="main-content">
        <BlogHero />
        <BlogCategories categories={categories} />
        <PopularArticles featuredArticle={featuredArticle} />
        <LatestArticles articles={filteredLatestArticles} />
      </main>
      <Footer />
    </>
  );
}
