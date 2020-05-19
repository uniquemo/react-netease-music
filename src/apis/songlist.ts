import axios from 'helpers/axios'
import { createMusicFromSimpleMusic } from 'helpers/business'
import { ISimpleMusic, IMyMusic, ISonglist } from './types/business'
import { IGetSonglistsRequest, IGetSonglistCatsResponse, ICategory } from './types/songlist'
import { PAGE_SIZE } from 'constants/pagination'

type GetSonglistDetailFn = (id: number) => Promise<{ songlist: ISonglist, songs: IMyMusic[] }>
type GetSonglistsFn = (params: IGetSonglistsRequest) => Promise<{ playlists: ISonglist[], total: number }>
type GetSonglistCatsFn = () => Promise<IGetSonglistCatsResponse>
type GetSonglistHotCatsFn = () => Promise<ICategory[]>
type GetHighQualitySonglistFn = (cat?: string) => Promise<ISonglist>
type GetUserSonglistFn = (uid: number) => Promise<{ create: ISonglist[], collect: ISonglist[] }>

const getSonglistDetail: GetSonglistDetailFn = async (id) => {
  const response = await axios({
    url: '/playlist/detail',
    params: {
      id
    }
  })

  const songs: IMyMusic[] = []
  response?.playlist?.tracks?.forEach((item: ISimpleMusic, index: number) => {
    const privilege = response?.privileges?.[index]
    const song = createMusicFromSimpleMusic({
      ...item,
      fee: privilege?.fee,
      status: privilege?.st
    })
    songs.push(song)
  })

  return {
    songlist: response.playlist,
    songs
  }
}

const getSonglists: GetSonglistsFn = async ({ cat, order, limit = PAGE_SIZE, offset }) => {
  const response = await axios({
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
    url: '/playlist/catlist'
  })

  return response
}

const getSonglistHotCats: GetSonglistHotCatsFn = async () => {
  const response = await axios({
    url: '/playlist/hot'
  })

  return response.tags
}

const getHighQualitySonglist: GetHighQualitySonglistFn = async (cat = '全部') => {
  const response = await axios({
    url: '/top/playlist/highquality',
    params: {
      limit: 1,
      cat
    }
  })

  return response?.playlists?.[0]
}

const getUserSonglist: GetUserSonglistFn = async (uid) => {
  const response = await axios({
    url: '/user/playlist',
    params: {
      uid,
      limit: PAGE_SIZE
    }
  })

  const playlist: ISonglist[] = response.playlist || []
  const create = playlist.filter(({ creator }) => uid === creator.userId)
  const collect = playlist.filter(({ creator }) => uid !== creator.userId)

  return {
    create,
    collect
  }
}

export default {
  getSonglistDetail,
  getSonglists,
  getSonglistCats,
  getSonglistHotCats,
  getHighQualitySonglist,
  getUserSonglist
}
