import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(request: Request) {
  const body = await request.json()
  const { credits, userId } = body

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'NexusForge Credits',
            description: `${credits} credits for PBOM scans and AI analysis`,
          },
          unit_amount: 10, // $0.10 per credit
        },
        quantity: credits,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true`,
    metadata: {
      userId,
      credits: credits.toString(),
    },
  })

  return NextResponse.json({ url: session.url })
}
