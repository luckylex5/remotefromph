import type { PostSummary } from '@/lib/types'
import ArticleCard from './ArticleCard'

interface ArticleGridProps {
  posts: PostSummary[]
  variant?: 'featured' | 'list' | 'minimal'
  columns?: 2 | 3
}

export default function ArticleGrid({ posts, variant = 'featured', columns = 3 }: ArticleGridProps) {
  if (!posts.length) {
    return (
      <p className="label" style={{ padding: '32px 0' }}>
        NO ARTICLES YET.
      </p>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '32px',
      }}
    >
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} variant={variant} />
      ))}
    </div>
  )
}
