import axios from 'helpers/axios'
import { IGetPersonalizedSongListRequest, ISongList, IMusic, IMV, IBanner } from './types/personalized'

type GetPersonalizedSongListFn = (params: IGetPersonalizedSongListRequest) => Promise<ISongList[]>
type GetPersonalizedNewMusicFn = () => Promise<IMusic[]>
type GetPersonalizedMVFn = () => Promise<IMV[]>
type GetBannerFn = () => Promise<IBanner[]>

const getPersonalizedSongList: GetPersonalizedSongListFn = async ({ limit }) => {
  const response = await axios({
    method: 'get',
    url: '/personalized',
    params: {
      limit
    }
  })

  return response.result || []
}

const getPersonalizedNewMusic: GetPersonalizedNewMusicFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/personalized/newsong'
  })

  return response.result
}

const getPersonalizedMV: GetPersonalizedMVFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/personalized/mv'
  })

  return response.result
}

const getBanner: GetBannerFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/banner',
    params: {
      type: 0
    }
  })

  return response.banners
}

export default {
  getPersonalizedSongList,
  getPersonalizedNewMusic,
  getPersonalizedMV,
  getBanner
}
