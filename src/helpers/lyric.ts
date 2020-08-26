type LyricLine = [number, string]

const formatLyricTime = (time: string): number => {
  const pattern = /(\d{2}):(\d{2}.\d{2,3})/
  const matchResult = time.match(pattern)

  if (matchResult) {
    const [, minute, second] = matchResult
    return Number(minute) * 60 + Number(second)
  }

  return 0
}

export const formatLyric = (lyric = '') => {
  const result: LyricLine[] = []
  const pattern = /(\[\d{2}:\d{2}.\d{2,3}\])(.*\s*)/g
  const matchResult = lyric.match(pattern)

  if (matchResult) {
    matchResult.forEach((str) => {
      const timeStr = str.match(/\[\d{2}:\d{2}.\d{2,3}\]/) as RegExpMatchArray
      const content = str.replace(timeStr[0], '')

      result.push([formatLyricTime(timeStr[0]), content])
    })
  }

  return result
}
