// Funciones puras (sin React): reciben data cruda + filtros y devuelven la data de cada widget.
import type { DashboardData, FiltroItem, MesItem, Registro } from '@/types/dashboard'
import {
  TODAS,
  type CanalInversion,
  type DashboardView,
  type FiltrosActivos,
  type Kpis,
  type LeadsMes,
} from '@/types/dashboardView'

type CampoNumerico = Exclude<keyof Registro, 'marca' | 'plataforma' | 'mes'>

type Totales = Record<CampoNumerico, number>

export function dividir(numerador: number, denominador: number): number {
  return denominador === 0 ? 0 : numerador / denominador
}

export function variacion(actual: number, anterior: number | null): number | null {
  if (anterior === null || anterior === 0) return null
  return (actual - anterior) / anterior
}

export function sumar(registros: Registro[], campo: CampoNumerico): number {
  return registros.reduce((total, registro) => total + registro[campo], 0)
}

export function filtrarRegistros(
  registros: Registro[],
  marca: string,
  plataforma: string,
): Registro[] {
  return registros.filter(
    (r) =>
      (marca === TODAS || r.marca === marca) &&
      (plataforma === TODAS || r.plataforma === plataforma),
  )
}

export function calcularTotales(registros: Registro[]): Totales {
  return {
    inversion: sumar(registros, 'inversion'),
    inversionPlan: sumar(registros, 'inversionPlan'),
    leads: sumar(registros, 'leads'),
    mensajes: sumar(registros, 'mensajes'),
    conversaciones: sumar(registros, 'conversaciones'),
    conversiones: sumar(registros, 'conversiones'),
    impresiones: sumar(registros, 'impresiones'),
    clics: sumar(registros, 'clics'),
  }
}

export function obtenerMesAnterior(meses: MesItem[], mes: string): string | null {
  const indice = meses.findIndex((m) => m.id === mes)
  return indice > 0 ? meses[indice - 1].id : null
}

export function calcularKpis(
  actual: Totales,
  anterior: Totales | null,
  costoPorConversacion: number | null,
): Kpis {
  const ctrActual = dividir(actual.clics, actual.impresiones)
  const ctrAnterior = anterior ? dividir(anterior.clics, anterior.impresiones) : null

  return {
    inversion: {
      valor: actual.inversion,
      plan: actual.inversionPlan,
      ejecucion: dividir(actual.inversion, actual.inversionPlan),
      variacion: variacion(actual.inversion, anterior?.inversion ?? null),
    },
    mensajes: {
      valor: actual.mensajes,
      costoPorConversacion,
      variacion: variacion(actual.mensajes, anterior?.mensajes ?? null),
    },
    ctr: {
      valor: ctrActual,
      variacion: variacion(ctrActual, ctrAnterior),
    },
    conversaciones: {
      valor: actual.conversaciones,
      variacion: variacion(actual.conversaciones, anterior?.conversaciones ?? null),
    },
  }
}

export function calcularMixInversion(
  registrosDelMes: Registro[],
  plataformas: FiltroItem[],
): CanalInversion[] {
  const total = sumar(registrosDelMes, 'inversion')

  return plataformas
    .filter((p) => p.id !== TODAS)
    .map((p) => {
      const inversion = sumar(
        registrosDelMes.filter((r) => r.plataforma === p.id),
        'inversion',
      )
      return { id: p.id, nombre: p.nombre, inversion, porcentaje: dividir(inversion, total) }
    })
    .filter((canal) => canal.inversion > 0)
    .sort((a, b) => b.inversion - a.inversion)
}

export function calcularLeadsPorMes(registros: Registro[], meses: MesItem[]): LeadsMes[] {
  return meses.map((m) => ({
    mes: m.id,
    corto: m.corto,
    leads: sumar(
      registros.filter((r) => r.mes === m.id),
      'leads',
    ),
  }))
}

export function construirDashboard(data: DashboardData, filtros: FiltrosActivos): DashboardView {
  const { meta, filtros: opciones, registros, panelesGlobales } = data
  const mes = filtros.mes ?? meta.mesDefault
  const mesAnterior = obtenerMesAnterior(opciones.meses, mes)

  // Marca y plataforma aplican a todo lo que sale de registros; el mes solo a KPIs y mix.
  const filtrados = filtrarRegistros(registros, filtros.marca, filtros.plataforma)
  const delMes = filtrados.filter((r) => r.mes === mes)
  const delMesAnterior = mesAnterior ? filtrados.filter((r) => r.mes === mesAnterior) : []

  const pacing = panelesGlobales.pacing[filtros.marca] ?? null

  return {
    presupuestoTotal: meta.presupuestoTotal,
    mesSeleccionado: mes,
    opciones,
    hayRegistros: delMes.length > 0,
    kpis: calcularKpis(
      calcularTotales(delMes),
      mesAnterior ? calcularTotales(delMesAnterior) : null,
      panelesGlobales.costoPorConversacion[filtros.marca] ?? null,
    ),
    mixInversion: calcularMixInversion(delMes, opciones.plataformas),
    leadsPorMes: calcularLeadsPorMes(filtrados, opciones.meses),
    audiencia: panelesGlobales.audiencia[filtros.marca] ?? null,
    conversionPorCanal: panelesGlobales.conversionPorCanal[filtros.marca] ?? [],
    pacing: pacing ? { ...pacing, porcentaje: dividir(pacing.actual, pacing.meta) } : null,
  }
}
