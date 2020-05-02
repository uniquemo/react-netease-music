import React from 'react'
import Slider from './Slider'
import SongList from './SongList'
import LatestMusic from './LatestMusic'
import MV from './MV'

import styles from './style.module.css'

const Recommendation = () => {
  return (
    <div className={styles.root}>
      <Slider />
      <SongList />
      <LatestMusic />
      <MV />
    </div>
  )
}

export default Recommendation
