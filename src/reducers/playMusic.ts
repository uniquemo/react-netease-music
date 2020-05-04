import React from 'react'
import { IMusic } from 'apis/types/personalized'

// Actions
export interface IAction {
  type: string,
  payload?: {
    [key: string]: any
  }
}

const PLAY: string = 'PLAY'
const TOGGLE_PLAY_STATUS: string = 'TOGGLE_PLAY_STATUS'

export const ACTIONS = {
  PLAY,
  TOGGLE_PLAY_STATUS
}


// Reducer
export interface IState {
  musicId: number,
  isPlaying?: boolean,
  music?: IMusic
}

export const initialState = {
  musicId: -1,
  isPlaying: false
}

const playMusicReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.PLAY: {
      return {
        ...state,
        musicId: action?.payload?.musicId,
        music: action?.payload?.music,
        isPlaying: true
      }
    }
    case ACTIONS.TOGGLE_PLAY_STATUS: {
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    }
    default:
      return state
  }
}

export default playMusicReducer


// Context
export const PlayMusicStateContext = React.createContext<IState>(initialState)
export const PlayMusicDispatchContext = React.createContext<React.Dispatch<IAction>>(() => {})
