import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-service';
import { getCompraForDownload } from '@/lib/compras-service';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ compraId: string }> },
) {
  const { compraId } = await params;

  const user = await getCurrentUser();
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

  if (!compra.productoDetail?.download_url) {
    return NextResponse.json(
      { error: 'Producto sin archivo disponible' },
      { status: 404 },
    );
  }

  // Validate URL to prevent SSRF — only allow known CDN hosts
  const ALLOWED_HOSTS = [
    'securenlandco.b-cdn.net',
    'remotecondani.b-cdn.net',
  ];
  try {
    const parsed = new URL(compra.productoDetail.download_url);
    if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.includes(parsed.hostname)) {
      console.error(`[pdf] Blocked fetch from untrusted host: ${parsed.hostname}`);
      return NextResponse.json(
        { error: 'Producto sin archivo disponible' },
        { status: 404 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'URL de descarga inválida' },
      { status: 400 },
    );
  }

  const pdfResponse = await fetch(compra.productoDetail.download_url);
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
