import React from 'react'
import { Icon } from '@blueprintjs/core'

import ProgressBar from 'components/ProgressBar'
import { AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext, useMemo, useCallback } = React

const PlayVolume = () => {
  const audioInfo = useContext(AudioContext)
  const { state, controls } = audioInfo

  const handleBarClick = useCallback((percent: number) => {
    controls?.volume(percent)
  }, [controls])

  const donePercent = useMemo(() => {
    return Number((state?.volume || 0).toFixed(2))
  }, [state?.volume])

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
