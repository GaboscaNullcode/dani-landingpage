import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getCompraForDownload } from '@/lib/compras-service';
import type { ProductoRecord } from '@/types/tienda';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ compraId: string }> },
) {
  const token = request.cookies.get('pb_auth')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  const user = await getCurrentUser(token);
  if (!user) {
    return NextResponse.json({ error: 'Token invalido' }, { status: 401 });
  }

  const { compraId } = await params;
  const compra = await getCompraForDownload(compraId, user.id);

  if (!compra) {
    return NextResponse.json(
      { error: 'Compra no encontrada' },
      { status: 404 },
    );
  }

  if (compra.estado !== 'activa') {
    return NextResponse.json(
      { error: 'Compra no activa' },
      { status: 403 },
    );
  }

  const producto = compra.expand?.producto as ProductoRecord | undefined;
  const downloadUrl = producto?.download_url;

  if (!downloadUrl) {
    return NextResponse.json(
      { error: 'Archivo no disponible' },
      { status: 404 },
    );
  }

  const fileResponse = await fetch(downloadUrl);

  if (!fileResponse.ok) {
    return NextResponse.json(
      { error: 'Error al obtener el archivo' },
      { status: 502 },
    );
  }

  const contentType =
    fileResponse.headers.get('content-type') || 'application/octet-stream';
  const filename = producto?.nombre
    ? `${producto.nombre.replace(/[^a-zA-Z0-9._-]/g, '_')}.pdf`
    : 'descarga.pdf';

  return new NextResponse(fileResponse.body, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
