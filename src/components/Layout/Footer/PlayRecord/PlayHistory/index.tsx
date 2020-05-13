import React from 'react'

import List from '../List'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const { useContext } = React

const PlayHistory = () => {
  const state = useContext(PlayMusicStateContext)
  const dispatch = useContext(PlayMusicDispatchContext)

  const handleDoubleClick = (item: IMyMusic) => {
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: item,
        keepOrder: true // 若直接从历史记录中播放，历史记录列表顺序不需要变更
      }
    })
  }

  const clearPlayHistory = () => {
    dispatch({
      type: ACTIONS.CLEAR_PLAY_HISTORY
    })
  }

  return (
    <List
      data={state.playHistory}
      onDoubleClick={handleDoubleClick}
      onClear={clearPlayHistory}
    />
  )
}

export default PlayHistory
