import React from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import songApis from 'apis/song'
import useAsyncFn from 'hooks/useAsyncFn'
import { formatLyric } from 'helpers/lyric'
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useEffect, useContext, useRef, useState } = React

const HIGHLIGHT_LYRIC_TOP = 160
const LYRIC_LINE_HEIGHT = 30

const Lyric = () => {
  const lyricRef = useRef<HTMLDivElement | null>()
  const [line, setLine] = useState(0)

  const audioInfo = useContext(AudioContext)
  const state = useContext(PlayMusicStateContext)
  const { musicId } = state

  const [lyricState, getLyricFn] = useAsyncFn(songApis.getLyric)
  const lines = formatLyric(lyricState.value?.lyric)

  useEffect(() => {
    if (musicId) {
      getLyricFn(musicId)
    }
  }, [musicId])

  useEffect(() => {
    if (!audioInfo.state?.paused) {
      const audioTime = audioInfo.state?.time || 0

      const lineIndex = lines.findIndex(([time], index) => {
        const prevTime = index - 1 >= 0 ? lines[index - 1][0] : time
        const nextTime = index + 1 < lines.length ? lines[index + 1][0] : time
        if (prevTime <= audioTime && nextTime >= audioTime) {
          return true
        }
      })

      if (lineIndex > -1) {
        const scrollHeight = LYRIC_LINE_HEIGHT * lineIndex - HIGHLIGHT_LYRIC_TOP
        lyricRef.current?.scrollTo({
          top: scrollHeight < 0 ? 0 : scrollHeight,
          behavior: 'smooth'
        })
        setLine(lineIndex)
      }
    }
  }, [audioInfo.state])

  return (
    <div className={styles.root} ref={ref => lyricRef.current = ref}>
      {lyricState.loading ? <Spinner className='spinner' /> : (
        <>
          {lines.map(([time, lyric], index) => {
            return (
              <div
                key={time}
                className={cn(styles.line, line === index && styles.active)}
              >
                {lyric}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

export default Lyric
