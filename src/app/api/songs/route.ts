// ✅ Basic structure for an API route in Next.js App Router (v13+)

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello from /api/songs' })
}
