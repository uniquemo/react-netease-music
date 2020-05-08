import React from 'react'
import { IMyMusic } from 'apis/types/business'
import { HTMLMediaState, HTMLMediaControls } from 'hooks/utils/createHTMLMediaHook'
import { getMusicUrl } from 'helpers/business'
import { setPlayHistory } from 'helpers/play'

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
  music?: IMyMusic
}

export const initialState = {
  musicId: 0,
  musicUrl: ''
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
