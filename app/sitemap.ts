import type { MetadataRoute } from 'next'
import { getAllPublishedSlugs, getCities } from '@/lib/supabase/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ph-nomad.com'

const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
  { url: `${BASE_URL}/cities`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/visas`, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/tools`, changeFrequency: 'weekly', priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return staticRoutes
  }

  const [slugs, cities] = await Promise.all([
    getAllPublishedSlugs(),
    getCities(),
  ])

  const articleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...cityRoutes, ...articleRoutes]
}
