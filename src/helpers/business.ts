export const getMusicUrl = (id?: number): string => {
  return id ? `https://music.163.com/song/media/outer/url?id=${id}.mp3` : ''
}
