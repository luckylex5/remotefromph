import Image from 'next/image'

interface HeroSectionProps {
  coverUrl?: string | null
}

export default function HeroSection({ coverUrl }: HeroSectionProps) {
  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: 'var(--black)',
        height: '80vh',
        minHeight: '560px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {coverUrl && (
        <Image
          src={coverUrl}
          alt="Remote from Philippines"
          fill
          style={{ objectFit: 'cover', opacity: 0.3 }}
          priority
        />
      )}

      {/* Red accent bar — top-left edge */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '4px',
        height: '100%',
        backgroundColor: 'var(--accent)',
        zIndex: 3,
      }} />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '48px 40px',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Eyebrow label */}
        <p style={{
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '16px',
        }}>
          Editorial // Digital Nomad Guide
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(72px, 11vw, 148px)',
            letterSpacing: '0.01em',
            lineHeight: 0.92,
            color: 'var(--white)',
            margin: 0,
          }}
        >
          WORK <span style={{ color: 'var(--accent)' }}>REMOTE.</span><br />
          LIVE TROPICAL.
        </h1>

        <div style={{
          marginTop: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--accent)',
          }} />
          <p
            style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '14px',
              color: 'rgba(245, 242, 237, 0.6)',
              margin: 0,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Philippines — City Guides · Visas · Dispatches
          </p>
        </div>
      </div>
    </section>
  )
}
