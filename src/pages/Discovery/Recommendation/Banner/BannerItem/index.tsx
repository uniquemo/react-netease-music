import React from 'react'
import cn from 'classnames'

import { noop } from 'helpers/fn'
import styles from './style.module.css'

interface IProps {
  typeTitle: string
  imageUrl: string
  className?: string
  onClick?: () => void
}

const BannerItem: React.FC<IProps> = ({ typeTitle, imageUrl, className, onClick = noop }) => {
  return (
    <div className={cn(styles.root, className)} onClick={onClick}>
      <img src={imageUrl} loading='lazy' />
      <div className={styles.type}>{typeTitle}</div>
    </div>
  )
}

export default BannerItem
