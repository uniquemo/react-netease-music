import React from 'react'
import { Spinner } from '@blueprintjs/core'

import LinkTitle from 'components/LinkTitle'
import MusicItem from './MusicItem'

import ROUTES from 'constants/routes'
import useAsyncFn from 'hooks/useAsyncFn'
import personalizedApis from 'apis/personalized'

import styles from './style.module.css'

const { useEffect } = React

const LatestMusic = () => {
  const [state, getPersonalizedNewMusicFn] = useAsyncFn(personalizedApis.getPersonalizedNewMusic)
  const { value: music = [], loading } = state

  useEffect(() => {
    getPersonalizedNewMusicFn()
  }, [])

  return (
    <div className={styles.root}>
      <LinkTitle title='最新音乐' route={ROUTES.LATEST_MUSIC} />
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          <div className={styles.block}>
            {music.slice(0, 5).map(({ id, name, picUrl, song, ...others }, index) => (
              <MusicItem key={name} index={index} id={id} name={name} picUrl={picUrl} song={song} {...others} />
            ))}
          </div>
          <div className={styles.block}>
            {music.slice(5, 10).map(({ id, name, picUrl, song, ...others }, index) => (
              <MusicItem key={name} index={index + 5} id={id} name={name} picUrl={picUrl} song={song} {...others} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LatestMusic
