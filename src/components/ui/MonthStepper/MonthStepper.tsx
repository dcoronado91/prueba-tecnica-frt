import { Chevron } from '@/components/ui/Chevron/Chevron'
import type { MesItem } from '@/types/dashboard'
import { nombreDelMes } from '@/utils/format'
import './MonthStepper.scss'

interface MonthStepperProps {
  meses: MesItem[]
  value: string
  onChange: (mes: string) => void
}

export function MonthStepper({ meses, value, onChange }: MonthStepperProps) {
  const indice = meses.findIndex((m) => m.id === value)
  const actual = meses[indice]
  const anterior = meses[indice - 1]
  const siguiente = meses[indice + 1]

  return (
    <div className="month-stepper" role="group" aria-label="Mes">
      <button
        type="button"
        className="month-stepper__boton"
        aria-label="Mes anterior"
        disabled={!anterior}
        onClick={() => anterior && onChange(anterior.id)}
      >
        <Chevron direccion="left" />
      </button>

      <span className="month-stepper__mes" aria-live="polite" title={actual?.nombre}>
        {actual && nombreDelMes(actual.nombre)}
      </span>

      <button
        type="button"
        className="month-stepper__boton"
        aria-label="Mes siguiente"
        disabled={!siguiente}
        onClick={() => siguiente && onChange(siguiente.id)}
      >
        <Chevron direccion="right" />
      </button>
    </div>
  )
}
