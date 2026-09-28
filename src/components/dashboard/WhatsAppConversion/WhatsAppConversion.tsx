import { Card } from '@/components/ui/Card/Card'
import { EmptyState } from '@/components/ui/EmptyState/EmptyState'
import { ProgressBar } from '@/components/ui/ProgressBar/ProgressBar'
import { StatBox } from '@/components/ui/StatBox/StatBox'
import type { Audiencia } from '@/types/dashboard'
import type { ConversionCanalView } from '@/types/dashboardView'
import { formatearNumero, formatearPorcentaje } from '@/utils/format'
import './WhatsAppConversion.scss'

interface WhatsAppConversionProps {
  audiencia: Audiencia | null
  canales: ConversionCanalView[]
}

export function WhatsAppConversion({ audiencia, canales }: WhatsAppConversionProps) {
  return (
    <Card className="whatsapp-conversion" titulo="WhatsApp & Conversión">
      {audiencia ? (
        <div className="whatsapp-conversion__audiencia">
          <StatBox label="Hombres" valor={formatearPorcentaje(audiencia.hombres)} />
          <StatBox label="Mujeres" valor={formatearPorcentaje(audiencia.mujeres)} />
        </div>
      ) : (
        <EmptyState titulo="Sin datos de audiencia" />
      )}

      <h3 className="whatsapp-conversion__subtitulo">Conversión por canal</h3>
      {canales.length > 0 ? (
        <ul className="whatsapp-conversion__canales">
          {canales.map((canal) => (
            <li key={canal.canal} className="whatsapp-conversion__canal">
              <div className="whatsapp-conversion__fila">
                <span>{canal.canal}</span>
                <span className="whatsapp-conversion__valor">{formatearNumero(canal.valor)}</span>
              </div>
              <ProgressBar
                valor={canal.porcentaje}
                etiqueta={`${canal.canal}: ${formatearPorcentaje(canal.porcentaje)} de las conversiones`}
                // El diseño destaca en tono oscuro el canal propio de WhatsApp.
                tono={canal.canal.startsWith('WhatsApp') ? 'oscuro' : 'primario'}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState titulo="Sin conversiones registradas" />
      )}
    </Card>
  )
}
