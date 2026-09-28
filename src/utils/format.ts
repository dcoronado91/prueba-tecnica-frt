export function formatearNumero(valor: number, decimales = 0): string {
  return valor.toLocaleString('en-US', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  })
}

// 15750 -> "$ 15,750"
export function formatearMoneda(valor: number, decimales = 0): string {
  return `$ ${formatearNumero(valor, decimales)}`
}

// Recibe una fracción: 0.991 -> "99.1%"
export function formatearPorcentaje(fraccion: number, decimales = 1): string {
  return `${formatearNumero(fraccion * 100, decimales)}%`
}

// 0.02 -> "+2.0%", -0.02 -> "-2.0%"
export function formatearVariacion(fraccion: number): string {
  const signo = fraccion >= 0 ? '+' : '-'
  return `${signo}${formatearPorcentaje(Math.abs(fraccion))}`
}

// 77_650 -> "78k"
export function formatearMiles(valor: number): string {
  return `${Math.round(valor / 1000)}k`
}

// "Diciembre 2025" -> "Diciembre" (el diseño muestra solo el mes).
export function nombreDelMes(nombreCompleto: string): string {
  return nombreCompleto.split(' ')[0]
}
