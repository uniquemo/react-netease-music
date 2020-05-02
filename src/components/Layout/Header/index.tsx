import React from 'react'
import { useHistory } from 'react-router-dom'
import { Icon } from '@blueprintjs/core'

import Navbar from './Navbar'
import styles from './style.module.css'

const Header = () => {
  const history = useHistory()

  const handleGoBack = () => history.goBack()
  const handleGoForward = () => history.goForward()

  return (
    <div className={styles.root}>
      <div className={styles.actions}>
        <div className={styles.iconsWrap}>
          <div>
            <Icon icon='cross' />
          </div>
          <div>
            <Icon icon='minus' />
          </div>
          <div>
            <Icon icon='maximize' />
          </div>
        </div>

        <div className={styles.backForward}>
          <div onClick={handleGoBack}><Icon icon='chevron-left' /></div>
          <div onClick={handleGoForward}><Icon icon='chevron-right' /></div>
        </div>
      </div>

      <div className={styles.content}>
        <Navbar />
        <div>ddd</div>
      </div>
    </div>
  )
}

export default Header
