import type { ReactNode } from 'react'
import './Card.scss'

interface CardProps {
  children: ReactNode
  className?: string
  titulo?: string
  subtitulo?: string
}

export function Card({ children, className = '', titulo, subtitulo }: CardProps) {
  return (
    <section className={`card ${className}`}>
      {titulo && (
        <h2 className="card__titulo">
          {titulo}
          {subtitulo && <span className="card__subtitulo">{subtitulo}</span>}
        </h2>
      )}
      {children}
    </section>
  )
}
