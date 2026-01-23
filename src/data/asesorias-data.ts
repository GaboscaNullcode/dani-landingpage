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
    name: 'Sesión de Claridad',
    subtitle: 'Para salir de la confusión',
    price: 66,
    currency: 'USD',
    duration: '1.5 horas',
    description:
      'Para ti que llevas semanas (o meses) dando vueltas sin saber qué hacer primero. Saldrás con un plan claro y las respuestas que necesitas.',
    features: [
      'Analizamos tu situación actual sin rodeos',
      'Identificamos qué está frenándote realmente',
      'Definimos tu próximo paso concreto',
      'Plan de acción para tus primeras 2 semanas',
      'Lista de recursos específicos para ti',
      'Seguimiento por email (7 días)',
    ],
    isPopular: false,
    ctaText: 'Quiero mi sesión',
    ctaLink: 'https://calendly.com/remotecondani/iniciando',
  },
  {
    id: 'crea-camino',
    name: 'Programa Intensivo',
    subtitle: 'Para quienes quieren resultados reales',
    price: 155,
    currency: 'USD',
    duration: '4 horas',
    description:
      'En un día, construimos juntas todo lo que necesitas para conseguir tu primer cliente o empleo remoto. Sin más excusas, sin más dudas.',
    features: [
      'Todo lo de la sesión básica',
      'Optimizamos tu perfil profesional',
      'Creamos tu estrategia de portafolio',
      'Practicamos propuestas que funcionan',
      'Simulamos tu primera entrevista',
      'Definimos tus precios sin miedo',
      'Plan completo de 30-60-90 días',
      'Seguimiento por email (30 días)',
      'Sesión de seguimiento adicional (30 min)',
    ],
    isPopular: true,
    ctaText: 'Reservar mi lugar',
    ctaLink: 'https://calendly.com/remotecondani/crea-camino',
  },
];

export const contenidoAsesoria: ContenidoItem[] = [
  {
    title: 'Saber por dónde empezar',
    description: 'Se acabó la parálisis por análisis. Identificamos tu punto de partida real y qué hacer primero.',
    icon: 'target',
  },
  {
    title: 'Un perfil que te represente',
    description: 'Aprenderás a presentarte sin sonar genérica ni copiar lo que hacen todos.',
    icon: 'user',
  },
  {
    title: 'Propuestas que funcionan',
    description: 'Te enseño el método que uso yo para escribir propuestas que obtienen respuesta.',
    icon: 'file-text',
  },
  {
    title: 'Confianza para negociar',
    description: 'Cómo responder cuando te piden descuentos o dudan de ti, sin perder el proyecto.',
    icon: 'message-circle',
  },
  {
    title: 'Precios que reflejen tu valor',
    description: 'Define tarifas con las que te sientas bien, sin subestimarte ni perder oportunidades.',
    icon: 'dollar-sign',
  },
  {
    title: 'Un plan que puedas seguir',
    description: 'Pasos concretos, realistas, que puedas ejecutar esta misma semana.',
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
