import React from 'react'
import { Icon } from '@blueprintjs/core'

import styles from './style.module.css'

const Header = () => {
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
          <div><Icon icon='chevron-left' /></div>
          <div><Icon icon='chevron-right' /></div>
        </div>
      </div>

      <div>
        <div>hhh</div>
        <div>ddd</div>
      </div>
    </div>
  )
}

export default Header
