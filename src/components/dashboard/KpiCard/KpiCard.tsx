import { Card } from '@/components/ui/Card/Card'
import { VariationBadge } from '@/components/ui/VariationBadge/VariationBadge'
import './KpiCard.scss'

interface KpiCardProps {
  label: string
  valor: string
  apoyo: string
  variacion: number | null
}

export function KpiCard({ label, valor, apoyo, variacion }: KpiCardProps) {
  return (
    <Card className="kpi-card">
      <div className="kpi-card__encabezado">
        <h2 className="kpi-card__label">{label}</h2>
        <VariationBadge variacion={variacion} />
      </div>
      <p className="kpi-card__valor">{valor}</p>
      <p className="kpi-card__apoyo">{apoyo}</p>
    </Card>
  )
}
