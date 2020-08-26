import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'
import cn from 'classnames'

import Artists from 'components/Artists'
import AudioTimer from './AudioTimer'
import ProgressBar from './ProgressBar'
import PlayRecord from './PlayRecord'
import PlayMode from './PlayMode'
import PlayOperations from './PlayOperations'
import PlayVolume from './PlayVolume'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

const { useContext, useState, useCallback } = React

const Footer = () => {
  const [showPlayRecord, setShowPlayRecord] = useState(false)
  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId, music, showLyric } = state

  const togglePlayRecord = useCallback(() => {
    setShowPlayRecord(!showPlayRecord)
  }, [showPlayRecord, setShowPlayRecord])

  const handleShowLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.SHOW_LYRIC,
    })
  }, [dispatch])

  const handleHideLyric = useCallback(() => {
    dispatch({
      type: ACTIONS.HIDE_LYRIC,
    })
  }, [dispatch])

  return (
    <div className={styles.root}>
      {musicId ? (
        <div className={styles.progressBar}>
          <ProgressBar />
        </div>
      ) : null}

      <div className={styles.songWrap}>
        {!!musicId && (
          <>
            <div className={cn(styles.pic, !showLyric && styles.showLyric)}>
              <img src={music?.picUrl ? `${music?.picUrl}?param=40y40` : undefined} loading='lazy' />
              {!showLyric && (
                <div className={styles.mask} onClick={handleShowLyric}>
                  <Icon icon='double-chevron-up' />
                </div>
              )}
              {showLyric && (
                <div className={cn(styles.mask, styles.hideLyric)} onClick={handleHideLyric}>
                  <Icon icon='double-chevron-down' />
                </div>
              )}
            </div>
            <div>
              <div className={styles.info}>
                <div className={styles.name}>{`${music?.name || '--'} -`}</div>
                <Artists artists={state?.music?.artists} />
              </div>
              <div className={styles.time}>
                <AudioTimer />
              </div>
            </div>
          </>
        )}
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
            <Icon icon='menu-closed' className={showPlayRecord ? 'active' : ''} />
          </Tooltip>
        </div>
        <div className={styles.item}>
          <PlayVolume />
        </div>
      </div>

      <PlayRecord show={showPlayRecord} onClickAway={() => setShowPlayRecord(false)} />
    </div>
  )
}

export default Footer
