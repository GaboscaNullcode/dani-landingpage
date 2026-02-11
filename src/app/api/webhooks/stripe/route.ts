import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { findOrCreateUser } from '@/lib/auth-service';
import { createCompra, cancelCompraBySubscription } from '@/lib/compras-service';
import {
  sendPurchaseEmail,
  sendWelcomeEmail,
  sendCommunityEmail,
} from '@/lib/brevo';
import { getPocketBase } from '@/lib/pocketbase';
import type Stripe from 'stripe';
import type { ProductoRecord } from '@/types/tienda';

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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const name = session.customer_details?.name || session.metadata?.customerName || email?.split('@')[0] || 'Usuario';
      const productId = session.metadata?.productId;

      if (!email || !productId) {
        console.error('Missing email or productId in checkout session');
        break;
      }

      try {
        const { user, isNew, tempPassword } = await findOrCreateUser(email, name);

        if (isNew && tempPassword) {
          await sendWelcomeEmail(email, name, tempPassword);
        }

        const subscriptionId =
          session.mode === 'subscription'
            ? (session.subscription as string)
            : undefined;

        await createCompra(user.id, productId, session.id, subscriptionId);

        const pb = getPocketBase();
        const producto = await pb
          .collection('productos')
          .getOne<ProductoRecord>(productId);

        const accessUrl = `${domain}/mi-cuenta`;

        if (
          producto.categoria === 'comunidad' &&
          producto.whatsapp_link
        ) {
          await sendCommunityEmail(
            email,
            name,
            producto.nombre,
            producto.whatsapp_link,
            accessUrl,
          );
        } else {
          await sendPurchaseEmail(
            email,
            name,
            producto.nombre,
            accessUrl,
            !!subscriptionId,
          );
        }
      } catch (error) {
        console.error('Error processing checkout fulfillment:', error);
        return NextResponse.json(
          { error: 'Error processing checkout fulfillment' },
          { status: 500 },
        );
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      try {
        await cancelCompraBySubscription(subscription.id);
      } catch (error) {
        console.error('Error cancelling subscription:', error);
        return NextResponse.json(
          { error: 'Error cancelling subscription' },
          { status: 500 },
        );
      }
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
