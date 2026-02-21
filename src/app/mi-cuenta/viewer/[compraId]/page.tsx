import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-service';
import { getCompraForDownload } from '@/lib/compras-service';
import PDFViewer from '@/components/mi-cuenta/PDFViewer';

export const metadata: Metadata = {
  title: 'Visor | Remote con Dani',
};

export default async function ViewerPage({
  params,
}: {
  params: Promise<{ compraId: string }>;
}) {
  const { compraId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect('/mi-cuenta/login');
  }

  const compra = await getCompraForDownload(compraId, user.id);
  if (!compra || compra.estado !== 'activa') {
    redirect('/mi-cuenta');
  }

  const productName = compra.productoDetail?.nombre ?? 'Documento';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/mi-cuenta"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black-deep shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
        <h1 className="font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
          {productName}
        </h1>
      </div>

      <PDFViewer
        pdfUrl={`/api/pdf/${compraId}`}
        productName={productName}
      />
    </div>
  );
}
