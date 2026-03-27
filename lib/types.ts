export type PostCategory = 'dispatch' | 'visa' | 'tool' | 'city-guide'
export type PostStatus = 'draft' | 'published' | 'scheduled'
export type CitySlug = 'cebu' | 'siargao' | 'manila'

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  body: string | null
  body_html: string | null
  category: PostCategory
  tags: string[] | null
  city: CitySlug | null
  cover_url: string | null
  author: string
  status: PostStatus
  featured: boolean
  seo_title: string | null
  seo_desc: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export type PostSummary = Pick<
  Post,
  'id' | 'title' | 'slug' | 'excerpt' | 'category' | 'tags' | 'city' | 'cover_url' | 'published_at' | 'author'
>

export interface City {
  id: string
  slug: CitySlug
  name: string
  tagline: string | null
  score: number | null
  score_wifi: number | null
  score_cost: number | null
  score_safety: number | null
  score_vibe: number | null
  cover_url: string | null
  body: string | null
  updated_at: string
}

export interface Subscriber {
  id: string
  email: string
  confirmed: boolean
  source: string | null
  created_at: string
}

export interface AgentPostLog {
  id: string
  post_id: string | null
  agent_name: string | null
  prompt_used: string | null
  created_at: string
}
