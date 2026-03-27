import Link from 'next/link'

export default function Nav() {
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
          REMOTE FROM PH
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {[
            { href: '/', label: 'INDEX' },
            { href: '/blog', label: 'BLOG' },
            { href: '/cities', label: 'CITIES' },
            { href: '/visas', label: 'VISAS' },
            { href: '/tools', label: 'TOOLS' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'var(--muted)',
                textDecoration: 'none',
              }}
              className="nav-link"
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
              textTransform: 'uppercase' as const,
              backgroundColor: 'var(--accent)',
              color: 'var(--white)',
              padding: '8px 16px',
              textDecoration: 'none',
            }}
          >
            SUBSCRIBE
          </Link>
        </div>
      </div>
    </nav>
  )
}
