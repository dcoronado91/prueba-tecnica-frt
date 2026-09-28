import { Card } from '@/components/ui/Card/Card'
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar'
import type { CanalInversion } from '@/types/dashboardView'
import { formatearMoneda, formatearPorcentaje } from '@/utils/format'
import './InvestmentMix.scss'

interface InvestmentMixProps {
  canales: CanalInversion[]
}

export function InvestmentMix({ canales }: InvestmentMixProps) {
  return (
    <Card className="investment-mix" titulo="Mix de inversión digital">
      <table className="investment-mix__tabla">
        <thead>
          <tr>
            <th scope="col" className="investment-mix__encabezado">
              Canal
            </th>
            <th scope="col" className="investment-mix__encabezado investment-mix__encabezado--num">
              Inversión
            </th>
            <th scope="col" className="investment-mix__encabezado investment-mix__encabezado--num">
              % Total
            </th>
          </tr>
        </thead>
        {/* Un <tbody> por canal: agrupa la fila de datos con la fila de su barra. */}
        {canales.map((canal) => (
          <tbody key={canal.id}>
            <tr>
              <th scope="row" className="investment-mix__canal">
                {canal.nombre}
              </th>
              <td className="investment-mix__inversion">{formatearMoneda(canal.inversion)}</td>
              <td className="investment-mix__porcentaje">
                {formatearPorcentaje(canal.porcentaje)}
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="investment-mix__barra">
                <ProgressBar
                  valor={canal.porcentaje}
                  etiqueta={`${canal.nombre}: ${formatearPorcentaje(canal.porcentaje)} de la inversión`}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </Card>
  )
}
