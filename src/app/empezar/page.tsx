import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import QuizSection from '@/components/QuizSection';
import Footer from '@/components/Footer';

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

export default function EmpezarPage() {
  return (
    <>
      <Navigation />
      <main>
        <QuizSection />
      </main>
      <Footer />
    </>
  );
}
