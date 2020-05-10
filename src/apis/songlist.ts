import axios from 'helpers/axios'
import { ITrackMusic, IMyMusic, ISonglist } from './types/business'

type GetSonglistDetailFn = (id: number) => Promise<{ songlist: ISonglist, songs: IMyMusic[] }>

const getSonglistDetail: GetSonglistDetailFn = async (id) => {
  const response = await axios({
    method: 'get',
    url: '/playlist/detail',
    params: {
      id
    }
  })

  const songs: IMyMusic[] = []
  response?.playlist?.tracks?.forEach((item: ITrackMusic) => {
    songs.push({
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      artists: item.ar,
      duration: item.dt,
      album: item.al
    })
  })

  return {
    songlist: response.playlist,
    songs
  }
}

export default {
  getSonglistDetail
}
