import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { findOrCreateUser } from '@/lib/auth-service';
import {
  createCompra,
  cancelCompraBySubscription,
  getCompraByStripeSessionId,
} from '@/lib/compras-service';
import { getProductById } from '@/lib/tienda-service';
import {
  sendPurchaseEmail,
  sendWelcomeEmail,
  sendCommunityEmail,
} from '@/lib/brevo';
import type Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 },
    );
  }

  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

  console.log(`[webhook] Received event: ${event.type} (${event.id})`);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const name = session.customer_details?.name || session.metadata?.customerName || email?.split('@')[0] || 'Usuario';
      const productId = session.metadata?.productId;
      const isAsesoria = session.metadata?.isAsesoria === 'true';

      console.log(`[webhook] checkout.session.completed:`, {
        sessionId: session.id,
        email,
        productId,
        isAsesoria,
        paymentStatus: session.payment_status,
        mode: session.mode,
      });

      if (!email || !productId) {
        console.error('[webhook] Missing email or productId in session metadata');
        break;
      }

      try {
        // Check if compra already exists (may have been created by /api/reservas/crear)
        const existingCompra = await getCompraByStripeSessionId(session.id);
        console.log(`[webhook] Existing compra for session:`, existingCompra?.id || 'none');

        if (existingCompra) {
          if (isAsesoria) {
            console.log('[webhook] Asesoria compra already exists, skipping');
            break;
          }
        }

        console.log(`[webhook] Finding or creating user: ${email}`);
        const { user, isNew, tempPassword } = await findOrCreateUser(email, name);
        console.log(`[webhook] User ${user.id} (isNew: ${isNew})`);

        if (isNew && tempPassword) {
          console.log(`[webhook] Sending welcome email to ${email}`);
          await sendWelcomeEmail(email, name, tempPassword);
        }

        const subscriptionId =
          session.mode === 'subscription'
            ? (session.subscription as string)
            : undefined;

        if (!existingCompra) {
          console.log(`[webhook] Creating compra: user=${user.id}, product=${productId}`);
          await createCompra(user.id, productId, session.id, subscriptionId);
          console.log('[webhook] Compra created successfully');
        }

        // For asesorias: skip product emails (booking confirmation sent after scheduling)
        if (isAsesoria) {
          console.log('[webhook] Asesoria — skipping product emails');
          break;
        }

        const producto = await getProductById(productId);

        if (!producto) {
          console.error(`[webhook] Product not found: ${productId}`);
          break;
        }

        const accessUrl = `${domain}/mi-cuenta`;

        if (
          producto.categoria === 'comunidad' &&
          producto.whatsapp_link
        ) {
          console.log(`[webhook] Sending community email to ${email}`);
          await sendCommunityEmail(
            email,
            name,
            producto.nombre,
            producto.whatsapp_link,
            accessUrl,
          );
        } else {
          console.log(`[webhook] Sending purchase email to ${email}`);
          await sendPurchaseEmail(
            email,
            name,
            producto.nombre,
            accessUrl,
            !!subscriptionId,
          );
        }

        console.log('[webhook] Checkout fulfillment completed successfully');
      } catch (error) {
        console.error('[webhook] Error processing checkout fulfillment:', error);
        return NextResponse.json(
          { error: 'Error processing checkout fulfillment' },
          { status: 500 },
        );
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[webhook] Cancelling subscription: ${subscription.id}`);
      try {
        await cancelCompraBySubscription(subscription.id);
        console.log('[webhook] Subscription cancelled successfully');
      } catch (error) {
        console.error('[webhook] Error cancelling subscription:', error);
        return NextResponse.json(
          { error: 'Error cancelling subscription' },
          { status: 500 },
        );
      }
      break;
    }
    default:
      console.log(`[webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
