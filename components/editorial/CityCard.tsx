import Link from 'next/link'
import Image from 'next/image'
import type { City } from '@/lib/types'

interface CityCardProps {
  city: City
}

export default function CityCard({ city }: CityCardProps) {
  return (
    <Link href={`/cities/${city.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
          {city.cover_url ? (
            <Image
              src={city.cover_url}
              alt={city.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--rule)' }} />
          )}
          {/* Score badge overlay */}
          {city.score !== null && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'var(--ink)',
                padding: '4px 10px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px',
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {city.score.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div style={{ padding: '16px 0' }}>
          <h3
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: '28px',
              letterSpacing: '0.02em',
              margin: '0 0 4px',
              color: 'var(--ink)',
              lineHeight: 1,
            }}
          >
            {city.name.toUpperCase()}
          </h3>
          {city.tagline && (
            <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
              {city.tagline}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}
