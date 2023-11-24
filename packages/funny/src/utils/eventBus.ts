type FN = () => void
export interface EventBusKey<T> extends Symbol { }
type EventBusIdentifier = string | number
type EventBusListener<T = unknown, P = any> = (event: T, payload?: P) => void
type EventBusEvents<T, P = any> = EventBusListener<T, P>[]
const events = new Map()
interface UseEventBusReturn<T, P>  {
  on: (listener: EventBusListener<T, P>) => FN
  emit: (event?: T, payload?: P) => void
  once: (listener: EventBusListener<T, P>) => FN
  off: (listener: EventBusListener<T>) => void
  reset: () => void
}

export function useEventBus<T = unknown, P = any> (key: EventBusIdentifier) :UseEventBusReturn<T, P> {
  const on = (listener: EventBusListener<T, P>) => {
    const listeners = events.get(key) || []
    listeners.push(listener)
    events.set(key, listeners)
    const _off = () => off(listener)
    return _off
  }
  
  const off = (listener: EventBusListener<T>) :void => {
    const listeners = events.get(key)
    if(!listeners) return
    const index = listeners.indexOf(listener)
    if(index > -1) listeners.splice(index, 1)
    if(!listeners.length) events.delete(key)
  }

  const reset = () => {
    events.delete(key)
  }

  const emit = (event?: T, payload?: P) => {
    events.get(key)?.forEach(v => v(event, payload))
  }

  const once = (listener: EventBusListener<T, P>) => {
    function _listener(...args: any[]) {
      off(_listener)
      //@ts-expect-error
      listener(...args)
    }
    return on(_listener)
  }

  return { on, once, off, reset, emit }
}