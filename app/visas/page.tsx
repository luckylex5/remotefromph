import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/supabase/queries'
import ArticleGrid from '@/components/editorial/ArticleGrid'
import Divider from '@/components/ui/Divider'
import NewsletterForm from '@/components/ui/NewsletterForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Visa Guide — Philippines',
  description: 'Everything digital nomads need to know about visas for the Philippines. Tourist visas, 13A, SRRV, and more.',
}

const VISA_TYPES = [
  {
    name: 'TOURIST VISA (9A)',
    duration: 'Up to 36 months',
    cost: 'Free on arrival (most passports)',
    note: 'Initial 30 days, extendable monthly at BI offices.',
  },
  {
    name: 'SPECIAL RESIDENT RETIREE VISA (SRRV)',
    duration: 'Indefinite',
    cost: 'From $10,000 deposit',
    note: 'Requires PRA membership. Best for long-term residents 35+.',
  },
  {
    name: '13A PERMANENT RESIDENT',
    duration: 'Permanent',
    cost: 'Via marriage to Filipino national',
    note: 'Quota immigrant visa also available.',
  },
  {
    name: 'SPECIAL INVESTOR\'S VISA (SIRV)',
    duration: 'Indefinite',
    cost: '$75,000 minimum investment',
    note: 'For those investing in Philippine business.',
  },
]

export default async function VisasPage() {
  const posts = await getPublishedPosts(6, 'visa')

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Page header */}
      <div style={{ paddingBottom: '32px', borderBottom: '1px solid var(--rule)' }}>
        <div className="label" style={{ marginBottom: '12px' }}>
          VISAS & IMMIGRATION
        </div>
        <h1
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            margin: '0 0 16px',
          }}
        >
          STAYING LEGAL IN THE PH
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px' }}>
          A practical guide to visa options for digital nomads and long-stay visitors.
          Always verify with the Bureau of Immigration or a licensed attorney.
        </p>
      </div>

      {/* Visa type overview cards */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--rule)' }}>
        <Divider label="VISA OPTIONS AT A GLANCE" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            marginTop: '32px',
            backgroundColor: 'var(--rule)',
            border: '1px solid var(--rule)',
          }}
        >
          {VISA_TYPES.map((visa) => (
            <div
              key={visa.name}
              style={{
                padding: '24px',
                backgroundColor: 'var(--white)',
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontSize: '20px',
                  letterSpacing: '0.02em',
                  marginBottom: '12px',
                }}
              >
                {visa.name}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span className="label" style={{ width: '72px', flexShrink: 0 }}>DURATION</span>
                  <span style={{ fontSize: '14px' }}>{visa.duration}</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span className="label" style={{ width: '72px', flexShrink: 0 }}>COST</span>
                  <span style={{ fontSize: '14px' }}>{visa.cost}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', marginBottom: 0 }}>
                {visa.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial visa posts */}
      {posts.length > 0 && (
        <section style={{ padding: '48px 0' }}>
          <Divider label="VISA DISPATCHES" />
          <div style={{ marginTop: '32px' }}>
            <ArticleGrid posts={posts} variant="featured" columns={3} />
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <div
        id="newsletter"
        style={{
          padding: '32px',
          backgroundColor: 'var(--accent-lt)',
          borderTop: '3px solid var(--accent)',
          marginTop: '32px',
          maxWidth: '480px',
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: '24px',
            letterSpacing: '0.02em',
            marginBottom: '8px',
          }}
        >
          VISA UPDATES TO YOUR INBOX
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          When immigration rules change, we update you first.
        </p>
        <NewsletterForm source="visas" />
      </div>
    </div>
  )
}
