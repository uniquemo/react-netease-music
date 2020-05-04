import React, { useEffect } from 'react'

import useInterval from 'hooks/useInterval'
import { formatTime } from 'helpers/time'

const { useState } = React

interface IProps {
  audio?: HTMLAudioElement
}

const DEFAULT_TIME = '00:00'

const AudioTimer: React.FC<IProps> = ({ audio }) => {
  const [time, setTime] = useState(audio?.currentTime || DEFAULT_TIME)
  const interval = audio?.currentTime === audio?.duration ? null : 1000

  // 每次url变化时，先执行一次，否则会延时1秒才执行(因为setInterval)
  useEffect(() => {
    const time = formatTime(audio?.currentTime)
    setTime(time)
  }, [audio?.currentSrc])

  useInterval(() => {
    const time = formatTime(audio?.currentTime)
    setTime(time)
  }, interval)
  
  return (
    <div>{time} / {formatTime(audio?.duration)}</div>
  )
}

export default AudioTimer
