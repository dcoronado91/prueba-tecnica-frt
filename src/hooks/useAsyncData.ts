import { useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

export function useAsyncData<T>(fetcher: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Evita actualizar el estado si el componente se desmontó antes de que
    // la promesa resolviera (o si StrictMode montó el efecto dos veces).
    let cancelado = false

    fetcher()
      .then((data) => {
        if (!cancelado) setState({ data, loading: false, error: null })
      })
      .catch((err: unknown) => {
        if (!cancelado) {
          const error = err instanceof Error ? err : new Error(String(err))
          setState({ data: null, loading: false, error })
        }
      })

    return () => {
      cancelado = true
    }
  }, [fetcher])

  return state
}
