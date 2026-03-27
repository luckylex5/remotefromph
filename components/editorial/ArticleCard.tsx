import Link from 'next/link'
import Image from 'next/image'
import type { PostSummary } from '@/lib/types'
import Tag from '@/components/ui/Tag'

interface ArticleCardProps {
  post: PostSummary
  variant?: 'featured' | 'list' | 'minimal'
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function ArticleCard({ post, variant = 'featured' }: ArticleCardProps) {
  if (variant === 'minimal') {
    return (
      <Link href={`/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          style={{
            padding: '16px 0',
            borderBottom: '1px solid var(--rule)',
          }}
        >
          <div className="label" style={{ marginBottom: '6px' }}>
            {post.category} {post.city ? `· ${post.city}` : ''}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              fontSize: '16px',
              margin: '0 0 4px',
              color: 'var(--ink)',
              lineHeight: 1.4,
            }}
          >
            {post.title}
          </h3>
          <span className="label">{formatDate(post.published_at)}</span>
        </article>
      </Link>
    )
  }

  if (variant === 'list') {
    return (
      <Link href={`/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <article
          style={{
            display: 'flex',
            gap: '16px',
            padding: '16px 0',
            borderBottom: '1px solid var(--rule)',
          }}
        >
          {post.cover_url && (
            <div
              style={{
                width: '120px',
                flexShrink: 0,
                aspectRatio: '4/3',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <Image
                src={post.cover_url}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          <div>
            <div className="label" style={{ marginBottom: '6px' }}>
              {post.category}
              {post.city ? ` · ${post.city}` : ''}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 500,
                fontSize: '16px',
                margin: '0 0 6px',
                color: 'var(--ink)',
                lineHeight: 1.4,
              }}
            >
              {post.title}
            </h3>
            <span className="label">{formatDate(post.published_at)}</span>
          </div>
        </article>
      </Link>
    )
  }

  // featured (default)
  return (
    <Link href={`/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article>
        {post.cover_url && (
          <div
            style={{
              aspectRatio: '16/9',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '16px',
            }}
          >
            <Image
              src={post.cover_url}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className="label" style={{ marginBottom: '8px' }}>
          {post.category}
          {post.city ? ` · ${post.city}` : ''}
          {' · '}
          {formatDate(post.published_at)}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: '32px',
            letterSpacing: '0.02em',
            lineHeight: 1,
            margin: '0 0 12px',
            color: 'var(--ink)',
          }}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p
            style={{
              fontSize: '15px',
              color: 'var(--muted)',
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
            {post.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
