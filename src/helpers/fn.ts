export const noop = () => {}

export const debounce = (fn: Function, interval: number, immediate?: boolean) => {
  let timer: NodeJS.Timeout | null = null

  return function (...args: any[]) {
    const ctx = this

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(ctx, args)
    }, interval)
  }
}
