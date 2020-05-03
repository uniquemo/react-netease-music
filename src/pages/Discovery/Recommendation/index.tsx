import React from 'react'
import Slider from './Slider'
import SongList from './SongList'
import LatestMusic from './LatestMusic'
import MV from './MV'

import styles from './style.module.css'

const Recommendation = () => {
  return (
    <div className={styles.root}>
      <div className={styles.block}>
        <Slider />
      </div>

      <div className={styles.block}>
        <SongList />
      </div>

      <div className={styles.block}>
        <LatestMusic />
      </div>

      <div className={styles.block}>
        <MV />
      </div>
    </div>
  )
}

export default Recommendation
