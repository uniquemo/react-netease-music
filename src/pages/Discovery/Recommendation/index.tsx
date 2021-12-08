import React from 'react'
import Banner from './Banner'
import Songlist from './Songlist'
import LatestMusic from './LatestMusic'
import MV from './MV'

import { USER_PROFILE } from 'constants/github'

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

      <div className={styles.footer}>
        {new Date().getFullYear()}{' '}
        <a href={USER_PROFILE} target='_blank' rel='noreferrer'>
          @uniquemo
        </a>{' '}
        备案号{' '}
        <a href='https://beian.miit.gov.cn/' target='_blank' rel='noreferrer'>
          粤ICP备2021121971号-1
        </a>
      </div>
    </div>
  )
}

export default Recommendation
