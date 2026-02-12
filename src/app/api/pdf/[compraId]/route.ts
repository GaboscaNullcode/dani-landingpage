import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getCompraForDownload } from '@/lib/compras-service';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ compraId: string }> },
) {
  const { compraId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('pb_auth')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const user = await getCurrentUser(token);
  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const compra = await getCompraForDownload(compraId, user.id);
  if (!compra) {
    return NextResponse.json({ error: 'Compra no encontrada' }, { status: 404 });
  }

  if (compra.estado !== 'activa') {
    return NextResponse.json({ error: 'Compra no activa' }, { status: 403 });
  }

  const producto = compra.expand?.producto;
  if (!producto?.download_url) {
    return NextResponse.json(
      { error: 'Producto sin archivo disponible' },
      { status: 404 },
    );
  }

  const pdfResponse = await fetch(producto.download_url);
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
