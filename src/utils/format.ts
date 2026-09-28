const enteros = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function formatearNumero(valor: number): string {
  return enteros.format(valor)
}

// "Diciembre 2025" -> "Diciembre" (el diseño muestra solo el mes).
export function nombreDelMes(nombreCompleto: string): string {
  return nombreCompleto.split(' ')[0]
}
