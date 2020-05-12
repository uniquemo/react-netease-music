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
        music: item
      }
    })
  }

  const handleClear = () => dispatch({ type: ACTIONS.CLEAR_PLAY_LIST })

  return (
    <List
      data={state.playList}
      onDoubleClick={handleDoubleClick}
      onClear={handleClear}
    />
  )
}

export default PlayHistory
