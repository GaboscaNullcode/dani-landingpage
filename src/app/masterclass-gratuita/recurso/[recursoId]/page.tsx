import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth-service';
import { getMasterclassResource } from '@/lib/masterclass-service';
import PDFViewer from '@/components/mi-cuenta/PDFViewerDynamic';

export const metadata: Metadata = {
  title: 'Recurso | Masterclass Gratuita | Remote con Dani',
};

export default async function MasterclassRecursoPage({
  params,
}: {
  params: Promise<{ recursoId: string }>;
}) {
  const { recursoId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect('/mi-cuenta/login?redirectTo=/masterclass-gratuita');
  }

  const resource = await getMasterclassResource(recursoId);
  if (!resource) {
    redirect('/masterclass-gratuita');
  }

  return (
    <section
      className="relative min-h-screen overflow-hidden pt-32 pb-16"
      style={{
        background:
          'linear-gradient(135deg, #fef7f0 0%, #ffecd2 50%, #fce7f3 100%)',
      }}
    >
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="blob absolute -right-32 -top-32 h-[400px] w-[400px] animate-blob opacity-25"
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 107, 107, 0.4) 0%, rgba(224, 86, 160, 0.3) 100%)',
          }}
        />
        <div
          className="blob absolute -left-40 bottom-0 h-[350px] w-[350px] animate-blob opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(167, 139, 250, 0.4) 0%, rgba(110, 231, 183, 0.3) 100%)',
            animationDelay: '3s',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-4">
            <Link
              href="/masterclass-gratuita"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black-deep shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a la masterclass
            </Link>
            <h1 className="font-[var(--font-headline)] text-xl font-bold text-black-deep md:text-2xl">
              {resource.title}
            </h1>
          </div>

          <PDFViewer
            pdfUrl={`/api/masterclass/recurso/${recursoId}`}
            productName={resource.title}
          />
        </div>
      </div>
    </section>
  );
}
