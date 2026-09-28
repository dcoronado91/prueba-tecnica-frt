import { useState } from 'react'
import { Header } from '@/components/dashboard/Header/Header'
import { InvestmentMix } from '@/components/dashboard/InvestmentMix/InvestmentMix'
import { KpiRow } from '@/components/dashboard/KpiRow/KpiRow'
import { LeadsChart } from '@/components/dashboard/LeadsChart/LeadsChart'
import { PacingPanel } from '@/components/dashboard/PacingPanel/PacingPanel'
import { WhatsAppConversion } from '@/components/dashboard/WhatsAppConversion/WhatsAppConversion'
import { useDashboard } from '@/hooks/useDashboard'
import { TODAS } from '@/types/dashboardView'
import './Dashboard.scss'

export function Dashboard() {
  const [marca, setMarca] = useState(TODAS)
  const [plataforma, setPlataforma] = useState(TODAS)
  const [mes, setMes] = useState<string | null>(null)

  const { dashboard, loading, error } = useDashboard({ marca, plataforma, mes })

  if (loading) return <p className="dashboard__estado">Cargando datos...</p>
  if (error || !dashboard) return <p className="dashboard__estado">Error al cargar la data.</p>

  return (
    <div className="dashboard">
      <Header
        cliente={dashboard.cliente}
        moneda={dashboard.moneda}
        presupuestoTotal={dashboard.presupuestoTotal}
        opciones={dashboard.opciones}
        marca={marca}
        plataforma={plataforma}
        mes={dashboard.mesSeleccionado}
        onMarcaChange={setMarca}
        onPlataformaChange={setPlataforma}
        onMesChange={setMes}
      />
      <main className="dashboard__contenido">
        <KpiRow kpis={dashboard.kpis} />
        <div className="dashboard__fila">
          <LeadsChart datos={dashboard.leadsPorMes} mesSeleccionado={dashboard.mesSeleccionado} />
          <InvestmentMix canales={dashboard.mixInversion} />
        </div>
        <div className="dashboard__fila">
          <WhatsAppConversion
            audiencia={dashboard.audiencia}
            canales={dashboard.conversionPorCanal}
          />
          <PacingPanel pacing={dashboard.pacing} mesActualizado={dashboard.mesActualizado} />
        </div>
      </main>
    </div>
  )
}
