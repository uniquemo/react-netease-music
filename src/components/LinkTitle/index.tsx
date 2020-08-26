import React from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'

import styles from './style.module.css'

interface IProps {
  title: string
  route: string
}

const LinkTitle: React.FC<IProps> = ({ title, route }) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(route)
  }

  return (
    <div onClick={handleClick} className={styles.root}>
      {title}
      <Icon icon='chevron-right' />
    </div>
  )
}

export default LinkTitle
