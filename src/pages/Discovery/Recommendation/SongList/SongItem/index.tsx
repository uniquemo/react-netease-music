import React from 'react'
import { Icon } from '@blueprintjs/core'

import styles from './style.module.css'

interface IProps {
  name: string,
  playCount?: number,
  picUrl?: string
}

const SongItem: React.FC<IProps> = ({ name, playCount, picUrl }) => {
  return (
    <div className={styles.root}>
      <div className={styles.cover}>
        {picUrl && <img src={picUrl} />}
        <div className={styles.playCount}>
          <Icon icon='play' />
          {playCount}
        </div>
        <div className={styles.playIcon}>
          <Icon icon='play' />
        </div>
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default SongItem
