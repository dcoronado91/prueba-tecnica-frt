const enteros = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function formatearNumero(valor: number): string {
  return enteros.format(valor)
}
