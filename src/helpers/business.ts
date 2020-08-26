import { IMyMusic, IMusic, ISimpleMusic } from 'apis/types/business'

export const getMusicUrl = (id?: number): string => {
  return id ? `https://music.163.com/song/media/outer/url?id=${id}.mp3` : ''
}

export const createMusic = ({ id, name, artists, duration, picUrl, ...others }: IMyMusic): IMyMusic => {
  return {
    id,
    name,
    artists,
    duration,
    picUrl,
    ...others,
  }
}

export const createMusicWithAlbum = (music: IMusic) => {
  const { id, name, artists, album, duration, ...others } = music
  return {
    id,
    name,
    artists,
    duration,
    picUrl: album.blurPicUrl,
    ...others,
  }
}

export const createMusicFromSimpleMusic = (music: ISimpleMusic): IMyMusic => {
  const { id, name, al, ar, dt, fee, status } = music
  return {
    id,
    name,
    fee,
    status,
    picUrl: al.picUrl,
    artists: ar,
    duration: dt,
    album: al,
  }
}
