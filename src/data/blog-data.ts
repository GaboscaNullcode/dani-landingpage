// Blog data types and dummy content

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  articleCount: number;
  gradient: string;
  accentColor: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  categoryId: string;
  publishedAt: string;
  readTime: number;
  isPopular: boolean;
}

export const categories: Category[] = [
  {
    id: 'plataformas',
    name: 'Plataformas de Trabajo Remoto',
    slug: 'plataformas-trabajo-remoto',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    articleCount: 12,
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #e056a0 100%)',
    accentColor: '#ff6b6b',
  },
  {
    id: 'mentalidad',
    name: 'Mentalidad & Crecimiento',
    slug: 'mentalidad-crecimiento',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    articleCount: 8,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #e056a0 100%)',
    accentColor: '#a78bfa',
  },
  {
    id: 'vida-remota',
    name: 'Vida Remota & Balance Personal',
    slug: 'vida-remota-balance',
    image: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&q=80',
    articleCount: 10,
    gradient: 'linear-gradient(135deg, #6ee7b7 0%, #a78bfa 100%)',
    accentColor: '#6ee7b7',
  },
  {
    id: 'behind-laptop',
    name: 'Behind the Laptop',
    slug: 'behind-the-laptop',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80',
    articleCount: 6,
    gradient: 'linear-gradient(135deg, #e056a0 0%, #ff6b6b 100%)',
    accentColor: '#e056a0',
  },
  {
    id: 'tips',
    name: 'Tips & Herramientas',
    slug: 'tips-herramientas',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    articleCount: 15,
    gradient: 'linear-gradient(135deg, #fcd34d 0%, #ff6b6b 100%)',
    accentColor: '#fcd34d',
  },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Por qué las plataformas no funcionan cuando las usas con apuro',
    slug: 'por-que-plataformas-no-funcionan-con-apuro',
    description:
      'Las plataformas no están hechas para funcionar con apuro. Por qué cambiar el enfoque puede marcar la diferencia cuando buscas trabajo remoto.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    categoryId: 'plataformas',
    publishedAt: '2025-01-08',
    readTime: 5,
    isPopular: true,
  },
  {
    id: '2',
    title: 'Cómo destacar tu perfil para clientes internacionales',
    slug: 'como-destacar-perfil-clientes-internacionales',
    description:
      'Cómo optimizar tu perfil para clientes internacionales sin experiencia previa. Sí, se puede lograr con la estrategia correcta.',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    categoryId: 'plataformas',
    publishedAt: '2025-01-05',
    readTime: 7,
    isPopular: true,
  },
  {
    id: '3',
    title: 'Lo que nadie te cuenta de trabajar para empresas internacionales',
    slug: 'lo-que-nadie-te-cuenta-empresas-internacionales',
    description:
      'La parte real del trabajo con empresas internacionales que nadie te cuenta, pero todos viven. Mi experiencia sin filtros.',
    thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    categoryId: 'behind-laptop',
    publishedAt: '2025-01-02',
    readTime: 6,
    isPopular: true,
  },
  {
    id: '4',
    title: '5 herramientas esenciales para trabajar remoto en 2025',
    slug: '5-herramientas-esenciales-trabajo-remoto-2025',
    description:
      'Las herramientas que uso todos los días para mantener mi productividad al máximo trabajando desde casa.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    categoryId: 'tips',
    publishedAt: '2024-12-28',
    readTime: 4,
    isPopular: true,
  },
  {
    id: '5',
    title: 'Cómo mantener el balance entre trabajo y vida personal',
    slug: 'balance-trabajo-vida-personal-remoto',
    description:
      'El trabajo remoto puede desdibujarse fácilmente. Aprende a establecer límites saludables sin sacrificar tu productividad.',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
    categoryId: 'vida-remota',
    publishedAt: '2024-12-22',
    readTime: 5,
    isPopular: true,
  },
  {
    id: '6',
    title: 'Mi experiencia trabajando desde casa por 6 años',
    slug: 'mi-experiencia-6-anos-trabajo-remoto',
    description:
      'Un recorrido honesto por mis 6 años de trabajo remoto: los altos, los bajos, y todo lo que aprendí en el camino.',
    thumbnail: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
    categoryId: 'behind-laptop',
    publishedAt: '2024-12-18',
    readTime: 8,
    isPopular: true,
  },
  {
    id: '7',
    title: 'Cómo vencer el síndrome del impostor en el trabajo remoto',
    slug: 'vencer-sindrome-impostor-trabajo-remoto',
    description:
      'Sentir que no eres suficiente es más común de lo que crees. Estrategias prácticas para superar el síndrome del impostor.',
    thumbnail: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=800&q=80',
    categoryId: 'mentalidad',
    publishedAt: '2024-12-15',
    readTime: 6,
    isPopular: false,
  },
  {
    id: '8',
    title: 'Upwork vs Fiverr: ¿Cuál es mejor para empezar?',
    slug: 'upwork-vs-fiverr-cual-mejor-empezar',
    description:
      'Un análisis detallado de las dos plataformas más populares para freelancers. Pros, contras y cuál elegir según tu perfil.',
    thumbnail: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80',
    categoryId: 'plataformas',
    publishedAt: '2024-12-10',
    readTime: 9,
    isPopular: false,
  },
  {
    id: '9',
    title: 'Rutinas matutinas que transforman tu productividad',
    slug: 'rutinas-matutinas-productividad-remoto',
    description:
      'Cómo estructurar tus mañanas para empezar el día con energía y enfoque cuando trabajas desde casa.',
    thumbnail: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=800&q=80',
    categoryId: 'vida-remota',
    publishedAt: '2024-12-05',
    readTime: 5,
    isPopular: false,
  },
  {
    id: '10',
    title: 'Cómo negociar tu tarifa como freelancer',
    slug: 'como-negociar-tarifa-freelancer',
    description:
      'Deja de cobrar menos de lo que vales. Guía práctica para negociar con confianza y conseguir mejores tarifas.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    categoryId: 'tips',
    publishedAt: '2024-12-01',
    readTime: 7,
    isPopular: false,
  },
  {
    id: '11',
    title: 'El mindset que necesitas para triunfar en remoto',
    slug: 'mindset-triunfar-trabajo-remoto',
    description:
      'Más allá de las habilidades técnicas, tu mentalidad determina tu éxito. Los cambios de perspectiva que marcaron la diferencia para mí.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    categoryId: 'mentalidad',
    publishedAt: '2024-11-28',
    readTime: 6,
    isPopular: false,
  },
  {
    id: '12',
    title: 'Cómo crear un espacio de trabajo productivo en casa',
    slug: 'crear-espacio-trabajo-productivo-casa',
    description:
      'No necesitas una oficina lujosa. Tips prácticos para crear un espacio que impulse tu concentración y creatividad.',
    thumbnail: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    categoryId: 'vida-remota',
    publishedAt: '2024-11-22',
    readTime: 5,
    isPopular: false,
  },
];

// Helper functions
export const getPopularArticles = () => articles.filter((a) => a.isPopular);

export const getLatestArticles = (limit?: number) => {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getArticlesByCategory = (categoryId: string) =>
  articles.filter((a) => a.categoryId === categoryId);

export const getCategoryById = (categoryId: string) =>
  categories.find((c) => c.id === categoryId);

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
