import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import Words from './Words'
import SearchResult from './SearchResult'
import useAsyncFn from 'hooks/useAsyncFn'
import searchApis from 'apis/search'
import { setSearchHistory, getSearchHistory } from 'helpers/search'
import { debounce } from 'helpers/fn'
import styles from './style.module.css'

const { useEffect, useState, useMemo } = React

const Searcher = () => {
  const [showResult, setShowResult] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [state, searchHotFn] = useAsyncFn(searchApis.searchHot)
  const [searchState, searchSuggestFn] = useAsyncFn(searchApis.searchSuggest)
  const { value: searchResult } = searchState

  useEffect(() => {
    searchHotFn()
  }, [])

  const handleInputFocus = () => setShowResult(true)
  const handleInputBlur = () => setShowResult(false)

  const handleInputChange = async (value: string) => {
    if (value) {
      await searchSuggestFn({ keywords: value })
    }
  }

  const handleInputKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchHistory(keyword)
    }
  }

  // 注意：这里需要使用useMemo，保证每次获取的都是同一个debounceInputChange函数。
  const debounceInputChange = useMemo(() => debounce(handleInputChange, 500), [])

  return (
    <div className={styles.root}>
      <div className={styles.searcher}>
        <Icon icon='search' />
        <input
          placeholder='搜索'
          value={keyword}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={({ target: { value } }) => {
            setKeyword(value)
            debounceInputChange(value)
          }}
          onKeyPress={handleInputKeyPress}
        />
      </div>

      <div className={cn(styles.result, showResult && styles.show)}>
        {searchResult && keyword ? (
          <SearchResult data={searchResult} />
        ) : (
          <div>
            <Words title='热门搜索' words={state.value?.map(({ first }) => first)} />
            <Words title='搜索历史' words={getSearchHistory()} />
        </div>
        )}
      </div>
    </div>
  )
}

export default Searcher
