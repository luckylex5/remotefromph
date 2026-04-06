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
    <div className={columns === 2 ? 'grid-articles-2' : 'grid-articles-3'}>
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} variant={variant} />
      ))}
    </div>
  )
}
