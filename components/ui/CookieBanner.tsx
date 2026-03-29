'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
    // Fire consent event so ad/analytics scripts can initialize
    window.dispatchEvent(new Event('cookie_consent_accepted'))
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'var(--white)',
        borderTop: '2px solid var(--black)',
        padding: '20px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            color: 'var(--black)',
            lineHeight: 1.6,
            margin: 0,
            flex: '1 1 300px',
          }}
        >
          We use cookies for analytics and advertising (Google AdSense) to keep this site free.{' '}
          <Link
            href="/privacy"
            style={{ color: 'var(--black)', textDecoration: 'underline' }}
          >
            Privacy Policy
          </Link>
        </p>

        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={decline}
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '10px 20px',
              border: '1px solid var(--black)',
              backgroundColor: 'transparent',
              color: 'var(--black)',
              cursor: 'pointer',
            }}
          >
            Decline
          </button>
          <button
            onClick={accept}
            style={{
              fontFamily: 'var(--font-jetbrains), monospace',
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '10px 20px',
              border: '1px solid var(--black)',
              backgroundColor: 'var(--black)',
              color: 'var(--white)',
              cursor: 'pointer',
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
