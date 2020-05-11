import { IMyMusic } from 'apis/types/business'

enum KEY {
  PLAY_HISTORY = '__playHistory',
  PLAY_LIST = '__playList'
}

const DEFAULT_VALUE = '[]'

export const setPlayHistory = (music: IMyMusic) => {
  const list = getPlayHistory().slice(0, 100)
  const index = list.findIndex((item) => item.id === music.id)

  if (index > -1) {
    list.splice(index, 1)
  }

  list.unshift(music)
  window.localStorage.setItem(KEY.PLAY_HISTORY, JSON.stringify(list))
}

export const getPlayHistory = (): IMyMusic[] => JSON.parse(window.localStorage.getItem(KEY.PLAY_HISTORY) || DEFAULT_VALUE)
export const removePlayHistory = () => window.localStorage.removeItem(KEY.PLAY_HISTORY)

export const setPlayList = (list: IMyMusic[]) => {
  window.localStorage.setItem(KEY.PLAY_LIST, JSON.stringify(list))
}

export const getPlayList = (): IMyMusic[] => JSON.parse(window.localStorage.getItem(KEY.PLAY_LIST) || DEFAULT_VALUE)
export const removePlayList = () => window.localStorage.removeItem(KEY.PLAY_LIST)
