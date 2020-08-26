import axios, { requestWithoutErrorToast } from 'helpers/axios'
import { ILoginRequest, ILoginResult } from './types/auth'

type LoginFn = (params: ILoginRequest) => Promise<ILoginResult>

const login: LoginFn = ({ phone, password }) => {
  return requestWithoutErrorToast({
    url: '/login/cellphone',
    params: {
      phone,
      password,
    },
  })
}

const logout = () => {
  return axios({
    method: 'post',
    url: '/logout',
  })
}

export default {
  login,
  logout,
}
