import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cn from 'classnames'

import { LogStateContext } from 'reducers/log'
import { ISonglist } from 'apis/types/business'
import ROUTES from 'constants/routes'
import styles from './style.module.css'

interface IProps {
  title: string,
  data?: ISonglist[]
}

const { useContext } = React

const Songlist: React.FC<IProps> = ({ title, data }) => {
  const history = useHistory()
  const routeMatch = useRouteMatch<{ songlistId: string }>(ROUTES.SONG_LIST_DETAIL)
  const logState = useContext(LogStateContext)

  const handleClick = (id: number) => history.push(`${ROUTES.SONG_LISTS}/${id}`)

  return (
    <div className={styles.root}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {data?.map(({ id, name }) => {
          const isActive = routeMatch && Number(routeMatch.params.songlistId) === id
          return (
            <div
              key={id}
              className={cn(styles.item, isActive && 'active')}
              title={name}
              onClick={() => handleClick(id)}
            >
              {name.replace(logState.user.profile.nickname, '我')}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Songlist
