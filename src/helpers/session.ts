import { DEFAULT_VALUE, localStorageFactory } from './localStorage'
import { ILoginResult } from 'apis/types/auth'

const KEY = '__session'

export const sessionLocalStorage = localStorageFactory<ILoginResult>({
  key: KEY,
  defaultValue: DEFAULT_VALUE.OBJECT,
})
