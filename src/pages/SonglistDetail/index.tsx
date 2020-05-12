import React from 'react'
import { Spinner } from '@blueprintjs/core'
import { useParams } from 'react-router-dom'

import Tabs from 'components/Tabs'
import MusicList from 'components/MusicList'
import BasicInfo from './BasicInfo'
import useAsyncFn from 'hooks/useAsyncFn'
import { createMusic } from 'helpers/business'
import songlistApis from 'apis/songlist'
import { IMusic } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

const { useEffect, useContext } = React

const TABS = [
  {
    label: '歌曲列表',
    key: 'songlist'
  },
  {
    label: '评论',
    key: 'comment'
  }
]

const SonglistDetail = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const params = useParams<IDictionary<string>>()
  const { songlistId } = params

  const [state, getSonglistDetailFn] = useAsyncFn(songlistApis.getSonglistDetail)
  const { value: result, loading } = state

  const songs = result?.songs as IMusic[]

  useEffect(() => {
    getSonglistDetailFn(Number(songlistId))
  }, [songlistId])

  const playAll = (autoPlay?: boolean) => {
    const list = songs.map((item) => {
      return createMusic({
        ...item,
        duration: item.duration / 1000
      })
    })

    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: list
      }
    })

    if (autoPlay) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: list[0].id,
          music: list[0]
        }
      })
    }
  }

  return (
    <div className={styles.root}>
      {loading ? <Spinner className='spinner' /> : (
        <>
          <div className={styles.basicInfo}>
            <BasicInfo
              data={result?.songlist}
              onPlayAll={playAll}
            />
          </div>

          <div className={styles.content}>
            <div className={styles.tabs}>
              <Tabs tabs={TABS} />
            </div>
            <MusicList
              data={songs}
              onPlayAll={playAll}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SonglistDetail
