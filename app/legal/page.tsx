import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice for PH Nomad.',
  robots: { index: false },
}

export default function LegalPage() {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px 96px' }}>
      <p className="label" style={{ marginBottom: '16px' }}>LEGAL</p>
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
        LEGAL NOTICE
      </h1>

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: '48px', display: 'flex', flexDirection: 'column', gap: '40px' }}>

        <section>
          <p className="label" style={{ marginBottom: '12px' }}>RESPONSIBLE FOR CONTENT</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            PH Nomad — a project of Aliviado Design<br />
            Alexander Schreiber<br />
            Gisbert-Cremer-Str. 71<br />
            51373 Leverkusen<br />
            Germany
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>CONTACT</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            Email:{' '}
            <a href="mailto:schreiber@ovao.io" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              schreiber@ovao.io
            </a>
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>DISCLAIMER</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 16px' }}>
            <strong style={{ color: 'var(--white)' }}>Liability for content:</strong> The contents of this website have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general law.
          </p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: '0 0 16px' }}>
            <strong style={{ color: 'var(--white)' }}>Liability for links:</strong> Our website contains links to external websites of third parties over whose content we have no influence. We cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.
          </p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: 'var(--white)' }}>Copyright:</strong> The content and works created by the site operator are subject to German copyright law. Duplication, processing, distribution, or any use outside the limits of copyright law require the written consent of the respective author or creator.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--rule)', paddingTop: '40px' }}>
          <p className="label" style={{ marginBottom: '12px' }}>EDITORIAL RESPONSIBILITY</p>
          <p style={{ color: 'var(--ink)', lineHeight: 1.7, margin: 0 }}>
            Alexander Schreiber<br />
            Gisbert-Cremer-Str. 71<br />
            51373 Leverkusen
          </p>
        </section>

      </div>
    </div>
  )
}
