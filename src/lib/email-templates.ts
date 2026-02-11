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
