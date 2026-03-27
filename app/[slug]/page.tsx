import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import {
  getPostBySlug,
  getPublishedPosts,
  getAllPublishedSlugs,
} from '@/lib/supabase/queries'
import { markdownToHtml } from '@/lib/markdown'
import DispatchHeader from '@/components/editorial/DispatchHeader'
import BodyRenderer from '@/components/editorial/BodyRenderer'
import ArticleGrid from '@/components/editorial/ArticleGrid'
import NewsletterForm from '@/components/ui/NewsletterForm'
import Divider from '@/components/ui/Divider'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return []
  const slugs = await getAllPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.seo_title || post.title,
    description: post.seo_desc || post.excerpt || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_desc || post.excerpt || undefined,
      images: post.cover_url ? [post.cover_url] : [],
      type: 'article',
      publishedTime: post.published_at || undefined,
    },
    alternates: {
      canonical: `https://remotefromph.com/${post.slug}`,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const [html, related] = await Promise.all([
    post.body ? markdownToHtml(post.body) : Promise.resolve(post.body_html || ''),
    getPublishedPosts(4, post.category),
  ])

  const relatedPosts = related.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article>
      {/* Article header — centered, max 860px */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px 0' }}>
        <DispatchHeader post={post} />
        <hr />
      </div>

      {/* Cover image — full-width */}
      {post.cover_url && (
        <div
          style={{
            width: '100%',
            height: '480px',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '0',
          }}
        >
          <Image
            src={post.cover_url}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      )}

      {/* Body */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '48px 24px' }}>
        {html && <BodyRenderer html={html} />}

        <hr style={{ margin: '48px 0' }} />

        {/* Newsletter CTA */}
        <div
          id="newsletter"
          style={{
            padding: '32px',
            backgroundColor: 'var(--accent-lt)',
            borderTop: '3px solid var(--accent)',
            marginBottom: '64px',
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: '28px',
              letterSpacing: '0.02em',
              marginBottom: '8px',
            }}
          >
            JOIN THE DISPATCH
          </div>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '16px' }}>
            Editorial updates on remote work, visas, and life in the Philippines.
          </p>
          <NewsletterForm source="article" />
        </div>
      </div>

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 96px' }}>
          <Divider label="RELATED" />
          <div style={{ marginTop: '32px' }}>
            <ArticleGrid posts={relatedPosts} variant="featured" columns={3} />
          </div>
        </div>
      )}
    </article>
  )
}
