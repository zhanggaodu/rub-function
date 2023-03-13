import { listeners } from "process"

type FN = () => void
type EventBusIdentifier = string | number
type EventBusListener = () => void
type EventBusEvents = EventBusListener[]
const events = new Map()
interface UseEventBusReturn {
  on: (listener: EventBusListener) => FN
  emit: (listener: EventBusListener) => FN
  once: (listener: EventBusListener) => FN
  off: (listener: EventBusListener) => FN
  reset: () => void
}

const useEventBus = (key: EventBusIdentifier):UseEventBusReturn => {
  const on = (listener: EventBusListener) => {
    const listeners = events.get(key) || []
    listeners.push(listener)
    events.set(key, listeners)
    const _off = off(listener)
    return _off
  }
  const off = (listener: EventBusListener):void => {
    const listeners = events.get(key)
    if(!listeners) return
    const index = listeners.indexOf(listener)
    if(index > -1) listeners.splice(index,1)
    if(!listeners.length) events.delete(key)
  }
  const reset = () => {
    events.delete(key)
  }
  const emit = (event, payload) => {
    events.get(key)?.forEach(v => {
      v(event,payload)
    })
  }
  const once = (listener: EventBusListener) => {
    function _listener(...args) {
      off(_listener)
      listener(...args)
    }
    return on(_listener)
  }
}