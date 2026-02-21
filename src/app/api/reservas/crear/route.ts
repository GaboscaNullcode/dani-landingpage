import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { findOrCreateUser } from '@/lib/auth-service';
import {
  createCompra,
  getCompraByStripeSessionId,
} from '@/lib/compras-service';
import { createBooking } from '@/lib/booking-engine';
import { getAsesoriaPlanById } from '@/lib/tienda-service';
import { getCalendarConfig } from '@/lib/reservas-service';

export async function POST(request: NextRequest) {
  try {
    const { stripeSessionId, planId, fecha, hora, notasCliente } =
      await request.json();

    console.log('[reservas/crear] Request received:', {
      stripeSessionId: stripeSessionId?.slice(0, 20) + '...',
      planId,
      fecha,
      hora,
    });

    if (!stripeSessionId || !planId || !fecha || !hora) {
      console.error('[reservas/crear] Missing required fields');
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 },
      );
    }

    // Validate Stripe session as proof of payment
    const stripe = getStripe();
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(stripeSessionId);
      console.log('[reservas/crear] Stripe session validated:', {
        paymentStatus: session.payment_status,
        isAsesoria: session.metadata?.isAsesoria,
      });
    } catch (err) {
      console.error('[reservas/crear] Failed to retrieve Stripe session:', err);
      return NextResponse.json(
        { error: 'Sesion de pago no valida' },
        { status: 403 },
      );
    }

    if (
      session.payment_status !== 'paid' ||
      session.metadata?.isAsesoria !== 'true'
    ) {
      console.error('[reservas/crear] Invalid session state:', {
        paymentStatus: session.payment_status,
        isAsesoria: session.metadata?.isAsesoria,
      });
      return NextResponse.json(
        { error: 'Sesion de pago no valida' },
        { status: 403 },
      );
    }

    // Validate plan
    const plan = await getAsesoriaPlanById(planId);
    if (!plan) {
      console.error(`[reservas/crear] Plan not found: ${planId}`);
      return NextResponse.json({ error: 'Plan no valido' }, { status: 400 });
    }
    console.log(`[reservas/crear] Plan validated: ${plan.name}`);

    // Find compra by stripe_session_id (webhook may or may not have created it)
    let compra = await getCompraByStripeSessionId(stripeSessionId);
    console.log(`[reservas/crear] Compra lookup (1st):`, compra?.id || 'not found');

    if (!compra) {
      // Retry after a short wait — webhook may still be processing
      console.log('[reservas/crear] Waiting 2s for webhook...');
      await new Promise((r) => setTimeout(r, 2000));
      compra = await getCompraByStripeSessionId(stripeSessionId);
      console.log(`[reservas/crear] Compra lookup (2nd):`, compra?.id || 'not found');
    }

    if (!compra) {
      // Last resort: create the compra directly (webhook hasn't arrived yet)
      console.log('[reservas/crear] Creating compra as fallback');
      const email = session.customer_details?.email;
      const name =
        session.customer_details?.name ||
        session.metadata?.customerName ||
        email?.split('@')[0] ||
        'Usuario';
      const productId = session.metadata?.productId;

      if (!email || !productId) {
        console.error('[reservas/crear] Missing email or productId from session');
        return NextResponse.json(
          { error: 'Datos de pago incompletos' },
          { status: 400 },
        );
      }

      console.log(`[reservas/crear] findOrCreateUser: ${email}`);
      const { user } = await findOrCreateUser(email, name);
      console.log(`[reservas/crear] User: ${user.id}`);

      compra = await createCompra(user.id, productId, stripeSessionId);
      console.log(`[reservas/crear] Compra created: ${compra.id}`);
    }

    if (compra.estado !== 'activa') {
      console.error(`[reservas/crear] Compra not active: ${compra.estado}`);
      return NextResponse.json(
        { error: 'Esta compra no esta activa' },
        { status: 400 },
      );
    }

    const config = await getCalendarConfig();

    // Get client info from Stripe session
    const clientEmail =
      session.customer_details?.email || 'unknown@email.com';
    const clientName =
      session.customer_details?.name ||
      clientEmail.split('@')[0];

    console.log(`[reservas/crear] Creating booking for ${clientEmail}`);

    const result = await createBooking({
      userId: compra.usuario,
      compraId: compra.id,
      planId,
      planName: plan.name,
      fecha,
      hora,
      duracionMinutos: plan.duracionMinutos,
      timezone: config.timezone,
      notasCliente,
      clientEmail,
      clientName,
    });

    console.log('[reservas/crear] Booking created successfully');

    return NextResponse.json({
      reserva: result.reserva,
      zoomJoinUrl: result.zoomJoinUrl,
    });
  } catch (error) {
    console.error('[reservas/crear] Unhandled error:', error);
    const message =
      error instanceof Error ? error.message : 'Error al crear la reserva';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
