import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PostHeader from '@/components/blog/PostHeader';
import PostContent from '@/components/blog/PostContent';
import RelatedArticles from '@/components/blog/RelatedArticles';
import {
  getArticleBySlug,
  getCategoryById,
  getRelatedArticles,
  getAllSlugs,
} from '@/data/blog-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado | Dani Remota',
    };
  }

  const category = getCategoryById(article.categoryId);

  return {
    title: `${article.title} | Dani Remota`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: ['Dani'],
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      tags: category ? [category.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.thumbnail],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const category = getCategoryById(article.categoryId);

  if (!category) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.categoryId, article.id, 3);

  // Default content if no content is provided
  const defaultContent = `
<p>Este artículo está en desarrollo. Próximamente encontrarás aquí contenido valioso sobre ${article.title.toLowerCase()}.</p>

<h2>¿Qué puedes esperar?</h2>

<p>En este artículo vamos a explorar en profundidad todo lo relacionado con este tema. Desde mi experiencia trabajando de forma remota, he aprendido que los detalles importan.</p>

<blockquote>
<p>"El trabajo remoto no es solo trabajar desde casa. Es construir una vida con intención, donde el trabajo es una parte importante pero no la única."</p>
</blockquote>

<h2>Los puntos clave</h2>

<p>Aquí te compartiré mis principales aprendizajes:</p>

<ul>
<li><strong>Mentalidad primero</strong>: Sin el enfoque correcto, las herramientas no sirven de nada</li>
<li><strong>Consistencia sobre perfección</strong>: Pequeños pasos todos los días construyen grandes resultados</li>
<li><strong>Comunidad importa</strong>: No estás solo en este camino</li>
</ul>

<h3>Próximos pasos</h3>

<p>Te invito a suscribirte al newsletter para recibir este contenido cuando esté listo, junto con otros recursos exclusivos para tu camino remoto.</p>
`;

  return (
    <>
      <Navigation />
      <main>
        <PostHeader article={article} category={category} />
        <PostContent content={article.content || defaultContent} />
        {relatedArticles.length > 0 && (
          <RelatedArticles
            articles={relatedArticles}
            categoryName={category.name.split('&')[0].trim()}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
