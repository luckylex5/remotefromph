import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--rule)',
        marginTop: '96px',
        padding: '48px 24px',
        backgroundColor: 'var(--bg)',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '48px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: '28px',
              letterSpacing: '0.02em',
              marginBottom: '12px',
            }}
          >
            PH NOMAD
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.6' }}>
            The editorial guide for location-independent workers in the Philippines.
          </p>
        </div>

        <div>
          <div
            className="label"
            style={{ marginBottom: '16px' }}
          >
            NAVIGATE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '/', label: 'Index' },
              { href: '/blog', label: 'Blog' },
              { href: '/cities', label: 'City Guide' },
              { href: '/visas', label: 'Visas' },
              { href: '/tools', label: 'Tools & Gear' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: '14px', color: 'var(--ink)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="label" style={{ marginBottom: '16px' }}>
            CITIES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '/cities/cebu', label: 'Cebu City' },
              { href: '/cities/siargao', label: 'Siargao' },
              { href: '/cities/manila', label: 'Manila' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ fontSize: '14px', color: 'var(--ink)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1440px',
          margin: '48px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid var(--rule)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="label">© {year} PH NOMAD</span>
        <span className="label">EDITORIAL GUIDE FOR DIGITAL NOMADS</span>
      </div>
    </footer>
  )
}
