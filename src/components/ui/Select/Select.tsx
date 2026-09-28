import { Chevron } from '@/components/ui/Chevron/Chevron'
import type { FiltroItem } from '@/types/dashboard'
import './Select.scss'

interface SelectProps {
  id: string
  label: string
  value: string
  options: FiltroItem[]
  onChange: (value: string) => void
  variant?: 'default' | 'title'
  hideLabel?: boolean
}

export function Select({
  id,
  label,
  value,
  options,
  onChange,
  variant = 'default',
  hideLabel = false,
}: SelectProps) {
  return (
    <div className={`select select--${variant}`}>
      <label htmlFor={id} className={hideLabel ? 'visually-hidden' : 'select__label'}>
        {label}
      </label>
      <div className="select__control">
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nombre}
            </option>
          ))}
        </select>
        <span className="select__icono">
          <Chevron direccion="down" />
        </span>
      </div>
    </div>
  )
}
