import React from 'react'

import List from '../List'
import { getPlayHistory, removePlayHistory } from 'helpers/play'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const { useContext } = React

const PlayHistory = () => {
  const playHistory = getPlayHistory()
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

  return (
    <List
      data={playHistory}
      onDoubleClick={handleDoubleClick}
      // TODO: Fix 点击删除后UI没有同步
      onClear={() => removePlayHistory()}
    />
  )
}

export default PlayHistory
