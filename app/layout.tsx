import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'PH Nomad — Work Remote, Live Tropical',
    template: '%s | PH Nomad',
  },
  description:
    'The editorial guide for digital nomads in the Philippines. City guides, visa info, tools, and first-person dispatches.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ph-nomad.com'),
  openGraph: {
    siteName: 'PH Nomad',
    type: 'website',
    locale: 'en_US',
  },
  other: {
    monetag: 'd27937014ca8a70da332d7b2d7882910',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${dmSerifDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3338446289833421"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="monetag-zone"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11668275',s.src='https://nap5k.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`,
          }}
        />
      </body>
    </html>
  )
}
