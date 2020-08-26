import { DEFAULT_VALUE, localStorageFactory } from './localStorage'

const KEY = '__searchHistory'

export const searchHistoryLocalStorage = localStorageFactory<string[]>({
  key: KEY,
  defaultValue: DEFAULT_VALUE.ARRAY,
})

export const setSearchHistory = (keyword: string) => {
  keyword = keyword.trim()
  if (!keyword) {
    return
  }

  let data: string[] = searchHistoryLocalStorage.getItem()
  data = data.slice(0, 10)

  const index = data.findIndex((key) => key === keyword)

  if (index > -1) {
    data.splice(index, 1)
  }

  data.unshift(keyword)
  searchHistoryLocalStorage.setItem(data)
}
