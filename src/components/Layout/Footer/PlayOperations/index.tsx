import React from 'react'
import { Icon } from '@blueprintjs/core'

import { PlayMusicStateContext, PlayMusicDispatchContext, AudioContext, ACTIONS } from 'reducers/playMusic'
import { playList as playListLocalStorage } from 'helpers/play'
import styles from './style.module.css'

const { useContext, useMemo, useCallback } = React

const PlayOperations = () => {
  const audioInfo = useContext(AudioContext)
  const { state: audioState, controls } = audioInfo

  const dispatch = useContext(PlayMusicDispatchContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId } = state

  const playList = useMemo(() => playListLocalStorage.getItem(), [musicId])

  const togglePlayStatus = useCallback(() => {
    if (audioState?.paused) {
      controls?.play()
    } else {
      controls?.pause()
    }
  }, [audioState?.paused, controls])

  const play = useCallback(
    (prev?: boolean) => {
      const len = playList.length
      if (!len) {
        return
      }

      const index = playList.findIndex(({ id }) => id === musicId)
      let nextIndex = -1

      if (index > -1) {
        nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len
      } else {
        nextIndex = 0
      }

      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: playList[nextIndex].id,
          music: playList[nextIndex],
        },
      })
    },
    [playList, musicId, dispatch],
  )

  const playPrev = useCallback(() => play(true), [play])
  const playNext = useCallback(() => play(), [play])

  return (
    <>
      <div className={styles.prev} onClick={playPrev}>
        <Icon icon='step-backward' />
      </div>
      <div className={styles.pause} onClick={togglePlayStatus}>
        <Icon icon={audioInfo.state?.paused ? 'play' : 'pause'} />
      </div>
      <div className={styles.next} onClick={playNext}>
        <Icon icon='step-forward' />
      </div>
    </>
  )
}

export default PlayOperations
