import axios from 'helpers/axios'
import { ISonglist } from './types/business'
import { IGetSonglistsRequest, IGetSonglistCatsResponse, ICategory } from './types/songlist'
import { PAGE_SIZE } from 'constants/pagination'

type GetSonglistsFn = (params: IGetSonglistsRequest) => Promise<{ playlists: ISonglist[]; total: number }>
type GetSonglistCatsFn = () => Promise<IGetSonglistCatsResponse>
type GetSonglistHotCatsFn = () => Promise<ICategory[]>
type GetHighQualitySonglistFn = (cat?: string) => Promise<ISonglist>
type GetUserSonglistFn = (uid: number) => Promise<{ create: ISonglist[]; collect: ISonglist[] }>

const getSonglists: GetSonglistsFn = async ({ cat, order, limit = PAGE_SIZE, offset }) => {
  const response = await axios({
    url: '/top/playlist',
    params: {
      cat,
      order,
      limit,
      offset,
    },
  })

  return response
}

const getSonglistCats: GetSonglistCatsFn = async () => {
  const response = await axios({
    url: '/playlist/catlist',
  })

  return response
}

const getSonglistHotCats: GetSonglistHotCatsFn = async () => {
  const response = await axios({
    url: '/playlist/hot',
  })

  return response.tags
}

const getHighQualitySonglist: GetHighQualitySonglistFn = async (cat = '全部') => {
  const response = await axios({
    url: '/top/playlist/highquality',
    params: {
      limit: 1,
      cat,
    },
  })

  return response?.playlists?.[0]
}

const getUserSonglist: GetUserSonglistFn = async (uid) => {
  const response = await axios({
    url: '/user/playlist',
    params: {
      uid,
      limit: PAGE_SIZE,
    },
  })

  const playlist: ISonglist[] = response.playlist || []
  const create = playlist.filter(({ creator }) => uid === creator.userId)
  const collect = playlist.filter(({ creator }) => uid !== creator.userId)

  return {
    create,
    collect,
  }
}

export default {
  getSonglists,
  getSonglistCats,
  getSonglistHotCats,
  getHighQualitySonglist,
  getUserSonglist,
}
