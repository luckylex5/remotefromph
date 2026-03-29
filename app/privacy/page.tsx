import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for PH Nomad.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px 96px' }}>
      <p className="label" style={{ marginBottom: '16px' }}>PRIVACY</p>
      <h1
        style={{
          fontFamily: 'var(--font-bebas), sans-serif',
          fontSize: 'clamp(40px, 6vw, 72px)',
          letterSpacing: '0.02em',
          lineHeight: 1,
          color: 'var(--white)',
          margin: '0 0 48px',
        }}
      >
        PRIVACY POLICY
      </h1>

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '48px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <section>
          <p className="label" style={{ marginBottom: '12px' }}>1. CONTROLLER</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            PH Nomad — a project of Aliviado Design<br />
            Alexander Schreiber<br />
            Gisbert-Cremer-Str. 71<br />
            51373 Leverkusen, Germany<br />
            Email:{' '}
            <a href="mailto:schreiber@ovao.io" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              schreiber@ovao.io
            </a>
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>2. DATA WE COLLECT</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 16px' }}>
            <strong style={{ color: 'var(--white)' }}>Server logs:</strong> When you visit this website, our hosting provider (Vercel Inc., 340 Pine Street, Suite 801, San Francisco, CA 94104, USA) automatically collects standard server log data including your IP address, browser type, referring URL, and time of visit. This data is used solely for technical operation and security, and is deleted after 30 days.
          </p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: 'var(--white)' }}>Newsletter:</strong> If you subscribe to our newsletter, we store your email address in Supabase (Supabase Inc., Singapore). This data is used solely to send you editorial updates. You can unsubscribe at any time by emailing{' '}
            <a href="mailto:schreiber@ovao.io" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              schreiber@ovao.io
            </a>.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>3. LEGAL BASIS (GDPR)</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            Server log processing is based on Art. 6(1)(f) GDPR (legitimate interest in secure operation). Newsletter subscriptions are processed on the basis of Art. 6(1)(a) GDPR (your consent). You may withdraw consent at any time without affecting the lawfulness of prior processing.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>4. THIRD-PARTY SERVICES</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 16px' }}>
            <strong style={{ color: 'var(--white)' }}>Vercel:</strong> This website is hosted on Vercel. Vercel is certified under the EU-U.S. Data Privacy Framework.{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              vercel.com/legal/privacy-policy
            </a>
          </p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 16px' }}>
            <strong style={{ color: 'var(--white)' }}>Supabase:</strong> Subscriber emails are stored in Supabase.{' '}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              supabase.com/privacy
            </a>
          </p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: 'var(--white)' }}>Unsplash:</strong> Images are served from Unsplash (Unsplash Inc., Canada). When images load, your browser may transmit your IP address to Unsplash.{' '}
            <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              unsplash.com/privacy
            </a>
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>5. COOKIES & ADVERTISING</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 16px' }}>
            <strong style={{ color: 'var(--white)' }}>Analytics & advertising cookies:</strong> With your consent, this website uses cookies for web analytics and advertising (Google AdSense, Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA). These cookies may collect data about your browsing behaviour to serve personalised ads and measure performance. Google is certified under the EU-U.S. Data Privacy Framework.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              policies.google.com/privacy
            </a>
          </p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            You can withdraw your consent at any time by clicking "Decline" in the cookie banner or by clearing your browser cookies. Without consent, no tracking or advertising cookies are set. Technical session cookies may be set by the hosting infrastructure for security purposes only and do not require consent.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>6. YOUR RIGHTS</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            Under GDPR, you have the right to access, rectify, erase, restrict, and port your personal data, and to object to processing. Contact us at{' '}
            <a href="mailto:schreiber@ovao.io" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              schreiber@ovao.io
            </a>. You also have the right to lodge a complaint with a supervisory authority — in Germany: <strong style={{ color: 'var(--white)' }}>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong>.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>7. CHANGES</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            We may update this policy from time to time. The current version is always available at this URL. Last updated: March 2026.
          </p>
        </section>

      </div>
    </div>
  )
}
