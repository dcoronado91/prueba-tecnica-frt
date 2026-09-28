import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/Card/Card'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'
import { StatBox } from '@/components/ui/StatBox/StatBox'
import type { PacingView } from '@/types/dashboardView'
import { formatearNumero, formatearPorcentaje, nombreDelMes } from '@/utils/format'
import './PacingPanel.scss'

interface PacingPanelProps {
  pacing: PacingView | null
  mesActualizado: string
}

export function PacingPanel({ pacing, mesActualizado }: PacingPanelProps) {
  if (!pacing) {
    return (
      <Card className="pacing-panel" titulo="Meta & Pacing">
        <EmptyState titulo="Sin datos de pacing" />
      </Card>
    )
  }

  // Si se supera la meta, el anillo se ve lleno pero el texto muestra el % real.
  const avance = Math.min(pacing.porcentaje, 1)
  const segmentos = [
    { nombre: 'avance', valor: avance, color: 'var(--chart-blue-4)' },
    { nombre: 'restante', valor: 1 - avance, color: 'var(--chart-track)' },
  ]

  return (
    <Card className="pacing-panel" titulo="Meta & Pacing" subtitulo={nombreDelMes(mesActualizado)}>
      <div className="pacing-panel__contenido">
        <div className="pacing-panel__stats">
          <StatBox label="Meta" valor={formatearNumero(pacing.meta)} />
          <StatBox label="Actual" valor={formatearNumero(pacing.actual)} />
          <StatBox label="Faltan" valor={formatearNumero(pacing.faltan)} />
        </div>

        <div className="pacing-panel__donut">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* De 90° a -270°: empieza arriba y avanza en sentido horario. */}
              <Pie
                data={segmentos}
                dataKey="valor"
                startAngle={90}
                endAngle={-270}
                innerRadius="70%"
                outerRadius="100%"
                stroke="none"
                isAnimationActive={false}
              >
                {segmentos.map((s) => (
                  <Cell key={s.nombre} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pacing-panel__centro">
            <span className="pacing-panel__porcentaje">
              {formatearPorcentaje(pacing.porcentaje)}
            </span>
            <span className="pacing-panel__leyenda">de la meta</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
