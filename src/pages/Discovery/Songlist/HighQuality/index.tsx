import React from 'react'
import { ISonglist } from 'apis/types/business'

import styles from './style.module.css'

interface IProps {
  data?: ISonglist
}

const HighQuality: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      {data?.coverImgUrl && <img className={styles.bg} src={`${data?.coverImgUrl}?param=1200y200`} loading='lazy' />}
      <div className={styles.mask}></div>
      <div className={styles.content}>
        <div className={styles.pic}>
          {data?.coverImgUrl && <img src={`${data?.coverImgUrl}?param=150y150`} className='cover' loading='lazy' />}
        </div>
        <div className={styles.info}>
          <div className={styles.tag}>精品歌单</div>
          <div className={styles.name}>{data?.name}</div>
          <div className={styles.tips}>{data?.copywriter}</div>
        </div>
      </div>
    </div>
  )
}

export default HighQuality
