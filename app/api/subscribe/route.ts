import { createServerClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || typeof email !== 'string') {
      return Response.json({ error: 'Email required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const supabase = await createServerClient()
    const { error } = await supabase
      .from('subscribers')
      .insert({ email: email.toLowerCase().trim(), source: source || 'unknown', confirmed: false })

    if (error) {
      if (error.code === '23505') {
        return Response.json({ error: 'Already subscribed.' }, { status: 409 })
      }
      console.error('Subscribe error:', error)
      return Response.json({ error: 'Something went wrong.' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
