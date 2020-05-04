import axios, { AxiosRequestConfig } from 'axios'
import { SERVER } from 'constants/server'

const myAxios = ({
  url,
  method = 'get',
  params,
  data,
  ...others
}: AxiosRequestConfig) => {
  return axios({
    baseURL: SERVER,
    url,
    method,
    params,
    data,
    ...others
  }).then(result => {
    // console.log('axios origin result => ', result)
    return result.data
  }).catch(error => {
    // console.log('axios origin error => ', error)
    throw error
  })
}

export default myAxios
