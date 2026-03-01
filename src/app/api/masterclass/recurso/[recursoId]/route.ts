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
