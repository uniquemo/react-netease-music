import React from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import Content from './Content'
import songApis, { SONG_TYPE } from 'apis/song'
import useAsyncFn from 'hooks/useAsyncFn'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

const { useEffect, useState, useContext } = React

const TABS = [
  {
    label: '全部',
    type: SONG_TYPE.ALL,
  },
  {
    label: '华语',
    type: SONG_TYPE.CHINESE,
  },
  {
    label: '欧美',
    type: SONG_TYPE.EU_USA,
  },
  {
    label: '韩国',
    type: SONG_TYPE.KOREAN,
  },
  {
    label: '日本',
    type: SONG_TYPE.JAPANESE,
  },
]

const LatestMusic = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const [selectedType, setSelectedType] = useState(SONG_TYPE.ALL)
  const [state, getTopSongsFn] = useAsyncFn(songApis.getTopSongs)

  useEffect(() => {
    getTopSongsFn(selectedType)
  }, [])

  const handleTypeChange = (type: SONG_TYPE) => {
    setSelectedType(type)
    getTopSongsFn(type)
  }

  const playAll = (autoPlay?: boolean) => {
    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: state.value,
      },
    })

    if (autoPlay) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: state.value?.[0].id,
          music: state.value?.[0],
        },
      })
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          {TABS.map(({ label, type }) => {
            return (
              <div
                key={type}
                className={cn(styles.tab, type === selectedType && styles.active)}
                onClick={() => handleTypeChange(type)}
              >
                {label}
              </div>
            )
          })}
        </div>

        <div className={styles.operations}>
          <div className={styles.playAll} onClick={() => playAll(true)}>
            播放全部
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {state.loading ? (
          <Spinner className='spinner' />
        ) : (
          <Content data={state.value} onDoubleClick={() => playAll(false)} />
        )}
      </div>
    </div>
  )
}

export default LatestMusic
