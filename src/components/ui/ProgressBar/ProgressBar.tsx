import './ProgressBar.scss'

interface ProgressBarProps {
  // Fracción entre 0 y 1.
  valor: number
  etiqueta: string
  tono?: 'primario' | 'oscuro'
}

export function ProgressBar({ valor, etiqueta, tono = 'primario' }: ProgressBarProps) {
  const porcentaje = Math.min(Math.max(valor, 0), 1) * 100

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-label={etiqueta}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(porcentaje)}
    >
      {/* El ancho es un dato, no un estilo del diseño: por eso va inline. */}
      <div
        className={`progress-bar__relleno progress-bar__relleno--${tono}`}
        style={{ width: `${porcentaje}%` }}
      />
    </div>
  )
}
