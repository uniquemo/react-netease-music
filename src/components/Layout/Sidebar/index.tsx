import React from 'react'
import { Icon } from '@blueprintjs/core'
import cn from 'classnames'

import LoginDialog from './LoginDialog'
import styles from './style.module.css'

const { useState } = React

const Sidebar = () => {
  const isLogged = true
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleNameClicke = () => {
    setShowLoginDialog(true)
  }

  const handleLoginDialogClose = () => {
    setShowLoginDialog(false)
  }

  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {isLogged ? <Icon icon='person' /> : <img />}
        </div>
        <div className={styles.name} onClick={handleNameClicke}>
          <span>momo_Unique</span>
          <Icon icon='play' />
        </div>
      </div>

      <div className={styles.tabs}>
        <div className={cn(styles.tab, styles.enabled)}>
          <Icon icon='music' />
          发现音乐
        </div>
        <div className={styles.tab}>
          <Icon icon='mobile-video' />
          视频
        </div>
      </div>
      
      <div className={styles.block}>
        <div className={styles.title}>我的音乐</div>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <Icon icon='import' />
            下载管理
          </div>
          <div className={styles.tab}>
            <Icon icon='cloud' />
            我的音乐云盘
          </div>
          <div className={styles.tab}>
            <Icon icon='star-empty' />
            我的收藏
          </div>
        </div>
      </div>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={handleLoginDialogClose}
      />
    </div>
  )
}

export default Sidebar
