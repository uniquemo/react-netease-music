import axios from 'helpers/axios'
import { ITrackMusic, IMyMusic, ISonglist } from './types/business'
import { IGetSonglistsRequest, IGetSonglistCatsResponse, ICategory } from './types/songlist'
import { PAGE_SIZE } from 'constants/pagination'

type GetSonglistDetailFn = (id: number) => Promise<{ songlist: ISonglist, songs: IMyMusic[] }>
type GetSonglistsFn = (params: IGetSonglistsRequest) => Promise<{ playlists: ISonglist[], total: number }>
type GetSonglistCatsFn = () => Promise<IGetSonglistCatsResponse>
type GetSonglistHotCatsFn = () => Promise<ICategory[]>
type GetHighQualitySonglistFn = (cat?: string) => Promise<ISonglist>

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

const getSonglists: GetSonglistsFn = async ({ cat, order, limit = PAGE_SIZE, offset }) => {
  const response = await axios({
    method: 'get',
    url: '/top/playlist',
    params: {
      cat,
      order,
      limit,
      offset
    }
  })

  return response
}

const getSonglistCats: GetSonglistCatsFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/playlist/catlist'
  })

  return response
}

const getSonglistHotCats: GetSonglistHotCatsFn = async () => {
  const response = await axios({
    method: 'get',
    url: '/playlist/hot'
  })

  return response.tags
}

const getHighQualitySonglist: GetHighQualitySonglistFn = async (cat = '全部') => {
  const response = await axios({
    method: 'get',
    url: '/top/playlist/highquality',
    params: {
      limit: 1,
      cat
    }
  })

  return response?.playlists?.[0]
}

export default {
  getSonglistDetail,
  getSonglists,
  getSonglistCats,
  getSonglistHotCats,
  getHighQualitySonglist
}
