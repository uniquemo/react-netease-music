import React from 'react'
import { useHistory } from 'react-router-dom'

import PlayIcon from 'components/PlayIcon'
import PlayCount from 'components/PlayCount'
import ROUTES from 'constants/routes'
import styles from './style.module.css'

interface IProps {
  id: number,
  name: string,
  playCount: number,
  picUrl?: string
}

const SongItem: React.FC<IProps> = ({ id, name, playCount, picUrl }) => {
  const history = useHistory()

  const handleItemClick = () => {
    history.push(`${ROUTES.SONG_LISTS}/${id}`)
  }

  return (
    <div className={styles.root} onClick={handleItemClick}>
      <div className={styles.cover}>
        {picUrl && <img src={picUrl} />}
        <PlayCount count={playCount} className={styles.playCount} />
        <PlayIcon className={styles.playIcon} />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default SongItem
