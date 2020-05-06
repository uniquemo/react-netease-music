import { IAlbum, IArtist, IMusic, IMV } from './business'

export interface ISearchHot {
  first: string,
  iconType: number,
  second: number
}

export interface ISearchSuggestRequest {
  keywords: string
}

export interface ISearchSuggestType {
  albums: 'albums',
  artists: 'artists',
  mvs: 'mvs',
  songs: 'songs'
}

export type TypeKey = 'artists' | 'albums' | 'mvs' | 'songs'

export interface ISearchSuggestResponse {
  order: TypeKey[],
  albums: IAlbum[],
  artists: IArtist[],
  mvs: IMV[],
  songs: IMusic[]
}

// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
export enum SEARCH_TYPE {
  MUSIC = 1,
  ALBUM = 10,
  ARTIST = 100,
  SONG_LIST = 1000,
  USER = 1002,
  MV = 1004,
  LYRIC = 1006,
  BROADCASTING_STATION = 1009,
  VIDEO = 1014
}

export interface ISearchRequest {
  keywords: string,
  type?: SEARCH_TYPE,
  limit?: number,
  offset?: number
}
