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
