import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getMasterclassResource } from '@/lib/masterclass-service';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ recursoId: string }> },
) {
  const { recursoId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const resource = await getMasterclassResource(recursoId);
  if (!resource) {
    return NextResponse.json(
      { error: 'Recurso no encontrado' },
      { status: 404 },
    );
  }

  if (!resource.downloadUrl || resource.downloadUrl === '#') {
    return NextResponse.json(
      { error: 'Recurso sin archivo disponible' },
      { status: 404 },
    );
  }

  // Validate URL to prevent SSRF — only allow known CDN hosts
  const ALLOWED_HOSTS = [
    'securenlandco.b-cdn.net',
    'remotecondani.b-cdn.net',
  ];
  try {
    const parsed = new URL(resource.downloadUrl);
    if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.includes(parsed.hostname)) {
      console.error(`[masterclass/recurso] Blocked fetch from untrusted host: ${parsed.hostname}`);
      return NextResponse.json(
        { error: 'Recurso sin archivo disponible' },
        { status: 404 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'URL de recurso inválida' },
      { status: 400 },
    );
  }

  const pdfResponse = await fetch(resource.downloadUrl);
  if (!pdfResponse.ok) {
    return NextResponse.json(
      { error: 'Error al obtener el archivo' },
      { status: 502 },
    );
  }

  const pdfBuffer = await pdfResponse.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
