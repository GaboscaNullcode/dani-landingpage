import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { findOrCreateUser, updateProgramIntensivePaymentState, updateStripeCustomerId } from '@/lib/auth-service';
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
  sendProgramaIntensivoFullPaymentEmail,
  sendProgramaIntensivoPago1Email,
  sendAsesoriaPostPaymentEmail,
} from '@/lib/brevo';
import { getPaymentPlans } from '@/lib/tienda-service';
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

        // Save Stripe customer ID to profile (needed for Billing Portal)
        const stripeCustomerId = session.customer as string | null;
        if (stripeCustomerId && !user.stripeCustomerId) {
          console.log(`[webhook] Saving stripe_customer_id: ${stripeCustomerId}`);
          await updateStripeCustomerId(user.id, stripeCustomerId);
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

        const producto = await getProductById(productId);

        // For asesorias: detect Programa Intensivo vs regular asesoria
        if (isAsesoria) {
          if (producto?.producto_padre) {
            // Child product = partial payment (Pago 1 or Pago 2)
            if (producto.orden === 1) {
              await updateProgramIntensivePaymentState(user.id, { paid1: true });
              const accessUrl = `${domain}/mi-cuenta`;
              console.log(`[webhook] Programa Intensivo Pago 1 — sending materials email to ${email}`);
              await sendProgramaIntensivoPago1Email(email, name, accessUrl);
            } else {
              await updateProgramIntensivePaymentState(user.id, { paid2: true });
              const schedulingUrl = `${domain}/asesorias/agendar?session_id=${session.id}`;
              const masterclassUrl = `${domain}/tienda/masterclass-gratuita`;
              console.log(`[webhook] Programa Intensivo Pago 2 — sending scheduling email to ${email}`);
              await sendAsesoriaPostPaymentEmail(email, schedulingUrl, masterclassUrl);
            }
          } else if (producto) {
            // Parent product — check if it's a Programa Intensivo (has children)
            const childPlans = await getPaymentPlans(productId);
            if (childPlans.length > 0) {
              await updateProgramIntensivePaymentState(user.id, { paidFull: true });
              const accessUrl = `${domain}/mi-cuenta`;
              console.log(`[webhook] Programa Intensivo full payment — sending access email to ${email}`);
              await sendProgramaIntensivoFullPaymentEmail(email, name, accessUrl);
            } else {
              const schedulingUrl = `${domain}/asesorias/agendar?session_id=${session.id}`;
              const masterclassUrl = `${domain}/tienda/masterclass-gratuita`;
              console.log(`[webhook] Regular asesoria — sending post-payment email to ${email}`);
              await sendAsesoriaPostPaymentEmail(email, schedulingUrl, masterclassUrl);
            }
          } else {
            console.log('[webhook] Asesoria product not found — skipping emails');
          }
          break;
        }

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
