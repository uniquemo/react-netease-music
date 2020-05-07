import React from 'react'

import { formatTime } from 'helpers/time'
import { AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

const { useRef, useContext } = React

const ProgressBar = () => {
  const audioInfo = useContext(AudioContext)
  const barRef = useRef<HTMLDivElement | null>()

  const getPercent = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickX = event.pageX
    const percent = barRef.current
      ? clickX / barRef.current.offsetWidth
      : 0

    return percent
  }

  const handleBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const percent = getPercent(event)
    audioInfo.controls?.seek((audioInfo.state?.duration || 0) * percent)
  }

  // TODO: Fix Drag Interaction
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'link'
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const percent = getPercent(event)
    audioInfo.controls?.seek((audioInfo.state?.duration || 0) * percent)
  }

  const donePercent = audioInfo.state?.duration
    ? (audioInfo.state?.time / audioInfo.state.duration)
    : 0

  return (
    <div
      className={styles.root}
      onClick={handleBarClick}
      ref={(ref) => barRef.current = ref}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={styles.doneWrap}
        style={{ width: `${donePercent * 100}%` }}
      >
        <div className={styles.done}></div>
        <div className={styles.controllDot} draggable>
          <div className={styles.label}>
            {formatTime(audioInfo.state?.time)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
