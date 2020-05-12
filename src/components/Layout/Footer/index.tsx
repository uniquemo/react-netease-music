import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'

import Artists from 'components/Artists'
import AudioTimer from './AudioTimer'
import ProgressBar from './ProgressBar'
import PlayRecord from './PlayRecord'
import PlayMode from './PlayMode'
import PlayOperations from './PlayOperations'
import PlayVolume from './PlayVolume'
import { PlayMusicStateContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext, useState } = React

const Footer = () => {
  const [showPlayRecord, setShowPlayRecord] = useState(false)
  const state = useContext(PlayMusicStateContext)
  const { musicId, music } = state

  const togglePlayRecord = () => setShowPlayRecord(!showPlayRecord)

  return (
    <div className={styles.root}>
      {musicId ? (
        <div className={styles.progressBar}>
          <ProgressBar />
        </div>
      ) : null}

      <div className={styles.songWrap}>
        <img src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined} loading='lazy' />
        <div>
          <div className={styles.info}>
            <div className={styles.name}>{`${music?.name || '--'} -`}</div>
            <Artists artists={state?.music?.artists} />
          </div>
          <div className={styles.time}>
            <AudioTimer />
          </div>
        </div>
      </div>

      <div className={styles.operations}>
        <PlayOperations />
      </div>

      <div className={styles.otherOperations}>
        <div className={styles.item}>
          <PlayMode />
        </div>
        <div onClick={togglePlayRecord} className={styles.item}>
          <Tooltip content='打开播放列表'>
            <Icon icon='menu-closed' className={showPlayRecord ? 'active': ''} />
          </Tooltip>
        </div>
        <div className={styles.item}>
          <PlayVolume />
        </div>
      </div>

      <PlayRecord
        show={showPlayRecord}
        onClickAway={() => setShowPlayRecord(false)}
      />
    </div>
  )
}

export default Footer
