-- ============================================================
-- Remote From PH — Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================================

-- Posts (articles + dispatches)
create table if not exists posts (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  excerpt     text,
  body        text,
  body_html   text,
  category    text not null check (category in ('dispatch', 'visa', 'tool', 'city-guide')),
  tags        text[],
  city        text check (city in ('cebu', 'siargao', 'manila') or city is null),
  cover_url   text,
  author      text default 'Editor',
  status      text default 'draft' check (status in ('draft', 'published', 'scheduled')),
  featured    boolean default false,
  seo_title   text,
  seo_desc    text,
  published_at timestamptz,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- City profiles
create table if not exists cities (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique check (slug in ('cebu', 'siargao', 'manila')),
  name         text not null,
  tagline      text,
  score        numeric(3,1) check (score >= 0 and score <= 10),
  score_wifi   numeric(3,1) check (score_wifi >= 0 and score_wifi <= 10),
  score_cost   numeric(3,1) check (score_cost >= 0 and score_cost <= 10),
  score_safety numeric(3,1) check (score_safety >= 0 and score_safety <= 10),
  score_vibe   numeric(3,1) check (score_vibe >= 0 and score_vibe <= 10),
  cover_url    text,
  body         text,
  updated_at   timestamptz default now()
);

-- Newsletter subscribers
create table if not exists subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  confirmed  boolean default false,
  source     text,
  created_at timestamptz default now()
);

