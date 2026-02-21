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
