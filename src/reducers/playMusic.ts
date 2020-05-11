import React from 'react'
import { IMyMusic } from 'apis/types/business'
import { HTMLMediaState, HTMLMediaControls } from 'hooks/utils/createHTMLMediaHook'
import { getMusicUrl } from 'helpers/business'
import { setPlayList, removePlayList } from 'helpers/play'
import { setPlayHistory } from 'helpers/play'
import { IAction } from './types'

// Actions
const PLAY: string = 'PLAY'
const SET_PLAY_LIST: string = 'SET_PLAY_LIST'
const CLEAR_PLAY_LIST: string = 'CLEAR_PLAY_LIST'

export const ACTIONS = {
  PLAY,
  SET_PLAY_LIST,
  CLEAR_PLAY_LIST
}


// Reducer
export interface IState {
  musicId: number,
  musicUrl: string,
  music?: IMyMusic,
  playList: IMyMusic[]
}

export const initialState = {
  musicId: 0,
  musicUrl: '',
  playList: []
}

const playMusicReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.PLAY: {
      if (!action.payload?.keepOrder) {
        setPlayHistory(action?.payload?.music)
      }

      return {
        ...state,
        musicId: action?.payload?.musicId,
        musicUrl: getMusicUrl(action?.payload?.musicId),
        music: action?.payload?.music
      }
    }
    case ACTIONS.SET_PLAY_LIST: {
      const playList = action.payload?.playList || []
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
