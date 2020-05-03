import React from 'react'

import PlayIcon from 'components/PlayIcon'
import PlayCount from 'components/PlayCount'
import styles from './style.module.css'

interface IProps {
  name: string,
  playCount: number,
  picUrl?: string
}

const SongItem: React.FC<IProps> = ({ name, playCount, picUrl }) => {
  return (
    <div className={styles.root}>
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
