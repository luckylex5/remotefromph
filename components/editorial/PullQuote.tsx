interface PullQuoteProps {
  children: React.ReactNode
}

export default function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid var(--accent)',
        paddingLeft: '24px',
        margin: '32px 0',
        fontFamily: "var(--font-dm-serif), serif",
        fontStyle: 'italic',
        fontSize: '24px',
        lineHeight: 1.4,
        color: 'var(--ink)',
      }}
    >
      {children}
    </blockquote>
  )
}
