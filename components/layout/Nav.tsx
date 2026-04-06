'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/', label: 'INDEX' },
  { href: '/blog', label: 'BLOG' },
  { href: '/cities', label: 'CITIES' },
  { href: '/visas', label: 'VISAS' },
  { href: '/tools', label: 'TOOLS' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--rule)',
        backgroundColor: 'var(--bg)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '56px',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: '20px',
            letterSpacing: '0.02em',
            color: 'var(--white)',
            textDecoration: 'none',
          }}
        >
          PH NOMAD
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#newsletter"
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backgroundColor: 'var(--accent)',
              color: 'var(--white)',
              padding: '8px 16px',
              textDecoration: 'none',
            }}
          >
            SUBSCRIBE
          </Link>
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href="#newsletter" className="subscribe" onClick={() => setOpen(false)}>
          SUBSCRIBE
        </Link>
      </div>
    </nav>
  )
}
