export interface ContenidoItem {
  title: string;
  description: string;
  icon: string;
}

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
