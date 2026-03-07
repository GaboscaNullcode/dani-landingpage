import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ProductDetail, SeccionBonos, SeccionFAQs, ProductCta } from '@/components/tienda';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getProductBySlug, getAllProductSlugs, getProductTypesMap } from '@/lib/tienda-service';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} - Remote con Dani`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: 'website',
      locale: 'es_ES',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, productTypes] = await Promise.all([
    getProductBySlug(slug),
    getProductTypesMap(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main id="main-content">
        <ProductDetail product={product} productTypes={productTypes} />
        {product.bonos && product.bonos.length > 0 && (
          <SeccionBonos bonos={product.bonos} />
        )}
        <TestimonialsSection
          id="testimonios-producto"
          productoId={product.id}
          badge="Lo que dicen"
          title={
            <>
              Quienes ya lo{' '}
              <span className="gradient-text-playful">probaron</span>
            </>
          }
          subtitle="Experiencias reales de personas que adquirieron este producto"
        />
        {product.faqs && product.faqs.length > 0 && (
          <SeccionFAQs faqs={product.faqs} />
        )}
        <ProductCta product={product} />
      </main>
      <Footer />
    </>
  );
}
