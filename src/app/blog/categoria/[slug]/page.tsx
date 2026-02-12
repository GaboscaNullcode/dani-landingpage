import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BlogCategories from '@/components/blog/BlogCategories';
import LatestArticles from '@/components/blog/LatestArticles';
import {
  getCategoryBySlug,
  getArticlesByCategory,
  getAllCategories,
} from '@/lib/blog-service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Categoría no encontrada | Remote con Dani' };
  }

  return {
    title: `${category.name} - Blog | Remote con Dani`,
    description: `Artículos sobre ${category.name.toLowerCase()}. Consejos y experiencias reales para tu carrera remota.`,
    openGraph: {
      title: `${category.name} - Blog | Remote con Dani`,
      description: `Artículos sobre ${category.name.toLowerCase()}.`,
      type: 'website',
      locale: 'es_ES',
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  const [category, articles, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getArticlesByCategory(slug),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main id="main-content">
        {/* Category Hero */}
        <section
          className="relative overflow-hidden"
          style={{
            paddingTop: 'var(--hero-padding-top)',
            paddingBottom: 'var(--section-padding)',
            background:
              'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
          }}
        >
          <div className="container-custom relative z-10 text-center">
            <span
              className="mb-4 inline-block rounded-full px-4 py-1.5 font-[var(--font-dm-sans)] text-xs font-medium uppercase tracking-wider text-white"
              style={{ backgroundColor: category.accentColor }}
            >
              {category.articleCount} artículo{category.articleCount !== 1 ? 's' : ''}
            </span>
            <h1 className="mb-4 font-[var(--font-headline)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-black-deep">
              {category.name}
            </h1>
            <p className="mx-auto max-w-xl text-lg text-gray-carbon">
              Explora todos los artículos de esta categoría.
            </p>
          </div>
        </section>

        <BlogCategories categories={allCategories} activeSlug={slug} />

        <LatestArticles
          articles={articles}
          title={category.name}
          subtitle="Artículos"
        />
      </main>
      <Footer />
    </>
  );
}
