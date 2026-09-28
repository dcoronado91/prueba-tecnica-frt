// Tipos propios del frontend: filtros activos y la data ya lista para cada widget.
import type { Audiencia, ConversionCanal, Filtros, Pacing } from './dashboard'

export const TODAS = 'todas'

export interface FiltrosActivos {
  marca: string
  plataforma: string
  // null = todavía no se eligió mes; se usa meta.mesDefault.
  mes: string | null
}

// variacion es relativa (0.02 = +2%). null cuando no hay mes anterior o su valor es 0.
export interface Kpi {
  valor: number
  variacion: number | null
}

export interface KpiInversion extends Kpi {
  plan: number
  ejecucion: number
}

export interface KpiMensajes extends Kpi {
  costoPorConversacion: number | null
}

export interface Kpis {
  inversion: KpiInversion
  mensajes: KpiMensajes
  ctr: Kpi
  conversaciones: Kpi
}

export interface CanalInversion {
  id: string
  nombre: string
  inversion: number
  porcentaje: number
}

export interface LeadsMes {
  mes: string
  corto: string
  leads: number
}

export interface PacingView extends Pacing {
  porcentaje: number
}

export interface ConversionCanalView extends ConversionCanal {
  // Participación del canal sobre el total de conversiones de la marca.
  porcentaje: number
}

export interface DashboardView {
  cliente: string
  moneda: string
  presupuestoTotal: number
  mesSeleccionado: string
  opciones: Filtros
  hayRegistros: boolean
  kpis: Kpis
  mixInversion: CanalInversion[]
  leadsPorMes: LeadsMes[]
  audiencia: Audiencia | null
  conversionPorCanal: ConversionCanalView[]
  pacing: PacingView | null
  // Mes de meta.actualizado: los paneles globales son una foto a esa fecha, no cambian con el filtro de mes.
  mesActualizado: string
}
