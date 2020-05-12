import React from 'react'
import { Tooltip, Icon, IconName } from '@blueprintjs/core'

import { getPlayMode, MODE } from 'helpers/play'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const MODE_ORDER = [MODE.PLAY_IN_ORDER, MODE.SINGLE_CYCLE, MODE.SHUFFLE_PLAYBACK]

const MODE_MAP: IDictionary<{
  label: string,
  icon: IconName
}> = {
  [MODE.PLAY_IN_ORDER]: {
    label: '顺序播放',
    icon: 'sort'
  },
  [MODE.SINGLE_CYCLE]: {
    label: '单曲循环',
    icon: 'repeat'
  },
  [MODE.SHUFFLE_PLAYBACK]: {
    label: '随机播放',
    icon: 'random'
  }
}

const { useState, useContext } = React

const PlayMode = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const [mode, setMode] = useState(getPlayMode())

  const handleClick = () => {
    const idx = MODE_ORDER.findIndex(m => m === mode)
    const nextMode = MODE_ORDER[(idx + 1) % (MODE_ORDER.length)]
    setMode(nextMode)

    dispatch({
      type: ACTIONS.SET_PLAY_MODE,
      payload: {
        playMode: nextMode
      }
    })
  }

  return (
    <Tooltip content={MODE_MAP[mode].label}>
      <Icon icon={MODE_MAP[mode].icon} onClick={handleClick} />
    </Tooltip>
  )
}

export default PlayMode
