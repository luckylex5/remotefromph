import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/supabase/queries'
import ArticleCard from '@/components/editorial/ArticleCard'
import Divider from '@/components/ui/Divider'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog — All Dispatches',
  description: 'All articles, guides, and dispatches from PH Nomad.',
  alternates: { canonical: 'https://ph-nomad.com/blog' },
}

const CATEGORIES = [
  { key: 'all', label: 'ALL' },
  { key: 'dispatch', label: 'DISPATCHES' },
  { key: 'city-guide', label: 'CITY GUIDES' },
  { key: 'visa', label: 'VISAS' },
  { key: 'tool', label: 'TOOLS' },
]

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory = category && category !== 'all' ? category : undefined
  const posts = await getPublishedPosts(50, activeCategory)

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>
      {/* Header */}
      <div style={{ padding: '64px 0 48px', borderBottom: '1px solid var(--rule)' }}>
        <p className="label" style={{ marginBottom: '16px' }}>
          PH NOMAD // BLOG
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-bebas), sans-serif',
            fontSize: 'clamp(48px, 7vw, 96px)',
            letterSpacing: '0.02em',
            lineHeight: 1,
            color: 'var(--white)',
            margin: 0,
          }}
        >
          ALL DISPATCHES
        </h1>
      </div>

      {/* Category filter */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          borderBottom: '1px solid var(--rule)',
          overflowX: 'auto',
        }}
      >
        {CATEGORIES.map(({ key, label }) => {
          const isActive = (key === 'all' && !activeCategory) || key === activeCategory
          return (
            <a
              key={key}
              href={key === 'all' ? '/blog' : `/blog?category=${key}`}
              style={{
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                padding: '16px 24px',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                color: isActive ? 'var(--white)' : 'var(--muted)',
                whiteSpace: 'nowrap' as const,
              }}
            >
              {label}
            </a>
          )
        })}
      </div>

      {/* Post count */}
      <div style={{ padding: '24px 0 8px' }}>
        <span className="label">{posts.length} {posts.length === 1 ? 'ARTICLE' : 'ARTICLES'}</span>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '0',
            paddingBottom: '96px',
          }}
        >
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} variant="list" />
          ))}
        </div>
      ) : (
        <div style={{ padding: '96px 0', textAlign: 'center' }}>
          <p className="label">NO ARTICLES YET — CHECK BACK SOON.</p>
        </div>
      )}
    </div>
  )
}
