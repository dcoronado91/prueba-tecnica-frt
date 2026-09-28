import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis } from 'recharts'
import { Card } from '@/components/ui/Card/Card'
import type { LeadsMes } from '@/types/dashboardView'
import { formatearMiles } from '@/utils/format'
import './LeadsChart.scss'

// De claro a oscuro; definidos en main.scss a partir de los tokens $color-charts-blue-*.
const COLORES_BARRAS = [
  'var(--chart-blue-1)',
  'var(--chart-blue-2)',
  'var(--chart-blue-3)',
  'var(--chart-blue-4)',
  'var(--chart-blue-5)',
  'var(--chart-blue-6)',
]

interface LeadsChartProps {
  datos: LeadsMes[]
  mesSeleccionado: string
}

interface TickMesProps {
  x?: number
  y?: number
  payload?: { value: string }
  seleccionado: string
}

// Recharts clona este elemento y le inyecta x, y y payload para cada etiqueta del eje.
function TickMes({ x, y, payload, seleccionado }: TickMesProps) {
  const activo = payload?.value === seleccionado
  return (
    <text
      x={x}
      y={y}
      dy="1em"
      textAnchor="middle"
      className={`leads-chart__tick ${activo ? 'leads-chart__tick--activo' : ''}`}
    >
      {payload?.value}
    </text>
  )
}

export function LeadsChart({ datos, mesSeleccionado }: LeadsChartProps) {
  const cortoSeleccionado = datos.find((d) => d.mes === mesSeleccionado)?.corto ?? ''

  return (
    <Card className="leads-chart" titulo="Leads Mensuales" subtitulo="Últimos 6 meses">
      <div className="leads-chart__grafico">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={datos} barCategoryGap="10%">
            <XAxis
              dataKey="corto"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={<TickMes seleccionado={cortoSeleccionado} />}
            />
            <Bar dataKey="leads" isAnimationActive={false}>
              {datos.map((d, i) => (
                <Cell key={d.mes} fill={COLORES_BARRAS[i % COLORES_BARRAS.length]} />
              ))}
              <LabelList
                dataKey="leads"
                position="top"
                className="leads-chart__valor"
                formatter={(valor: number) => formatearMiles(valor)}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
