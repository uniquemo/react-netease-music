import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'

import ProgressBar from 'components/ProgressBar'
import Artists from 'components/Artists'
import AudioTimer from 'components/AudioTimer'
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext } = React

const Footer = () => {
  const audioInfo = useContext(AudioContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId, music } = state

  const togglePlayStatus = () => {
    if (audioInfo.state?.paused) {
      audioInfo.controls?.play()
    } else {
      audioInfo.controls?.pause()
    }
  }

  return (
    <div className={styles.root}>
      {musicId ? (
        <div className={styles.progressBar}>
          <ProgressBar />
        </div>
      ) : null}

      <div className={styles.songWrap}>
        <img src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined} />
        <div>
          <div className={styles.info}>
            <div className={styles.name}>{`${music?.name || '--'} -`}</div>
            <Artists artists={state?.music?.song?.artists} />
          </div>
          <div className={styles.time}>
            <AudioTimer />
          </div>
        </div>
      </div>

      <div className={styles.operations}>
        <div className={styles.prev}>
          <Icon icon='step-backward' />
        </div>
        <div className={styles.pause} onClick={togglePlayStatus}>
          <Icon icon={audioInfo.state?.paused ? 'play' : 'pause'} />
        </div>
        <div className={styles.next}>
          <Icon icon='step-forward' />
        </div>
      </div>

      <div className={styles.otherOperations}>
        <div>
          <Tooltip content='列表循环'>
            <Icon icon='swap-horizontal' />
          </Tooltip>
        </div>
        <div>
          <Tooltip content='打开播放列表'>
            <Icon icon='menu-closed' />
          </Tooltip>
        </div>
        <div>
          <Tooltip content='显示歌词'>
            词
          </Tooltip>
        </div>
        <div><Icon icon='volume-off' /></div>
      </div>
    </div>
  )
}

export default Footer
