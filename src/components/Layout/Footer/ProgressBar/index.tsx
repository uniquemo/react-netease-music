import React from 'react'

import BaseProgressBar from 'components/ProgressBar'
import { formatTime } from 'helpers/time'
import { AudioContext } from 'reducers/playMusic'

const { useContext, useMemo, useCallback } = React

const ProgressBar = () => {
  const audioInfo = useContext(AudioContext)
  const { state, controls } = audioInfo

  const donePercent = useMemo(() => {
    return state?.duration ? state?.time / state.duration : 0
  }, [state?.time, state?.duration])

  const renderLabel = useCallback(() => {
    return formatTime(state?.time)
  }, [state?.time])

  const handleBarClick = useCallback(
    (percent) => {
      controls?.seek((state?.duration || 0) * percent)
    },
    [controls, state?.duration],
  )

  return <BaseProgressBar donePercent={donePercent} renderLabel={renderLabel} onBarClick={handleBarClick} />
}

export default ProgressBar
