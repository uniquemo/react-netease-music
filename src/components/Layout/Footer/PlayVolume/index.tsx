import React from 'react'
import { Icon } from '@blueprintjs/core'

import ProgressBar from 'components/ProgressBar'
import { AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext } = React

const PlayVolume = () => {
  const audioInfo = useContext(AudioContext)

  const handleBarClick = (percent: number) => {
    audioInfo.controls?.volume(percent)
  }

  const donePercent = Number((audioInfo.state?.volume || 0).toFixed(2))

  return (
    <div className={styles.root}>
      <Icon icon='volume-off' />
      <div className={styles.progress}>
        <ProgressBar
          className={styles.bar}
          donePercent={donePercent}
          onBarClick={handleBarClick}
        />
      </div>
    </div>
  )
}

export default PlayVolume
