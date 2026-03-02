import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getContenidoById } from '@/lib/programa-contenido-service';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ contenidoId: string }> },
) {
  const { contenidoId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const contenido = await getContenidoById(contenidoId);
  if (!contenido || !contenido.download_url || contenido.download_url === '#') {
    return NextResponse.json(
      { error: 'Recurso no encontrado' },
      { status: 404 },
    );
  }

  // Validate user access to the product
  const productoId = contenido.producto_id;

  if (productoId === 'crea-camino') {
    const { programIntensivePaidFull, programIntensivePaid1, programIntensivePaid2 } = user;
    if (!programIntensivePaidFull && !programIntensivePaid1 && !programIntensivePaid2) {
      return NextResponse.json({ error: 'Sin acceso' }, { status: 403 });
    }
  } else if (productoId === 'masterclass-gratuita') {
    // Masterclass is free — just being logged in is enough
  } else {
    const compras = await getUserCompras(user.id);
    const hasAccess = compras.some(
      (c) => c.estado === 'activa' && c.producto === productoId,
    );
    if (!hasAccess) {
      return NextResponse.json({ error: 'Sin acceso' }, { status: 403 });
    }
  }

  const pdfResponse = await fetch(contenido.download_url);
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
