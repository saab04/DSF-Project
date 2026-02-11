import { NextResponse } from "next/server";

import { setBookingActiveStatus } from "@/lib/bookings";
import { stripe } from "@/lib/stripe";

export async function POST(request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook secret" }, { status: 400 });
  }

  const body = await request.text();
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: error.message || String(error) }, { status: 400 });
  }

  if (
    event.type === "checkout.session.expired" ||
    event.type === "checkout.session.async_payment_failed"
  ) {
    const session = event.data.object;
    const bookingId = session?.metadata?.booking_id ? Number(session.metadata.booking_id) : null;

    if (bookingId) {
      await setBookingActiveStatus(bookingId, false);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
