import React from 'react'
import { Spinner } from '@blueprintjs/core'

import LinkTitle from 'components/LinkTitle'
import SongItem from './SongItem'

import ROUTES from 'constants/routes'
import useAsyncFn from 'hooks/useAsyncFn'
import personalizedApis from 'apis/personalized'
import styles from './style.module.css'

const { useEffect } = React

const SongList = () => {
  const [state, personalizedSongListFn] = useAsyncFn(personalizedApis.getPersonalizedSongList)
  const { value: songList = [], loading: isGettingSongList } = state || {}

  useEffect(() => {
    personalizedSongListFn({ limit: 10 })
  }, [])

  return (
    <div className={styles.root}>
      <LinkTitle title='推荐歌单' route={ROUTES.SONG_LIST} />
      {isGettingSongList ? <Spinner /> : (
        <div className={styles.songsWrap}>
          {songList.map(({ name, playCount, picUrl }, index) => {
            return (
              <SongItem
                key={index}
                name={name}
                playCount={playCount}
                picUrl={picUrl}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SongList
