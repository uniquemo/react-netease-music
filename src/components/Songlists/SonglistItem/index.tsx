import React from 'react'
import { useHistory } from 'react-router-dom'

import PlayCount from 'components/PlayCount'
import PlayIcon from 'components/PlayIcon'
import ROUTES from 'constants/routes'
import styles from './style.module.css'

interface IProps {
  id: number
  name: string
  playCount: number
  picUrl?: string
}

const { useCallback } = React

const SonglistItem: React.FC<IProps> = ({ id, name, playCount, picUrl }) => {
  const history = useHistory()

  const handleItemClick = useCallback(() => {
    history.push(`${ROUTES.SONG_LISTS}/${id}`)
  }, [history, id])

  return (
    <div className={styles.root} onClick={handleItemClick}>
      <div className={styles.cover}>
        {picUrl && <img src={picUrl} loading='lazy' />}
        <PlayCount count={playCount} className={styles.playCount} />
        <PlayIcon className={styles.playIcon} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default SonglistItem
