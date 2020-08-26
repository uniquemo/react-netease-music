export const formatNum = (num = 0) => {
  let result = ''

  if (num > Math.pow(10, 8)) {
    result = (num / Math.pow(10, 8)).toFixed(3) + '亿'
  } else if (num > Math.pow(10, 4)) {
    result = Math.round(num / Math.pow(10, 4)) + '万'
  } else {
    return num
  }

  return result
}
