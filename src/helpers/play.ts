import { IMyMusic } from 'apis/types/business'

export const setPlayHistory = (music: IMyMusic) => {
  const list = getPlayHistory().slice(0, 100)
  const index = list.findIndex((item) => item.id === music.id)

  if (index > -1) {
    list.splice(index, 1)
  }

  list.unshift(music)
  window.localStorage.setItem('__playHistory', JSON.stringify(list))
}

export const getPlayHistory = (): IMyMusic[] => JSON.parse(window.localStorage.getItem('__playHistory') || '[]')

export const removePlayHistory = () => window.localStorage.removeItem('__playHistory')
