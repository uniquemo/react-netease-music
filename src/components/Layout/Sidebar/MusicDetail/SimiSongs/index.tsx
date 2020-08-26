import React from 'react'
import cn from 'classnames'

import PlayIcon from 'components/PlayIcon'
import { IMusic } from 'apis/types/business'
import { createMusicWithAlbum } from 'helpers/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

interface IProps {
  data: IMusic[]
}

const { useContext } = React

const SimiSongs: React.FC<IProps> = ({ data }) => {
  const dispatch = useContext(PlayMusicDispatchContext)

  const handleItemClick = (music: IMusic) => {
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: music.id,
        music: createMusicWithAlbum(music),
      },
    })
  }

  return (
    <div className={styles.root}>
      {data.map((item) => {
        const { album, name, id, artists } = item

        return (
          <div className={styles.item} key={id} onClick={() => handleItemClick(item)}>
            <div className='smallCover'>
              <img src={`${album.blurPicUrl}?param=55y55`} loading='lazy' />
              <PlayIcon className={styles.playIcon} />
            </div>
            <div>
              <div className={cn(styles.name, 'singleLineEllipsis')}>{name}</div>
              <div className={styles.artists}>{artists.map(({ name }) => name).join(' / ')}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SimiSongs
