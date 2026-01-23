export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'productos' | 'asesorias' | 'pagos';
}

export const faqItems: FAQItem[] = [
  // General
  {
    question: '¿Qué es el trabajo remoto y por qué debería considerarlo?',
    answer:
      'El trabajo remoto te permite trabajar desde cualquier lugar con conexión a internet. Ofrece flexibilidad de horarios, elimina el tiempo de traslado, y te permite equilibrar mejor tu vida personal y profesional. Es ideal para quienes buscan libertad geográfica y autonomía.',
    category: 'general',
  },
  {
    question: '¿Necesito experiencia previa para empezar como asistente virtual?',
    answer:
      'No necesariamente. Muchas habilidades que ya tienes (organización, comunicación, manejo de computadoras) son transferibles. Lo importante es identificar tus fortalezas y aprender a presentarlas. Mis recursos están diseñados precisamente para ayudarte en ese proceso.',
    category: 'general',
  },
  {
    question: '¿Cuánto tiempo toma conseguir mi primer cliente remoto?',
    answer:
      'Varía según tu dedicación y preparación. Algunas personas consiguen su primer cliente en 2-4 semanas, otras pueden tomar 2-3 meses. Lo importante es tener una estrategia clara, un perfil bien optimizado y persistencia.',
    category: 'general',
  },

  // Productos
  {
    question: '¿Qué incluye el curso "Paso a Paso"?',
    answer:
      'Incluye 6 módulos completos que te guían desde cero hasta conseguir tus primeros clientes. Además, recibes 6 bonos exclusivos: plantillas de propuestas, scripts de comunicación, checklist de herramientas, acceso a la comunidad, y actualizaciones gratuitas de por vida.',
    category: 'productos',
  },
  {
    question: '¿Puedo acceder a los cursos desde cualquier dispositivo?',
    answer:
      'Sí, todo el contenido está disponible en una plataforma en línea que puedes acceder desde computadora, tablet o celular. Tienes acceso las 24 horas, los 7 días de la semana.',
    category: 'productos',
  },
  {
    question: '¿Los cursos tienen fecha de expiración?',
    answer:
      'No. Una vez que compras un curso o eBook, tienes acceso de por vida. Además, recibes todas las actualizaciones futuras sin costo adicional.',
    category: 'productos',
  },

  // Asesorías
  {
    question: '¿Cómo funcionan las asesorías personalizadas?',
    answer:
      'Las asesorías son sesiones 1:1 por videollamada donde trabajamos específicamente en tu situación. Antes de la sesión, te envío un cuestionario para entender tus necesidades. Durante la sesión, creamos juntas un plan de acción personalizado.',
    category: 'asesorias',
  },
  {
    question: '¿Qué diferencia hay entre los dos planes de asesoría?',
    answer:
      'El plan "Iniciando" (1.5h) es ideal si estás explorando opciones y necesitas claridad inicial. El plan "Crea tu Camino" (4h) es un programa intensivo donde trabajamos en profundidad tu estrategia completa, incluyendo optimización de perfil, práctica de propuestas y simulación de entrevistas.',
    category: 'asesorias',
  },
  {
    question: '¿Puedo reprogramar mi sesión de asesoría?',
    answer:
      'Sí, puedes reprogramar hasta 24 horas antes de la sesión sin costo. Reprogramaciones con menos de 24 horas están sujetas a disponibilidad.',
    category: 'asesorias',
  },

  // Pagos
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express) y PayPal. Todos los pagos se procesan de forma segura a través de plataformas certificadas.',
    category: 'pagos',
  },
  {
    question: '¿Ofrecen planes de pago?',
    answer:
      'Actualmente los productos tienen pago único, pero si necesitas opciones alternativas para la asesoría "Crea tu Camino", puedes contactarme directamente para discutir posibilidades.',
    category: 'pagos',
  },
  {
    question: '¿Tienen garantía de devolución?',
    answer:
      'Para las asesorías, ofrecemos reembolso del 50% si lo solicitas dentro de las primeras 24 horas. Para productos digitales, debido a su naturaleza, no ofrecemos reembolsos una vez descargados, pero siempre estoy disponible para resolver cualquier duda.',
    category: 'pagos',
  },
];

export const contactInfo = {
  email: 'hola@remotecondani.com',
  instagram: '@remotecondani',
  instagramUrl: 'https://instagram.com/remotecondani',
  youtube: 'Remote con Dani',
  youtubeUrl: 'https://youtube.com/@remotecondani',
  tiktok: '@remotecondani',
  tiktokUrl: 'https://tiktok.com/@remotecondani',
};
