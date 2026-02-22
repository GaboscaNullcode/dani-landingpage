const BRAND = {
  coral: '#ff6b6b',
  pink: '#e056a0',
  cream: '#fef7f0',
  dark: '#2d2d2d',
  gray: '#666666',
  logo: 'Remote con Dani',
};

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:${BRAND.cream};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;">
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.coral},${BRAND.pink});padding:32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;">${BRAND.logo}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background-color:${BRAND.cream};text-align:center;border-top:1px solid #eee;">
              <p style="margin:0;font-size:13px;color:${BRAND.gray};">
                &copy; ${new Date().getFullYear()} Remote con Dani. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(text: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px auto;">
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND.coral},${BRAND.pink});border-radius:8px;">
        <a href="${url}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;">${text}</a>
      </td>
    </tr>
  </table>`;
}

export function getPurchaseEmailHtml(
  productName: string,
  accessUrl: string,
  isSubscription: boolean,
): string {
  const tipo = isSubscription ? 'suscripcion' : 'compra';
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Tu ${tipo === 'suscripcion' ? 'suscripcion' : 'compra'} fue exitosa</h2>
    <p style="margin:0 0 8px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Ya tienes acceso a <strong style="color:${BRAND.dark};">${productName}</strong>.
    </p>
    <p style="margin:0 0 24px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Accede a tu contenido desde tu area de miembros:
    </p>
    ${button('Ir a Mi Cuenta', accessUrl)}
    <p style="margin:24px 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si tienes alguna pregunta, responde a este email y te ayudaremos.
    </p>`;
  return baseLayout(content);
}

export function getWelcomeEmailHtml(
  name: string,
  email: string,
  tempPassword: string,
): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Bienvenida, ${name}!</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Se ha creado tu cuenta. Aqui tienes tus credenciales de acceso:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};border-radius:8px;padding:20px;width:100%;margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Email:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${email}</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Contrasena temporal:</p>
          <p style="margin:0;font-size:16px;color:${BRAND.dark};font-weight:600;font-family:monospace;">${tempPassword}</p>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Te recomendamos cambiar tu contrasena al iniciar sesion por primera vez.
    </p>
    ${button('Iniciar Sesion', `${process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'}/mi-cuenta`)}`;
  return baseLayout(content);
}

export function getNewsletterWelcomeEmailHtml(
  name: string,
  guideUrl: string,
): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Bienvenida, ${name}!</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Gracias por unirte a la comunidad de <strong style="color:${BRAND.dark};">Remote con Dani</strong>.
      Aqui tienes tu guia gratuita como te prometi:
    </p>
    ${button('Descargar mi Guia', guideUrl)}
    <p style="margin:24px 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Cada semana recibiras en tu inbox tips y estrategias para construir tu carrera remota.
      Desde optimizar tu perfil hasta conseguir clientes internacionales.
    </p>
    <p style="margin:0 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si tienes alguna pregunta, simplemente responde a este email.
    </p>`;
  return baseLayout(content);
}

export function getCommunityEmailHtml(
  productName: string,
  whatsappLink: string,
  accessUrl: string,
): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Bienvenida a ${productName}!</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Tu suscripcion esta activa. Unite a la comunidad en WhatsApp:
    </p>
    ${button('Unirme al Grupo de WhatsApp', whatsappLink)}
    <p style="margin:24px 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Tambien puedes acceder a tu area de miembros para ver todos tus recursos:
    </p>
    ${button('Ir a Mi Cuenta', accessUrl)}
    <p style="margin:24px 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si tienes alguna pregunta, responde a este email y te ayudaremos.
    </p>`;
  return baseLayout(content);
}

// ── Asesoria post-payment email ──

export function getAsesoriaPostPaymentEmailHtml(
  schedulingUrl: string,
  masterclassUrl: string,
): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Ya casi estamos list@s</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Hola 💛
    </p>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      ¡Gracias por confiar en este espacio!
    </p>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      El siguiente paso es elegir la fecha y hora que mejor te funcione.
    </p>
    <p style="margin:0 0 8px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Aquí puedes agendar tu sesión:
    </p>
    ${button('Agendar mi sesión', schedulingUrl)}
    <p style="margin:24px 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Una vez confirmes el horario, recibirás automáticamente el enlace de Zoom y todos los detalles.
    </p>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Te recomiendo ver (o volver a ver) la <a href="${masterclassUrl}" style="color:${BRAND.coral};font-weight:600;text-decoration:underline;">masterclass gratuita</a> antes de nuestra sesión. Te dará más contexto y nos permitirá aprovechar el tiempo al máximo.
    </p>
    <p style="margin:16px 0 0;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Nos vemos pronto,<br>
      Dani ✨
    </p>`;
  return baseLayout(content);
}

