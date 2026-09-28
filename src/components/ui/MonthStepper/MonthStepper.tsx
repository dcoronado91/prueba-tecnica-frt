import type { MesItem } from '@/types/dashboard'
import './MonthStepper.scss'

interface MonthStepperProps {
  meses: MesItem[]
  value: string
  onChange: (mes: string) => void
}

export function MonthStepper({ meses, value, onChange }: MonthStepperProps) {
  const indice = meses.findIndex((m) => m.id === value)
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
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <span className="month-stepper__mes" aria-live="polite">
        {meses[indice]?.nombre}
      </span>

      <button
        type="button"
        className="month-stepper__boton"
        aria-label="Mes siguiente"
        disabled={!siguiente}
        onClick={() => siguiente && onChange(siguiente.id)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
