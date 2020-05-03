import React from 'react'
import cn from 'classnames'

import PlayIcon from 'components/PlayIcon'
import { IArtist } from 'apis/types/personalized'

import styles from './style.module.css'

interface IProps {
  name: string,
  picUrl: string,
  artists: IArtist[],
  index: number
}

const MusicItem: React.FC<IProps> = ({ name, picUrl, artists, index }) => {
  const hasBorderBottom = [4, 9].indexOf(index) > -1

  return (
    <div className={cn(styles.root, hasBorderBottom ? styles.borderBottom : '')}>
      <div className={styles.pic}>
        <img src={`${picUrl}?param=60y60`} />
        <PlayIcon className={styles.playIcon} />
      </div>
      <div className={styles.order}>
        {index < 9 ? `0${index + 1}` : index + 1}
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.singers}>
          {artists?.map(({ name }, index) => 
            (index !== artists?.length - 1
              ? <div key={name}><span className={styles.singer}>{name}</span><span className={styles.slash}>/</span></div>
              : <span key={name} className={styles.singer}>{name}</span>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicItem
