import React from 'react'

import PlayCount from 'components/PlayCount'

import styles from './style.module.css'

interface IProps {
  name: string
  artistName: string
  playCount: number
  picUrl: string
  copywriter: string
}

const MVItem: React.FC<IProps> = ({ name, artistName, playCount, picUrl, copywriter }) => {
  return (
    <div className={styles.root}>
      <div className={styles.pic}>
        <img src={picUrl} loading='lazy' />
        <PlayCount count={playCount} className={styles.playCount} />
        <div className={styles.copywriter}>{copywriter}</div>
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.artistName}>{artistName}</div>
    </div>
  )
}

export default MVItem
