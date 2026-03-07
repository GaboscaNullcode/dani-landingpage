import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getProductsByIds } from '@/lib/tienda-service';
import {
  getAllTestimonios,
  getTestimoniosByProducto,
} from '@/lib/masterclass-service';
import type { Product } from '@/types/tienda';

// Dynamic import para QuizSection - componente pesado (828+ líneas)
const QuizSection = dynamic(() => import('@/components/QuizSection'), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#fef7f0] to-[#fce7f3]">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-coral border-t-transparent" />
        <p className="font-[var(--font-inter)] text-gray-carbon">
          Cargando quiz...
        </p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: '¿Por dónde empiezo? | Remote con Dani - Quiz de Trabajo Remoto',
  description:
    'Descubre tu nivel y encuentra el camino ideal para iniciar tu carrera de trabajo remoto. Quiz gratuito de 3 preguntas con recomendaciones personalizadas.',
  keywords: [
    'empezar trabajo remoto',
    'quiz trabajo remoto',
    'como empezar freelance',
    'trabajo desde casa',
    'asistente virtual',
  ],
  openGraph: {
    title: '¿Por dónde empiezo? | Remote con Dani',
    description:
      'Quiz gratuito de 3 preguntas para descubrir tu camino ideal en el trabajo remoto.',
    type: 'website',
    locale: 'es_ES',
  },
};

// Product IDs used in the quiz recommendations
const QUIZ_PRODUCT_IDS = [
  'define-camino',
  'guia-practica',
  'ruta-remota',
  'crea-camino',
  'iniciando',
];

export default async function EmpezarPage() {
  const [products, allTestimonials, masterclassTestimonials] =
    await Promise.all([
      getProductsByIds(QUIZ_PRODUCT_IDS),
      getAllTestimonios(),
      getTestimoniosByProducto('masterclass-av'),
    ]);
  const productsMap: Record<string, Product> = Object.fromEntries(
    products.map((p) => [p.id, p])
  );

  return (
    <>
      <Navigation />
      <main id="main-content">
        <QuizSection
          products={productsMap}
          allTestimonials={allTestimonials}
          masterclassTestimonials={masterclassTestimonials}
        />
      </main>
      <Footer />
    </>
  );
}
