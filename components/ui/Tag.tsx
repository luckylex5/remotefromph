interface TagProps {
  label: string
  accent?: boolean
}

export default function Tag({ label, accent = false }: TagProps) {
  return (
    <span
      className="label"
      style={{
        backgroundColor: accent ? 'var(--accent)' : 'transparent',
        color: accent ? 'var(--white)' : 'var(--muted)',
        padding: accent ? '2px 8px' : '0',
        border: accent ? 'none' : '1px solid var(--rule)',
        borderRadius: '4px',
        display: 'inline-block',
      }}
    >
      {label}
    </span>
  )
}
