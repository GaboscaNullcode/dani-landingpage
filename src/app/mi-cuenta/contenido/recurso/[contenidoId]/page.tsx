import { redirect, notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-service';
import { getUserCompras } from '@/lib/compras-service';
import { getContenidoById } from '@/lib/programa-contenido-service';
import { getProductBySlug } from '@/lib/tienda-service';
import PDFViewer from '@/components/mi-cuenta/PDFViewerDynamic';

interface PageProps {
  params: Promise<{ contenidoId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { contenidoId } = await params;
  const contenido = await getContenidoById(contenidoId);

  return {
    title: contenido
      ? `${contenido.titulo} | Remote con Dani`
      : 'Recurso no encontrado | Remote con Dani',
  };
}

export default async function RecursoViewerPage({ params }: PageProps) {
  const { contenidoId } = await params;

  const contenido = await getContenidoById(contenidoId);
  if (
    !contenido ||
    !contenido.download_url ||
    contenido.download_url === '#'
  ) {
    notFound();
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect('/mi-cuenta/login');
  }

  // Validate access to the product
  const productoId = contenido.producto_id;

  if (productoId === 'crea-camino') {
    const {
      programIntensivePaidFull,
      programIntensivePaid1,
      programIntensivePaid2,
    } = user;
    if (
      !programIntensivePaidFull &&
      !programIntensivePaid1 &&
      !programIntensivePaid2
    ) {
      redirect('/mi-cuenta');
    }
  } else if (productoId === 'masterclass-gratuita') {
    // Free — logged in is enough
  } else {
    const compras = await getUserCompras(user.id);
    const hasAccess = compras.some(
      (c) => c.estado === 'activa' && c.producto === productoId,
    );
    if (!hasAccess) {
      redirect('/mi-cuenta');
    }
  }

  // Resolve product slug for back link
  // We search all products by ID via slug — producto_id is the product table id
  // Use a simple approach: try common slug patterns
  const allProducts = await import('@/lib/tienda-service').then((m) =>
    m.getAllProducts(),
  );
  const product = allProducts.find((p) => p.id === productoId);
  const backHref = product
    ? `/mi-cuenta/contenido/${product.slug}`
    : '/mi-cuenta';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black-deep shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <h1 className="font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
          {contenido.titulo}
        </h1>
      </div>

      <PDFViewer
        pdfUrl={`/api/programa-contenido/${contenidoId}`}
        productName={contenido.titulo}
      />
    </div>
  );
}
