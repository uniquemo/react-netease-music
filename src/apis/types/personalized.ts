export interface IGetPersonalizedSongListRequest {
  limit?: number
}

export interface ISongList {
  alg: string,
  canDislike: boolean,
  copywriter: string,
  highQuality: boolean,
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
  trackCount: number,
  trackNumberUpdateTime: number,
  type: number
}
