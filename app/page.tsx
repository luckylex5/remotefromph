import { getPublishedPosts, getCities, getFeaturedPost } from '@/lib/supabase/queries'
import HeroSection from '@/components/editorial/HeroSection'
import CityCard from '@/components/editorial/CityCard'
import ArticleCard from '@/components/editorial/ArticleCard'
import ArticleGrid from '@/components/editorial/ArticleGrid'
import Divider from '@/components/ui/Divider'
import NewsletterForm from '@/components/ui/NewsletterForm'

export const revalidate = 3600

export default async function HomePage() {
  const [posts, cities, featured] = await Promise.all([
    getPublishedPosts(6),
    getCities(),
    getFeaturedPost(),
  ])

  const latestSidebar = posts.filter((p) => p.id !== featured?.id).slice(0, 3)
  const gridPosts = posts.filter((p) => p.id !== featured?.id).slice(3, 6)

  return (
    <>
      {/* Hero */}
      <HeroSection coverUrl={featured?.cover_url} />

      <div className="page-container">

        {/* 01 // CITY DIRECTORY */}
        <section style={{ padding: '64px 0 48px' }}>
          <Divider label="01 // CITY DIRECTORY" />
          <div className="grid-cities">
            {cities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>

        <hr />

        {/* 02 // DISPATCHES */}
        <section style={{ padding: '48px 0' }}>
          <Divider label="02 // DISPATCHES" />

          {/* Featured + Sidebar */}
          {featured && (
            <div className="grid-featured">
              <div>
                <ArticleCard post={featured} variant="featured" />
              </div>

              <div>
                <div className="label" style={{ marginBottom: '16px' }}>
                  LATEST
                </div>
                <div>
                  {latestSidebar.map((post) => (
                    <ArticleCard key={post.id} post={post} variant="minimal" />
                  ))}
                </div>

                <div
                  id="newsletter"
                  style={{
                    marginTop: '32px',
                    padding: '24px',
                    backgroundColor: 'var(--accent-lt)',
                    borderTop: '3px solid var(--accent)',
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
                    THE DISPATCH
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>
                    Editorial updates on remote work and life in the Philippines.
                  </p>
                  <NewsletterForm source="homepage" />
                </div>
              </div>
            </div>
          )}

          {/* Article Grid */}
          {gridPosts.length > 0 && (
            <div style={{ marginTop: '48px' }}>
              <ArticleGrid posts={gridPosts} variant="featured" columns={3} />
            </div>
          )}
        </section>
      </div>
    </>
  )
}
