import { IMyMusic } from 'apis/types/business'

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
    ...others
  }
}
