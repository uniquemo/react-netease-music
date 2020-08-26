import axios from 'helpers/axios'
import { IGetAlbumResponse } from './types/album'

type GetAlbumFn = (id: number) => Promise<IGetAlbumResponse>

const getAlbum: GetAlbumFn = async (id) => {
  const response = await axios({
    url: '/album',
    params: {
      id,
    },
  })

  return response
}

export default {
  getAlbum,
}