// ── Password reset email ──

export function getPasswordResetEmailHtml(resetUrl: string): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Restablece tu contrasena</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Recibimos una solicitud para restablecer tu contrasena. Haz clic en el boton para crear una nueva:
    </p>
    ${button('Restablecer Contrasena', resetUrl)}
    <p style="margin:24px 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si no solicitaste esto, puedes ignorar este email. Tu contrasena no cambiara.
    </p>
    <p style="margin:8px 0 0;color:${BRAND.gray};font-size:13px;line-height:1.6;">
      Este enlace expira en 1 hora.
    </p>`;
  return baseLayout(content);
}

// ── Booking emails ──

export function getBookingConfirmationEmailHtml(
  name: string,
  planName: string,
  fecha: string,
  hora: string,
  duracion: number,
  timezone: string,
  zoomUrl?: string,
  masterclassUrl?: string,
): string {
  const duracionText =
    duracion >= 60
      ? `${Math.floor(duracion / 60)}h ${duracion % 60 ? `${duracion % 60}min` : ''}`
      : `${duracion} minutos`;

  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Tu sesión con Dani está confirmada ✨</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Hola 💛
    </p>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Tu sesión ya está agendada.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};border-radius:8px;width:100%;margin-bottom:24px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">📅 Fecha:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${fecha}</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">🕒 Hora:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${hora} (${timezone})</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">⏱️ Duración:</p>
          <p style="margin:0 0 ${zoomUrl ? '16px' : '0'};font-size:16px;color:${BRAND.dark};font-weight:600;">${duracionText}</p>
          ${zoomUrl ? `<p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">🔗 Enlace de Zoom:</p>
          <p style="margin:0;font-size:16px;"><a href="${zoomUrl}" style="color:${BRAND.coral};font-weight:600;text-decoration:underline;">Unirme a la sesión</a></p>` : `<p style="margin:0;font-size:14px;color:${BRAND.gray};">El enlace de la sesión será enviado por separado.</p>`}
        </td>
      </tr>
    </table>
    ${masterclassUrl ? `<p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Te recomiendo ver la <a href="${masterclassUrl}" style="color:${BRAND.coral};font-weight:600;text-decoration:underline;">masterclass gratuita</a> antes de nuestra sesión para que llegues con más contexto y podamos enfocarnos directamente en tu caso.
    </p>` : ''}
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si necesitas reprogramar, revisa los términos y condiciones antes de hacerlo.
    </p>
    <p style="margin:0;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Nos vemos pronto,<br>
      Dani ✨
    </p>`;
  return baseLayout(content);
}

