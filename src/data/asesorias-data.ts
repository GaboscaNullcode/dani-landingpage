export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: 'USD';
  duration: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface ContenidoItem {
  title: string;
  description: string;
  icon: string;
}

export const planes: Plan[] = [
  {
    id: 'iniciando',
    name: 'Iniciando tu Camino Remoto',
    subtitle: 'Para quienes están explorando',
    price: 66,
    currency: 'USD',
    duration: '1.5 horas',
    description:
      'Ideal si estás considerando el trabajo remoto pero no sabes por dónde empezar. Juntas aclararemos tus dudas y crearemos un plan inicial.',
    features: [
      'Evaluación de tu situación actual',
      'Clarificación de objetivos',
      'Identificación de habilidades transferibles',
      'Plan de acción inicial',
      'Recursos recomendados personalizados',
      'Seguimiento por email (7 días)',
    ],
    isPopular: false,
    ctaText: 'Agendar Sesión',
    ctaLink: 'https://calendly.com/remotecondani/iniciando',
  },
  {
    id: 'crea-camino',
    name: 'Crea tu Camino Remoto',
    subtitle: 'Para quienes quieren resultados',
    price: 155,
    currency: 'USD',
    duration: '4 horas',
    description:
      'Programa intensivo donde trabajamos juntas en construir tu estrategia completa para conseguir tu primer trabajo remoto.',
    features: [
      'Todo lo incluido en el plan básico',
      'Optimización de perfil profesional',
      'Estrategia de portafolio',
      'Práctica de propuestas ganadoras',
      'Simulación de entrevistas',
      'Estrategia de precios y negociación',
      'Plan de 30-60-90 días',
      'Seguimiento por email (30 días)',
      '1 sesión adicional de seguimiento (30 min)',
    ],
    isPopular: true,
    ctaText: 'Reservar Programa',
    ctaLink: 'https://calendly.com/remotecondani/crea-camino',
  },
];

export const contenidoAsesoria: ContenidoItem[] = [
  {
    title: 'Claridad sobre tu nicho',
    description: 'Definiremos en qué área del trabajo remoto puedes destacar según tus habilidades y experiencia.',
    icon: 'target',
  },
  {
    title: 'Perfil profesional optimizado',
    description: 'Aprenderás a presentarte de forma que atraigas a los clientes ideales para ti.',
    icon: 'user',
  },
  {
    title: 'Estrategia de propuestas',
    description: 'Te enseño a escribir propuestas que destaquen y aumenten tu tasa de respuesta.',
    icon: 'file-text',
  },
  {
    title: 'Manejo de objeciones',
    description: 'Cómo responder a las dudas de los clientes y cerrar proyectos con confianza.',
    icon: 'message-circle',
  },
  {
    title: 'Estrategia de precios',
    description: 'Define tarifas que reflejen tu valor sin subestimarte ni perder oportunidades.',
    icon: 'dollar-sign',
  },
  {
    title: 'Plan de acción claro',
    description: 'Saldrás con pasos concretos y un cronograma realista para alcanzar tus metas.',
    icon: 'check-circle',
  },
];

export const politicas = {
  reprogramacion: {
    title: 'Política de Reprogramación',
    content:
      'Puedes reprogramar tu sesión hasta 24 horas antes sin costo. Reprogramaciones con menos de 24 horas de anticipación están sujetas a disponibilidad.',
  },
  reembolso: {
    title: 'Política de Reembolso',
    content:
      'Si no estás satisfecha con la sesión, te ofrezco un reembolso del 50% si lo solicitas dentro de las primeras 24 horas después de la asesoría.',
  },
};
