import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PostHeader from '@/components/blog/PostHeader';
import PostContent from '@/components/blog/PostContent';
import RelatedArticles from '@/components/blog/RelatedArticles';
import {
  getArticleBySlug,
  getRelatedArticles,
  getAllSlugs,
} from '@/lib/blog-service';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Revalidate every 60 seconds
export const revalidate = 60;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Artículo no encontrado | Remote con Dani',
    };
  }

  const canonicalUrl = `https://remotecondani.com/blog/${slug}`;

  return {
    title: `${article.title} | Remote con Dani`,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'Remote con Dani',
      publishedTime: article.publishedAt,
      authors: ['Dani Zilbert'],
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.thumbnail],
    },
  };
}

// Generate JSON-LD structured data
function generateArticleJsonLd(article: NonNullable<Awaited<ReturnType<typeof getArticleBySlug>>>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.thumbnail,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Dani Zilbert',
      url: 'https://remotecondani.com/sobre-mi',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Remote con Dani',
      logo: {
        '@type': 'ImageObject',
        url: 'https://remotecondani.com/images/logos/logo-blanco-small.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://remotecondani.com/blog/${article.slug}`,
    },
    wordCount: article.content ? article.content.split(/\s+/).length : 500,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.id, 3);

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

  const jsonLd = generateArticleJsonLd(article);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main-content">
        <PostHeader article={article} />
        <PostContent content={article.content || defaultContent} />
        {relatedArticles.length > 0 && (
          <RelatedArticles articles={relatedArticles} />
        )}
      </main>
      <Footer />
    </>
  );
}