export function getBookingNotificationEmailHtml(
  clientName: string,
  clientEmail: string,
  planName: string,
  fecha: string,
  hora: string,
  duracion: number,
  timezone: string,
  zoomStartUrl?: string,
  notas?: string,
): string {
  const duracionText =
    duracion >= 60
      ? `${Math.floor(duracion / 60)}h ${duracion % 60 ? `${duracion % 60}min` : ''}`
      : `${duracion} minutos`;

  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Nueva reserva de asesoria</h2>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};border-radius:8px;width:100%;margin-bottom:24px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Cliente:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${clientName} (${clientEmail})</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Plan:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${planName}</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Fecha:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${fecha} a las ${hora} (${timezone})</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Duracion:</p>
          <p style="margin:0 0 ${notas ? '16px' : '0'};font-size:16px;color:${BRAND.dark};font-weight:600;">${duracionText}</p>
          ${
            notas
              ? `<p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Notas del cliente:</p>
          <p style="margin:0;font-size:16px;color:${BRAND.dark};font-style:italic;">${notas}</p>`
              : ''
          }
        </td>
      </tr>
    </table>
    ${zoomStartUrl ? button('Iniciar reunion (Host Zoom)', zoomStartUrl) : ''}`;
  return baseLayout(content);
}

// ── Programa Intensivo emails ──

export function getProgramaIntensivoFullPaymentEmailHtml(
  name: string,
  accessUrl: string,
): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Tu Programa Intensivo ya esta activo</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Hola <strong style="color:${BRAND.dark};">${name}</strong>, tu pago ha sido confirmado y ya tienes acceso completo a tu Programa Intensivo.
    </p>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Dentro de tu area de miembros encontraras:
    </p>
    <ul style="margin:0 0 16px;padding-left:20px;color:${BRAND.gray};font-size:16px;line-height:1.8;">
      <li>10 videos estrategicos paso a paso</li>
      <li>Ebooks y workbooks descargables</li>
      <li>Acceso para agendar tu sesion 1:1 con Dani</li>
    </ul>
    <p style="margin:0 0 24px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Te recomiendo avanzar con los videos y el workbook antes de agendar tu sesion, asi aprovechas al maximo tu tiempo conmigo.
    </p>
    ${button('Acceder a mi Programa', accessUrl)}
    <p style="margin:24px 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si tienes alguna pregunta, responde a este email y te ayudare.
    </p>`;
  return baseLayout(content);
}

export function getProgramaIntensivoPago1EmailHtml(
  name: string,
  accessUrl: string,
): string {
  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">Ya tienes acceso a tus materiales (Pago 1 recibido)</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Hola <strong style="color:${BRAND.dark};">${name}</strong>, tu primer pago ha sido confirmado y ya puedes acceder a tus materiales del Programa Intensivo.
    </p>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Ahora mismo tienes acceso a:
    </p>
    <ul style="margin:0 0 16px;padding-left:20px;color:${BRAND.gray};font-size:16px;line-height:1.8;">
      <li>10 videos estrategicos paso a paso</li>
      <li>Ebooks y workbooks descargables</li>
    </ul>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Una vez realices tu segundo pago, podras agendar tu sesion 1:1 con Dani. Te recomiendo tomarte unas 2 semanas para avanzar con los materiales antes de agendar.
    </p>
    ${button('Acceder a mis materiales', accessUrl)}
    <p style="margin:24px 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Si tienes alguna pregunta, responde a este email y te ayudare.
    </p>`;
  return baseLayout(content);
}

export function getBookingReminderEmailHtml(
  name: string,
  planName: string,
  fecha: string,
  hora: string,
  duracion: number,
  timezone: string,
  zoomUrl: string,
  reminderType: '3d' | '24h' | '1h',
): string {
  const duracionText =
    duracion >= 60
      ? `${Math.floor(duracion / 60)}h ${duracion % 60 ? `${duracion % 60}min` : ''}`
      : `${duracion} minutos`;

  const reminderText =
    reminderType === '3d'
      ? 'Tu sesion es en 3 dias'
      : reminderType === '24h'
        ? 'Tu sesion es manana'
        : 'Tu sesion empieza en 1 hora';

  const content = `
    <h2 style="margin:0 0 16px;color:${BRAND.dark};font-size:22px;">${reminderText}</h2>
    <p style="margin:0 0 16px;color:${BRAND.gray};font-size:16px;line-height:1.6;">
      Hola <strong style="color:${BRAND.dark};">${name}</strong>, te recordamos tu sesion de <strong style="color:${BRAND.dark};">${planName}</strong>:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};border-radius:8px;width:100%;margin-bottom:24px;">
      <tr>
        <td style="padding:20px;">
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Fecha:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${fecha}</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Hora:</p>
          <p style="margin:0 0 16px;font-size:16px;color:${BRAND.dark};font-weight:600;">${hora} (${timezone})</p>
          <p style="margin:0 0 8px;font-size:14px;color:${BRAND.gray};">Duracion:</p>
          <p style="margin:0;font-size:16px;color:${BRAND.dark};font-weight:600;">${duracionText}</p>
        </td>
      </tr>
    </table>
    ${button('Unirme a la sesion (Zoom)', zoomUrl)}
    <p style="margin:24px 0 0;color:${BRAND.gray};font-size:14px;line-height:1.6;">
      Recuerda estar lista unos minutos antes. Si necesitas reprogramar, responde a este email.
    </p>`;
  return baseLayout(content);
}
