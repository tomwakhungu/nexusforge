import { NextResponse } from 'next/server'
import { generatePBOM, estimateCreditCost } from '@sbom'
import { ScanRequestSchema } from '@shared'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) {
    return NextResponse.json({ error: 'invalid_request', message: 'Body is required' }, { status: 400 })
  }

  const parsed = ScanRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_request', message: parsed.error.format() }, { status: 400 })
  }

  // Check user credits (mock for now)
  const userId = body.userId // Assume passed in request
  const { data: credits } = await supabase.from('user_credits').select('credits').eq('user_id', userId).single()
  if (!credits || credits.credits < 50) {
    return NextResponse.json({ error: 'insufficient_credits', message: 'Not enough credits' }, { status: 402 })
  }

  const scan = generatePBOM(parsed.data)
  const cost = estimateCreditCost(scan.pbom?.components || [])

  // Deduct credits
  await supabase.from('user_credits').update({ credits: credits.credits - cost }).eq('user_id', userId)

  return NextResponse.json({ ...scan, creditsDeducted: cost })
