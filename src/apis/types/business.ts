// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
export enum TARGET_TYPE {
  MUSIC = 1,
  ALBUM = 10,
  ARTIST = 100,
  SONG_LIST = 1000,
  USER = 1002,
  MV = 1004,
  LYRIC = 1006,
  BROADCASTING_STATION = 1009,
  VIDEO = 1014,
}

export enum MUSIC_STATUS {
  NOT_FOUND = -200,
}

export enum MUSIC_TYPE {
  VIP = 1,
}

export interface IArtist {
  albumSize: number
  id: number
  img1v1Id: number
  img1v1Url: string
  musicSize: number
  name: string
  picId: number
  picUrl: string
  topicPerson: number
  alia?: string[]
  alias?: string[]
}

export interface IAlbum {
  artist?: IArtist
  artists?: IArtist[]
  blurPicUrl?: string
  copyrightId?: number
  description?: string
  id: number
  mark?: number
  name: string
  picId?: number
  picUrl: string
  publishTime?: number
  size?: number
  status?: number
  subType?: string
  type?: string
}

export interface IMV {
  artistId: number
  artistName: string
  artists: IArtist[]
  cover: string
  duration: number
  id: number
  mark: number
  mv: any
  name: string
  playCount: number
  subed: boolean
}

export interface IMusic {
  album: IAlbum
  alias?: string[]
  artists: IArtist[]
  copyrightId?: number
  duration: number
  fee?: number
  ftype?: number
  id: number
  mark?: number
  mvid?: number
  name: string
  status?: number
  picUrl?: string
}

export interface IMyMusic {
  id: number
  name: string
  artists: IArtist[]
  duration: number
  picUrl?: string
  album?: IAlbum
  fee?: number // 用来判断是否需要vip，fee=1则vip才能听
  status?: number // 歌曲状态，-200表示资源不存在
  [key: string]: any
}

export interface ISonglist {
  adType: number
  backgroundCoverId: number
  cloudTrackCount: number
  commentCount: number
  coverImgUrl: string
  picUrl?: string
  createTime: number
  copywriter?: string
  creator: {
    avatarUrl: string
    nickname: string
    userId: number
  }
  description: string
  highQuality: boolean
  id: number
  name: string
  newImported: boolean
  opRecommend: boolean
  ordered: boolean
  playCount: number
  privacy: number
  shareCount: number
  specialType: number
  status: number
  subscribed: boolean
  subscribedCount: number
  subscribers: []
  tags: string[]
  trackCount: number
  trackIds: []
  trackNumberUpdateTime: number
  trackUpdateTime: number
  tracks: ISimpleMusic[]
  updateTime: number
  userId: number
}

export interface ISimpleMusic {
  al: {
    id: number
    name: string
    picUrl: string
  }
  ar: IArtist[]
  dt: number
  id: number
  name: string
  publishTime: number
  fee?: number
  status?: number
}
