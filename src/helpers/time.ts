export const formatNum = (num: number | string, n = 2) => {
  let len = num.toString().length

  while (len < n) {
    num = '0' + num
    len++
  }

  return num
}

export const formatTime = (interval?: number) => {
  interval = Math.floor(interval || 0)
  const minute = formatNum(Math.floor((interval / 60)))
  const second = formatNum(interval % 60)
  return `${minute}:${second}`
}

export const formatDatetime = (t?: string | number, detailed?: boolean) => {
  const time = new Date(t || 0)

  const year = time.getFullYear()
  const month = formatNum(time.getMonth() + 1)
  const date = formatNum(time.getDate())
  const hours = formatNum(time.getHours())
  const minutes = formatNum(time.getMinutes())
  const seconds = formatNum(time.getSeconds())

  return detailed
    ? `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    : `${year}-${month}-${date}`
}
