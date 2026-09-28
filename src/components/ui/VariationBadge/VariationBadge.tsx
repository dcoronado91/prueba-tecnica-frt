import { formatearVariacion } from '@/utils/format'
import './VariationBadge.scss'

interface VariationBadgeProps {
  // null = no hay mes anterior con el cual comparar.
  variacion: number | null
}

export function VariationBadge({ variacion }: VariationBadgeProps) {
  if (variacion === null) {
    return (
      <span className="variation-badge variation-badge--vacio" title="Sin mes anterior para comparar">
        <span aria-hidden="true">—</span>
        <span className="visually-hidden">Sin mes anterior para comparar</span>
      </span>
    )
  }

  const sube = variacion >= 0

  return (
    <span className={`variation-badge variation-badge--${sube ? 'sube' : 'baja'}`}>
      <svg className="variation-badge__icono" viewBox="0 0 24 24" aria-hidden="true">
        {sube ? <path d="M3 17l6-6 4 4 8-8M15 7h6v6" /> : <path d="M3 7l6 6 4-4 8 8M15 17h6v-6" />}
      </svg>
      {formatearVariacion(variacion)}
      <span className="visually-hidden"> vs mes anterior</span>
    </span>
  )
}
