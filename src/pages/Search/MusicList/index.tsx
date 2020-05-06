import React from 'react'

import MusicListBase from 'components/MusicList'
import { IMusic } from 'apis/types/business'

interface IProps {
  data: IMusic[],
  total: number
}

const MusicList: React.FC<IProps> = ({ data, total }) => {
  return (
    <div>
      <MusicListBase data={data} />
    </div>
  )
}

export default MusicList
