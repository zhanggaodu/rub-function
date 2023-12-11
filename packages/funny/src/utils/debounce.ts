type Fn = () => void
type AnyFn = (...args: any[]) => any
type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return
interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>
  args: Args
  thisArg: This
}

type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promise<ReturnType<Invoke>>
type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never

function createPromiseWrapper<T extends AnyFn>(filter: EventFilter, fn:T) {
  function wrappers(this: any, ...args: ArgumentsType<T>) {
    return new Promise<ReturnType<T>>((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), {fn, thisArg: this, args }))
      .then(resolve)
      .catch(reject)
    })
  }

  return wrappers
}

export function debounce(time: number = 2000) {
  let timer:ReturnType<typeof setTimeout> | undefined
  const _clearTimeout = (timer:ReturnType<typeof setTimeout>) => {
    clearTimeout(timer)
  }

  const filter: EventFilter = (invoke) => {
    const duration = time
    if (timer) {
      _clearTimeout(timer)
      resolveComponent
    }
    return new Promise<void>((resolve, reject) => {
      timer = setTimeout(() => {
        resolve(invoke())
      }, duration)
    })
  }

  return filter
}

export function debounceFn<T extends FunctionArgs>(fn: T, ms: number = 2000) {
  return createPromiseWrapper(debounce(ms), fn)
}

export function throttleFn<T extends FunctionArgs>(fn: T, ms: number = 2000) {
  return createPromiseWrapper(throttle(ms), fn)
}
export function throttle(time: number = 2000) {
  let lastExec = 0
  let timer:ReturnType<typeof setTimeout> | undefined
  let lastValue:any
  const clear = () => {
    if (timer) {
      clearTimeout(timer)
    }
  }

  const filter:EventFilter = (_invoke) => {
    const duration = time
    const elapsed = Date.now() - lastExec
    const invoke = () => {
      return lastValue = _invoke()
    }

    clear()

    if (duration <= 0) {
      lastExec = Date.now()
      return invoke()
    }

    if(elapsed > duration) {
      lastExec = Date.now()
      invoke()
    } else {
      lastValue = new Promise<void>((resolve, reject) => {
        timer = setTimeout(() => {
          lastExec = Date.now()
          resolve(invoke())
          clear()
        }, Math.max(0, duration - elapsed))
      })
    }
    return lastValue
  }
  return filter
}