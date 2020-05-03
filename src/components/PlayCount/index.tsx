import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import styles from './style.module.css'

interface IProps {
  count: number,
  className?: string
}

const PlayCount: React.FC<IProps> = ({ count, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Icon icon='play' />
      {count}
    </div>
  )
}

export default PlayCount
