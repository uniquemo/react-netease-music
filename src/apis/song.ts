import axios from 'helpers/axios'
import { createMusicFromSimpleMusic } from 'helpers/business'
import { IMyMusic, IMusic, ISonglist, ISimpleMusic } from 'apis/types/business'
import { IComment } from 'apis/types/comment'

export enum SONG_TYPE {
  ALL = 0,
  CHINESE = 7,
  EU_USA = 96,
  JAPANESE = 8,
  KOREAN = 16,
}

interface IParams {
  id: number
  offset?: number
  limit?: number
}

interface IGetCommentsResponse {
  comments: IComment[]
  hotComments?: IComment[]
  isMusician: boolean
  more: boolean
  moreHot: boolean
  topComments: IComment[]
  total: number
  userId: number
}

type GetSongDetailFn = (ids: number[]) => Promise<IMyMusic[]>
type GetTopSongsFn = (type?: SONG_TYPE) => Promise<IMyMusic[]>
type GetRecommendSongsFn = () => Promise<IMusic[]>
type GetSimiSonglistFn = (params: IParams) => Promise<ISonglist[]>
type GetgetSimiSongFn = (params: IParams) => Promise<IMusic[]>
type GetCommentsFn = (params: IParams) => Promise<IGetCommentsResponse>
type GetgetLyricFn = (id: number) => Promise<{ lyric: string; offset: number; version: number }>

const getSongDetail: GetSongDetailFn = async (ids) => {
  const response = await axios({
    url: '/song/detail',
    params: {
      ids: ids.join(','),
    },
  })

  return response?.songs.map((item: ISimpleMusic) => createMusicFromSimpleMusic({ ...item, status: (item as any).st }))
}

const getTopSongs: GetTopSongsFn = async (type = SONG_TYPE.ALL) => {
  const response = await axios({
    url: '/top/song',
    params: {
      type,
    },
  })

  return response.data
}

const getRecommendSongs: GetRecommendSongsFn = async () => {
  const response = await axios({
    url: '/recommend/songs',
    params: {
      timestamp: Date.now(),
    },
  })

  return response.data?.dailySongs?.map((item: ISimpleMusic) => createMusicFromSimpleMusic(item)) || []
}

const getSimiSonglist: GetSimiSonglistFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: '/simi/playlist',
    params: {
      id,
      offset,
      limit,
    },
  })

  return response.playlists
}

const getSimiSong: GetgetSimiSongFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: '/simi/song',
    params: {
      id,
      offset,
      limit,
    },
  })

  return response.songs
}

const getComments: GetCommentsFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: '/comment/music',
    params: {
      id,
      offset,
      limit,
    },
  })

  return response
}

const getLyric: GetgetLyricFn = async (id) => {
  const response = await axios({
    url: '/lyric',
    params: {
      id,
    },
  })

  return response.lrc
}

export default {
  getSongDetail,
  getTopSongs,
  getRecommendSongs,
  getSimiSonglist,
  getSimiSong,
  getComments,
  getLyric,
}
