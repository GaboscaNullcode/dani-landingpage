import type { ReactNode } from 'react';

export type FAQCategory =
  | 'general'
  | 'ebooks'
  | 'acompanamiento'
  | 'pagos'
  | 'terminos';

export interface FAQItem {
  question: string;
  answer: ReactNode;
  category: FAQCategory;
}

export const faqItems: FAQItem[] = [
  // ─── GENERAL ───
  {
    question: '¿Qué es el trabajo remoto y por qué debería considerarlo?',
    answer:
      'El trabajo remoto te permite trabajar desde cualquier lugar con conexión a internet. Ofrece flexibilidad de horarios, elimina el tiempo de traslado y te permite equilibrar mejor tu vida personal y profesional. Es ideal si buscas libertad geográfica y mayor autonomía en tu carrera.',
    category: 'general',
  },
  {
    question:
      '¿Necesito experiencia previa para empezar como asistente virtual?',
    answer:
      'No necesariamente. Muchas habilidades que ya tienes —organización, comunicación, manejo básico de herramientas digitales— son transferibles. Lo importante es identificar tus fortalezas y aprender a presentarlas estratégicamente. Los recursos están diseñados para ayudarte en ese proceso.',
    category: 'general',
  },
  {
    question: '¿Cuánto tiempo toma conseguir mi primer cliente remoto?',
    answer:
      'Depende de tu dedicación y preparación. Algunas personas consiguen su primer cliente en 2 a 4 semanas; otras pueden tardar entre 2 y 3 meses. La clave es tener una estrategia clara, un perfil optimizado y constancia en la postulación.',
    category: 'general',
  },

  // ─── EBOOKS Y RECURSOS ───
  {
    question: '¿Puedo acceder a los recursos desde cualquier dispositivo?',
    answer:
      'Sí. Todos los ebooks y materiales están disponibles en una plataforma en línea a la que puedes acceder desde computadora, tablet o celular. El acceso es 24/7.',
    category: 'ebooks',
  },
  {
    question: '¿Los ebooks tienen fecha de expiración?',
    answer:
      'No. Una vez que compras un ebook o recurso, tienes acceso de por vida. Además, recibirás cualquier actualización futura sin costo adicional.',
    category: 'ebooks',
  },

  // ─── ACOMPAÑAMIENTO ───
  {
    question: '¿Qué opciones de acompañamiento existen?',
    answer: (
      <div className="space-y-3">
        <p>Actualmente hay tres niveles de acompañamiento:</p>
        <div className="space-y-2 pl-1">
          <p>
            <strong className="text-gray-dark">Consultoría:</strong> Ideal si ya
            estás intentando avanzar pero sientes que algo no está funcionando.
            Revisamos tu proceso, resolvemos dudas específicas y ajustamos tu
            estrategia.
          </p>
          <p>
            <strong className="text-gray-dark">Asesoría:</strong> Si necesitas
            claridad profunda y una estrategia concreta para empezar o avanzar.
            Analizamos tu situación completa y diseñamos un plan accionable.
          </p>
          <p>
            <strong className="text-gray-dark">Programa Intensivo:</strong> Para
            construir tu camino remoto con estructura y acompañamiento completo.
            Trabajamos teoría y práctica personalizada para que termines con
            perfil optimizado, documentos listos, estrategia clara, precios
            definidos y propuestas funcionales.
          </p>
        </div>
      </div>
    ),
    category: 'acompanamiento',
  },
  {
    question: '¿Cómo funcionan las sesiones de acompañamiento?',
    answer:
      'Las sesiones son 1:1 por videollamada. Antes de la sesión recibirás un cuestionario para entender tu situación. Durante la sesión trabajamos tu caso específico y definimos un plan de acción claro.',
    category: 'acompanamiento',
  },
  {
    question: '¿La sesión es personal o puedo compartirla con alguien más?',
    answer:
      'La sesión es únicamente para la persona registrada. No es transferible ni puede compartirse con terceros.',
    category: 'acompanamiento',
  },
  {
    question: '¿Necesito preparar algo antes de mi sesión?',
    answer:
      'Para el Programa Intensivo de 4 horas es obligatorio completar el workbook y ebook previo. Si no se completa, el tiempo de la sesión se utilizará para empezar desde cero.',
    category: 'acompanamiento',
  },
  {
    question: '¿Qué pasa si tengo problemas de conexión?',
    answer:
      'Es necesario contar con conexión estable. Si ocurre un problema técnico grave durante la sesión, se evaluará si corresponde reprogramar.',
    category: 'acompanamiento',
  },
  {
    question: '¿Qué sucede si Dani no puede asistir por una emergencia?',
    answer:
      'En caso de emergencia comprobable, la sesión se reprogramará o se realizará un reembolso completo.',
    category: 'acompanamiento',
  },

  // ─── PAGOS ───
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Se aceptan tarjetas de crédito y débito (Visa, Mastercard, American Express) y PayPal. Los pagos se procesan de forma segura a través de plataformas certificadas.',
    category: 'pagos',
  },
  {
    question: '¿Ofrecen planes de pago?',
    answer:
      'Algunos programas pueden ofrecer facilidades de pago según disponibilidad. La información específica se detalla en la página de cada servicio.',
    category: 'pagos',
  },
  {
    question: '¿Tienen garantía de devolución?',
    answer:
      'Las cancelaciones se manejan según el tiempo transcurrido desde la compra: dentro de los primeros 10 días se retiene el 40%, entre el día 11 y 20 se retiene el 80%, y después de 20 días no hay reembolso. Las cancelaciones con menos de 24 horas de anticipación no son reembolsables. Para más detalles, consulta la sección de Términos y Políticas.',
    category: 'pagos',
  },

  // ─── TÉRMINOS Y POLÍTICAS ───
  {
    question: '¿Cuál es la política de puntualidad y asistencia?',
    answer: (
      <div className="space-y-3">
        <p>
          La sesión inicia a la hora acordada. Se espera un máximo de 15
          minutos. Si no te conectas dentro de ese tiempo, la sesión se pierde y
          no hay reembolso.
        </p>
        <p>
          Si no te presentas y no avisaste previamente, la sesión se cancela sin
          reembolso ni posibilidad de reagendar.
        </p>
      </div>
    ),
    category: 'terminos',
  },
  {
    question: '¿Cómo funcionan las reprogramaciones y cancelaciones?',
    answer: (
      <div className="space-y-4">
        <div>
          <p className="mb-2 font-medium text-gray-dark">Reprogramaciones:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Aviso con 24 horas o más: sin costo.</li>
            <li>Aviso con menos de 24 horas: 15 USD / 50 soles.</li>
            <li>
              Segunda reprogramación o más: 39 USD / 132 soles por cada cambio
              adicional.
            </li>
          </ul>
          <p className="mt-2 text-sm">
            La nueva fecha dependerá de la disponibilidad en el calendario.
          </p>
        </div>
        <div>
          <p className="mb-2 font-medium text-gray-dark">Cancelaciones:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Con menos de 24 horas: no hay reembolso.</li>
            <li>
              Dentro de los primeros 10 días desde la compra: se retiene el 40%.
            </li>
            <li>Entre el día 11 y 20: se retiene el 80%.</li>
            <li>Después de 20 días: no hay reembolso.</li>
          </ul>
          <p className="mt-2 text-sm">
            El monto retenido cubre tiempo administrativo y coordinación.
          </p>
        </div>
      </div>
    ),
    category: 'terminos',
  },
  {
    question: '¿Cuáles son las condiciones del Programa Intensivo?',
    answer:
      'Para el Programa Intensivo de 4 horas es obligatorio completar el workbook y ebook previo antes de la sesión. Si no se completa, el tiempo de la sesión se utilizará para empezar desde cero. Es necesario contar con una conexión a internet estable para la videollamada.',
    category: 'terminos',
  },
  {
    question: '¿Qué debo saber sobre materiales y términos generales?',
    answer: (
      <div className="space-y-3">
        <p>
          Los ebooks, workbook y materiales entregados son de uso personal. No
          pueden compartirse, revenderse ni distribuirse.
        </p>
        <p>
          Las revisiones incluidas deben solicitarse dentro de 1 mes después de
          la sesión. Pasado ese plazo, se pierden y no podrán utilizarse.
        </p>
        <p>
          Al realizar el pago confirmas que has leído y aceptas estos términos.
        </p>
      </div>
    ),
    category: 'terminos',
  },
];

export const contactInfo = {
  email: 'info@remotecondani.com',
  instagram: '@remote.con.dani',
  instagramUrl: 'https://instagram.com/remote.con.dani',
  tiktok: '@donizilbert',
  tiktokUrl: 'https://tiktok.com/@donizilbert',
};
