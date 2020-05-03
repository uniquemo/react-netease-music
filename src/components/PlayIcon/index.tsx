import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import styles from './style.module.css'

interface IProps {
  className?: string
}

const PlayIcon: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Icon icon='play' />
    </div>
  )
}

export default PlayIcon
