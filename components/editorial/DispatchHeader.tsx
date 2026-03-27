import type { Post } from '@/lib/types'

interface DispatchHeaderProps {
  post: Post
  issueNumber?: number
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function readingTime(body: string | null): string {
  if (!body) return ''
  const words = body.split(/\s+/).length
  const mins = Math.ceil(words / 200)
  return `${mins} min read`
}

export default function DispatchHeader({ post, issueNumber }: DispatchHeaderProps) {
  return (
    <header>
      {/* Category / city label row */}
      <div
        className="label"
        style={{
          marginBottom: '16px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        {issueNumber && <span>ISSUE NO. {String(issueNumber).padStart(2, '0')}</span>}
        {issueNumber && <span style={{ color: 'var(--rule)' }}>·</span>}
        <span>{post.category.toUpperCase()}</span>
        {post.city && (
          <>
            <span style={{ color: 'var(--rule)' }}>·</span>
            <span>{post.city.toUpperCase()}</span>
          </>
        )}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: 'clamp(40px, 6vw, 64px)',
          letterSpacing: '0.02em',
          lineHeight: 1,
          color: 'var(--ink)',
          margin: '0 0 20px',
        }}
      >
        {post.title}
      </h1>

      {/* Excerpt / subheading */}
      {post.excerpt && (
        <p
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            fontStyle: 'italic',
            fontSize: '20px',
            lineHeight: 1.5,
            color: 'var(--ink)',
            margin: '0 0 24px',
          }}
        >
          {post.excerpt}
        </p>
      )}

      {/* Meta row */}
      <div
        className="label"
        style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '32px' }}
      >
        <span>By {post.author}</span>
        {post.published_at && (
          <>
            <span style={{ color: 'var(--rule)' }}>·</span>
            <span>{formatDate(post.published_at)}</span>
          </>
        )}
        {post.body && (
          <>
            <span style={{ color: 'var(--rule)' }}>·</span>
            <span>{readingTime(post.body)}</span>
          </>
        )}
      </div>
    </header>
  )
}
