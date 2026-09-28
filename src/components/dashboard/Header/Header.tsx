import { MonthStepper } from '@/components/ui/MonthStepper/MonthStepper'
import { Select } from '@/components/ui/Select/Select'
import type { Filtros } from '@/types/dashboard'
import { formatearNumero } from '@/utils/format'
import './Header.scss'

interface HeaderProps {
  cliente: string
  moneda: string
  presupuestoTotal: number
  opciones: Filtros
  marca: string
  plataforma: string
  mes: string
  onMarcaChange: (marca: string) => void
  onPlataformaChange: (plataforma: string) => void
  onMesChange: (mes: string) => void
}

export function Header({
  cliente,
  moneda,
  presupuestoTotal,
  opciones,
  marca,
  plataforma,
  mes,
  onMarcaChange,
  onPlataformaChange,
  onMesChange,
}: HeaderProps) {
  const iniciales = cliente
    .split(' ')
    .map((palabra) => palabra[0])
    .join('')

  return (
    <header className="header">
      <div className="header__barra">
        <div className="header__cliente">
          <span className="header__logo" aria-hidden="true">
            {iniciales}
          </span>
          <h1 className="header__nombre">{cliente}</h1>
        </div>
        <p className="header__presupuesto">
          Presupuesto Total:{' '}
          <strong>
            {moneda} {formatearNumero(presupuestoTotal)}
          </strong>
        </p>
      </div>

      <div className="header__filtros">
        <Select
          id="filtro-marca"
          label="Marca"
          hideLabel
          variant="title"
          value={marca}
          options={opciones.marcas}
          onChange={onMarcaChange}
        />
        <div className="header__filtros-derecha">
          <MonthStepper meses={opciones.meses} value={mes} onChange={onMesChange} />
          <Select
            id="filtro-plataforma"
            label="Plataforma"
            value={plataforma}
            options={opciones.plataformas}
            onChange={onPlataformaChange}
          />
        </div>
      </div>
    </header>
  )
}
