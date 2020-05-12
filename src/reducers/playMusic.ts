import React from 'react'
import { IMyMusic } from 'apis/types/business'
import { HTMLMediaState, HTMLMediaControls } from 'hooks/utils/createHTMLMediaHook'
import { getMusicUrl } from 'helpers/business'
import { setPlayList, getPlayList, removePlayList, MODE, getPlayMode, setPlayMode } from 'helpers/play'
import { setPlayHistory } from 'helpers/play'
import { IAction } from './types'

// Actions
const PLAY: string = 'PLAY'
const SET_PLAY_LIST: string = 'SET_PLAY_LIST'
const CLEAR_PLAY_LIST: string = 'CLEAR_PLAY_LIST'
const SET_PLAY_MODE: string = 'SET_PLAY_MODE'

export const ACTIONS = {
  PLAY,
  SET_PLAY_LIST,
  CLEAR_PLAY_LIST,
  SET_PLAY_MODE
}


// Reducer
export interface IState {
  musicId: number,
  musicUrl: string,
  music?: IMyMusic,
  playList: IMyMusic[],
  playMode: MODE
}

export const initialState = {
  musicId: 0,
  musicUrl: '',
  playList: getPlayList(),
  playMode: getPlayMode()
}

const playMusicReducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case ACTIONS.PLAY: {
      if (!payload?.keepOrder) {
        setPlayHistory(payload?.music)
      }

      return {
        ...state,
        musicId: payload?.musicId,
        musicUrl: getMusicUrl(payload?.musicId),
        music: payload?.music
      }
    }
    case ACTIONS.SET_PLAY_LIST: {
      const playList = payload?.playList || []
      setPlayList(playList)

      return {
        ...state,
        playList
      }
    }
    case ACTIONS.CLEAR_PLAY_LIST: {
      removePlayList()

      return {
        ...state,
        playList: []
      }
    }
    case ACTIONS.SET_PLAY_MODE: {
      setPlayMode(payload?.playMode)

      return {
        ...state,
        playMode: payload?.playMode || MODE.PLAY_IN_ORDER
      }
    }
    default:
      return state
  }
}

export default playMusicReducer

export interface IAudioContext {
  audio?: React.ReactElement<any> | undefined,
  state?: HTMLMediaState,
  controls?: HTMLMediaControls,
  ref?: {
    current: HTMLAudioElement | null
  }
}

// Context
export const PlayMusicStateContext = React.createContext<IState>(initialState)
export const PlayMusicDispatchContext = React.createContext<React.Dispatch<IAction>>(() => {})
export const AudioContext = React.createContext<IAudioContext>({})
