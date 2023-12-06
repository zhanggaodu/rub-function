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
      },duration)
    })
  }

  return filter
}

export function debounceFn<T extends FunctionArgs>(fn: T, ms: number = 2000) {
  return createPromiseWrapper(debounce(ms), fn)
}