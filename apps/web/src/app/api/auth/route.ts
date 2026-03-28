import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function GET() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { data: orgs } = await supabase.from('nexusforge.orgs').select('*').eq('id', user.id)
  return NextResponse.json({ user, orgs })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Create default org
  const { data: org } = await supabase.from('nexusforge.orgs').insert({
    name: `${email}'s Org`,
  }).select().single()

  return NextResponse.json({ user: data.user, org })
}
