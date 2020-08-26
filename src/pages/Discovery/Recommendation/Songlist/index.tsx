import React from 'react'
import { Spinner } from '@blueprintjs/core'

import LinkTitle from 'components/LinkTitle'
import Songlists from 'components/Songlists'

import ROUTES from 'constants/routes'
import useAsyncFn from 'hooks/useAsyncFn'
import personalizedApis from 'apis/personalized'
import styles from './style.module.css'

const { useEffect } = React

const Songlist = () => {
  const [state, personalizedSonglistFn] = useAsyncFn(personalizedApis.getPersonalizedSonglist)
  const { value: songlist = [], loading: isGettingSonglist } = state || {}

  useEffect(() => {
    personalizedSonglistFn({ limit: 10 })
  }, [])

  return (
    <div className={styles.root}>
      <LinkTitle title='推荐歌单' route={ROUTES.SONG_LIST} />
      {isGettingSonglist ? <Spinner /> : <Songlists data={songlist} />}
    </div>
  )
}

export default Songlist
