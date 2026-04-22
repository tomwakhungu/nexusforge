import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const hdrs = await headers()
  const sig = hdrs.get('stripe-signature')!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed.` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const userId = session.metadata?.userId
    const credits = parseInt(session.metadata?.credits || '0')

    if (userId && credits > 0) {
      // Update user credits in Supabase (assuming a credits table)
      // Increment credits for the user
      // First, fetch current credits
      const { data: userRow } = await supabase.from('user_credits').select('credits').eq('user_id', userId).single()
      const newCredits = (userRow?.credits || 0) + credits
      await supabase.from('user_credits').upsert({
        user_id: userId,
        credits: newCredits,
      })
    }
  }

  return NextResponse.json({ received: true })
}
