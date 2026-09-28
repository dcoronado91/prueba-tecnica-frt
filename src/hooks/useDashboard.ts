import { useMemo } from 'react'
import { fetchDashboardData } from '@/lib/api'
import type { FiltrosActivos } from '@/types/dashboardView'
import { construirDashboard } from './dashboardAggregations'
import { useAsyncData } from './useAsyncData'

export function useDashboard({ marca, plataforma, mes }: FiltrosActivos) {
  // Se pide una sola vez; cambiar un filtro solo recalcula en el cliente.
  const { data, loading, error } = useAsyncData(fetchDashboardData)

  const dashboard = useMemo(
    () => (data ? construirDashboard(data, { marca, plataforma, mes }) : null),
    [data, marca, plataforma, mes],
  )

  return { dashboard, loading, error }
}
