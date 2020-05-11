import React from 'react'
import cn from 'classnames'

import styles from './style.module.css'

interface IProps {
  typeTitle: string,
  imageUrl: string,
  className?: string
}

const BannerItem: React.FC<IProps> = ({ typeTitle, imageUrl, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <img src={imageUrl} loading='lazy' />
      <div className={styles.type}>
        {typeTitle}
      </div>
    </div>
  )
}

export default BannerItem
