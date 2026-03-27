import type { Metadata } from 'next'
import { getCities } from '@/lib/supabase/queries'
import CityCard from '@/components/editorial/CityCard'
import Divider from '@/components/ui/Divider'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'City Guide',
  description: 'Compare the best cities in the Philippines for digital nomads. Scores for wifi, cost, safety, and vibe.',
}

export default async function CitiesPage() {
  const cities = await getCities()

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Page header */}
      <div style={{ paddingBottom: '32px', borderBottom: '1px solid var(--rule)' }}>
        <div className="label" style={{ marginBottom: '12px' }}>
          CITY DIRECTORY
        </div>
        <h1
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            margin: 0,
          }}
        >
          WHERE TO BASE YOURSELF
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', marginTop: '16px', maxWidth: '560px' }}>
          Scored across wifi quality, cost of living, safety, and overall vibe. Updated regularly.
        </p>
      </div>

      {/* City grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          marginTop: '48px',
        }}
      >
        {cities.map((city) => (
          <CityCard key={city.id} city={city} />
        ))}
      </div>

      {cities.length === 0 && (
        <p className="label" style={{ padding: '48px 0' }}>
          CITIES COMING SOON.
        </p>
      )}
    </div>
  )
}
