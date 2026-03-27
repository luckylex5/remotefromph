import { createServerClient, createBuildClient } from './server'
import type { Post, PostSummary, City } from '@/lib/types'

const hasSupabase = () => Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)

async function getClient() {
  try {
    return await createServerClient()
  } catch {
    return createBuildClient()
  }
}

export async function getPublishedPosts(limit = 10, category?: string): Promise<PostSummary[]> {
  if (!hasSupabase()) return []
  const supabase = await getClient()
  let query = supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, tags, city, cover_url, published_at, author')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (category) query = query.eq('category', category)

  const { data, error } = await query
  if (error) {
    console.error('getPublishedPosts error:', error)
    return []
  }
  return (data ?? []) as PostSummary[]
}

export async function getFeaturedPost(): Promise<PostSummary | null> {
  if (!hasSupabase()) return null
  const supabase = await getClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, tags, city, cover_url, published_at, author')
    .eq('status', 'published')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  if (error) {
    const { data: fallback } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, category, tags, city, cover_url, published_at, author')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(1)
      .single()
    return (fallback ?? null) as PostSummary | null
  }
  return data as PostSummary | null
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!hasSupabase()) return null
  const supabase = await getClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) return null
  return data as Post | null
}

export async function getPostsByCity(city: string, limit = 6): Promise<PostSummary[]> {
  if (!hasSupabase()) return []
  const supabase = await getClient()
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, category, tags, city, cover_url, published_at, author')
    .eq('status', 'published')
    .eq('city', city)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data ?? []) as PostSummary[]
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  if (!hasSupabase()) return []
  const supabase = createBuildClient()
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published')

  return (data ?? []).map((p: { slug: string }) => p.slug)
}

export async function getCities(): Promise<City[]> {
  if (!hasSupabase()) return []
  const supabase = createBuildClient()
  const { data } = await supabase
    .from('cities')
    .select('*')
    .order('score', { ascending: false })

  return (data ?? []) as City[]
}

export async function getCityBySlug(slug: string): Promise<City | null> {
  if (!hasSupabase()) return null
  const supabase = createBuildClient()
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as City | null
}

export async function subscribeEmail(email: string, source: string): Promise<{ success: boolean; error?: string }> {
  if (!hasSupabase()) return { success: false, error: 'Service unavailable.' }
  const supabase = await createServerClient()
  const { error } = await supabase
    .from('subscribers')
    .insert({ email, source, confirmed: false })

  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already subscribed.' }
    return { success: false, error: 'Something went wrong.' }
  }
  return { success: true }
}
