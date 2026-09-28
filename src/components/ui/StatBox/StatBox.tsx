import './StatBox.scss'

interface StatBoxProps {
  label: string
  valor: string
}

export function StatBox({ label, valor }: StatBoxProps) {
  return (
    <div className="stat-box">
      <p className="stat-box__label">{label}</p>
      <p className="stat-box__valor">{valor}</p>
    </div>
  )
}
