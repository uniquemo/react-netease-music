export const setSession = (session: any) => window.localStorage.setItem('__session', JSON.stringify(session))

export const removeSession = () => window.localStorage.removeItem('__session')

export const getSession = (): any => JSON.parse(window.localStorage.getItem('__session') || '{}')
