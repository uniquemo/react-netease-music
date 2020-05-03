import axios from 'helpers/axios'
import { IGetPersonalizedSongListRequest, ISongList, IMusic } from './types/personalized'

type GetPersonalizedSongListFn = (params: IGetPersonalizedSongListRequest) => Promise<ISongList[]>
type GetPersonalizedNewMusicFn = () => Promise<IMusic[]>

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

export default {
  getPersonalizedSongList,
  getPersonalizedNewMusic
}
