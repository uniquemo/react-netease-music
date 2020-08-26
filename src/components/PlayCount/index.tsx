import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import { formatNum } from 'helpers/num'
import styles from './style.module.css'

interface IProps {
  count: number
  className?: string
}

const PlayCount: React.FC<IProps> = ({ count, className }) => {
  return (
    <div className={cn(styles.root, className)}>
      <Icon icon='play' />
      {formatNum(count)}
    </div>
  )
}

export default PlayCount
