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

    if (!stripeSessionId || !planId || !fecha || !hora) {
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
    } catch {
      return NextResponse.json(
        { error: 'Sesion de pago no valida' },
        { status: 403 },
      );
    }

    if (
      session.payment_status !== 'paid' ||
      session.metadata?.isAsesoria !== 'true'
    ) {
      return NextResponse.json(
        { error: 'Sesion de pago no valida' },
        { status: 403 },
      );
    }

    // Validate plan
    const plan = await getAsesoriaPlanById(planId);
    if (!plan) {
      return NextResponse.json({ error: 'Plan no valido' }, { status: 400 });
    }

    // Find compra by stripe_session_id (webhook may or may not have created it)
    let compra = await getCompraByStripeSessionId(stripeSessionId);

    if (!compra) {
      // Retry after a short wait — webhook may still be processing
      await new Promise((r) => setTimeout(r, 2000));
      compra = await getCompraByStripeSessionId(stripeSessionId);
    }

    if (!compra) {
      // Last resort: create the compra directly (webhook hasn't arrived yet)
      const email = session.customer_details?.email;
      const name =
        session.customer_details?.name ||
        session.metadata?.customerName ||
        email?.split('@')[0] ||
        'Usuario';
      const productId = session.metadata?.productId;

      if (!email || !productId) {
        return NextResponse.json(
          { error: 'Datos de pago incompletos' },
          { status: 400 },
        );
      }

      const { user } = await findOrCreateUser(email, name);
      compra = await createCompra(user.id, productId, stripeSessionId);
    }

    if (compra.estado !== 'activa') {
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

    return NextResponse.json({
      reserva: result.reserva,
      zoomJoinUrl: result.zoomJoinUrl,
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    const message =
      error instanceof Error ? error.message : 'Error al crear la reserva';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
