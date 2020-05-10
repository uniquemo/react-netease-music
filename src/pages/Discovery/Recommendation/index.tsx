import React from 'react'
import Banner from './Banner'
import Songlist from './Songlist'
import LatestMusic from './LatestMusic'
import MV from './MV'

import styles from './style.module.css'

const Recommendation = () => {
  return (
    <div className={styles.root}>
      <Banner />

      <div className={styles.block}>
        <Songlist />
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
