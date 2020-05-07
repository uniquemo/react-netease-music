import React from 'react'

import { AudioContext } from 'reducers/playMusic'
import { formatTime } from 'helpers/time'

const { useContext } = React

const AudioTimer = () => {
  const audioInfo = useContext(AudioContext)

  return (
    <div>
      {formatTime(audioInfo?.state?.time)} / {formatTime(audioInfo?.state?.duration)}
    </div>
  )
}

export default AudioTimer
