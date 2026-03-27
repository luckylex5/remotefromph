interface ContainerProps {
  children: React.ReactNode
  inner?: boolean
  className?: string
}

export default function Container({ children, inner = false, className = '' }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth: inner ? '860px' : '1440px',
        margin: '0 auto',
        padding: inner ? '0 24px' : '0 24px',
      }}
      className={className}
    >
      {children}
    </div>
  )
}
