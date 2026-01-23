// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: 'USD';
  image: string;
  category: 'curso' | 'ebook' | 'masterclass' | 'comunidad' | 'gratis';
  badge?: string;
  features?: string[];
  isFeatured: boolean;
  isFree: boolean;
  ctaText: string;
  ctaLink: string;
}

// Featured products (main 4)
export const featuredProducts: Product[] = [
  {
    id: 'curso-paso-a-paso',
    name: 'Curso Práctico: Paso a Paso + 6 Bonos',
    slug: 'curso-paso-a-paso',
    description:
      'El curso más completo para iniciar tu carrera como asistente virtual. Incluye 6 bonos exclusivos que acelerarán tu éxito.',
    price: 47.0,
    originalPrice: 97.0,
    currency: 'USD',
    image: '/images/tienda/producto-curso-completo.jpg',
    category: 'curso',
    badge: 'Más Vendido',
    features: [
      'Acceso de por vida',
      '6 módulos completos',
      '6 bonos exclusivos',
      'Certificado de finalización',
      'Comunidad privada',
      'Actualizaciones gratuitas',
    ],
    isFeatured: true,
    isFree: false,
    ctaText: 'Obtener Curso',
    ctaLink: '/tienda/curso-paso-a-paso',
  },
  {
    id: 'ebook-guia-practica',
    name: 'eBook: Guía Práctica Para Iniciar',
    slug: 'ebook-guia-practica',
    description:
      'Todo lo que necesitas saber para dar tus primeros pasos en el mundo del trabajo remoto. Una guía completa y práctica.',
    price: 27.0,
    currency: 'USD',
    image: '/images/tienda/producto-guia-asistente-virtual.jpg',
    category: 'ebook',
    badge: 'Popular',
    features: [
      '120+ páginas de contenido',
      'Plantillas descargables',
      'Checklist de inicio',
      'Recursos adicionales',
    ],
    isFeatured: true,
    isFree: false,
    ctaText: 'Descargar eBook',
    ctaLink: '/tienda/ebook-guia-practica',
  },
  {
    id: 'masterclass-av',
    name: 'Masterclass Asistente Virtual',
    slug: 'masterclass-av',
    description:
      'Aprende las habilidades más demandadas del mercado y posiciónate como una asistente virtual profesional.',
    price: 22.0,
    currency: 'USD',
    image: '/images/tienda/producto-masterclass-av.jpg',
    category: 'masterclass',
    badge: 'Nuevo',
    features: [
      '3 horas de contenido',
      'Ejercicios prácticos',
      'Material descargable',
      'Acceso inmediato',
    ],
    isFeatured: true,
    isFree: false,
    ctaText: 'Ver Masterclass',
    ctaLink: '/tienda/masterclass-av',
  },
  {
    id: 'ebook-optimizacion',
    name: 'eBook: Optimización Profesional',
    slug: 'ebook-optimizacion',
    description:
      'Lleva tu perfil al siguiente nivel. Estrategias avanzadas para destacar en plataformas de trabajo remoto.',
    price: 17.0,
    currency: 'USD',
    image: '/images/tienda/producto-optimizacion-profesional.jpg',
    category: 'ebook',
    features: [
      '80+ páginas',
      'Casos de estudio reales',
      'Templates de perfil',
      'Scripts de propuestas',
    ],
    isFeatured: true,
    isFree: false,
    ctaText: 'Descargar eBook',
    ctaLink: '/tienda/ebook-optimizacion',
  },
];

// Additional products
export const additionalProducts: Product[] = [
  {
    id: 'ebook-define-camino',
    name: 'eBook: Define tu Camino Remoto',
    slug: 'ebook-define-camino',
    description:
      'Descubre qué tipo de trabajo remoto es ideal para ti según tu personalidad y habilidades.',
    price: 7.0,
    currency: 'USD',
    image: '/images/tienda/producto-define-camino-remoto.jpg',
    category: 'ebook',
    features: ['40+ páginas', 'Test de autoconocimiento', 'Plan de acción'],
    isFeatured: false,
    isFree: false,
    ctaText: 'Obtener eBook',
    ctaLink: '/tienda/ebook-define-camino',
  },
  {
    id: 'ebook-primeros-pasos',
    name: 'eBook: Primeros Pasos como A.V',
    slug: 'ebook-primeros-pasos',
    description:
      'La guía esencial para quienes están considerando iniciar como asistente virtual.',
    price: 7.0,
    currency: 'USD',
    image: '/images/tienda/producto-ejercicios-practicos.jpg',
    category: 'ebook',
    features: ['35+ páginas', 'Recursos iniciales', 'Errores a evitar'],
    isFeatured: false,
    isFree: false,
    ctaText: 'Obtener eBook',
    ctaLink: '/tienda/ebook-primeros-pasos',
  },
];

// Free resources and community
export const freeResources: Product[] = [
  {
    id: 'guia-gratuita',
    name: 'Guía Gratuita: Tu Primer Mapa',
    slug: 'guia-gratuita',
    description:
      'Tu primer mapa mental del trabajo remoto. Entiende el panorama completo antes de dar el primer paso.',
    price: 0,
    currency: 'USD',
    image: '/images/tienda/producto-guia-global.jpg',
    category: 'gratis',
    badge: 'Gratis',
    features: [
      'PDF descargable',
      'Mapa mental interactivo',
      'Recursos adicionales',
    ],
    isFeatured: false,
    isFree: true,
    ctaText: 'Descargar Gratis',
    ctaLink: '/recursos/guia-gratuita',
  },
  {
    id: 'masterclass-gratuita',
    name: 'Masterclass Gratuita',
    slug: 'masterclass-gratuita',
    description:
      'Para decidir si el mundo remoto es para ti. Una sesión introductoria sin compromiso.',
    price: 0,
    currency: 'USD',
    image: '/images/tienda/producto-masterclass-upwork.jpg',
    category: 'gratis',
    badge: 'Gratis',
    features: ['45 minutos de contenido', 'Sin registro previo', 'Acceso inmediato'],
    isFeatured: false,
    isFree: true,
    ctaText: 'Ver Masterclass',
    ctaLink: '/recursos/masterclass-gratuita',
  },
  {
    id: 'comunidad',
    name: 'Comunidad Remote con Dani',
    slug: 'comunidad',
    description:
      'Espacio para entender si el trabajo remoto es para ti. Conecta con personas en tu mismo camino.',
    price: 3.99,
    currency: 'USD',
    image: '/images/tienda/producto-comunidad-privada.jpg',
    category: 'comunidad',
    badge: 'Mensual',
    features: [
      'Acceso a comunidad privada',
      'Sesiones en vivo mensuales',
      'Networking con otros remotos',
      'Contenido exclusivo',
    ],
    isFeatured: false,
    isFree: false,
    ctaText: 'Unirse a la Comunidad',
    ctaLink: '/comunidad',
  },
];

// Helper functions
export const getAllProducts = (): Product[] => [
  ...featuredProducts,
  ...additionalProducts,
  ...freeResources,
];

export const getProductBySlug = (slug: string): Product | undefined =>
  getAllProducts().find((p) => p.slug === slug);

export const getProductsByCategory = (category: Product['category']): Product[] =>
  getAllProducts().filter((p) => p.category === category);

export const getFeaturedProducts = (): Product[] => featuredProducts;

export const getAdditionalProducts = (): Product[] => additionalProducts;

export const getFreeResources = (): Product[] => freeResources;

// Format price helper
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  if (price === 0) return 'Gratis';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price);
};
