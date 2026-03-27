import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/supabase/queries'
import ArticleGrid from '@/components/editorial/ArticleGrid'
import Divider from '@/components/ui/Divider'
import NewsletterForm from '@/components/ui/NewsletterForm'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Tools & Gear',
  description: 'The essential tools, apps, and gear for working remotely from the Philippines.',
}

const ESSENTIALS = [
  {
    category: 'SIM & DATA',
    items: [
      { name: 'Globe Tattoo', note: 'Best LTE coverage nationwide' },
      { name: 'DITO', note: 'Fast urban data, growing fast' },
      { name: 'Smart Bro', note: 'Solid backup, wide rural coverage' },
    ],
  },
  {
    category: 'COWORKING',
    items: [
      { name: 'KMC Solutions', note: 'Premium spaces in Manila & Cebu' },
      { name: 'Clock In', note: 'Cebu-based, great community' },
      { name: 'Figaro Coffee', note: 'Reliable wifi cafe chain' },
    ],
  },
  {
    category: 'BANKING',
    items: [
      { name: 'Wise', note: 'Best for international transfers' },
      { name: 'Revolut', note: 'Multi-currency, low fees' },
      { name: 'UnionBank EON', note: 'Local PHP account for expats' },
    ],
  },
  {
    category: 'VPN',
    items: [
      { name: 'Mullvad', note: 'Best privacy, fixed price' },
      { name: 'ProtonVPN', note: 'Swiss-based, trustworthy' },
      { name: 'ExpressVPN', note: 'Reliable speeds throughout PH' },
    ],
  },
]

export default async function ToolsPage() {
  const posts = await getPublishedPosts(6, 'tool')

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 24px 96px' }}>
      {/* Page header */}
      <div style={{ paddingBottom: '32px', borderBottom: '1px solid var(--rule)' }}>
        <div className="label" style={{ marginBottom: '12px' }}>
          TOOLS & GEAR
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
          THE REMOTE WORKER STACK
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px' }}>
          Tested tools, apps, and gear for working and living in the Philippines.
          Opinionated and updated from the field.
        </p>
      </div>

      {/* Quick essentials grid */}
      <section style={{ padding: '48px 0', borderBottom: '1px solid var(--rule)' }}>
        <Divider label="FIELD ESSENTIALS" />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            marginTop: '32px',
          }}
        >
          {ESSENTIALS.map((section) => (
            <div key={section.category}>
              <div className="label" style={{ marginBottom: '16px' }}>
                {section.category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      padding: '12px 0',
                      borderBottom: '1px solid var(--rule)',
                    }}
                  >
                    <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '2px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{item.note}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial tool posts */}
      {posts.length > 0 && (
        <section style={{ padding: '48px 0' }}>
          <Divider label="GEAR DISPATCHES" />
          <div style={{ marginTop: '32px' }}>
            <ArticleGrid posts={posts} variant="featured" columns={3} />
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <div style={{ padding: '48px 0' }}>
          <Divider label="GEAR DISPATCHES" />
          <p className="label" style={{ padding: '32px 0' }}>
            GEAR REVIEWS COMING SOON.
          </p>
        </div>
      )}

      {/* Newsletter */}
      <div
        id="newsletter"
        style={{
          padding: '32px',
          backgroundColor: 'var(--accent-lt)',
          borderTop: '3px solid var(--accent)',
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
          TOOL REVIEWS TO YOUR INBOX
        </div>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
          New gear reviews and stack updates, monthly.
        </p>
        <NewsletterForm source="tools" />
      </div>
    </div>
  )
}
