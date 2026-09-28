import './EmptyState.scss'

interface EmptyStateProps {
  titulo: string
  descripcion?: string
}

export function EmptyState({ titulo, descripcion }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__titulo">{titulo}</p>
      {descripcion && <p className="empty-state__descripcion">{descripcion}</p>}
    </div>
  )
}
