import React, { useEffect } from 'react'

import MusicList from './MusicList'

import useQuery from 'hooks/useQuery'
import useAsyncFn from 'hooks/useAsyncFn'
import searchApis from 'apis/search'
import styles from './style.module.css'

interface ITab {
  tab: string
}

const TABS: IDictionary<ITab> = {
  MUSIC: {
    tab: '单曲'
  },
  ARTIST: {
    tab: '歌手'
  },
  ALBUM: {
    tab: '专辑'
  },
  SONG_LIST: {
    tab: '歌单'
  },
  USER: {
    tab: '用户'
  }
}

const Search = () => {
  const { keyword } = useQuery()
  const [state, searchFn] = useAsyncFn(searchApis.search)
  const { value: result } = state
  console.log('keyword => ', keyword)

  useEffect(() => {
    searchFn({ keywords: keyword })
  }, [])

  console.log('state => ', state)

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.keyword}>{keyword}</span>
          <span className={styles.count}>找到 1500 首单曲</span>
        </div>
        <div className={styles.tabs}>
          {Object.keys(TABS).map(key => {
            return <div key={key} className={styles.tab}>{TABS[key].tab}</div>
          })}
        </div>
      </div>

      <div className={styles.content}>
        <MusicList
          data={result?.songs}
          total={result?.songCount}
        />
      </div>
    </div>
  )
}

export default Search
