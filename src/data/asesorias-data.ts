export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: 'USD';
  duration: string;
  description: string;
  featuresTitle?: string;
  features: string[];
  note?: string;
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
    id: 'consultoria',
    name: 'Consultoría 1:1',
    subtitle: 'Para revisiones puntuales',
    price: 39,
    currency: 'USD',
    duration: '45 minutos',
    description:
      'Para ti que ya estás intentando avanzar, pero sientes que algo no está funcionando. Esta sesión es ideal si necesitas una revisión estratégica, resolver dudas específicas o entender qué está fallando en tu proceso.',
    featuresTitle: 'En esta sesión:',
    features: [
      'Analizamos tu situación actual con enfoque estratégico',
      'Revisamos tus documentos o perfil',
      'Identificamos qué está frenando tus resultados',
      'Definimos tu próximo paso concreto',
      'Te llevas tareas claras para aplicar',
      'Reporte post-sesión con correcciones',
    ],
    note: 'Esta es una sesión de revisión puntual que incluye el reporte post-sesión. No contempla seguimiento posterior ni acceso a la comunidad privada.',
    isPopular: false,
    ctaText: 'Quiero mi consultoría',
    ctaLink: 'https://calendly.com/remotecondani/consultoria',
  },
  {
    id: 'iniciando',
    name: 'Asesoría 1:1',
    subtitle: 'Para avanzar con claridad y dirección',
    price: 66,
    currency: 'USD',
    duration: '1.5 horas',
    description:
      'Si necesitas claridad profunda y una estrategia concreta para empezar o avanzar, esta sesión es para ti. Aquí trabajamos tu situación completa y diseñamos un plan accionable.',
    featuresTitle: 'Tú eliges el enfoque:',
    features: [
      'Analizamos tu punto de partida',
      'Identificamos bloqueos reales',
      'Revisión de perfil o documentos',
      'Estrategia clara y personalizada',
      'Plan de acción para las próximas 2 semanas',
      'Lista de recursos específicos',
      'Reporte post-sesión',
      '1 revisión post-sesión vía email',
      'Acceso a la Comunidad Privada RCD',
    ],
    note: 'Llega con tus preguntas y objetivo definido para aprovechar al máximo la sesión.',
    isPopular: false,
    ctaText: 'Quiero mi asesoría',
    ctaLink: 'https://calendly.com/remotecondani/iniciando',
  },
  {
    id: 'crea-camino',
    name: 'Programa Intensivo',
    subtitle: 'Para construir tu camino remoto con estructura',
    price: 169,
    currency: 'USD',
    duration: '4 horas',
    description:
      'Si quieres construir tu camino remoto con estructura, claridad y acompañamiento completo, este programa es para ti. Combinamos teoría + práctica personalizada para que termines con perfil optimizado, documentos listos, estrategia clara, precios definidos y propuestas que funcionan.',
    features: [
      '2 horas de formación teórica estructurada (grabada y disponible por 1 mes)',
      'Ebook "Optimización Profesional" (más de 45 páginas + plantillas prácticas)',
      'Workbook "Define tu Camino Remoto"',
      '2 horas de asesoría personalizada 1:1 con Dani',
      'Definición clara de tu Camino Remoto',
      'Optimización estratégica de CV/perfil',
      'Creación y mejora de Carta de Presentación',
      'Práctica guiada de propuestas que convierten',
      'Definición clara de precios según tu experiencia',
      'Reporte personalizado post-sesión',
      '2 revisiones posteriores vía email',
      'Acceso a la Comunidad Privada RCD',
    ],
    isPopular: true,
    ctaText: 'Acceder al programa',
    ctaLink: 'https://calendly.com/remotecondani/crea-camino',
  },
];

export const contenidoAsesoria: ContenidoItem[] = [
  {
    title: 'Claridad sobre por dónde empezar',
    description:
      'Identificamos tu punto de partida real y el primer paso estratégico.',
    icon: 'target',
  },
  {
    title: 'Un perfil que te represente',
    description:
      'Te ayudo a presentarte con enfoque profesional, sin sonar genérica ni copiar fórmulas vacías.',
    icon: 'user',
  },
  {
    title: 'Propuestas que generan respuesta',
    description:
      'Aprendes cómo estructurar propuestas que aumentan tus probabilidades de respuesta.',
    icon: 'file-text',
  },
  {
    title: 'Confianza para negociar',
    description:
      'Cómo responder ante descuentos o dudas sin perder el proyecto.',
    icon: 'message-circle',
  },
  {
    title: 'Precios alineados a tu valor',
    description:
      'Definimos tarifas estratégicas con las que te sientas segura.',
    icon: 'dollar-sign',
  },
  {
    title: 'Un plan accionable',
    description:
      'Pasos concretos y realistas que puedas ejecutar esta misma semana.',
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
