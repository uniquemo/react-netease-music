import React from 'react'

import BaseProgressBar from 'components/ProgressBar'
import { formatTime } from 'helpers/time'
import { AudioContext } from 'reducers/playMusic'

const { useContext } = React

const ProgressBar = () => {
  const audioInfo = useContext(AudioContext)

  const donePercent = audioInfo.state?.duration
    ? (audioInfo.state?.time / audioInfo.state.duration)
    : 0

  return (
    <BaseProgressBar
      donePercent={donePercent}
      renderLabel={() => formatTime(audioInfo.state?.time)}
      onBarClick={(percent) => {
        audioInfo.controls?.seek((audioInfo.state?.duration || 0) * percent)
      }}
    />
  )
}

export default ProgressBar
