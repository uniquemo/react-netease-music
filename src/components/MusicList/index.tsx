import React from 'react'
import { Icon } from '@blueprintjs/core'

import Table, { IColumn } from 'components/Table'
import { IMusic, IArtist, IAlbum } from 'apis/types/business'
import { formatTime } from 'helpers/time'
import styles from './style.module.css'

interface IProps {
  data: IMusic[]
}

const columns: IColumn<IMusic, keyof IMusic>[] = [
  {
    title: '',
    key: 'name',
    width: '100px',
    render: (name: string, record: IMusic, index?: number) => {
      return (
        <div className={styles.operations}>
          <span className={styles.index}>{(index || 0) + 1}</span>
          <Icon icon='heart' iconSize={14} />
          <Icon icon='import' iconSize={14} />
        </div>
      )
    }
  },
  {
    title: '音乐标题',
    key: 'name',
    width: '45%',
    render: (name: string, { alias }: IMusic) => {
      return (
        <>
          <div>{name}</div>
          {alias?.length ? <div className={styles.alias}>{alias.join(' ')}</div> : null}
        </>
      )
    }
  },
  {
    title: '歌手',
    key: 'artists',
    width: '15%',
    render: (artists: IArtist[]) => artists?.map(({ name }) => name).join(' / ')
  },
  {
    title: '专辑',
    key: 'album',
    width: '15%',
    render: (album: IAlbum) => album?.name
  },
  {
    title: '时长',
    key: 'duration',
    width: '10%',
    render: (duration: number) => formatTime(duration / 1000)
  }
]

const MusicList: React.FC<IProps> = ({ data }) => {
  return (
    <div>
      <Table<IMusic>
        columns={columns}
        data={data}
      />
    </div>
  )
}

export default MusicList