-- Agent post log (audit trail for OpenClaw)
create table if not exists agent_posts_log (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid references posts(id),
  agent_name  text,
  prompt_used text,
  created_at  timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table posts enable row level security;
alter table cities enable row level security;
alter table subscribers enable row level security;
alter table agent_posts_log enable row level security;

-- Public can read published posts
create policy "public read published" on posts
  for select using (status = 'published');

-- Agent (anon key) can insert posts
create policy "agent can insert" on posts
  for insert with check (true);

-- Agent can update posts
create policy "agent can update" on posts
  for update using (true);

-- Cities: public read
create policy "public read cities" on cities
  for select using (true);

-- Subscribers: insert only (for newsletter form)
create policy "public insert subscribers" on subscribers
  for insert with check (true);

-- ============================================================
-- Seed data
-- ============================================================

-- Cities
insert into cities (slug, name, tagline, score, score_wifi, score_cost, score_safety, score_vibe, body)
values
  (
    'cebu',
    'Cebu City',
    'Urban energy, island access, year-round sun.',
    9.2, 8.2, 9.0, 7.5, 8.8,
    '## Overview

Cebu City is the undisputed hub for digital nomads in the Philippines. It offers the best balance of reliable infrastructure, affordable living costs, and easy island access that makes it the default base for location-independent workers.

## Why Cebu Works

The city has invested heavily in coworking infrastructure. From Ayala-area offices to barangay-level cafes with fibre connections, finding a productive workspace is never a problem. Giga Manila speeds are available in most central areas.

Living costs remain significantly lower than Manila. A decent apartment in IT Park or Lahug runs PHP 18,000–28,000/month. Restaurant meals start at PHP 150.

## Getting Around

Grab dominates transport. The new BRT corridor along Osmeña Blvd has reduced travel times considerably. For island-hopping to Mactan, Bantayan, or Camotes, the South Bus Terminal is your friend.

## Best Neighbourhoods

- **IT Park** — Tech hub, 24/7 restaurants, premium wifi
- **Lahug** — Quieter, residential, great coffee shops
- **Mactan** — Beach access, resort atmosphere, slightly slower wifi
'
  ),
  (
    'siargao',
    'Siargao',
    'The surf island. Slow life, good vibes, intermittent wifi.',
    8.5, 6.5, 8.8, 8.5, 9.5,
    '## Overview

Siargao is where you go when you need to reset. The island is famous for Cloud 9, the world-class surf break, but for nomads it has become the definitive slow-living base in Southeast Asia.

## The Tradeoff

Wifi is Siargao''s only real weakness. Most accommodations offer 20–40 Mbps. For video calls, stick to co-working-capable cafes in General Luna. The DITO signal in town is the fastest mobile option.

## Living Costs

Siargao is cheaper than Cebu for accommodation. Long-term villa rentals start at PHP 15,000/month. Food is affordable but less varied — expect to cook more or eat at the handful of expat-oriented restaurants.

## Scene

The nomad community here is tight-knit. Weekly volleyball games, sunrise surf sessions, and Friday market at the town square. If you work hard during the week, Siargao rewards weekends generously.
'
  ),
  (
    'manila',
    'Manila',
    'Maximum infrastructure. Maximum chaos.',
    7.8, 8.8, 7.0, 6.5, 8.2,
    '## Overview

Manila (BGC and Makati specifically) offers the best internet in the country and a cosmopolitan lifestyle that rivals Singapore. The tradeoff is traffic, cost, and sensory overload.

## Infrastructure

BGC has fibre everywhere. Coworking options are world-class. KMC, WeWork, and independent spaces are abundant. For pure productivity in a controlled environment, Manila wins.

## Cost

More expensive than Cebu. A BGC apartment runs PHP 35,000–60,000/month. Dining out is cheaper in side streets, but the expat circles push prices up.

## Verdict

Manila is best for short-term sprints when you need maximum productivity infrastructure, client meetings, or access to the international airport.
'
  )
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  score = excluded.score,
  score_wifi = excluded.score_wifi,
  score_cost = excluded.score_cost,
  score_safety = excluded.score_safety,
  score_vibe = excluded.score_vibe,
  body = excluded.body;

-- Initial post: Why I Quit Berlin to Code in Cebu
insert into posts (
  title, slug, excerpt, body, category, tags, city,
  author, status, featured, published_at
)
values (
  'Why I Quit Berlin to Code in Cebu',
  'why-i-quit-berlin-to-code-in-cebu',
  'Trading cold winters and €1,800 rent for tropical living, fast wifi, and a completely different pace of life.',
  '## The Breaking Point

It was February. Berlin was dark by 4pm. My flat cost €1,800/month for 55 square metres in Prenzlauer Berg. I was shipping code for a SaaS company remotely and realised, somewhere between my third Heizlüfter purchase and a three-hour call with a client six time zones away, that I could do this from anywhere.

I had been reading about Cebu for six months. A friend had based himself there for a year. The numbers looked absurd: PHP 22,000/month for a furnished two-bedroom in IT Park. That is roughly €360. With a budget that would barely cover my Berlin utility bills, I could live extremely well.

> The moment I landed and my Grab cost less than a Berlin U-Bahn fare, I knew I had made the right call.

## The Setup

My first month was an experiment. I rented a serviced apartment in IT Park — the tech district — for PHP 28,000 with utilities included. The wifi ran at 150 Mbps symmetric. I found a coworking space three blocks away for PHP 3,500/month with unlimited coffee.

The timezone works in your favour for European clients. The Philippines is UTC+8. My clients are in Germany (UTC+1) and the UK (UTC+0). Morning standup at 9am their time is 4-5pm in Cebu. I work a shifted schedule: 10am–6pm local, then another focused session from 8–10pm for client overlap. Afternoons are genuinely mine.

## The Cost Breakdown

Monthly expenses in Cebu vs Berlin:

- **Rent**: PHP 22,000 (€360) vs €1,800
- **Food**: PHP 12,000 (€195) vs €600
- **Coworking**: PHP 3,500 (€57) vs €250
- **Transport**: PHP 2,000 (€33) vs €100 (BVG Monatskarte)
- **Total**: ~€650 vs ~€2,800

I was saving more money working remotely from Cebu than I had ever saved in Berlin while earning the same income.

## What Nobody Tells You

The adjustment is real. Manila has traffic. Cebu has jeepneys. The heat is different — it does not bother me, but some people find it affects focus. Air conditioning is constant; budget for electricity accordingly (PHP 3,000–5,000/month if you run AC frequently).

The nomad community in Cebu is less visible than Bali or Chiang Mai but it exists. IT Park and Lahug have regular meetups. The expat and local professional scene mix well.

Power outages happen. Rare in IT Park, more common outside. Have a mobile data backup.

## Two Years Later

I renewed my tourist visa for 18 months and am now exploring the SRRV. Cebu has become home in a way Berlin never did, despite 8 years there. The city rewards exploration. Each month I find a new coffee shop with perfect wifi, a new warung-style place doing breakfast for PHP 80, a new island reachable by two-hour ferry.

The code ships. The clients are happy. The rent is PHP 22,000.

It was not a difficult decision in retrospect.',
  'dispatch',
  ARRAY['lifestyle', 'cebu', 'remote-work'],
  'cebu',
  'Editor',
  'published',
  true,
  now()
)
on conflict (slug) do nothing;
