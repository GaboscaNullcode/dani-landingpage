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

export interface TerminoCondicion {
  title: string;
  content: string;
  icon: string;
}

export const terminosCondiciones: TerminoCondicion[] = [
  {
    icon: 'clock',
    title: 'Puntualidad',
    content:
      'La sesión empieza a la hora acordada. Esperamos máximo 15 minutos. Si no te conectas en ese tiempo, la sesión se pierde y no hay reembolso.',
  },
  {
    icon: 'calendar-clock',
    title: 'Cambiar la fecha',
    content:
      'Si necesitas reprogramar: aviso con 24h o más → sin costo. Con menos de 24h → 25 USD. Segunda reprogramación o más → 39 USD por cada cambio adicional. La nueva fecha dependerá de la disponibilidad.',
  },
  {
    icon: 'user-x',
    title: 'Si no asistes',
    content:
      'Si no te presentas y no avisaste antes, la sesión se cancela sin reembolso ni posibilidad de reagendar.',
  },
  {
    icon: 'ban',
    title: 'Cancelaciones',
    content:
      'Con menos de 24h → no hay reembolso. Dentro de los primeros 10 días → se retiene el 40%. Entre el día 11 y 20 → se retiene el 80%. Después de 20 días → no hay reembolso.',
  },
  {
    icon: 'book-open',
    title: 'Programa Intensivo',
    content:
      'Para el programa de 4 horas debes completar el workbook y ebook antes de la sesión. Si no lo haces, el tiempo se usará para empezar desde cero.',
  },
  {
    icon: 'wifi',
    title: 'Conexión',
    content:
      'Necesitas una conexión estable. Si hay problemas técnicos graves, evaluaremos si es necesario reprogramar.',
  },
  {
    icon: 'user-check',
    title: 'Sesión personal',
    content:
      'La asesoría es solo para la persona registrada. No se puede transferir a otra persona.',
  },
  {
    icon: 'shield-alert',
    title: 'Emergencias',
    content:
      'Si Dani no puede asistir por una emergencia, se reprogramará la sesión o se hará un reembolso completo.',
  },
  {
    icon: 'lock',
    title: 'Materiales',
    content:
      'Los ebooks, workbook y materiales no pueden compartirse ni venderse.',
  },
  {
    icon: 'clipboard-check',
    title: 'Revisiones posteriores',
    content:
      'Las revisiones incluidas deben solicitarse dentro de 1 mes después de la sesión. Pasado ese plazo, se pierden y no podrán utilizarse.',
  },
  {
    icon: 'badge-check',
    title: 'Aceptación',
    content:
      'Al realizar el pago, confirmas que leíste y aceptas estos términos.',
  },
];
