import React from 'react'

import useInterval from 'hooks/useInterval'
import { formatTime } from 'helpers/time'
import styles from './style.module.css'

const { useState, useRef } = React

interface IProps {
  audio?: HTMLAudioElement
}

const ProgressBar: React.FC<IProps> = ({ audio }) => {
  const [label, setLabel] = useState('')
  const [donePercent, setDonePercent] = useState(0)
  const barRef = useRef<HTMLDivElement | null>()

  useInterval(() => {
    const duration = audio?.duration
    const currentTime = audio?.currentTime || 0
    const percent = duration ? (currentTime / duration) : 0

    setLabel(formatTime(audio?.currentTime))
    setDonePercent(percent)
  }, donePercent < 1 ? 500 : null)

  const getPercent = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickX = event.pageX
    const percent = barRef.current ? clickX / barRef.current.offsetWidth : 0
    return percent
  }

  const handleBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const percent = getPercent(event)

    // 修改audio的currentTime即可，百分比会在interval中自动重新计算
    if (audio) {
      audio.currentTime = audio.duration * percent
    }
  }

  // TODO: Fix Drag Interaction
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'link'

    const percent = getPercent(event)
    setDonePercent(percent)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const percent = getPercent(event)

    if (audio) {
      audio.currentTime = audio.duration * percent
    }
  }

  if (!audio) {
    return null
  }

  return (
    <div
      className={styles.root}
      onClick={handleBarClick}
      ref={(ref) => barRef.current = ref}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.doneWrap} style={{ width: `${donePercent * 100}%` }}>
        <div className={styles.done}></div>
        <div className={styles.controllDot} draggable>
          <div className={styles.label}>{label}</div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
