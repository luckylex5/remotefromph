'use client'

import { useState } from 'react'

interface NewsletterFormProps {
  source?: string
}

export default function NewsletterForm({ source = 'article' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: '28px',
          letterSpacing: '0.02em',
          color: 'var(--accent)',
        }}
      >
        CHECK YOUR INBOX.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0' }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        style={{
          flex: 1,
          padding: '12px 16px',
          fontSize: '14px',
          fontFamily: "var(--font-dm-sans), sans-serif",
          border: '1px solid var(--rule)',
          borderRight: 'none',
          backgroundColor: 'var(--white)',
          color: 'var(--ink)',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          backgroundColor: 'var(--ink)',
          color: 'var(--white)',
          border: 'none',
          padding: '12px 20px',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        {status === 'loading' ? '...' : 'SUBSCRIBE →'}
      </button>
      {status === 'error' && (
        <p style={{ color: 'var(--accent)', fontSize: '12px', marginTop: '8px' }}>{message}</p>
      )}
    </form>
  )
}
