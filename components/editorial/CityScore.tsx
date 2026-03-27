interface CityScoreProps {
  score: number | null
  city: string
  inline?: boolean
}

export default function CityScore({ score, city, inline = false }: CityScoreProps) {
  if (score === null) return null

  if (inline) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--ink)',
          padding: '4px 12px',
          borderRadius: '4px',
        }}
      >
        <span
          className="label"
          style={{ color: 'var(--muted)', margin: 0 }}
        >
          SCORE
        </span>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--accent)',
            lineHeight: 1,
          }}
        >
          {score.toFixed(1)}
        </span>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        backgroundColor: 'var(--ink)',
        borderRadius: '4px',
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: '20px',
          letterSpacing: '0.02em',
          color: 'var(--white)',
        }}
      >
        {city.toUpperCase()}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: '28px',
            fontWeight: 500,
            color: 'var(--accent)',
            lineHeight: 1,
          }}
        >
          {score.toFixed(1)}
        </span>
        <span className="label" style={{ color: 'var(--muted)' }}>
          / 10
        </span>
      </div>
    </div>
  )
}
