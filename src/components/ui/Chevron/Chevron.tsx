import './Chevron.scss'

const trazos = {
  left: 'M15 6l-6 6 6 6',
  right: 'M9 6l6 6-6 6',
  down: 'M6 9l6 6 6-6',
}

interface ChevronProps {
  direccion: keyof typeof trazos
}

export function Chevron({ direccion }: ChevronProps) {
  return (
    <svg className="chevron" viewBox="0 0 24 24" aria-hidden="true">
      <path d={trazos[direccion]} />
    </svg>
  )
}
