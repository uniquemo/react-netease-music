import React from 'react'
import { Spinner } from '@blueprintjs/core'

import MusicList from 'components/MusicList'
import songApis from 'apis/song'
import useAsyncFn from 'hooks/useAsyncFn'
import { getDay, getWeekday } from 'helpers/time'
import { createMusic } from 'helpers/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import { LogStateContext } from 'reducers/log'
import { IMusic } from 'apis/types/business'
import styles from './style.module.css'

const { useEffect, useContext } = React

const RecommendDaily = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const logState = useContext(LogStateContext)

  const [state, getRecommendSongsFn] = useAsyncFn(songApis.getRecommendSongs)
  const { isLogined } = logState

  useEffect(() => {
    if (isLogined) {
      getRecommendSongsFn()
    }
  }, [isLogined])

  const playAll = (autoPlay?: boolean) => {
    dispatch({
      type: ACTIONS.SET_PLAY_LIST,
      payload: {
        playList: state.value,
      },
    })

    if (autoPlay) {
      const item = state.value?.[0] as IMusic
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId: item.id,
          music: createMusic(item),
        },
      })
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.date}>
            <div className={styles.weekday}>{getWeekday()}</div>
            <div className={styles.day}>{getDay()}</div>
          </div>
          <div className={styles.title}>
            <div className={styles.name}>每日歌曲推荐</div>
            <div className={styles.tips}>根据你的音乐口味生成，每天6:00更新</div>
          </div>
        </div>

        {isLogined && (
          <div className='playAll' onClick={() => playAll(true)}>
            播放全部
          </div>
        )}
      </div>

      {isLogined ? (
        <div className={styles.content}>
          {state.loading ? (
            <Spinner className='spinner' />
          ) : (
            <MusicList data={state.value || []} onPlayAll={() => playAll()} />
          )}
        </div>
      ) : (
        <div className={styles.needLogin}>请先登录喔~</div>
      )}
    </div>
  )
}

export default RecommendDaily
