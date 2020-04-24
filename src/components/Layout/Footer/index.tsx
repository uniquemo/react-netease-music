import React from 'react'
import { Icon, Tooltip } from '@blueprintjs/core'

import styles from './style.module.css'

const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.songWrap}>
        <img />
        <div>
          <div>为你写诗 <span className={styles.singer}>- 吴克群</span></div>
          <div className={styles.time}>00:00 / 03:20</div>
        </div>
      </div>
      <div className={styles.operations}>
        <div className={styles.prev}><Icon icon='step-backward' /></div>
        <div className={styles.pause}><Icon icon='pause' /></div>
        <div className={styles.next}><Icon icon='step-forward' /></div>
      </div>
      <div className={styles.otherOperations}>
        <div>
          <Tooltip content='列表循环'>
            <Icon icon='swap-horizontal' />
          </Tooltip>
        </div>
        <div>
          <Tooltip content='打开播放列表'>
            <Icon icon='menu-closed' />
          </Tooltip>
        </div>
        <div>
          <Tooltip content='显示歌词'>
            词
          </Tooltip>
        </div>
        <div><Icon icon='volume-off' /></div>
      </div>
    </div>
  )
}

export default Footer
