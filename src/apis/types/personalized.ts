import { IArtist } from './business'

export interface IGetPersonalizedSonglistRequest {
  limit?: number
}

export interface ISonglist {
  alg: string
  canDislike: boolean
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
}

export interface IMusicSong {
  artists: IArtist[]
  duration: number
}

export interface IMusic {
  alg: string
  canDislike: boolean
  id: number
  name: string
  picUrl: string
  song: IMusicSong
}

export interface IMV {
  alg: string
  artistId: number
  artistName: string
  canDislike: boolean
  copywriter: string
  duration: number
  id: number
  name: string
  picUrl: string
  playCount: number
  subed: boolean
  type: number
}

export interface IBanner {
  exclusive: boolean
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: string
}
