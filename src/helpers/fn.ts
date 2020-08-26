export const noop = () => {}

export const debounce = (fn: (...args: any[]) => void, interval: number) => {
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
