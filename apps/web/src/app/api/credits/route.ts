import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ credits: 100 })
}

export async function POST() {
  return NextResponse.json({ credits: 100 })
}
