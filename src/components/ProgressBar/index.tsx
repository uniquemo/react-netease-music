import React from 'react'
import cn from 'classnames'

import { isNumber } from 'helpers/is'
import styles from './style.module.css'

interface IProps {
  className?: string
  donePercent?: number
  originDonePercent?: number
  renderLabel?: () => string
  onBarClick: (donePercent: number) => void
}

const { useRef, useCallback, useMemo } = React

const ProgressBar: React.FC<IProps> = ({ donePercent = 0, originDonePercent, renderLabel, onBarClick, className }) => {
  const barRef = useRef<HTMLDivElement | null>()
  const dotRef = useRef<HTMLDivElement | null>()

  const getPercent = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const box = barRef.current?.getBoundingClientRect()
    const clickX = event.pageX - (box?.x || 0)

    const percent = barRef.current ? clickX / barRef.current.offsetWidth : 0

    return percent
  }, [])

  const handleBarClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const percent = getPercent(event)
      onBarClick(percent)
    },
    [getPercent, onBarClick],
  )

  const width = useMemo(() => {
    return `${isNumber(originDonePercent) ? originDonePercent : donePercent * 100}%`
  }, [donePercent, originDonePercent])

  return (
    <div className={cn(styles.root, className)} onClick={handleBarClick} ref={(ref) => (barRef.current = ref)}>
      <div className={styles.doneWrap} style={{ width }}>
        <div className={styles.done}></div>
        <div className={styles.controllDot} draggable={false} ref={(ref) => (dotRef.current = ref)}>
          <div className={styles.label}>{renderLabel ? renderLabel() : width}</div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
