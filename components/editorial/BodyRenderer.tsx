interface BodyRendererProps {
  html: string
}

export default function BodyRenderer({ html }: BodyRendererProps) {
  return (
    <div
      className="article-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
