import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import PlayIcon from 'components/PlayIcon'
import { IMyMusic } from 'apis/types/business'
import { formatTime } from 'helpers/time'
import { createMusic } from 'helpers/business'
import { PlayMusicStateContext, PlayMusicDispatchContext, ACTIONS, AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

interface IProps {
  data?: IMyMusic[]
  onDoubleClick: () => void
}

const { useContext } = React

const Content: React.FC<IProps> = ({ data, onDoubleClick }) => {
  const state = useContext(PlayMusicStateContext)
  const dispatch = useContext(PlayMusicDispatchContext)
  const audioInfo = useContext(AudioContext)

  const handleDoubleClick = (index: number) => {
    const item = data?.[index] as IMyMusic

    dispatch({
      type: ACTIONS.PLAY,
      payload: {
        musicId: item?.id,
        music: createMusic({
          ...item,
          duration: item?.duration / 1000,
          picUrl: item?.picUrl || item?.album?.blurPicUrl,
        }),
      },
    })

    onDoubleClick()
  }

  return (
    <div className={styles.root}>
      {data?.map(({ id, name, artists, album, duration, picUrl }, index) => {
        const isActive = state.musicId === id
        return (
          <div key={id} className={styles.item} onDoubleClick={() => handleDoubleClick(index)}>
            <div className={cn(styles.index, isActive && 'active')}>
              {isActive ? (
                <Icon icon={audioInfo.state?.paused ? 'volume-off' : 'volume-up'} iconSize={15} />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div className={styles.musicInfo}>
              <div className={styles.pic}>
                <img src={`${picUrl || album?.blurPicUrl}?param=60y60`} className='cover' loading='lazy' />
                <PlayIcon className={styles.playIcon} />
              </div>
              <div className={cn(styles.name, isActive && 'active')}>{name}</div>
            </div>

            <div className={styles.artists}>{artists.map(({ name }) => name).join(' / ')}</div>

            <div className={styles.album}>{album?.name}</div>

            <div className={styles.duration}>{formatTime(duration / 1000)}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Content
