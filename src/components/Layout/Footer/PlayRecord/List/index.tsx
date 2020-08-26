import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import Table, { IColumn } from 'components/Table'
import VipIcon from 'components/VipIcon'
import { IMyMusic, IArtist, MUSIC_STATUS, MUSIC_TYPE } from 'apis/types/business'
import { formatTime } from 'helpers/time'
import { PlayMusicStateContext, AudioContext } from 'reducers/playMusic'
import styles from './style.module.css'

interface IProps {
  data: IMyMusic[]
  onDoubleClick: (item: IMyMusic) => void
  onClear: () => void
}

const { useContext } = React

const List: React.FC<IProps> = ({ data, onDoubleClick, onClear }) => {
  const state = useContext(PlayMusicStateContext)
  const audioInfo = useContext(AudioContext)

  const columns: IColumn<IMyMusic, keyof IMyMusic>[] = [
    {
      key: 'name',
      width: '55%',
      render: (name: string, { id, fee }: IMyMusic) => {
        const isActive = state.musicId === id
        return (
          <div className={cn(styles.name, isActive && 'active')}>
            {isActive && (
              <Icon className={styles.icon} iconSize={13} icon={audioInfo.state?.paused ? 'pause' : 'play'} />
            )}
            <div className={styles.text}>
              <span>{name}</span>
              {fee === MUSIC_TYPE.VIP && <VipIcon />}
            </div>
          </div>
        )
      },
    },
    {
      key: 'artists',
      width: '30%',
      render: (artists: IArtist[], { id }: IMyMusic) => {
        return (
          <div className={state.musicId === id ? 'active' : ''}>{artists?.map(({ name }) => name).join(' / ')}</div>
        )
      },
    },
    {
      key: 'duration',
      width: '15%',
      render: (duration: number) => formatTime(duration),
    },
  ]

  return (
    <>
      <div className={styles.header}>
        <div className={styles.count}>总{data.length}首</div>
        {data.length > 0 && (
          <div className={styles.actions}>
            <div onClick={onClear}>
              <Icon icon='trash' iconSize={15} />
              {' 清空'}
            </div>
          </div>
        )}
      </div>
      <div className={styles.list}>
        <Table<IMyMusic>
          columns={columns}
          data={data}
          showHeader={false}
          onDoubleClick={onDoubleClick}
          isRecordRowDisabled={(item) => item.status === MUSIC_STATUS.NOT_FOUND}
        />
      </div>
    </>
  )
}

export default List
