export const setSearchHistory = (keyword: string) => {
  keyword = keyword.trim()
  if (!keyword) {
    return
  }

  let data: string[] = getSearchHistory()
  data = data.slice(0, 10)

  const index = data.findIndex(key => key === keyword)

  if (index > -1) {
    data.splice(index, 1)
  }

  data.unshift(keyword)
  window.localStorage.setItem('__searchHistory', JSON.stringify(data))
}

export const removeSearchHistory = () => window.localStorage.removeItem('__searchHistory')

export const getSearchHistory = (): string[] => JSON.parse(window.localStorage.getItem('__searchHistory') || '[]')
