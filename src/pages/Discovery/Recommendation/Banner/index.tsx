import React from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import BannerItem from './BannerItem'
import useAsyncFn from 'hooks/useAsyncFn'
import useInterval from 'hooks/useInterval'
import personalizedApis from 'apis/personalized'
import songApis from 'apis/song'
import { TARGET_TYPE } from 'apis/types/business'
import { PlayMusicDispatchContext, ACTIONS } from 'reducers/playMusic'
import styles from './style.module.css'

const { useEffect, useState, useMemo, useContext } = React

const Banner = () => {
  const dispatch = useContext(PlayMusicDispatchContext)
  const [currentMid, setCurrentMid] = useState(0)
  const [state, getBannerFn] = useAsyncFn(personalizedApis.getBanner)
  const { value: banners = [], loading: isGettingBanner } = state

  useEffect(() => {
    getBannerFn()
  }, [])

  useInterval(() => {
    if (!banners.length) {
      return
    }
    setCurrentMid((currentMid + 1) % banners.length)
  }, 6000)

  const bannersClassName = useMemo(() => {
    const len = banners.length
    const left = (currentMid - 1 + len) % len
    const right = (currentMid + 1) % len
    return {
      [currentMid]: styles.middle,
      [left]: styles.left,
      [right]: styles.right,
    }
  }, [currentMid, banners])

  const handleMidChange = (index: number) => {
    setCurrentMid(index)
  }

  const handleItemClick = async (musicId: number) => {
    const songs = await songApis.getSongDetail([musicId])
    if (songs?.length) {
      dispatch({
        type: ACTIONS.PLAY,
        payload: {
          musicId,
          music: songs[0],
        },
      })
    }
  }

  return isGettingBanner ? (
    <Spinner />
  ) : (
    <div className={styles.root}>
      <div className={styles.banners}>
        {banners.map(({ imageUrl, typeTitle, targetId, targetType }, index) => {
          const className = bannersClassName[index] || styles.hidden
          const isMusicType = targetType === TARGET_TYPE.MUSIC
          return (
            <BannerItem
              key={imageUrl}
              typeTitle={typeTitle}
              imageUrl={imageUrl}
              className={cn(className, isMusicType && styles.enabled)}
              onClick={isMusicType ? () => handleItemClick(targetId) : undefined}
            />
          )
        })}
      </div>
      <div className={styles.dots}>
        {banners.map(({ imageUrl }, index) => {
          return (
            <div
              key={imageUrl}
              className={cn(styles.dot, index === currentMid ? styles.active : '')}
              onMouseOver={() => handleMidChange(index)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Banner
