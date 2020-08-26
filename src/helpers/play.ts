import { DEFAULT_VALUE, localStorageFactory } from 'helpers/localStorage'
import { IMyMusic } from 'apis/types/business'

enum KEY {
  PLAY_HISTORY = '__playHistory',
  PLAY_LIST = '__playList',
  PLAY_MODE = '__playMode',
}

export const playHistory = localStorageFactory<IMyMusic[]>({
  key: KEY.PLAY_HISTORY,
  defaultValue: DEFAULT_VALUE.ARRAY,
})

export const setPlayHistory = (music: IMyMusic): IMyMusic[] => {
  const list = playHistory.getItem().slice(0, 100)
  const index = list.findIndex((item) => item.id === music.id)

  if (index > -1) {
    list.splice(index, 1)
  }

  list.unshift(music)
  playHistory.setItem(list)

  return list
}

export const playList = localStorageFactory<IMyMusic[]>({
  key: KEY.PLAY_LIST,
  defaultValue: DEFAULT_VALUE.ARRAY,
})

export enum MODE {
  PLAY_IN_ORDER = 'PLAY_IN_ORDER',
  SINGLE_CYCLE = 'SINGLE_CYCLE',
  SHUFFLE_PLAYBACK = 'SHUFFLE_PLAYBACK',
}
export const playMode = localStorageFactory<MODE>({
  key: KEY.PLAY_MODE,
  defaultValue: MODE.PLAY_IN_ORDER,
  raw: true,
})
