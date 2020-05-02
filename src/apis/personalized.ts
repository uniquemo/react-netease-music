import axios from 'helpers/axios'
import { IGetPersonalizedSongListRequest, ISongList } from './types/personalized'

type GetPersonalizedSongListFn = (params: IGetPersonalizedSongListRequest) => Promise<ISongList[]>

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

export default {
  getPersonalizedSongList
}
