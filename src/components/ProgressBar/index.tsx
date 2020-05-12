import React from 'react'
import cn from 'classnames'

import styles from './style.module.css'

interface IProps {
  className?: string,
  donePercent: number,
  renderLabel?: () => string,
  onBarClick: (donePercent: number) => void
}

const { useRef } = React

const ProgressBar: React.FC<IProps> = ({ donePercent, renderLabel, onBarClick, className }) => {
  const barRef = useRef<HTMLDivElement | null>()
  const dotRef = useRef<HTMLDivElement | null>()

  const getPercent = (event: React.MouseEvent<HTMLDivElement>) => {
    const box = barRef.current?.getBoundingClientRect()
    const clickX = event.pageX - (box?.x || 0)

    const percent = barRef.current
      ? clickX / barRef.current.offsetWidth
      : 0

    return percent
  }

  const handleBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const percent = getPercent(event)
    onBarClick(percent)
  }

  const width = `${donePercent * 100}%`

  return (
    <div
      className={cn(styles.root, className)}
      onClick={handleBarClick}
      ref={(ref) => barRef.current = ref}
    >
      <div
        className={styles.doneWrap}
        style={{ width }}
      >
        <div className={styles.done}></div>
        <div className={styles.controllDot} draggable={false} ref={ref => dotRef.current = ref}>
          <div className={styles.label}>
            {renderLabel ? renderLabel() : width}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
