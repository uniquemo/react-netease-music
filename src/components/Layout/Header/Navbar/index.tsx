import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cn from 'classnames'
import ROUTES from 'constants/routes'

import styles from './style.module.css'

const NAVBAR = {
  [ROUTES.DISCOVERY]: [
    {
      label: '个性推荐',
      route: ROUTES.RECOMMENDATION,
    },
    {
      label: '每日歌曲推荐',
      route: ROUTES.RECOMMEND_DAILY,
    },
    {
      label: '歌单',
      route: ROUTES.SONG_LIST,
    },
    {
      label: '排行榜',
      route: ROUTES.LEADER_BOARD,
    },
    {
      label: '歌手',
      route: ROUTES.SINGERS,
    },
    {
      label: '最新音乐',
      route: ROUTES.LATEST_MUSIC,
    },
  ],
  [ROUTES.VIDEOS]: [
    {
      label: '视频',
      route: ROUTES.VIDEO,
    },
    {
      label: 'MV',
      route: ROUTES.MV,
    },
  ],
}

const Navbar = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const matchPathPrefix = Object.keys(NAVBAR).find((key) => pathname.startsWith(key))

  if (!matchPathPrefix) {
    return null
  }

  const items = NAVBAR[matchPathPrefix]

  const hasMatchRoute = items.find(({ route }) => route === pathname)

  const handleItemClick = (route: string) => {
    history.push(route)
  }

  return (
    <div className={styles.root}>
      {items.map(({ label, route }, index) => {
        const isActive = hasMatchRoute ? route === pathname : index === 0

        return (
          <div
            key={label}
            className={cn(styles.item, isActive ? styles.active : '')}
            onClick={() => handleItemClick(route)}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default Navbar
