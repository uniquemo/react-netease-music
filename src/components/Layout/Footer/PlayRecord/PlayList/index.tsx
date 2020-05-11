import React from 'react'

import List from '../List'
import { IMyMusic } from 'apis/types/business'
import { getPlayList } from 'helpers/play'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'

const { useContext } = React

const PlayHistory = () => {
  const state = useContext(PlayMusicStateContext)
  const dispatch = useContext(PlayMusicDispatchContext)
  const data = state.playList.length ? state.playList : getPlayList()

  const handleDoubleClick = (item: IMyMusic) => {
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: item
      }
    })
  }

  const handleClear = () => dispatch({ type: ACTIONS.CLEAR_PLAY_LIST })

  return (
    <List
      data={data}
      onDoubleClick={handleDoubleClick}
      onClear={handleClear}
    />
  )
}

export default PlayHistory
