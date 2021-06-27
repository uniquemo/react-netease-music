import React from 'react'

import List from '../List'
import { IMyMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { playList as playListLocalStorage } from 'helpers/play'
import useUpdate from 'hooks/useUpdate'

const { useContext } = React

const PlayList = () => {
  const forceUpdate = useUpdate()
  const dispatch = useContext(PlayMusicDispatchContext)
  const playList = playListLocalStorage.getItem()

  const handleDoubleClick = (item: IMyMusic) => {
    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item.id,
        music: item,
      },
    })
  }

  const handleClear = () => {
    dispatch({ type: ACTIONS.CLEAR_PLAY_LIST })
    forceUpdate()
  }

  return <List data={playList} onDoubleClick={handleDoubleClick} onClear={handleClear} />
}

export default PlayList
