import { ILoginResult } from 'apis/types/auth'

export const setSession = (session: ILoginResult) => window.localStorage.setItem('__session', JSON.stringify(session))

export const removeSession = () => window.localStorage.removeItem('__session')

export const getSession = (): ILoginResult => JSON.parse(window.localStorage.getItem('__session') || '{}')
