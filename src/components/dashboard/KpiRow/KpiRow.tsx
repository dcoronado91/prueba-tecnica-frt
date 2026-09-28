import { KpiCard } from '@/components/dashboard/KpiCard/KpiCard'
import type { Kpis } from '@/types/dashboardView'
import {
  formatearMoneda,
  formatearNumero,
  formatearPorcentaje,
} from '@/utils/format'
import './KpiRow.scss'

interface KpiRowProps {
  kpis: Kpis
}

export function KpiRow({ kpis }: KpiRowProps) {
  const { inversion, mensajes, ctr, conversaciones } = kpis
  const precioConv =
    mensajes.costoPorConversacion === null ? '—' : formatearMoneda(mensajes.costoPorConversacion, 2)

  return (
    <div className="kpi-row">
      <KpiCard
        label="Inversión ejecutada"
        valor={formatearMoneda(inversion.valor)}
        apoyo={`de ${formatearMoneda(inversion.plan)} (${formatearPorcentaje(inversion.ejecucion)})`}
        variacion={inversion.variacion}
      />
      <KpiCard
        label="Mensajes del mes"
        valor={formatearNumero(mensajes.valor)}
        apoyo={`Precio/conv ${precioConv}`}
        variacion={mensajes.variacion}
      />
      <KpiCard
        label="CTR promedio"
        valor={formatearPorcentaje(ctr.valor)}
        apoyo="Meta"
        variacion={ctr.variacion}
      />
      <KpiCard
        label="Conversaciones WhatsApp"
        valor={formatearNumero(conversaciones.valor)}
        apoyo="iniciadas"
        variacion={conversaciones.variacion}
      />
    </div>
  )
}
