import React from 'react'
import { Icon, IconName } from '@blueprintjs/core'

import { IAlbum, IArtist, IMusic, IMV } from 'apis/types/business'
import { noop } from 'helpers/fn'
import styles from './style.module.css'

type Type = IAlbum | IArtist | IMusic | IMV

interface IItemProps {
  title: string
  icon: IconName
  data: Type[]
  renderLabel: (item: any) => string
  onItemClick?: (item: any) => void
}

const Item: React.FC<IItemProps> = ({ title, icon, data, renderLabel, onItemClick = noop }) => {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Icon icon={icon} />
        {title}
      </div>
      <div className={styles.content}>
        {data.map((item, index) => {
          return (
            <div key={index} className={styles.item} onClick={() => onItemClick(item)}>
              {renderLabel(item)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Item
