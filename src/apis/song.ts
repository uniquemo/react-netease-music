import axios from 'helpers/axios'

type GetSongDetailFn = (ids: number[]) => Promise<any>

const getSongDetail: GetSongDetailFn = async (ids) => {
  const response = await axios({
    method: 'get',
    url: '/song/detail',
    params: {
      ids: ids.join(',')
    }
  })

  return response
}

export default {
  getSongDetail
}