import React from 'react'

import List from '../List'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { playHistory as playHistoryLocalStorage } from 'helpers/play'
import useUpdate from 'hooks/useUpdate'

const { useContext } = React

const PlayHistory = () => {
  const forceUpdate = useUpdate()
  const dispatch = useContext(PlayMusicDispatchContext)
  const playHistory = playHistoryLocalStorage.getItem()

  const handleDoubleClick = (item: IMyMusic) => {
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: item,
        keepOrder: true, // 若直接从历史记录中播放，历史记录列表顺序不需要变更
      },
    })
  }

  const clearPlayHistory = () => {
    dispatch({
      type: ACTIONS.CLEAR_PLAY_HISTORY,
    })
    forceUpdate()
  }

  return <List data={playHistory} onDoubleClick={handleDoubleClick} onClear={clearPlayHistory} />
}

export default PlayHistory
