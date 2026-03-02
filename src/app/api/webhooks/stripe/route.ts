import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { findOrCreateUser, updateProgramIntensivePaymentState, updateStripeCustomerId } from '@/lib/auth-service';
import {
  createCompra,
  cancelCompraBySubscription,
  getCompraByStripeSessionId,
  refundCompraByStripeSessionId,
  getActiveCompraByUserAndProduct,
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
import { getPostHogServer } from '@/lib/posthog-server';
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
        // Idempotency: check if compra already exists for this session
        const existingCompra = await getCompraByStripeSessionId(session.id);
        console.log(`[webhook] Existing compra for session:`, existingCompra?.id || 'none');

        if (existingCompra) {
          if (isAsesoria) {
            console.log('[webhook] Asesoria compra already exists, skipping');
            break;
          }
          // For non-asesoria, if compra exists the webhook already ran — skip to avoid duplicates
          console.log('[webhook] Compra already exists, skipping duplicate webhook');
          break;
        }

        console.log(`[webhook] Finding or creating user: ${email}`);
        const { user, isNew, tempPassword } = await findOrCreateUser(email, name);
        console.log(`[webhook] User ${user.id} (isNew: ${isNew})`);

        // Parallelize independent operations: welcome email + Stripe customer ID update
        const stripeCustomerId = session.customer as string | null;
        const parallelOps: Promise<unknown>[] = [];

        if (isNew && tempPassword) {
          console.log(`[webhook] Sending welcome email to ${email}`);
          parallelOps.push(sendWelcomeEmail(email, name, tempPassword));
        }

        if (stripeCustomerId && !user.stripeCustomerId) {
          console.log(`[webhook] Saving stripe_customer_id: ${stripeCustomerId}`);
          parallelOps.push(updateStripeCustomerId(user.id, stripeCustomerId));
        }

        if (parallelOps.length > 0) {
          await Promise.all(parallelOps);
        }

        const subscriptionId =
          session.mode === 'subscription'
            ? (session.subscription as string)
            : undefined;

        if (!existingCompra) {
          // Prevent duplicate purchases: check if user already has an active compra for this product
          const existingActiveCompra = await getActiveCompraByUserAndProduct(user.id, productId);
          if (existingActiveCompra) {
            console.log(`[webhook] User ${user.id} already has active compra ${existingActiveCompra.id} for product ${productId}, skipping duplicate`);
          } else {
            console.log(`[webhook] Creating compra: user=${user.id}, product=${productId}`);
            await createCompra(user.id, productId, session.id, subscriptionId);
            console.log('[webhook] Compra created successfully');
          }
        }

        const producto = await getProductById(productId);

        // For asesorias: detect Programa Intensivo vs regular asesoria
        if (isAsesoria) {
          if (producto?.producto_padre) {
            // Child product = partial payment (Pago 1 or Pago 2)
            // Use getPaymentPlans to reliably identify which payment this is
            const plans = await getPaymentPlans(producto.producto_padre);
            const isFirstPayment = plans.length > 0 && productId === plans[0].id;

            if (isFirstPayment) {
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

        // Track purchase in PostHog
        try {
          const ph = getPostHogServer();
          ph.capture({
            distinctId: email,
            event: 'purchase_completed',
            properties: {
              product_id: productId,
              product_name: producto?.nombre,
              product_category: producto?.categoria,
              price: session.amount_total ? session.amount_total / 100 : undefined,
              currency: session.currency,
              is_subscription: !!subscriptionId,
              is_asesoria: isAsesoria,
              is_new_user: isNew,
            },
          });
          await ph.shutdown();
        } catch (phError) {
          console.error('[webhook] PostHog tracking error (non-critical):', phError);
        }

        console.log('[webhook] Checkout fulfillment completed successfully');
      } catch (error) {
        console.error('[webhook] Error processing checkout fulfillment:', error);
        // Return 200 to prevent Stripe from retrying for logical errors.
        // The compra may already exist; retrying would not fix the issue
        // and could cause duplicate side effects (emails, etc).
        return NextResponse.json({ received: true, error: 'fulfillment_error' });
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[webhook] Cancelling subscription: ${subscription.id}`);
      try {
        await cancelCompraBySubscription(subscription.id);

        // Track cancellation in PostHog — resolve customer email for consistent distinctId
        try {
          const ph = getPostHogServer();
          let customerEmail = 'unknown';
          const customerId = typeof subscription.customer === 'string'
            ? subscription.customer
            : undefined;
          if (customerId) {
            try {
              const customer = await getStripe().customers.retrieve(customerId);
              if (!customer.deleted && customer.email) {
                customerEmail = customer.email;
              }
            } catch {
              // Fall back to customer ID if retrieval fails
              customerEmail = customerId;
            }
          }
          ph.capture({
            distinctId: customerEmail,
            event: 'subscription_cancelled',
            properties: {
              subscription_id: subscription.id,
              stripe_customer_id: customerId,
            },
          });
          await ph.shutdown();
        } catch (phError) {
          console.error('[webhook] PostHog tracking error (non-critical):', phError);
        }

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
    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge;
      console.log(`[webhook] Processing refund for charge: ${charge.id}`);
      try {
        // Stripe links charge to payment_intent, which links to checkout session
        const paymentIntentId = typeof charge.payment_intent === 'string'
          ? charge.payment_intent
          : charge.payment_intent?.id;

        if (!paymentIntentId) {
          console.error('[webhook] No payment_intent on refunded charge');
          break;
        }

        // Find the checkout session(s) associated with this payment_intent
        const sessions = await getStripe().checkout.sessions.list({
          payment_intent: paymentIntentId,
          limit: 1,
        });

        const session = sessions.data[0];
        if (!session) {
          console.error(`[webhook] No checkout session found for payment_intent: ${paymentIntentId}`);
          break;
        }

        // Determine if full or partial refund
        const isFullRefund = charge.amount_refunded >= charge.amount;

        if (isFullRefund) {
          await refundCompraByStripeSessionId(session.id);
          console.log(`[webhook] Full refund processed for session: ${session.id}`);
        } else {
          console.log(`[webhook] Partial refund (${charge.amount_refunded}/${charge.amount}) — compra kept active for session: ${session.id}`);
        }

        // Track refund in PostHog
        try {
          const ph = getPostHogServer();
          let customerEmail = 'unknown';
          if (charge.billing_details?.email) {
            customerEmail = charge.billing_details.email;
          } else if (typeof charge.customer === 'string') {
            try {
              const customer = await getStripe().customers.retrieve(charge.customer);
              if (!customer.deleted && customer.email) {
                customerEmail = customer.email;
              }
            } catch { /* fallback to unknown */ }
          }
          ph.capture({
            distinctId: customerEmail,
            event: 'purchase_refunded',
            properties: {
              charge_id: charge.id,
              amount_refunded: charge.amount_refunded / 100,
              amount_total: charge.amount / 100,
              currency: charge.currency,
              is_full_refund: isFullRefund,
              session_id: session.id,
            },
          });
          await ph.shutdown();
        } catch (phError) {
          console.error('[webhook] PostHog tracking error (non-critical):', phError);
        }
      } catch (error) {
        console.error('[webhook] Error processing refund:', error);
        // Return 200 for refund errors — retrying won't help for logic errors
      }
      break;
    }
    default:
      console.log(`[webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
