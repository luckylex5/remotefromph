import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getCityBySlug, getPostsByCity } from '@/lib/supabase/queries'
import { markdownToHtml } from '@/lib/markdown'
import CityScore from '@/components/editorial/CityScore'
import BodyRenderer from '@/components/editorial/BodyRenderer'
import ArticleGrid from '@/components/editorial/ArticleGrid'
import Divider from '@/components/ui/Divider'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>
}): Promise<Metadata> {
  const { city } = await params
  const cityData = await getCityBySlug(city)
  if (!cityData) return {}

  return {
    title: `${cityData.name} City Guide`,
    description: cityData.tagline || `Digital nomad guide to ${cityData.name}, Philippines.`,
    alternates: {
      canonical: `https://ph-nomad.com/cities/${cityData.slug}`,
    },
  }
}

function ScoreBar({ label, score }: { label: string; score: number | null }) {
  if (score === null) return null
  const pct = (score / 10) * 100

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <span
        className="label"
        style={{ width: '60px', flexShrink: 0 }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: '6px', backgroundColor: 'var(--rule)' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: 'var(--ink)',
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: '14px',
          fontWeight: 500,
          width: '32px',
          textAlign: 'right',
        }}
      >
        {score.toFixed(1)}
      </span>
    </div>
  )
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>
}) {
  const { city: citySlug } = await params
  const [cityData, posts] = await Promise.all([
    getCityBySlug(citySlug),
    getPostsByCity(citySlug, 6),
  ])

  if (!cityData) notFound()

  const bodyHtml = cityData.body ? await markdownToHtml(cityData.body) : ''

  return (
    <article>
      {/* Hero — full-bleed with score */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        {cityData.cover_url ? (
          <Image
            src={cityData.cover_url}
            alt={cityData.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--black)' }} />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10,10,10,0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '24px',
            right: '24px',
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: 'clamp(48px, 6vw, 80px)',
              letterSpacing: '0.02em',
              lineHeight: 1,
              color: 'var(--white)',
              margin: 0,
            }}
          >
            {cityData.name.toUpperCase()}
          </h1>
          {cityData.score !== null && (
            <div
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: '14px',
                color: 'var(--white)',
                textAlign: 'right',
              }}
            >
              <div className="label" style={{ color: 'rgba(245,242,237,0.6)' }}>
                OVERALL SCORE
              </div>
              <div style={{ fontSize: '48px', fontWeight: 500, color: 'var(--accent)', lineHeight: 1 }}>
                {cityData.score.toFixed(1)}
                <span style={{ fontSize: '20px', color: 'rgba(245,242,237,0.5)' }}>/10</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
        {/* Score breakdown */}
        <div
          style={{
            padding: '48px 0',
            borderBottom: '1px solid var(--rule)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px 64px',
            maxWidth: '640px',
          }}
        >
          <ScoreBar label="WIFI" score={cityData.score_wifi} />
          <ScoreBar label="COST" score={cityData.score_cost} />
          <ScoreBar label="VIBE" score={cityData.score_vibe} />
          <ScoreBar label="SAFETY" score={cityData.score_safety} />
        </div>

        {/* City body */}
        {bodyHtml && (
          <div style={{ maxWidth: '860px', padding: '48px 0' }}>
            <BodyRenderer html={bodyHtml} />
          </div>
        )}

        <hr />

        {/* Articles from this city */}
        <section style={{ padding: '48px 0 96px' }}>
          <Divider label={`DISPATCHES FROM ${cityData.name.toUpperCase()}`} />
          {posts.length > 0 ? (
            <div style={{ marginTop: '32px' }}>
              <ArticleGrid posts={posts} variant="featured" columns={3} />
            </div>
          ) : (
            <p className="label" style={{ padding: '32px 0' }}>
              NO DISPATCHES YET — CHECK BACK SOON.
            </p>
          )}
        </section>
      </div>
    </article>
  )
}
