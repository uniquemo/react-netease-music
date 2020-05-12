import { IMyMusic } from 'apis/types/business'

enum KEY {
  PLAY_HISTORY = '__playHistory',
  PLAY_LIST = '__playList',
  PLAY_MODE = '__playMode'
}

const DEFAULT_VALUE = '[]'

// play history
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

// play list
export const setPlayList = (list: IMyMusic[]) => {
  window.localStorage.setItem(KEY.PLAY_LIST, JSON.stringify(list))
}
export const getPlayList = (): IMyMusic[] => JSON.parse(window.localStorage.getItem(KEY.PLAY_LIST) || DEFAULT_VALUE)
export const removePlayList = () => window.localStorage.removeItem(KEY.PLAY_LIST)

// play mode
export enum MODE {
  PLAY_IN_ORDER = 'PLAY_IN_ORDER',
  SINGLE_CYCLE = 'SINGLE_CYCLE',
  SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK'
}
export const setPlayMode = (mode: MODE = MODE.PLAY_IN_ORDER) => window.localStorage.setItem(KEY.PLAY_MODE, mode)
export const getPlayMode = (): MODE => (window.localStorage.getItem(KEY.PLAY_MODE) as MODE) || MODE.PLAY_IN_ORDER
export const removePlayMode = () => window.localStorage.removeItem(KEY.PLAY_MODE)
