import React from 'react'
import { IMusic } from 'apis/types/personalized'
import { HTMLMediaState, HTMLMediaControls } from 'hooks/utils/createHTMLMediaHook'
import { getMusicUrl } from 'helpers/business'

// Actions
export interface IAction {
  type: string,
  payload?: {
    [key: string]: any
  }
}

const PLAY: string = 'PLAY'

export const ACTIONS = {
  PLAY
}


// Reducer
export interface IState {
  musicId: number,
  musicUrl: string,
  music?: IMusic,
}

export const initialState = {
  musicId: 0,
  musicUrl: ''
}

const playMusicReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.PLAY: {
      return {
        ...state,
        musicId: action?.payload?.musicId,
        musicUrl: getMusicUrl(action?.payload?.musicId),
        music: action?.payload?.music
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
