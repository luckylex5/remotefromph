interface DividerProps {
  label?: string
}

export default function Divider({ label }: DividerProps) {
  if (!label) {
    return <hr />
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '0',
      }}
    >
      <span className="label" style={{ whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--rule)' }} />
    </div>
  )
}
