import React from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import BannerItem from './BannerItem'

import useAsyncFn from 'hooks/useAsyncFn'
import useInterval from 'hooks/useInterval'
import personalizedApis from 'apis/personalized'

import styles from './style.module.css'

const { useEffect, useState, useMemo } = React

const Banner = () => {
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
  }, 3000)

  const bannersClassName = useMemo(() => {
    const len = banners.length
    const left = (currentMid - 1 + len) % len
    const right = (currentMid + 1) % len
    return {
      [currentMid]: styles.middle,
      [left]: styles.left,
      [right]: styles.right
    }
  }, [currentMid, banners])

  const handleMidChange = (index: number) => {
    setCurrentMid(index)
  }

  return (isGettingBanner
    ? <Spinner />
    : <div className={styles.root}>
      <div className={styles.banners}>
        {banners.map(({ imageUrl, typeTitle }, index) => {
          const className = bannersClassName[index] || styles.hidden
          return (
            <BannerItem
              key={imageUrl}
              typeTitle={typeTitle}
              imageUrl={imageUrl}
              className={className}
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
