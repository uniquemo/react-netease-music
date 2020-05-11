import React from 'react'

import { getSession, setSession, removeSession } from 'helpers/session'
import { IAction } from './types'
import { ILoginResult } from 'apis/types/auth'

const LOGIN: string = 'LOGIN'
const LOGOUT: string = 'LOGOUT'

export const ACTIONS = {
  LOGIN,
  LOGOUT
}

export interface IState {
  isLogined: boolean,
  user: ILoginResult
}

const session = getSession()

export const initialState = {
  isLogined: !!session.userId,
  user: session
}

const logReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      setSession(action.payload?.user)

      return {
        ...state,
        isLogined: true,
        user: action.payload?.user
      }
    }
    case ACTIONS.LOGOUT: {
      removeSession()

      return {
        ...state,
        isLogined: false,
        user: {}
      }
    }
    default:
      return state
  }
}

export default logReducer

export const LogStateContext = React.createContext<IState>(initialState)
export const LogDispatchContext = React.createContext<React.Dispatch<IAction>>(() => {})
