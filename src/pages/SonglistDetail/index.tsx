import React from 'react'
import { Spinner } from '@blueprintjs/core'
import { useParams } from 'react-router-dom'

import Tabs from 'components/Tabs'
import MusicList from 'components/MusicList'
import BasicInfo from './BasicInfo'
import useAsyncFn from 'hooks/useAsyncFn'
import songlistApis from 'apis/songlist'
import { IMusic } from 'apis/types/business'
import styles from './style.module.css'

const { useEffect } = React

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
  const params = useParams<IDictionary<string>>()
  const [state, getSonglistDetailFn] = useAsyncFn(songlistApis.getSonglistDetail)
  const { value: result, loading } = state

  const songs = result?.songs as IMusic[]

  useEffect(() => {
    getSonglistDetailFn(Number(params.id))
  }, [])

  return (
    <div className={styles.root}>
      {loading ? <Spinner className='spinner' /> : (
        <>
          <div className={styles.basicInfo}>
            <BasicInfo data={result?.songlist} />
          </div>

          <div className={styles.content}>
            <div className={styles.tabs}>
              <Tabs tabs={TABS} />
            </div>
            <MusicList data={songs} />
          </div>
        </>
      )}
    </div>
  )
}

export default SonglistDetail
